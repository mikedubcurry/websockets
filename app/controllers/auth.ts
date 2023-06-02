import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import { Controller } from "../types";
import { Request, RequestHandler, Response } from "express";
import { AuthService } from "../services/auth";

export class AuthController extends Controller<PrismaClient, {}> {
    /**
        * Responsible for generating responses for routes
        *  - should call on Service classes to execute business logic
        */
    public prisma: PrismaClient
    public authService: AuthService

    constructor(prisma: PrismaClient, authService: AuthService) {
        super()
        this.prisma = prisma;
        this.authService = authService
    }

    public login: RequestHandler = async (req, res) => {
        if (!req.body.username || !req.body.password) {
            return res.status(422).json({ error: 'Must provide username and password' })
        }
        const response = await this.authService.login({ username: req.body.username, password: req.body.password })
        if (response.success) {
            res.json({ token: response.token })
        } else {
            res.status(400).json({ error: response.error })
        }
    }

    public register: RequestHandler = async (req, res) => {
        if (!req.body.username || !req.body.password || !req.body.confirmation) {
            return res.status(422).json({ error: 'Must provide username, password and password confirmation' })
        }
        const response = await this.authService.register({ username: req.body.username, password: req.body.password, confirmation: req.body.confirmation })
        if (response.success) {
            res.json({ token: response.token })
        } else {
            res.status(400).json({ error: response.error })
        }
    }

}

type Credentials = {
    username?: string
    password?: string
}

