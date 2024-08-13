import React from 'react';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import Image from 'next/image';

function UploadCareFile({setFiles}:{setFiles:any}) {
  
  
  const handleChangeEvent = (items:any) => {
    let url;
    url = items.allEntries.filter((file:any) => file.status === 'success')?.at(0)?.cdnUrl
      setFiles(url);
      
    };

  return (
    <div>
      <FileUploaderRegular 
      maxLocalFileSizeBytes={2000000}
      multiple={false}
      imgOnly={true}
      sourceList="local, url, camera"
      onChange={handleChangeEvent} 
      pubkey="5e6fb94784514d7fc99b" />
    </div>
  );
}

export default UploadCareFile;