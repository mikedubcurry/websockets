import { int, json, mysqlEnum, mysqlTable, primaryKey, serial, text, uniqueIndex, varchar } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
    id: serial('id').primaryKey(),
    username: text('username'),
    friends: json('friends').default("[]"),
    blocks: json('blocks').default("[]"),
})

