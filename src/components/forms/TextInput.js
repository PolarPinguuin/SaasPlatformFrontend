import React from 'react'

const TextInput = ({
  name,
  id,
  register,
  error,
  label,
  placeholder,
  type = 'text',
  className
}) => {
  console.log(error);
  return (
<div className={className}>
  <div className="inputContainer">
    <label htmlFor={id}>{label}</label>
    <input
      className={`rounded-lg ${error ? 'errorField' : ''}`}
      type={type}
      id={id}
      {...register}
    />
  </div>
  {error && <p className="error">{error.message || 'This field is required'}</p>}

</div>
)
}

export default TextInput
