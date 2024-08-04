'use server'

import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

export async function uploadFile(fomData: FormData) {
  try {
    const file = fomData.get('file') as unknown as File

    if (!file) {
      throw new Error('No file found')
    }

    const loader = new PDFLoader(file)
    const document = await loader.load()

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    })

    const documents = await splitter.splitDocuments(document)
  } catch (error) {
    console.error(error)
  }
}
