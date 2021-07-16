import React from 'react'

const TextInput = ({
  name,
  id,
  register,
  error,
  label,
  placeholder,
  type = 'text',
  value = '',
  className = ''
}) => {

  return (
    <div className={`inputContainer ${className}`}>
      <label htmlFor={id}>{label}</label>
      <input
        className={`rounded-lg ${error ? 'border-red-600 border-2' : ''}`}
        type={type}
        id={id}
        value={value}
        {...register}
      />
    </div>
  )
}

export default TextInput
