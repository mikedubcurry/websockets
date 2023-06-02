import { PrismaClient, User } from "@prisma/client";
import { compareSync, hashSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'

export interface Credentials {
    username: string
    password: string
    confirmation?: string
}

export type FailedValidation = {
    valid: false
    message: string
}

export type PassedValidation = {
    valid: true;
}

export type FailedAuth = {
    success: false
    error: string
}

export type PassedAuth = {
    success: true
    token: string
}

export type AuthResponse = FailedAuth | PassedAuth

export type ValidationResult = FailedValidation | PassedValidation

export class AuthService {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;

    }

    public async login(credentials: Credentials): Promise<AuthResponse> {
        const validated = this.validate(credentials);

        if (!validated.valid) {
            return {
                success: false,
                error: validated.message
            }
        }

        const username = credentials.username.trim();

        const user = await this.prisma.user.findFirst({ where: { username } })

        if (!user) {
            return {
                success: false,
                error: 'incorrect username or password'
            }
        }

        const passwordsMatch = compareSync(credentials.password, user.password)

        if (!passwordsMatch) {
            return {
                success: false,
                error: 'incorrect username or password'
            }
        }

        const token = this.createToken(user)

        return {
            success: true,
            token
        }
    }

    public async register(credentials: Credentials): Promise<AuthResponse> {
        const validated = this.validate(credentials);

        if (!validated.valid) {
            return {
                success: false,
                error: validated.message
            }
        }

        const username = credentials.username.trim();

        const userExists = await this.prisma.user.findFirst({ where: { username } })

        if (userExists) {
            return {
                success: false,
                error: `username: ${username} already taken`
            }
        }

        const user = await this.prisma.user.create({
            data: {
                username,
                password: hashSync(credentials.password, 5),
            }
        })

        const token = this.createToken(user)
        return {
            success: true,
            token
        }
    }

    public validate(input: Credentials): ValidationResult {
        if (!input.username.trim() || !input.password) {
            return { valid: false, message: 'Must supply username and password' };
        }
        if (input.confirmation) {
            if (input.confirmation !== input.password) {
                return { valid: false, message: 'Password and Password Confirmation must match' }
            }
        }
        return { valid: true };
    }

    private createToken(user: User) {
        return sign({ username: user.username, id: user.id },
            process.env.JWT_SECRET || '', { expiresIn: '1hr' })
    }
}
