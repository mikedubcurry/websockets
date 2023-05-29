import { PrismaClient } from "@prisma/client";

export class UserController {
    
    constructor(private prisma: PrismaClient) {
        this.prisma = prisma;
    }

}
