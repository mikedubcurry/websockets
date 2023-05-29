import { PrismaClient } from "@prisma/client";

export class AuthController {

    constructor(private prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async login(credentials: Credentials) {
        if (!credentials.username || !credentials.password) {
            throw Error('Bad Input')
        }

        const user = await this.prisma.user.findUnique({ where: { username: credentials.username } })
        console.log(user)

    }

}

type Credentials = {
    username: string
    password: string
}

