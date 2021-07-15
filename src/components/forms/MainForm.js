import React from 'react'
import { useForm } from 'react-hook-form'
import MainFormFields from './MainFormFields'
import Crypt from './Crypt'
import FileUploads from './FileUploads'
import {aesData, jsonBody, keysData, services, signatureData} from "../../general";

const MainForm = () => {
  const form = useForm()
  const { handleSubmit } = form

  const onSubmit = async (data) => {
    const { upload_file } = data
    console.log(data);


    await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(jsonBody)
    })
      .then((res) => res)
      .then((result) => console.log(result))
      .catch((err) => console.log(err))


    const formData = new FormData()
    formData.append('fileData', upload_file[0])

    await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    })
      .then((res) => console.log(res))
      .then((result) => console.log(result))
      .catch((err) => console.log(err))



    try {
      const data = await fetch('http://localhost:3000/upload', {
        method: 'GET',
      })
      const arrayBuffer = await data.arrayBuffer()
      const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
      window.location.href = 'data:application/octet-stream;base64,' + base64String;
    } catch (e) {
      console.log(e);
    }
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
