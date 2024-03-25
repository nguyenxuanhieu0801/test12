import { defineStore } from "pinia";
import { ref } from "vue";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const usePostStore = defineStore("postStore", () => {
  const posts = ref<Post[]>([]);
  const post = ref<Post | null>(null);

  async function fetchPosts() {
    try {
      const response = await $fetch<Post[]>(
        "https://jsonplaceholder.typicode.com/posts"
      );
      posts.value = response;
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  }

  async function fetchPost(id: number) {
    try {
      const response = await $fetch<Post>(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      post.value = response;
    } catch (error) {
      console.error("Failed to fetch post", error);
    }
  }

  async function createPost(newPost: Post) {
    try {
      const response = await $fetch<Post>(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: newPost,
        }
      );
      posts.value.push(response);
    } catch (error) {
      console.error("Failed to create post", error);
    }
  }

  async function updatePost(updatedPost: Post) {
    try {
      const response = await $fetch<Post>(
        `https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`,
        {
          method: "PUT",
          body: updatedPost,
        }
      );
      const index = posts.value.findIndex((p) => p.id === updatedPost.id);
      if (index !== -1) {
        posts.value.splice(index, 1, response);
      }
    } catch (error) {
      console.error("Failed to update post", error);
    }
  }

  async function deletePost(id: number) {
    try {
      await $fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      });
      posts.value = posts.value.filter((p) => p.id !== id);
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  }

  return {
    posts,
    post,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
  };
});
