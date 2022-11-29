const baseUrl = process.env.NEXT_PUBLIC_APP_API_URL;
import axios from 'axios';
import md5 from 'md5';

type PresignedUrlUploadResponse = {
  url: string;
  fields: {
    [key: string]: string;
  };
};
type UploadFileResponse = {
  key: string;
};

export const getPresignedUrl = async (
  fileString: string,
  fileName: string
): Promise<PresignedUrlUploadResponse> => {
  try {
    const key = `${md5(fileString)}.${fileName.split('.').pop()}`;
    const res = await axios.post(`${baseUrl}/upload/presigned-upload`, {
      fileName: key,
    });
    return res.data.data as PresignedUrlUploadResponse;
  } catch (err) {
    console.log(err);
    throw new Error('Error while getting presigned url');
  }
};
export const uploadFile = async (file: File): Promise<UploadFileResponse> => {
  const { url, fields } = await getPresignedUrl(
    (await file.arrayBuffer()).toString(),
    file.name
  );
  const formData = new FormData();
  Object.keys(fields).forEach((key) => {
    formData.append(key, fields[key]);
  });
  formData.append('file', file);
  const res = await axios.postForm(url, formData);
  if (res.status != 204) {
    throw new Error('Error while uploading file');
  }
  return { key: `/${fields['key']}` };
};
