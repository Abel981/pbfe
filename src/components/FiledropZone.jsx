import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import Button from '@mui/joy/Button';


function FileDropzone({ accept, maxSize, multiple, onDrop, children,name,setValue }) {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const onDropCallback = useCallback((acceptedFiles) => {
        const newFiles = acceptedFiles.filter((file) => {
          return !selectedFiles.some((f) => f.name === file.name && f.size === file.size);
        });
       
        if (onDrop) {
            onDrop([...selectedFiles, ...newFiles]);
            console.log('ondrop runned')
            setValue(name,[...selectedFiles,...newFiles]);
        }
        setSelectedFiles([...selectedFiles, ...newFiles]);
      }, [onDrop, selectedFiles,setValue,name]);

  const { getRootProps, getInputProps, isDragActive, isDragReject, acceptedFiles } = useDropzone({
    accept,
    maxSize,
    multiple,
    onDrop: onDropCallback,
  });
  const updatedFile = fileName => (selectedFiles.filter((file) => file.name != fileName))

  const message = isDragReject
    ? 'File type not accepted'
    : isDragActive
    ? 'Drop the files here'
    : 'Drag and drop some files here, or click to select files';

  return (
    <>
    <div {...getRootProps()}>
      <input {...getInputProps()} name={name}/>
      {children || <p>{message}</p>}
    </div>
      {isDragReject && "File type not accepted, sorry!"}
      {selectedFiles && 
      <ul className="list-group mt-2">
        { selectedFiles.map((selectedFile,index) => (
             <li className="list-group-item list-group-item-success" key={index}>
                 {selectedFile.name}
                 <Button onClick={() => {
                    setSelectedFiles(updatedFile(selectedFile.name))
                    setValue(name,[...updatedFile(selectedFile.name)])
                    }}>X</Button>
            </li>
        ))}
    </ul>}
        </>
  );
}

FileDropzone.propTypes = {
  accept: PropTypes.string,
  maxSize: PropTypes.number,
  multiple: PropTypes.bool,
  onDrop: PropTypes.func,
  children: PropTypes.node,
};

FileDropzone.defaultProps = {
  accept: '*',
  maxSize: Infinity,
  multiple: true,
};

export default FileDropzone;