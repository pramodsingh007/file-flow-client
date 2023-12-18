import { useState } from "react";
import FileInput from "../components/FileInput";
import AlertMsg from "../components/AlertMsg";
import FilePreview from "../components/FilePreview";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase/firebaseConfig";
import cryptoRandomString from 'crypto-random-string';
import ProgressBar from "../components/ProgressBar";
import SuccessModel from '../components/SuccessModel';
import { useUser } from "@clerk/clerk-react";



function Upload() {
  const [isFile, setFile] = useState(null);
  const [isError, setIsError] = useState(null);
  const [progress,setProgress] = useState(null);
  const user = useUser()
 

  const uploadFile = (file) => {
    setProgress(null)
    if (file?.size > 5000000) {
      setIsError(" file can not be bigger then 5 mb.");
      return;
    }
    setFile(file);
    setIsError(false)
  };

  const uploadClickHandler =  ()=>{
    
    const storage = getStorage(app);
    
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: isFile.type
    };
    
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'files/' +cryptoRandomString({length:20}) );
    const uploadTask = uploadBytesResumable(storageRef, isFile, metadata);
    
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress)

        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
    
          // ...
    
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const genratedId = cryptoRandomString({length:10}).toString()
          const data = {
            fileName:genratedId,
            fileSize:isFile.size,
            fileType:isFile.type,
            fileURL:downloadURL,
            userName:user.user.fullName,
            userEmail:user.user.primaryEmailAddress.emailAddress,
            shortURL:window.location.origin+'/file/'+genratedId,
            password:''
          }
          fetch('https://file-flow.onrender.com/upload-file',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
          })
          .then(data=>data.json())
          .then(d=>console.log(d))
          .catch(err=>console.log(err))
        });
      }
    );
  }
  return (
    <div className=" w-full flex justify-center">
      <div className=" max-w-[50rem]">
      <h1 className="  text-center mt-12 text-2xl sm:text-4xl lg:text-5xl">
        Start <strong className=" text-primary">Uploading</strong> File and{" "}
        <strong className=" text-primary">Share</strong> it
      </h1>
      <div className="flex justify-center mt-12 ">
        <FileInput uploadFileHandler={uploadFile} />
      </div>

      <div className="flex justify-center">
        <div>
          {isError && <AlertMsg msg={isError} />}
          {isFile && !isError && (
            <FilePreview
              removeHandler={() => {
                setFile(null);
                setProgress(null)
              }}
              file={isFile}
            />
          )}
        </div>
      </div>

      <div className= {`flex justify-center mt-8 ${progress?'hidden':'flex'}`}>
        <button
          onClick={uploadClickHandler}
          disabled={!isFile}
          className=" bg-primary disabled:bg-slate-400  rounded-full p-5 px-12 text-white font-semibold"
        >
          Upload
        </button>
      </div>
      <div className="flex w-full mt-4 justify-center">
      {progress&&<ProgressBar progress={progress}/>}
      </div>
      </div>

      {progress==100&&<SuccessModel/>}
    </div>
  );
}

export default Upload;
