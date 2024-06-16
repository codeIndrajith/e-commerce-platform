import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@material-tailwind/react';
import { FaTimesCircle } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';
import { useProfileMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { DotLoader } from 'react-spinners';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  const { data: myOrders, isLoading, error } = useGetMyOrdersQuery();

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
        {/* one column */}
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

        {/* two column */}
        <div>
          <h2>My Orders</h2>
          {isLoading ? (
            <DotLoader className="fixed left-1/2" color="#36d7b7" size={100} />
          ) : error ? (
            <Alert color="blue">{error?.data?.message || error.error}</Alert>
          ) : (
            <table>
              <th>
                <td>ID</td>
                <td>DATE</td>
                <td>TOTAL</td>
                <td>PAID</td>
                <td>DELIVERED</td>
              </th>

              <tbody>
                {myOrders?.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt | <FaCheckCircle />
                      ) : (
                        <span>
                          Not Paid | <FaTimesCircle />{' '}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
