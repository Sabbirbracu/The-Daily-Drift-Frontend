import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL + "/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Attempt to get new token
    const refreshResult = await baseQuery(
      "/auth/refresh-token",
      api,
      extraOptions
    );

    if (refreshResult?.data?.accessToken) {
      localStorage.setItem("accessToken", refreshResult.data.accessToken);

      // Retry original request with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
        // Failed to refresh, force logout
        localStorage.removeItem("accessToken");
        window.location.href = "/";
    }
  }

  return result;
};

export default baseQueryWithReauth;
