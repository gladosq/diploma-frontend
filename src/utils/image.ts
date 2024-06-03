import {GetProp, UploadProps} from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export async function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
  })
}
