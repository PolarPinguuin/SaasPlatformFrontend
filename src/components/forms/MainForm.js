import React from 'react'
import { useForm } from 'react-hook-form'
import MainFormFields from './MainFormFields'
import Crypt from './Crypt'
import FileUploads from './FileUploads'
import {aesData, jsonBody, keysData, request, services, signatureData} from "../../general";

const MainForm = () => {
  const form = useForm()
  const { handleSubmit } = form

  const getFile = async () => {
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

  const onSubmit = async (data) => {
    const { upload_file, upload_key, upload_signature } = data
    return console.log(data);


    // await fetch('http://localhost:3000/users', {
    //   method: 'POST',
    //   headers: { "Content-Type": "Application/json" },
    //   body: JSON.stringify(jsonBody)
    // })
    //   .then((res) => res)
    //   .then((result) => console.log(result))
    //   .catch((err) => console.log(err))

    const jsonData = {
      ...jsonBody,
      services: [``]
    }


    await request('users', 'POST',  { "Content-Type": "Application/json" }, JSON.stringify(jsonBody))
    const formData = new FormData()
    formData.append('fileData', upload_file[0])
    formData.append('signatureData', upload_signature[0])
    formData.append('keysData', upload_key[0])
    await request('upload', 'POST', {}, formData)
    await getFile();
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto pt-12">
      <FileUploads {...form} />
      {/*<Crypt {...form} />*/}
      {/*<MainFormFields {...form} />*/}
      <button type="submit">SEND</button>
    </form>
  )
}

export default MainForm
