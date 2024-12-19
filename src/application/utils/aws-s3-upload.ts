import * as aws from 'aws-sdk';

export class S3Uploader {
  private s3: AWS.S3;

  constructor(config: AWS.S3.ClientConfiguration) {
    this.s3 = new aws.S3(config);
  }

  async uploadFile(file: Buffer, key: string, bucket: string): Promise<AWS.S3.ManagedUpload.SendData> {
    try {
      const params: AWS.S3.PutObjectRequest = {
        Bucket: bucket + `/notas`,
        Body: file,
        Key: key,
        ContentType: 'image/png',
        ContentDisposition: 'inline',
      };

      return this.s3.upload(params).promise();
    } catch (error) {
      throw new Error('Failed to upload file to S3.');
    }
  }

  async deleteFile(key: string, bucket: string): Promise<void> {
    try {
      const params: AWS.S3.DeleteObjectRequest = {
        Bucket: bucket + `/notas`,
        Key: key,
      };

      await this.s3.deleteObject(params).promise();
    } catch (error) {
      throw new Error('Failed to delete file from S3.');
    }
  }
}
