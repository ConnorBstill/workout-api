import * as AWS from 'aws-sdk';

export class S3Service {
  static async addBucketObject(
    keyName: string,
    fileExtension: string,
    body: any,
    s3Instance: AWS.S3,
    contentType?: string,
    contentEncoding?: 'base64'
  ): Promise<any> {
    const obj = await new Promise((resolve, reject) => {
      s3Instance.putObject(
        {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: keyName + '.' + fileExtension,
          Body: body,
          ContentType: contentType || null,
          ContentEncoding: contentEncoding || null
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });

    return obj;
  }

  static async getSignedUrl(keyName: string, s3Instance: AWS.S3): Promise<any> {
    const url = await new Promise((resolve, reject) => {
      s3Instance.getSignedUrl(
        'getObject',
        {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: keyName
        },
        (err, url) => {
          if (err) {
            reject(err);
          } else {
            resolve(url);
          }
        }
      );
    });

    return url;
  }

  static createS3Instance(): AWS.S3 {
    return new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      signatureVersion: 'v4'
    });
  }
}
