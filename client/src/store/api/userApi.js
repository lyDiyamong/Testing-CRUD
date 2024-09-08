import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const dotenv = require("dotenv");

// const PORT = import.meta.env.PORT;


const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:3003/api/v1/`,
    }),
    tagTypes: ["User"], // Declare tag types that will be used in the API
    endpoints(builder) {
        return {
            getAllUsers: builder.query({
                providesTags: (results) => {
                    // Ensure results is an array before mapping
                    if (results && Array.isArray(results)) {
                        return [
                            ...results.map((user) => ({
                                type: "User",
                                id: user.id,
                            })),
                            { type: "User", id: "LIST" }, // Tag for the entire list
                        ];
                    } else {
                        return [{ type: "User", id: "LIST" }]; // Tag for the entire list
                    }
                },
                query: () => "users",
            }),

            addUser: builder.mutation({
                invalidatesTags: [{ type: "User", id: "LIST" }], // Invalidate list tag
                query: (user) => ({
                    url: "users",
                    method: "POST",
                    body: user,
                }),
            }),

            deleteUser: builder.mutation({
                invalidatesTags: (result, error, { id }) => [
                    { type: "User", id },
                    { type: "User", id: "LIST" },
                ],
                query: ({ id }) => ({
                    url: `users/${id}`,
                    method: "DELETE",
                }),
            }),

            editUser: builder.mutation({
                invalidatesTags: (result, error, { id }) => [
                    { type: "User", id },
                    { type: "User", id: "LIST" },
                ],
                query: ({ id, ...updatedFields }) => ({
                    url: `users/${id}`,
                    method: "PATCH",
                    body: updatedFields,
                }),
            }),

            getSingleUser: builder.query({
                providesTags: (result) =>
                    result ? [{ type: "User", id: result.id }] : [],
                query: ({ id }) => ({
                    url: `users/${id}`,
                    method: "GET",
                }),
            }),
        };
    },
});

export const {
    useGetAllUsersQuery,
    useAddUserMutation,
    useDeleteUserMutation,
    useGetSingleUserQuery,
    useEditUserMutation,
} = userApi;
export { userApi };
