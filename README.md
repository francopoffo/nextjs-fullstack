## About

This is a full stack app. It is a mini social network made with [Next.js](https://nextjs.org/), bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The main goal was to use some of the new features presented in Next.js 13 like the App Router and Server Components.
It is also my first time using some libraries that I consider essential in modern front end fetching like:

- [axios](https://axios-http.com/ptbr/docs/intro)
- [react-query](https://tanstack.com/query/v3/)

I used [prisma](https://www.prisma.io/), to configure my Postgres database, which is very intuitive ORM, and [Railway](https://railway.app/dashboard) to create the database.

For authentication I used Next's own lib [next-auth](https://next-auth.js.org/).

For notifications I used [react-hot-toast](https://react-hot-toast.com/).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
