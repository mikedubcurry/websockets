import type { RequestHandler } from "express"

export type Room = {
    id: string
    name: string
    activeUsers: number
}

export type SocketData = {
    username: string
    userId: string
}

export interface Application<Deps> {
    controllers: {
        [controllerName: `${string}Controller`]: Controller<Deps>
    }
    routes: Route[]
    middlewares: RequestHandler[]
}

export interface Route {
    path: `/${string}`
    method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options'
    handler: `${string}@${string}`
}

export class Controller<Deps>{
    [property: string]: RequestHandler | Deps | undefined
}

export type ApplicationConfig<Deps> = Application<Deps>
