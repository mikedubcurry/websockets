import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

export class AuthController {

    constructor(private prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async login(credentials: Credentials) {
        if (!credentials.username || !credentials.password) {
            throw Error('Bad Input')
        }

        const user = await this.prisma.user.findUnique({ where: { username: credentials.username } })

    }

}

type Credentials = {
    username: string
    password: string
}

