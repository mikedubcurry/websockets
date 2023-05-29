import { Route } from "./types";

export const routes: Route[] = [
    {
       path: '/login',
       method: 'post',
       handler: 'AuthController@login'
    },
    {
        path: '/register',
        method: 'post',
        handler: 'AuthController@register'
    }
]
