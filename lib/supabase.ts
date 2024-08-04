import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'
import { createClient } from '@supabase/supabase-js'
import { Document } from 'langchain/document'
import { openaiEmbeddings } from './openai'

export function getSupabaseClient() {
  const privateKey = process.env.SUPABASE_SERVICE_KEY
  if (!privateKey) throw new Error('SUPABASE SERVICE KEY not found')

  const url = process.env.SUPABASE_URL
  if (!url) throw new Error('SUPABASE URL not found')

  return createClient(url, privateKey)
}

export function getSupbaseVectorStore() {
  const client = getSupabaseClient()

  const store = new SupabaseVectorStore(openaiEmbeddings, {
    client,
    tableName: 'documents',
  })

  return store
}

export async function saveDocuments(documents: Document[]) {
  const store = getSupbaseVectorStore()

  const formattedDocuments: Document[] = documents.map((doc) => ({
    ...doc,
    pageContent: doc.pageContent.replace('\n', ''),
  }))

  await store.addDocuments(documents, {})
}
