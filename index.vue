<script setup lang="ts">
import { usePostStore, type Post } from "@/stores/postStore";

const postStore = usePostStore();

// Fetch posts
onMounted(async () => {
  await postStore.fetchPosts();
});

// Create post
const createPost = async () => {
  const newPost: Post = {
    id: 0, // ID sẽ được tự động sinh bởi server
    title: "New Post",
    body: "This is a new post",
    userId: 1,
  };
  await postStore.createPost(newPost);
};

// Update post
const updatePost = async (post: Post) => {
  const updatedPost = { ...post, title: "Updated Post" };
  await postStore.updatePost(updatedPost);
};

// Delete post
const deletePost = async (id: number) => {
  await postStore.deletePost(id);
};
</script>

vue Copy
<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <v-btn color="success" @click="createPost">Create Post</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2 class="text-h4 mb-4">Posts</h2>
        <v-list>
          <v-list-item v-for="post in postStore.posts" :key="post.id">
            <v-list-item-content>
              <v-list-item-title>{{ post.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ post.body }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn color="primary" @click="updatePost(post)">Update</v-btn>
              <v-btn color="error" @click="deletePost(post.id)">Delete</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>
