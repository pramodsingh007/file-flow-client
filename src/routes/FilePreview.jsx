import { ArrowLeftSquare, Copy, File } from "lucide-react";
import { useLoaderData, useNavigate} from "react-router-dom";
import { useRef, useState } from "react";

function FilePreview() {
  const [copiedText, setCopiedText] = useState();
  const [enablePassword, setEnablePassword] = useState(false);
  const [isPasswordSuccessulSet, setPasswordSuccessfullySet] = useState(false);
  const [isValidEmail,setIsValidEmail] = useState(false);
  const loaderData = useLoaderData();
  const navigate = useNavigate();
  const shortUrlRef = useRef();
  const emailRef = useRef();
  const enablePasswordRef = useRef();
  const passwordRef = useRef();
  const copyUrlHandler = () => {
    setCopiedText(shortUrlRef.current.value);
    navigator.clipboard.writeText(shortUrlRef.current.value);
  };

  const enablePasswordHandler = () => {
    setEnablePassword(!enablePassword);
  };

  const sendEmailHandler = () => {
    const email = emailRef.current.value
    fetch("https://file-flow.onrender.com/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...loaderData,senderEmail:email}),
    })
    .then(res=>res.json())
    .then(()=>{
      alert('email sent')
    })
    .catch(err=>console.log(err))
  };

  const onSavePasswordHandler = ()=>{   

        const password = passwordRef.current.value
        fetch('https://file-flow.onrender.com/set-password',{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({fileName:loaderData.fileName,password:password})
        })
        .then(res=>res.json())
        .then(()=>{
            setPasswordSuccessfullySet(true)
        })
        .catch(err=>console.log(err))
  }

  const validateEmailHandler = (e)=>{
    if(/\S+@\S+\.\S+/.test(e.target.value)){
      setIsValidEmail(true)
    }else{
      setIsValidEmail(false)
    }

  }
  return (
    <div className="flex w-full justify-center m-5">
      <div className=" max-w-[70rem] mt-8">
        <button
          onClick={() => {
            navigate("/dashboard/upload");
          }}
          className="flex gap-2"
        >
          <ArrowLeftSquare /> Go to Upload
        </button>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
          <div className=" border flex justify-center items-center">
            <div>
              {loaderData.fileType !== "image/png" ||
              loaderData.fileType !== "image/jpeg" ||
              loaderData.fileType !== "image/jpg" ? (
                <img
                  className="max-w-[200px] max-h-[200px]"
                  src={loaderData.fileURL}
                  alt="doc file"
                />
              ) : (
                <File width={100} height={100} />
              )}

              <div>
                <h1 className="font-semibold">{loaderData.fileName}</h1>
                <p>
                  {loaderData.fileType}{" "}
                  {(loaderData.fileSize / 1024 / 1024).toFixed(2)}MB
                </p>
              </div>
            </div>
          </div>
          <div className=" space-y-6">
            <div className=" ">
              <label
                htmlFor="shortUrl"
                className=" text-slate-500 font-semibold"
              >
                Short Url
              </label>
              <span className="flex rounded-md overflow-hidden border">
                {" "}
                <input
                  ref={shortUrlRef}
                  value={loaderData.shortURL}
                  placeholder="short url"
                  disabled
                  id="shortUrl"
                  className=" w-full h-[48px] p-1  bg-slate-100 focus:outline-none"
                  type="text"
                />
                <button onClick={copyUrlHandler} className="bg-slate-100 pr-2">
                  {" "}
                  <Copy />
                </button>
              </span>
              {copiedText && (
                <span className="text-sm text-green-500">
                  Text copied to clipboard
                </span>
              )}
            </div>
            <div className="">
              <div className=" flex items-center gap-2">
                <input
                  onChange={enablePasswordHandler}
                  ref={enablePasswordRef}
                  className="w-4 h-4"
                  type="checkbox"
                  name="enablePassword"
                />
                <label className="font-semibold " htmlFor="enablePassword">
                  Enable Password?
                </label>
              </div>
              {enablePassword&&<div className=" flex rounded-md overflow-hidden border">
                <input
                    ref={passwordRef}
                  placeholder="enter password"
                  className="  w-full h-[48px] p-1  bg-slate-100 focus:outline-none"
                  type="password"
                />
                <button  onClick={onSavePasswordHandler} className=" bg-primary text-white font-semibold px-6 ro">
                  Save
                </button>
                
              </div>}
              {isPasswordSuccessulSet&&<p className=" text-green-700">Password successfully set</p>}
            </div>
            <div className=" border p-4">
              <label
                className=" text-slate-500 font-semibold"
                htmlFor="sendToEmail"
              >
                Send File to Email
              </label>
              <input
                ref={emailRef}
                onChange={validateEmailHandler}
                placeholder="example@gmail.com"
                className="w-full h-[48px] p-1 rounded-md bg-slate-100 focus:outline-none"
                type="email"
              />
              <button
                disabled={!isValidEmail}
                onClick={sendEmailHandler}
                className="disabled:bg-slate-300 w-full bg-primary text-white font-semibold p-3 rounded-md mt-4"
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilePreview;
