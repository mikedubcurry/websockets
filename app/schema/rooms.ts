import { mysqlTable, serial, text, } from 'drizzle-orm/mysql-core';

export const rooms = mysqlTable('rooms', {
    id: serial('id').primaryKey(),
    name: text('name').notNull()
})
