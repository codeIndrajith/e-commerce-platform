import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlices.';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // this (login) called the backend and set the cookie
    login: builder.mutation({
      // Mutation -> user authenticate in post request
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
