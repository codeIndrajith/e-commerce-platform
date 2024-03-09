import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlices.';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      // Mutation -> user authenticate in post request
      query: (data) => ({
        url: USERS_URL / auth,
        method: 'POST',
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
