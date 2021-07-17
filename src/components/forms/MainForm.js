import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import MainFormFields from './MainFormFields'
import Crypt from './Crypt'
import FileUploads from './FileUploads'
import {aesData, jsonBody, keysData, request, services, signatureData} from "../../general";

const MainForm = () => {
  const form = useForm()
  const { handleSubmit } = form
  const[fileExension, setFileExension]= useState('')
  const [anchor, setAnchor] = useState()

    // Data
    let fileData = null;
    let certificateData = null;

  const getFile = async () => {
      try {
        // Sa ma pis pe ea indexare si pe el program
      const data = await fetch('http://localhost:3000/upload', {
        method: 'GET',
      }).then(res => res.text())
          .then(result => {
              return result;
          })
            .catch((err) => console.log(err))
          /*
          const arrayBuffer = await data;

          console.log("data", data);
          return;

        //ceva
        var uintArray = new Uint8Array(arrayBuffer);
        var converted = [];
          uintArray.forEach(function (byte) { converted.push(String.fromCharCode(byte)) });
          console.log("uintArray,", uintArray);

        var byteArray = "";
        for (var i = 0; i < converted.length; i++) {
            byteArray += converted[i];
        }
          //converted = byteArray;

          console.log("Convertit", converted);

          const base64String = btoa(...converted);
          //console.log("Base64", base64String);
          */
      const dowload = React.createElement('a', {href: 'data:application/octet-stream;base64,' + data, download: `${fileData.fileName}${fileData.fileExtension}`}, "Download" )
      setAnchor(dowload)
      console.log(dowload);
    } catch (e) {
      console.log(e);
    }
  }

  const onSubmit = async (data) => {
      const { upload_file, upload_key, upload_signature, aes_type, encrypt_action, encrypt_type, signature_type, keyPassword, iv } = data
      await getCertificate();


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

    const jsonData = {
      ...jsonBody,
      services: [encryptionAction, signature_type],
      aesData: {
        keyPassword,
        iv
        },
        keysData: {
            certificate: certificateData.certificate,
        }
    }

      await request('users', 'POST', { "Content-Type": "Application/json" }, JSON.stringify(jsonData))

    const formData = new FormData()
    formData.append('fileData', upload_file[0])
    formData.append('signatureData', upload_signature[0])
    formData.append('keysData', upload_key[0])

      fileData = await request('upload', 'POST', {}, formData)

      console.log("fileExtension,", fileData);

    await getFile();
    }

    const getCertificate = async () => {
        certificateData = await fetch('http://localhost:8888/', {
            method: 'GET',
        }).then(res => res.json())
            .then(result => {
                console.log("Certificate:", b64_to_utf8(result.certificate))
                return result;
            })
            .catch((err) => console.log(err))
    }

    function b64_to_utf8(str) {
        return decodeURIComponent(escape(window.atob(str)));
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto pt-12">
      <FileUploads {...form} />
      {/*<Crypt {...form} />*/}
      {/*<MainFormFields {...form} />*/}
      <button type="submit">SEND</button>
      {anchor}
    </form>
  )
}

export default MainForm
