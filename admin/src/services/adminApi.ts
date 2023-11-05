import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store/store'
import { isServerForService } from '../utils/server'
import { HYDRATE } from 'next-redux-wrapper'
import { INote } from '../types/note'
import { ISeo } from '../types/seo'

export const adminApi = createApi({
  reducerPath: 'adminApi', // name api
  tagTypes: [
    'Notes',
    'Seo'
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: isServerForService + '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (build) => ({
    // auth
    loginUser: build.mutation<any, unknown>({
      query: (data) => ({
        method: 'POST',
        url: '/login',
        body: data,
      }),
    }),
    getUser: build.query<any, unknown>({
      query: () => ({
        url: '/user',
      }),
    }),
    ParsingOneMsk: build.mutation<any, any>({
      query: () => ({
        method: 'POST',
        url: '/rating-msk-1',
      }),
    }),
    ParsingTwoMsk: build.mutation<any, any>({
      query: () => ({
        method: 'POST',
        url: '/rating-msk-2',
      }),
    }),
    ParsingThreeMsk: build.mutation<any, any>({
      query: () => ({
        method: 'POST',
        url: '/rating-msk-3',
      }),
    }),
    ParsingFourMsk: build.mutation<any, any>({
      query: () => ({
        method: 'POST',
        url: '/rating-msk-4',
      }),
    }),
    ParsingFiveMsk: build.mutation<any, any>({
      query: () => ({
        method: 'POST',
        url: '/rating-msk-5',
      }),
    }),
    ParsingSixMsk: build.mutation<any, any>({
      query: () => ({
        method: 'POST',
        url: '/rating-msk-6',
      }),
    }),
    // get all notes
    getAllNotes: build.query<INote, any>({
      query: () => ({
        url: '/note',
      }),
      providesTags: (result) =>
        [{ type: 'Notes', id: 'LIST' }],
    }),
    // create note
    createNote: build.mutation<INote, any>({
      query: (data) => ({
        method: 'POST',
        url: '/note',
        body: data,
      }),
      invalidatesTags: [{ type: 'Notes', id: 'LIST' }],
    }),
    // delete note
    deleteNote: build.mutation<any, any>({
      query: (id) => ({
        method: 'DELETE',
        url: `/note/${id}`,
      }),
      invalidatesTags: [{ type: 'Notes', id: 'LIST' }],
    }),
    // delete note
    updateNote: build.mutation<INote, any>({
      query: ({ id, data }) => ({
        method: 'PUT',
        url: `/note/${id}`,
        body: data,
      }),
      invalidatesTags: [{ type: 'Notes', id: 'LIST' }],
    }),
    getAllSeo: build.query<ISeo, any>({
      query: () => ({
        url: '/seo',
      }),
      providesTags: (result) => [{ type: 'Seo', id: 'LIST' }],
    }),
    // delete note
    updateSeo: build.mutation<ISeo, any>({
      query: ({id, data}) => ({
        method: 'PUT',
        url: `/seo/${id}`,
        body: data,
      }),
      invalidatesTags: [{ type: 'Seo', id: 'LIST' }],
    }),
  }),
})

// export hook

export const {
  // user method
  useLoginUserMutation,
  useGetUserQuery,
  useParsingOneMskMutation,
  useParsingTwoMskMutation,
  useParsingThreeMskMutation,
  useParsingFourMskMutation,
  useParsingFiveMskMutation,
  useParsingSixMskMutation,
  useGetAllNotesQuery,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
  useGetAllSeoQuery,
  useUpdateSeoMutation
} = adminApi
