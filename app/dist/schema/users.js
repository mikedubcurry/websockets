import { json, mysqlTable, serial, text } from 'drizzle-orm/mysql-core';
export const users = mysqlTable('users', {
    id: serial('id').primaryKey(),
    username: text('username'),
    friends: json('friends').default("[]"),
    blocks: json('blocks').default("[]"),
});
//# sourceMappingURL=users.js.map