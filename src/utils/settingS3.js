import AWS from 'aws-sdk'

export const s3 = new AWS.S3({
  endpoint: process.env.REACT_APP_AWS_ENDPOINT,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  s3ForcePathStyle: true,
  signatureVersion: 'v4'
})
