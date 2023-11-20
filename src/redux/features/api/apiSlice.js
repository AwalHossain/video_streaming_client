import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../../../helpers/axios/axiosBaseQuery'
import REACT_APP_API_URL from '../../../utils/apiUrl'

console.log(process.env.REACT_APP_BASE_URL, 'check')
export const apiSlice = createApi({
    name: 'api',
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({
        baseUrl: REACT_APP_API_URL,
    }),
    endpoints: (builder) => ({}),
    tagTypes: []
})