import { s3 } from './settingS3';

export const downloadFile = async (filename) => {
    const params = {
        Bucket: process.env.REACT_APP_BUCKET,
        Key: filename
    };

    try {
        const data = await s3.getObject(params).promise();
        const blob = new Blob([data.Body], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading file:', error);
    }
};
