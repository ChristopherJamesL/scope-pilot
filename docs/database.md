# Database setup

ScopePilot uses PostgreSQL through Prisma ORM 7 (pinned to 7.10.1). Prisma 8 is still a release candidate with a different API, so it is deliberately not used.

The schema and migrations are the source of truth. Nothing in the database is created by hand except the empty database itself.

## Where things live

| Path | What it is |
| --- | --- |
| `server/prisma/schema.prisma` | Models and enums |
| `server/prisma/migrations/` | SQL history, committed to git |
| `server/prisma.config.ts` | Tells the Prisma CLI where the schema, migrations, and `DATABASE_URL` are |
| `server/src/generated/prisma/` | Generated client, gitignored, rebuilt with `npm run db:generate` |
| `server/src/core/db/prisma.ts` | The single `PrismaClient` the app uses (via the `@prisma/adapter-pg` driver adapter) |
| `server/.env` | Real `DATABASE_URL`, gitignored. `server/.env.example` is the committed template |

## Local setup (new machine)

1. Install PostgreSQL 16 and make sure it is running (`pg_isready`).
2. Create an empty database. This is the only manual database step:

   ```sh
   psql -U postgres -c "CREATE DATABASE scopepilot;"
   ```

3. Copy `server/.env.example` to `server/.env` and set `DATABASE_URL`:

   ```text
   DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/scopepilot
   ```

   URL-encode special characters in the password (`@` becomes `%40`).

4. From the repo root:

   ```sh
   npm install
   npm run db:generate   # builds the Prisma client (gitignored, so required after every clone)
   npm run db:deploy     # applies the committed migrations
   ```

## Everyday commands (from the repo root)

| Command | What it does |
| --- | --- |
| `npm run db:migrate -- --name <what_changed>` | After editing `schema.prisma`: creates and applies a new migration. Dev only |
| `npm run db:deploy` | Applies existing migrations without creating new ones. Use for staging and production |
| `npm run db:generate` | Regenerates the client. Prisma 7 does not do this automatically after `migrate dev` |
| `npm run db:status` | Shows which migrations are applied |

If `migrate dev` ever asks to reset the database, stop and check why before agreeing: a reset deletes all data.

## History

- Initial migration `init`: `inquiries` table, `InquiryStatus` and `AnalysisSource` enums.

## Moving to a hosted database (Neon, Supabase, RDS, etc.)

1. Create an empty Postgres database with the provider.
2. Set `DATABASE_URL` in the host's environment to the provider's connection string. Some providers give a pooled and a direct URL. Run migrations against the direct one.
3. Run `npm run db:deploy` once against that database to create the tables from the committed migrations.
4. Do not use `db:migrate` against a hosted database. `migrate dev` is for local development only.

No application code changes: only `DATABASE_URL` differs.
