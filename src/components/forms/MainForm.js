import React from 'react'
import { useForm } from 'react-hook-form'
import MainFormFields from './MainFormFields'
import Crypt from './Crypt'
import FileUploads from './FileUploads'

const MainForm = () => {
  const form = useForm()
  const { handleSubmit } = form

  const onSubmit = async (data) => {
    const { upload_file } = data
    console.log(data);
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

    const response =  await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData, // Use your own property name / key
      }),
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((err) => console.log('error'))


  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto pt-12">
      <FileUploads {...form} />
      {/*<Crypt {...form} />*/}
      {/*<MainFormFields {...form} />*/}
    </form>
  )
}

export default MainForm
