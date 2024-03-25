import { defineStore } from "pinia";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const usePostStore = defineStore("postStore", {
  state: () => ({
    posts: [] as Post[],
    post: null as Post | null,
  }),
  actions: {
    async fetchPosts() {
      try {
        const response = await $fetch<Post[]>(
          "https://jsonplaceholder.typicode.com/posts"
        );
        this.posts = response;
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    },

    async fetchPost(id: number) {
      try {
        const response = await $fetch<Post>(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        this.post = response;
      } catch (error) {
        console.error("Failed to fetch post", error);
      }
    },

    async createPost(post: Post) {
      try {
        const response = await $fetch<Post>(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "POST",
            body: post,
          }
        );
        this.posts.unshift(response);
      } catch (error) {
        console.error("Failed to create post", error);
      }
    },
    async updatePost(post: Post) {
      try {
        const response = await $fetch<Post>(
          `https://jsonplaceholder.typicode.com/posts/${post.id}`,
          {
            method: "PUT",
            body: post,
          }
        );
        const index = this.posts.findIndex((p) => p.id === post.id);
        if (index !== -1) {
          this.posts.splice(index, 1, response);
        }
      } catch (error) {
        console.error("Failed to update post", error);
      }
    },
    async deletePost(id: number) {
      try {
        await $fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          method: "DELETE",
        });
        this.posts = this.posts.filter((p) => p.id !== id);
      } catch (error) {
        console.error("Failed to delete post", error);
      }
    },
  },
});
