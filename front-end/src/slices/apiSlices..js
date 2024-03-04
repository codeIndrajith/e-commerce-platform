// Remember the api slices is a parent of other apis

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // fetchBaseQuery allow to make request to api
import { BASE_URL } from '../constants.js';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// we need to add apiSlice because asynchronans request handle

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'User', 'Order'], // <- the tagTypes is a what are these fetch from back end
  endpoints: (builder) => ({}),
});
