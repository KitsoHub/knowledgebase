import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { writeFile, access, mkdir } from 'fs/promises'
import { NextResponse } from 'next/server'
import { join } from 'path'
import mime from 'mime'
import { v4 as uuidv4 } from 'uuid'
// import prisma from '@/lib/prisma'
// interface ExtendedFile extends File {
//     preview?: string;
//     progress?: number;
//   }
export const POST = async (req: Request) => {
  const user_clerk = await currentUser()
  console.log(
    '>>> Current User >>>',
    user_clerk?.emailAddresses[0].emailAddress
  )
  // console.log(type(req.json()))
  // const data = await req.json()
  // console.log(">>> Submission API  data >>>", data)
  try {
    const formData = await req.formData()
    const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads')
    console.log('>>>> Files >>>>', formData)
    //handle files
    const files: { name: string; url: string }[] = []
    //const filesx: File[] = []
    // for (const file in formData.files) {
    //     if (file) {
    //         console.log("File", file)
    //         const xfile: File | null = file as unknown as File

    //         filesx.push(xfile)
    //     }
    // }
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('uploaded_files')) {
        const file = value as unknown as File
        console.log('>>> One file >>', file)

        const uniqueSuffix = `${Date.now()}-${uuidv4()}}`
        const extension = mime.getExtension(file.type)
        const filename = `${file.name.replace(/\.[^/.]+$/, '')}-${uniqueSuffix}.${extension}`

        const filePath = join(UPLOAD_DIR, filename)
        const dirPath = join(UPLOAD_DIR)
        try {
          await access(dirPath)
        } catch {
          await mkdir(dirPath, { recursive: true })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        await writeFile(filePath, buffer)
        const fileUrl = `/uploads/${filename}`
        console.log(`open ${fileUrl} for uploaded file`)

        files.push({ name: file.name, url: fileUrl })
      }
    }
    console.log('>> Files >>', files)

    //         const entry = await prisma.submission.create({
    //     data:{
    //         articleTitle: formData.articleTitle,
    //         articleCategory: formData.articleCategory,
    //         articleAbstract: formData.articleAbstract,
    //         articleContent:formData.articleContent,
    //         articleTermsAccepted: formData.articleTermsAccepted === "true" ? true : false,
    //         tags: formData.tags,
    //         files: formData.files
    //     }
    // })

    const entry = await prisma.submission.create({
      data: {
        articleTitle: formData.get('articleTitle') as string,
        articleCategory: formData.get('articleCategory') as string,
        articleAbstract: formData.get('articleAbstract') as string,
        articleContent: formData.get('articleContent') as string,
        articleTermsAccepted: formData.get('articleTermsAccepted') === 'true',
        tags: JSON.parse(formData.get('tags') as string),
        files: files,
      },
    })

    return NextResponse.json({ success: true, data: entry })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
