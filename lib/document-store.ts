import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from '@langchain/openai'
import { CharacterTextSplitter } from 'langchain/text_splitter'
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'

export async function loadStore(documentPath: string) {
  const loader = new PDFLoader(documentPath)
  const docs = await loader.load()

  const splitter = new CharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  })

  const splitDocs = await splitter.splitDocuments(docs)

  const store = await MemoryVectorStore.fromDocuments(
    splitDocs,
    new OpenAIEmbeddings({ apiKey: process.env.OPENAI_API_KEY })
  )
  return store
}
