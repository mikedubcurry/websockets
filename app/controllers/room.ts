import { PrismaClient } from "@prisma/client";

export class RoomController {
    
    constructor(private prisma: PrismaClient) {
        this.prisma = prisma;
    }

}

