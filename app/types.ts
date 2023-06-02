import type { RequestHandler } from "express"
import { Socket } from "socket.io"
import { ExtendedError } from "socket.io/dist/namespace"

export type Room = {
    id: string
    name: string
    activeUsers: number
}

export type SocketData = {
    username: string
    userId: string
}

export type WsHandler = (socket: Socket, next: (err?: ExtendedError | undefined) => void) => void;
export type HttpHandler = RequestHandler

export interface WsMiddleware  {
    type: 'ws'
    handler: WsHandler
}

export interface HttpMiddleware  {
    type: 'http'
    handler: HttpHandler
}

export type Middleware = HttpMiddleware | WsMiddleware

export interface Application<Deps> {
    controllers: {
        [controllerName: `${string}Controller`]: Controller<Deps, {}>
    }
    routes: Route[]
    middlewares: Middleware[]
}

export interface Route {
    path: `/${string}`
    method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options'
    handler: `${string}@${string}`
}

export class Controller<Deps, Services>{
    [property: string]: HttpHandler | Deps | undefined | Services
}

export type ApplicationConfig<Deps> = Application<Deps>
