'use client'
import React from 'react';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';

export function AuthorProfile({setFiles}:{setFiles:any}) {
  
  const handleChangeEvent = (items:any) => {
    let url;
    url = items.allEntries.filter((file:any) => file.status === 'success')?.at(0)?.cdnUrl
      setFiles(url); 
    };

  return (
    <div>
      <FileUploaderRegular 
      maxLocalFileSizeBytes={1000000}
      multiple={false}
      imgOnly={true}
      sourceList="local, url, camera"
      onChange={handleChangeEvent} 
      pubkey="de8bcd24e89faba6dbb0" />
    </div>
  );
}



