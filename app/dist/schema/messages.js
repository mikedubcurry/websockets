import { boolean, int, mysqlTable, serial, text, } from 'drizzle-orm/mysql-core';
import { users } from './users.js';
import { relations } from 'drizzle-orm';
import { rooms } from './rooms';
export const messages = mysqlTable('messages', {
    id: serial('id').primaryKey(),
    text: text('text').notNull(),
    deleted: boolean('deleted').default(false),
    sender: int('sender').notNull(),
    room: int('room_id').notNull(),
});
export const messageRelations = relations(messages, ({ one, many }) => ({
    sender: one(users, {
        fields: [messages.sender],
        references: [users.id]
    }),
    room: one(rooms, {
        fields: [messages.room],
        references: [rooms.id]
    })
}));
//# sourceMappingURL=messages.js.map