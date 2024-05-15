import React from "react";
import { signoutUserFailure, signoutUserStart, signoutUserSuccess } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";

const SignOut = () => {

    const dispatch = useDispatch()
const handleSignout = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch("/api/auth/signout/");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }

      dispatch(signoutUserSuccess(data));
    } catch (error) {
      dispatch(signoutUserFailure(error.message));
    }
  };
  return (
    <div>
      <span
        onClick={handleSignout}
        className=" cursor-pointer font-bold text-purple-500"
      >
        Log Out <LogoutIcon />{" "}
      </span>
    </div>
  );
};

export default SignOut;
