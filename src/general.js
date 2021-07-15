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
  signatureData,
  keysData,
  aesData,
  services
}
