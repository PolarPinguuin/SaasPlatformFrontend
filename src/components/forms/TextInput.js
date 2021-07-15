import React from 'react'

const TextInput = ({
  name,
  id,
  register,
  error,
  label,
  placeholder,
  type = 'text',
}) => {

  return (
    <div className="inputContainer">
      <input
        className={`rounded-lg ${error ? 'border-red-600 border-2' : ''}`}
        type={type}
        id={id}
        {...register}
      />
    </div>
  )
}

export default TextInput
