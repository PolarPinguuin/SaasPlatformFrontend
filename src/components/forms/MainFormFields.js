import React from 'react'
import TextInput from './TextInput'

const MainFormFields = (props) => {
  const { register } = props
  return (
    <div className="flex flex-wrap">
      <div className="w-full px-3 mb-4">
        <div className="p-6 shadow-md border border-gray-100">
          <h3 className="font-bold text-2xl uppercase text-left mb-6 pb-2 border-b-2 border-gray-200">
            File
          </h3>
          <div className="mb-4">
            <label htmlFor="upload">
              <TextInput id="upload_file" name="password" register={register} />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="upload">
              <TextInput id="upload_file" name="iv" register={register} />
            </label>
          </div>
          <button type="submit">Descarca fisierul</button>
        </div>
      </div>
    </div>
  )
}

export default MainFormFields
