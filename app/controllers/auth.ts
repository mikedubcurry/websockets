import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import { Controller } from "../types";
import { Request, RequestHandler, Response } from "express";

export class AuthController extends Controller<PrismaClient> {
   // [method_name: string]: RequestHandler
    public prisma: PrismaClient

    constructor(prisma: PrismaClient) {
        super()
        this.prisma = prisma;
    }

    public login: RequestHandler = async (req, res) => {
        res.send('hello')
       // const credentials: Credentials = req.body
       // if (!credentials.username || !credentials.password) {
       //     throw Error('Bad Input')
       // }

       // const user = await this.prisma.user.findUnique({ where: { username: credentials.username } })

    }

    public register: RequestHandler = async(req, res) => {

    }

}

type Credentials = {
    username?: string
    password?: string
}

