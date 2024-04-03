import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
    setUploadProgress({});
  };

  const handleUpload = async () => {
    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append('images', file);
    }

    try {
      const response = await axios.post('http://localhost:8080/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress({ ...uploadProgress, percentCompleted });
        },
      });
      console.log('File upload success:', response.data);
    } catch (error) {
      console.error('File upload error:', error);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {Object.keys(uploadProgress).length > 0 && (
        <div>Uploading progress: {uploadProgress.percentCompleted}%</div>
      )}
    </div>
  );
};

export default Upload;