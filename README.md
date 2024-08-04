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

<details>
<summary>SQL Script</summary>

```sql
-- Enable the pgvector extension to work with embedding vectors
create extension vector;

-- Create a table to store your documents
create table documents (
  id bigserial primary key,
  content text, -- corresponds to Document.pageContent
  metadata jsonb, -- corresponds to Document.metadata
  embedding vector(1536) -- 1536 works for OpenAI embeddings, change if needed
);

-- Create a function to search for documents
create function match_documents (
  query_embedding vector(1536),
  match_count int DEFAULT null,
  filter jsonb DEFAULT '{}'
) returns table (
  id bigint,
  content text,
  metadata jsonb,
  embedding jsonb,
  similarity float
)
language plpgsql
as $$
#variable_conflict use_column
begin
  return query
  select
    id,
    content,
    metadata,
    (embedding::text)::jsonb as embedding,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where metadata @> filter
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;
```

</details>

## Building the application

### Base setup

```bash
npx create-next-app@latest
npm i @tanstack/react-query
npm install --save openai
npm install @supabase/supabase-js
npm install pdf-parse
npm install --save langchain @langchain/openai @langchain/community
```

We will be using tanstack to run server actions using mutations

## Optional libraries for UX/UI

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
