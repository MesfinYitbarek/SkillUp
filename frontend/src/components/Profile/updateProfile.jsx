import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from '../../../firebase'
const UpdateProfile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  

  useEffect(() => {
    if (file) {
      hanadleFileUpload(file);
    }
  }, [file]);

  const hanadleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state.changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURl) =>
          setFormData({ ...formData, avatar: downloadURl })
        );
      }
    );
  };
  return (
    <div>
      <h1>Profile</h1>
      <form action="">
        <img src={ formData.avatar || currentUser.avatar} alt="profile" />
        <p>
            {
                fileUploadError ? (
                    <span>
                        Error image upload( image must be less than 2 mb)
                    </span>
                ) : filePerc > 0 && filePerc < 100 ? (
                    <span>{`Uploading ${filePerc}%`}</span>
                ) : filePerc === 100 ? (
                    <span>Image successfully uploaded!</span>
                ) : (
                    ''
                )
            }
        </p>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
         
          accept="image/*"
        />
        <button onClick={() => fileRef.current.click()}>Change Photo</button>
        <input type="text" placeholder="Username" id="username" />
        <input type="email" placeholder="Email" id="email" />
        <input type="text" placeholder="Password" id="password" />
        <button>Update</button>
      </form>
      <div>
        <span>Delete account</span>
        <span>Log Out</span>
      </div>
    </div>
  );
};

export default UpdateProfile;
