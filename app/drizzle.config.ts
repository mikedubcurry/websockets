import type { Config } from 'drizzle-kit'

export default {
    schema: "./schema/index.ts",
    out: './drizzle'
} satisfies Config
