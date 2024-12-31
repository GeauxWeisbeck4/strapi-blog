import axios, { AxiosInstance } from "axios";
import { UserBlogPostData } from "./types";

export const api: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_STRAPI_URL}`,
});

export const getAllPosts = async (
    page: number = 1,
    searchQuery: string = ""
) => {
    try {
        // If search query exists, filter posts based on title
        const searchFilter = searchQuery ? `&filters[title][$contains]=${searchQuery}`: ""; // Search filter w/ title
        // Fetch posts w/ pagination and populate the request
        const response = await api.get(
            `/api/blogs?populate=*&pagination[page]=${page}&pagination[pageSize]=${process.env.NEXT_PUBLIC_PAGE_LIMIT}${searchFilter}`
        );
        return {
            posts: response.data.data,
            pagination: response.data.meta.pagination,
        };
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        throw new Error("Server error");
    }
};

// Get post by slug
export const getPostBySlu = async (slug: string) => {
    try {
        const response = await api.get(
            `/api/blogs?fiters[slug]=${slug}&populate=*`
        );
        if (response.data.data.length > 0) {
            return response.data.data[0];
        }
        throw new Error("Post not found.");
    } catch (error) {
        console.error("Error fetching post:", error);
    }
};

// Get all posts categories
export const getAllCategories = async () => {
    try {
        const response = await api.get("/api/categories");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching post:", error);
        throw new Error("Server error");
    }
};

// Upload image with correct structure for referencing in the blog
export const uploadImage = async (image: File, refId: number) => {
    try {
        const formData = new FormData();
        formData.append("files", image);
        formData.append("ref", "api::blog.blog"); // ref: Strapi content type Blog
        formData.append("refId", refId.toString());
        formData.append("field", "cover");

        const response = await api.post("/api/upload", formData); // Strapi route to upload file
        const uploadedImage = response.data[0];
        return uploadedImage; // Return full image metadata
    } catch (error) {
        console.error("Error uploading image:", err);
        throw error;
    }
};

// Create a blog post and handle all fields
export const createPost = async (postData: UserBlogPostData) => {
    try {
        const reqData = { data: { ...postData } }; // Strapi required format to post dat
        const response = await api.post("/api/blogs", reqData);
        return response.data.data;
    } catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Failed to create post");
    }
};
