import React from 'react'
import YesNoInput from '../../form/atoms/YesNoInput'
import Button from '../ui/button/Button'

const Crypt = (props: any) => {
  const { register } = props
  return (
    <div className="flex flex-wrap mb-6">
      <div className="w-2/4 px-3 mb-4">
        <div className="p-6 shadow-md border border-gray-100">
          <h3 className="font-bold text-2xl uppercase text-left mb-6 pb-2 border-b-2 border-gray-200">
            File
          </h3>
          <div className="mb-4">
            <label htmlFor="upload">
              <YesNoInput
                id="upload_file"
                name="crypt_type"
                register={register}
              />
            </label>
          </div>
          <Button type="submit">Descarca fisierul</Button>
        </div>
      </div>
      <div className="w-2/4 px-3 mb-4">
        <div className="p-6 shadow-md border border-gray-100">
          <h3 className="font-bold text-2xl uppercase text-left mb-6 pb-2 border-b-2 border-gray-200">
            File
          </h3>
          <div className="mb-4">
            <label htmlFor="upload">
              <YesNoInput
                id="upload_file"
                name="signature"
                register={register}
              />
            </label>
          </div>
          <Button type="submit">Descarca fisierul</Button>
        </div>
      </div>
    </div>
  )
}

export default Crypt
