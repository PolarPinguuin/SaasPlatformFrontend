export const  signatureData = {
  fileBuffer: null,
  fileName: null,
  fileString: null,
  extension: null,
  xmlSigType: 'enveloped',
}

export const keysData = {
  certificate: null,
  privateKey: null,
  publicKey: null,
}

export const aesData = {
  iv: null,
  keyPassword: '1234567890123456',
}

export const services = ['aesecb.en']

export const jsonBody = {
  aesData,
  services
}


export const request = async (endpoint, method, headers = { "Content-Type": "Application/json" }, body = JSON.stringify(jsonBody)) => {
  const response = await fetch(`http://localhost:3000/${endpoint}`, {
    method,
    headers,
    body
  })
    .then(res => res.json())
      .then(result => {
          console.log("Result:", result)
          return result;
      })
        .catch((err) => console.log(err))
    return response
}
