import { PrismaClient } from "@prisma/client";

export class MessageController {
    
    constructor(private prisma: PrismaClient) {
        this.prisma = prisma;
    }

}


