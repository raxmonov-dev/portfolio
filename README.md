# Ruslan Raxmonov

Personal portfolio and journal of Ruslan Raxmonov — AI builder, founder and product designer.

The public site is an editorial black-and-white portfolio. `/admin` is a private Markdown publishing system.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- PostgreSQL + Prisma
- React Markdown (GFM)
- Framer Motion

## Local development

Create a PostgreSQL database, then copy environment variables:

```bash
cp .env.example .env
```

Required values:

```
DATABASE_URL=
AUTH_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
NEXT_PUBLIC_SITE_URL=http://localhost:43217
```

Never commit `.env`. `AUTH_SECRET` should be a long random string. Admin accounts are created from `ADMIN_EMAIL` / `ADMIN_PASSWORD` — there is no public registration.

```bash
npm install
npm run db:setup
npm run dev
```

Open [http://localhost:43217](http://localhost:43217).

```bash
npm run build
npm start
```

## Writing

- Public journal: `/blog`
- RSS: `/rss.xml`
- Admin: `/admin/login`

Sample posts are seeded as clearly marked demo content. Edit or delete them from the admin.

Images can be uploaded to `public/uploads` or pasted as URLs. Swap `lib/storage.ts` if you later add object storage.

## Project data

Work still lives in `data/projects.ts`. Contact URLs live in `data/site.ts`.
