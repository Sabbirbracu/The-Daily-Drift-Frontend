import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../features/auth/Api";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    // Get all categories (public)
    getCategories: builder.query({
      query: () => "/categories",
      providesTags: ["Category"],
    }),

    // Create new category (admin only)
    createCategory: builder.mutation({
      query: (categoryData) => ({
        url: "/categories",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["Category"],
    }),

    // Update category by ID (admin only)
    updateCategory: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Category"],
    }),

    // Delete category by ID (admin only)
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
