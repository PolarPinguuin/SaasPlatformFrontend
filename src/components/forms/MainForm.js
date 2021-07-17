import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import MainFormFields from './MainFormFields'
import Crypt from './Crypt'
import FileUploads from './FileUploads'
import {aesData, jsonBody, keysData, request, services, signatureData} from "../../general";
import {toast} from "react-toastify";

const MainForm = () => {
  const form = useForm()
  const {handleSubmit} = form
  const [fileDetails, setFileDetails] = useState()

  // Data
  let fileData = null;
  let certificateData = null;

  // const getFile = async () => {
  //     try {
  //       // Sa ma pis pe ea indexare si pe el program
  //     const data = await fetch('http://localhost:3000/upload', {
  //       method: 'GET',
  //     }).then(res => res.text())
  //         .then(result => {
  //             return result;
  //         })
  //           .catch((err) => console.log(err))
  //         /*
  //         const arrayBuffer = await data;
  //
  //         console.log("data", data);
  //         return;
  //
  //       //ceva
  //       var uintArray = new Uint8Array(arrayBuffer);
  //       var converted = [];
  //         uintArray.forEach(function (byte) { converted.push(String.fromCharCode(byte)) });
  //         console.log("uintArray,", uintArray);
  //
  //       var byteArray = "";
  //       for (var i = 0; i < converted.length; i++) {
  //           byteArray += converted[i];
  //       }
  //         //converted = byteArray;
  //
  //         console.log("Convertit", converted);
  //
  //         const base64String = btoa(...converted);
  //         //console.log("Base64", base64String);
  //         */
  //     const dowload = React.createElement('a', {href: 'data:application/octet-stream;base64,' + data, download: `${fileData.fileName}${fileData.fileExtension}`}, "Download" )
  //     setAnchor(dowload)
  //     console.log(dowload);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  const onSubmit = async (data) => {
    const {
      upload_file,
      upload_key,
      upload_signature,
      aes_type,
      encrypt_action,
      encrypt_type,
      signature_type,
      keyPassword,
      iv
    } = data


    // aesecb.en
    const encryptType = encrypt_type === 'aes' ? aes_type : 'rsa'
    const encryptionAction = `${encryptType}.${encrypt_action}`

    // await fetch('http://localhost:3000/users', {
    //   method: 'POST',
    //   headers: { "Content-Type": "Application/json" },
    //   body: JSON.stringify(jsonBody)
    // })
    //   .then((res) => res)
    //   .then((result) => console.log(result))
    //   .catch((err) => console.log(err))

    if (!certificateData) {
      await getCertificate();
    }

    const jsonData = {
      ...jsonBody,
      services: [encrypt_type === 'none' ? null : encryptionAction, signature_type === 'none' ? null : signature_type],
      aesData: {
        keyPassword,
        iv
      },
      keysData: {
        certificate: certificateData?.certificate,
      }
    }

    await request('users', 'POST', {"Content-Type": "Application/json"}, JSON.stringify(jsonData))

    const formData = new FormData()
    formData.append('fileData', upload_file[0])
    formData.append('signatureData', upload_signature[0])
    formData.append('keysData', upload_key[0])

    fileData = await request('upload', 'POST', {}, formData)
    setFileDetails(fileData)
    console.log("fileExtension,", fileData);
  }

  const getCertificate = async () => {
    certificateData = await fetch('http://localhost:8888/', {
      method: 'GET',
    }).then(res => res.json()).then(result => {
      return result;
    }).catch((err) => toast.error('Could not get the certificate from the USB token.'))
  }


  if (fileDetails?.isSignedValid) {
    toast.success('Semnatura e valida');
  }

  if (fileDetails?.isSignedValid === false) {
    toast.error('Semnatura nu e valida');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto pt-12">
      <FileUploads props={form} getCertificate={getCertificate} fileDetails={fileDetails} />
      <button type="submit">SEND</button>
    </form>
  )
}

export default MainForm
