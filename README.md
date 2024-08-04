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

## Other setups

### Supabase script

Run the scripts in your supabase account to allow pg_vector support and prepare the database table

## Building the application

Base setup

```bash
npx create-next-app@latest
npm i @tanstack/react-query
```

We will be using tanstack to run server actions using mutations

### Install Prettier (optional)

```bash
npm install --save-dev prettier-eslint
```

<details>
<summary>Add a prettier config file `.prettierrc`</summary>

```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true
}
```

</details>

### Install ShadCDN UI and the components (optional)

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input textarea
```
