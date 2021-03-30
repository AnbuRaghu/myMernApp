import axios from "axios";
const API = axios.create({ baseUrl: "http://localhost:5000" });

//our backend mauth middleware can't work without this
//this is a function gonna happen at each one of our request
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
  //with this our backend geta specific headers
});

export const fetchPosts = () => API.get("/posts"); //payload
export const createPost = (newPost) => API.post("/posts", newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signin = (FormData) => API.post("/users/signin", FormData);
export const signup = (FormData) => API.post("/users/signup", FormData);
