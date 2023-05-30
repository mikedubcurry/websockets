import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import { Controller } from "../types";
import { Request, RequestHandler, Response } from "express";

export class AuthController extends Controller<PrismaClient> {
    /**
        * Responsible for generating responses for routes
        *  - should call on Service classes to execute business logic
        */
    public prisma: PrismaClient

    constructor(prisma: PrismaClient) {
        super()
        this.prisma = prisma;
    }

    public login: RequestHandler = async (req, res) => {
        res.send('hello')
        // call AuthService.login(credentials: Credentials)
        // return response
        // const credentials: Credentials = req.body
        // if (!credentials.username || !credentials.password) {
        //     throw Error('Bad Input')
        // }

        // const user = await this.prisma.user.findUnique({ where: { username: credentials.username } })

    }

    public register: RequestHandler = async (req, res) => {

    }

}

type Credentials = {
    username?: string
    password?: string
}

