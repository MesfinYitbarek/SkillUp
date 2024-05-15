import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import { useSelector } from "react-redux";
import { useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
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
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import Footer from "../Common/Footer";
import SignOut from "./SignOut";

const UpdateProfile = () => {
  const fileRef = useRef(null);
  const { loading, currentUser } = useSelector((state) => state.user);
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

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className=" bg-slate-50">
      <Header />
      <div className=" sm:p-20 p-10 py-12">
        <div className=" mb-5 sm:mb-10 gap-5 flex flex-col ">
          <h1 className="sm:text-3xl  text-2xl font-semibold text-sky-700">
            Personal details
          </h1>
          <p className=" sm:text-xl font-mono opacity-70">
            Add your personal details as you would like to appear on your
            profile.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="  sm:flex sm:flex-row justify-between flex flex-col gap-12  sm:mb-0 mb-12 items-center lg:ml-32"
          action=""
        >
          <div className=" bg-white mb-2 shadow-md flex flex-col items-center rounded-lg p-10 ">
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
              className=" mb-4 h-36 w-36 border-4 border-double border-slate-200 rounded-full"
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

            <button
              onClick={() => fileRef.current.click()}
              className=" bg-blue-600 p-1 px-3 rounded-md hover:bg-white hover:border hover:border-blue-600 font-semibold hover:text-blue-600  text-white"
            >
              Change Photo
            </button>
            <div className=" mt-4 flex flex-col gap-3">
              <button
                onClick={handleDeleteUser}
                className=" bg-white-600 p-1 px-3 rounded-md border border-blue-600 hover:bg-blue-700 hover:text-white max-w-44  font-semibold  text-blue-600"
              >
                <DeleteIcon /> Delete account{" "}
              </button>
              <SignOut />
            </div>
          </div>

          <div className=" flex flex-col gap-5 lg:w-[500px] bg-blue-100 border border-blue-500 rounded-lg p-8">
            <input
              type="text"
              defaultValue={currentUser.username}
              placeholder="Username"
              id="username"
              onChange={handleChange}
              className=" focus:outline-none border text-blue-600 rounded-md border-blue-600 p-1.5 px-4"
            />
            <input
              type="email"
              defaultValue={currentUser.email}
              placeholder="Email"
              id="email"
              onChange={handleChange}
              className=" focus:outline-none  border text-blue-600 rounded-md border-blue-600 p-1.5 px-4"
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
              className=" focus:outline-none  border text-blue-600 rounded-md border-blue-600 p-1.5 px-4"
            />
            <button
              disabled={loading}
              onClick={handleSubmit}
              type="submit"
              className=" bg-blue-600 p-1 px-3 rounded-md hover:bg-blue-700   font-semibold  text-white"
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateProfile;
