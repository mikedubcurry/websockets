import { Application, ApplicationConfig, Controller, Middleware, Route } from "./types";
import express from 'express'
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";
import { createWriteStream } from "fs";
import { createServer } from "http";
import { AuthService } from "./services/auth";

export class App implements Application<PrismaClient> {
    public controllers: {
        [controllerName: string]: Controller<PrismaClient, {}>
    }
    public routes: Route[]
    public middlewares: Middleware[]
    private app: ReturnType<typeof express>
    private server!: ReturnType<typeof createServer>
    private port: number

    constructor({ controllers, routes, middlewares }: ApplicationConfig<PrismaClient>, port: number) {
        this.controllers = controllers;
        this.routes = routes;
        this.middlewares = middlewares;
        this.port = port
        this.app = express()

        this.init()
    }

    private init() {
        // register middlewares
        this.app.use(express.json());
        this.app.use(morgan('combined', {
            skip: (_, res) => res.statusCode < 400,
            stream: createWriteStream('./access.log', {
                flags: 'a'
            })
        }));

        this.middlewares.forEach(middleware => {
            if (middleware.type === 'http')
                this.app.use(middleware.handler)
        })

        // register routes with handlers
        this.routes.forEach(({ path, method, handler }) => {
            const [controllerName, methodName] = handler.split('@')
            if (!controllerName || !methodName) {
                throw Error('Unknown controller or method name: ' + controllerName + " " + methodName + ' at: ' + path + ' ' + method)
            }
            const h = this.controllers?.[controllerName]?.[methodName]
            if (h && typeof h === 'function') {
                // @ts-ignore
                this.app[method](path, h)
            } else {
                throw Error('Unknown controller or method name: ' + controllerName + " " + methodName + ' at: ' + path + ' ' + method)
            }
        })

        this.server = createServer(this.app)


    }

    public start() {
        this.server.listen(this.port)
    }

}
