import dotenv from 'dotenv'
import { PrismaClient } from "@prisma/client";
import { AuthController } from './controllers';
import { App } from './app';
import { routes } from './routes';
import { httpMiddlewares, wsMiddlewares } from './middlewares';
import { AuthService } from './services/auth';

dotenv.config();

const PORT = process.env.PORT || 3000

async function main() {
    const prisma = new PrismaClient();
    const authService = new AuthService(prisma)

    const controllers = {
        AuthController: new AuthController(prisma, authService)
    }

    const application = new App({ controllers, routes, middlewares: [...httpMiddlewares, ...wsMiddlewares] }, +PORT)

    application.start()
}

main().catch(console.error)
