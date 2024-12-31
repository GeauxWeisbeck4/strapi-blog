// Export Interface for Image Data
export interface ImageData {
    url: string;
}

// Export Interface for Author
export interface Author {
    id: number;
    name: string;
    email: string;
    avatar: ImageData;
}

// Export Interface for Categories
export interface Category {
    documentId: string;
    name: string;
    description: string;
    content: string;
    createdAt: string;
    cover: ImageData;
    author: Author;
    categories: Category[];
}

export interface UserBlogPostData {
    title: string;
    slug: string;
    description: string;
    content: string;
}

// Example response structure
export interface BlogPostResponse {
    data: BlogPost[];
}

// Example response
export interface SingleBlogPostResponse {
    data: BlogPost;
}
