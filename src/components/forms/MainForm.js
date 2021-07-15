import React from 'react'
import { useForm } from 'react-hook-form'
import MainFormFields from './MainFormFields'
import Crypt from 'src/components/forms/Crypt'
import FileUploads from 'src/components/forms/FileUploads'

const MainForm = () => {
  const form = useForm()
  const { handleSubmit } = form

  const onSubmit = async (data: any) => {
    const { upload_file } = data

    let payload = {}
    const formData = new FormData()

    formData.append('fileBuffer', upload_file[0])

    payload = {
      fileData: formData,
      services: ['aesecb.en'],
      aesData: {
        iv: null,
        keyPassword: '1234567890123456',
      },
      keysData: {
        certificate: null,
        privateKey: null,
        publicKey: null,
      },
      signatureData: {
        fileBuffer: null,
        fileName: null,
        fileString: null,
        extension: null,
        xmlSigType: 'enveloped',
      },
    }

    console.log(payload)

    const response = await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {},
      body: JSON.stringify(payload),
    }).then((response) => console.log(response))
    console.log(JSON.stringify(response))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto pt-12">
      <FileUploads {...form} />
      <Crypt {...form} />
      <MainFormFields {...form} />
    </form>
  )
}

export default MainForm
