import dotenv from 'dotenv'
import { PrismaClient } from "@prisma/client";
dotenv.config();
import { httpServer, io } from "./server";

const PORT = process.env.PORT

async function main() {
    httpServer.listen(PORT);
}

main().catch(console.error)
