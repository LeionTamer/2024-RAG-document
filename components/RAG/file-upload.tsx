'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useMutation } from '@tanstack/react-query'
import { uploadFile } from './actions/file-actions'

function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const { mutate, isPending } = useMutation({
    mutationFn: uploadFile,
  })

  async function uploadFileClient() {
    const formData = new FormData()
    formData.append('file', file!)

    await mutate(formData)
  }

  return (
    <div className="flex w-full max-w-xl items-center space-x-2 p-5">
      <Input
        type="file"
        accept="application/pdf"
        onChange={(event) => {
          if (event.target.files) setFile(event.target.files[0])
        }}
      />
      <Button
        type="submit"
        className="w-32"
        disabled={!file || isPending}
        onClick={() => uploadFileClient()}
      >
        Upload
      </Button>
    </div>
  )
}

export default FileUpload
