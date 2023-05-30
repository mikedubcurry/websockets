import { HttpMiddleware } from '../../types'
import { authMiddleware } from './auth'

export const middlewares: HttpMiddleware[] = [
    {
        type: 'http',
        handler: authMiddleware
    },
]
