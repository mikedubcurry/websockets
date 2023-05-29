import dotenv from 'dotenv'
import { PrismaClient } from "@prisma/client";
dotenv.config();
import { httpServer, io } from "./server";
import { AuthController } from './controllers';
import { App } from './app';
import { routes } from './routes';
import middlewares from './middlewares';
import { Application, Controller } from './types';

const PORT = process.env.PORT || 3000

async function main() {
    const prisma = new PrismaClient();
    const controllers = {
        AuthController: new AuthController(prisma)
    } satisfies Application<typeof prisma>['controllers']
    const application = new App({ controllers, routes, middlewares }, +PORT)

    application.start()
}

main().catch(console.error)
