import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../firebase";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

const UpdateProfile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  console.log(formData);
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
      "state_changed",
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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div>
      <Header />
      <div className=" p-20">
        <div className=" mb-5 sm:mb-8 ">
          <h1 className="text-3xl font-semibold">Personal details</h1>
          <p className=" text-xl">
            Add your personal details as you would like to appear on your
            profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} action="">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            accept="image/*"
            hidden
          />
          <img
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            className=" h-36 w-36 border-4 border-double border-slate-200 rounded-full"
          />
          <p>
            {fileUploadError ? (
              <span>Error image upload( image must be less than 2 mb)</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span>{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span>Image successfully uploaded!</span>
            ) : (
              ""
            )}
          </p>

          <button onClick={() => fileRef.current.click()}>Change Photo</button>
          <input
            type="text"
            defaultValue={currentUser.username}
            placeholder="Username"
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            defaultValue={currentUser.email}
            placeholder="Email"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
          />
          <button>Update</button>
        </form>
        <div>
          <span>Delete account</span>
          <span>Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
