import React from 'react'
import TextInput from './TextInput'
import RadioInput from "./RadioInput";

const FileUploads = (props) => {
  const { register, watch } = props
  const showSelect = watch('encrypt_type') === 'aes'

  return (
    <div className="flex flex-wrap mb-6">
      <div className="w-2-4 px-3 mb-4">
        <div className="p-6 shadow-md border border-gray-100">
          <h3 className="font-bold text-2xl uppercase text-left mb-6 pb-2 border-b-2 border-gray-200">
            File
          </h3>
          <div className="mb-4">
            <label htmlFor="upload">
              <TextInput
                id="upload_file"
                register={{...register("upload_file", { required: true })}}
                type="file"
              />
            </label>
          </div>
          <button type="submit">Descarca fisierul</button>
        </div>
      </div>
      <div className="w-2-4 px-3 mb-4">
        <div className="p-6 shadow-md border border-gray-100">
          <h3 className="font-bold text-2xl uppercase text-left mb-6 pb-2 border-b-2 border-gray-200">
            Keys
          </h3>
          <div className="mb-4">
            <label htmlFor="upload">
              <TextInput
                id="upload_key"
                register={{...register("upload_key", { required: true })}}
                type="file"
              />
            </label>
          </div>
          <button type="submit">Descarca fisierul</button>
        </div>
      </div>
      <div className="w-2-4 px-3 mb-4">
        <div className="p-6 shadow-md border border-gray-100">
          <h3 className="font-bold text-2xl uppercase text-left mb-6 pb-2 border-b-2 border-gray-200">
            Signature
          </h3>
          <div className="mb-4">
            <label htmlFor="upload">
              <TextInput
                id="upload_signature"
                register={{...register("upload_signature", { required: true })}}
                type="file"
              />
            </label>
          </div>
          <button type="submit">Descarca fisierul</button>
        </div>
      </div>
      <div className="w-2-4 px-3 mb-4">
        <div className="p-6 shadow-md border border-gray-100">
          <h3 className="font-bold text-2xl uppercase text-left mb-6 pb-2 border-b-2 border-gray-200">
            Signature
          </h3>
          <div className="mb-4">
            <div className="flex inputsWrapper">
              <RadioInput
                label="RSA"
                id="upload_signature"
                register={{...register("encrypt_type", { required: true })}}
                type="radio"
                value='rsa'
                className="px-4"
              />
              <RadioInput
                label="AES"
                id="upload_signature"
                register={{...register("encrypt_type", { required: true })}}
                type="radio"
                value='aes'
              />

              {showSelect &&
              <select {...register("aes_type", {required: true})} id="aes">
                <option value="aesecb">aesECB</option>
                <option value="aesecbc">aeseCBC</option>
              </select>
              }
            </div>
            <div className="flex inputsWrapper">
              <RadioInput
                label="Encrypt"
                id="encrypt_action"
                register={{...register("encrypt_action", { required: true })}}
                type="radio"
                value='en'
                className="px-4"
              />
              <RadioInput
                label="Decrypt"
                id="encrypt_action"
                register={{...register("encrypt_action", { required: true })}}
                type="radio"
                value='de'
              />
            </div>
          </div>
          <button type="submit">Descarca fisierul</button>
        </div>
      </div>
    </div>
  )
}

export default FileUploads
