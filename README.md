This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Running the application

First is to update the environment variables

```
OPENAI_API_KEY=""
SUPABASE_URL=""
SUPABASE_SERVICE_KEY=""
```

For the first time run of the application, install all the packages:

```bash
npm install
```

Run the application locally

```bash
npm run dev
```

## Building the application

Create a new app with NextJS

```bash
npx create-next-app@latest
```

### Supabase script

Run the scripts in your supabase account to allow pg_vector support and prepare the database table
