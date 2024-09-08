import { configureStore } from "@reduxjs/toolkit";
// import { usersReducer } from "./slices/usersSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from './api/userApi';

const store = configureStore({
    reducer: {
        // albums : albumsApi.reducer
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(userApi.middleware)
    },
});

setupListeners(store.dispatch);

// Step 5
export {
    useGetAllUsersQuery,
    useAddUserMutation,
    useDeleteUserMutation,
    useEditUserMutation,
    useGetSingleUserQuery
} from "./api/userApi";

export { store };