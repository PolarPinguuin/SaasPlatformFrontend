import React from 'react'
import TextInput from './TextInput'
import RadioInput from "./RadioInput";

const FileUploads = (props) => {
  const {register, watch, formState: { errors }} = props
  const showSelect = watch('encrypt_type') === 'aes'
  const showIv = watch('aes_type') === 'aesecbc'
  const passwordValidations = showSelect ? {
    minLength: {value: 16, message: 'The length should be 16 char'},
    maxLength: {value: 16, message: 'The length should be 16 char'}
  } : {
  }

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
                register={{...register("upload_file", {required: true})}}
                type="file"
                error={errors.upload_file}
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
                register={{...register("upload_key")}}
                type="file"
                error={errors.upload_key}
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
                register={{...register("upload_signature")}}
                type="file"
                error={errors.upload_signature}
              />
            </label>
          </div>
          <button type="submit">Descarca fisierul</button>
        </div>
      </div>
      <div className="w-2-4 px-3 mb-4">
        <div className="p-6 shadow-md border border-gray-100">
          <h3 className="font-bold text-2xl uppercase text-left mb-6 pb-2 border-b-2 border-gray-200">
            Crypt
          </h3>
          <div className="mb-4">
            <div className="flex inputsWrapper">
              <RadioInput
                label="RSA"
                id="rsa"
                register={{...register("encrypt_type")}}
                type="radio"
                value='rsa'
                className="px-4"
                error={errors.encrypt_type}
              />
              <RadioInput
                label="AES"
                id="aes"
                register={{...register("encrypt_type")}}
                type="radio"
                value='aes'
                error={errors.encrypt_type}
              />

              {showSelect &&
              <select {...register("aes_type")} id="aes">
                <option value="aesecb">aesECB</option>
                <option value="aescbc">aesCBC</option>
              </select>
              }
            </div>
            <div className="flex inputsWrapper">
              <RadioInput
                label="Encrypt"
                id="encrypt_action"
                register={{...register("encrypt_action")}}
                type="radio"
                value='en'
                className="px-4"
                error={errors.encrypt_action}
              />
              <RadioInput
                label="Decrypt"
                id="encrypt_action"
                register={{...register("encrypt_action")}}
                type="radio"
                value='de'
                error={errors.encrypt_action}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-2-4 px-3 mb-4">
        <div className="p-6 shadow-md border border-gray-100">
          <h3 className="font-bold text-2xl uppercase text-left mb-6 pb-2 border-b-2 border-gray-200">
            Siganture
          </h3>
          <div className="mb-4">
            <div className="flex inputsWrapper">
              <RadioInput
                label="Apply signature"
                id="apply"
                register={{...register("signature_type")}}
                type="radio"
                value='apply'
                className="px-4"
              />
              <RadioInput
                label="Verify signature"
                id="check"
                register={{...register("signature_type")}}
                type="radio"
                value='verify'
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-2-4 px-3 mb-4">
        <div className="p-6 shadow-md border border-gray-100">
          <div className="mb-4">
            <TextInput
              label="Password"
              register={{
                ...register("keyPassword", passwordValidations)
              }}
              className="px-4 mb-4"
              error={errors.keyPassword}
            />
            {
              showIv &&
              <TextInput
                label="Verify signature"
                register={{
                  ...register("iv", passwordValidations)
                }}
                value='iv'
                error={errors.iv}
              />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileUploads
