import OpenAI from 'openai'
import { OpenAIEmbeddings } from '@langchain/openai'

const apiKey = process.env.OPENAI_API_KEY!

export const openai = new OpenAI({
  apiKey: apiKey,
})

export const openaiEmbeddings = new OpenAIEmbeddings({
  apiKey,
})

export async function getEmbedding(text: string) {
  return await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: `${text}`,
  })
}
