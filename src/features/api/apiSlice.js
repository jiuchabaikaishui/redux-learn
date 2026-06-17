import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: '/fakeApi'}),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        // getUsers: builder.query({
        //     query: () => '/users'
        // }), 
        getPosts: builder.query({
            query: () => '/posts',
            providesTags: (result = [], error, arg) => [
                    'Post',
                    ...result.map(({id}) => ({ type: 'Post', id}))
                ]
        }),
        getPost: builder.query({
            query: (postId) => `/posts/${postId}`,
            providesTags: (result, error, arg) => [{ type: 'Post', id: arg} ]
        }),
        addNewPost: builder.mutation({
            query: (initialPost) => ({
                url: '/posts',
                method: 'POST',
                body: initialPost
            }),
            invalidatesTags: ['Post']
        }),
        editPost: builder.mutation({
            query: post => ({
                url: `/posts/${post.id}`,
                method: 'PATCH',
                body: post
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id} ]
        }),
        addReaction: builder.mutation({
            query: ({postId, reaction}) => ({
                url: `posts/${postId}/reactions`,
                method: 'POST',
                body: { reaction }
            }),
            // invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.postId} ], 
            async onQueryStarted({postId, reaction}, lifecycleApi) {
                const getPostsPatchResult = lifecycleApi.dispatch(
                    apiSlice.util.updateQueryData('getPosts', undefined, draft => {
                        const post = draft.find(post => post.id === postId)
                        if (post) {
                            post.reactions[reaction]++
                        }
                    })
                )

                const getPostPatchResult = lifecycleApi.dispatch(
                    apiSlice.util.updateQueryData('getPost', undefined, draft => {
                        draft.reactions[reaction]++
                    })
                )

                try {
                    await lifecycleApi.queryFulfilled
                } catch {
                    getPostsPatchResult.undo()
                    getPostPatchResult.undo()
                }
            }
        })
    })
})

console.log('apiSlice: ', apiSlice);


export const { 
    // useGetUsersQuery, 
    useGetPostsQuery, 
    useGetPostQuery, 
    useAddNewPostMutation, 
    useEditPostMutation,
    useAddReactionMutation
} = apiSlice