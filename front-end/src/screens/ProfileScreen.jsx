import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@material-tailwind/react';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    if (!userInfo.data) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    } else {
      setName(userInfo.data.name);
      setEmail(userInfo.data.email);
    }
  }, [userInfo, userInfo.email, userInfo.name]);

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password do not match');
    } else {
      try {
        const res = await updateProfile({
          name,
          email,
          password,
        });
        toast.success('Profile updated successfully');
        dispatch(setCredentials({ ...res })).unwrap();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="w-full h-screen">
      <div>
        <div>
          <h2>User Profile</h2>

          <form onSubmit={submitHandler}>
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="">Email</label>
            <input
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
