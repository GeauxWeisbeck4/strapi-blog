"use client";
import { useEffect, useState } from "react";
import { getPostBySlug } from "../../../lib/api";
import { useRouter } from "next/navigation";
import { BlogPost } from "@/lib/types";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { FaClipboard } from "@/components/loader";
import moment from "moment";
import { toast } from "react-hot-toast";

const handleCopyCode = async (code: string) => {
    try {
        await navigator.clipboard.writeText(code);
        toast.success("Code copied to clipboard!");
    } catch (error) {
        console.error("Failed to copy code:", error);
    }
};

const BlogPostPage = ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchPost = async () => {
            if (slug) {
                try {
                    const fetchedPost = await getPostBySlug(slug);
                    setPost(fetchedPost);
                } catch (error) {
                    setError("Error fetching post.");
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchPost();
    }, [slug]);

    if (loading)
        return (
            <div className="max-w-screen-md mx-auto flex items-center justify-center">
                <Loader />
            </div>
        );
    if (error) return <p className="max-w-screen-md mx-auto">Error: {error}</p>;
    if (!post) return <p className="max-w-screen-md mx-auto">No post found.</p>;
    console.log(post);
    return (
        <div className="max-w-screen-md mx-auto p-4">
            h1.text-4xl.leading-[60px].capitalize.text-center.font-bold
            <h1 className="text-4xl leading-[60px] capitalize text-center font-bold text-purple-800 font-jet-brains">
                {post.title}
            </h1>
            <div className="w-full flex items-center justify-center font-light">
                Published: {moment(post.createdAt).fromNow()}
            </div>

            {/* Categories Section */}
            {post.categories && post.categories..length > 0 && (
                <div className="flex flex-wrap space-x-2 my-4">
                    {post.categories.map(({ name, documentId
                      <span
                        key={documentId}
                        className="border border border-purple-900"
                    }))}
                </div>
            )}

        </div>
    )
}
