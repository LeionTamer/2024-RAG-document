'use server'

import { metadata } from '@/app/layout'
import { openai } from '@/lib/openai'
import { getSupbaseVectorStore } from '@/lib/supabase'
import { get } from 'http'

export async function askQuestion(question: string) {
  console.log('asking question', question)
  const store = getSupbaseVectorStore()

  const result = await store.similaritySearch(question, 5)

  const references = result.map((entry) => ({
    content: entry.pageContent,
    pageNumber: entry.metadata.loc.pageNumber,
    info: entry.metadata.pdf.info,
  }))

  const query = `You will answer the user's question based on the following context: ${references.map((entry) => entry.content).join(', ')}. If you do not know the answer, respond with "I do not know".`
  const answer = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: query },
      { role: 'user', content: question },
    ],
    temperature: 0,
  })

  return {
    answer: answer.choices[0].message.content,
    references,
  }
}
