import dotenv from 'dotenv'
import { PrismaClient } from "@prisma/client";
import { AuthController } from './controllers';
import { App } from './app';
import { routes } from './routes';
import { middlewares } from './middlewares';
import { Application } from './types';

dotenv.config();

const PORT = process.env.PORT || 3000

async function main() {
    const prisma = new PrismaClient();

    const controllers = {
        AuthController: new AuthController(prisma)
    }

    const application = new App({ controllers, routes, middlewares }, +PORT)

    application.start()
}

main().catch(console.error)
