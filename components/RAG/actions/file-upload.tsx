'use server'

export async function uploadFile(fomData: FormData) {
  try {
    const file = fomData.get('file') as unknown as File

    if (!file) {
      throw new Error('No file found')
    }

    console.log(file.name)
  } catch (error) {
    console.error(error)
  }
}
