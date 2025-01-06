import { createStore } from "vuex";
import axios from "axios";

export default createStore({
    state: {
        user: {},
        posts: []
    },
    getters: {
        fullName: function (state) {
            return `${state.user.firstName} ${state.user.lastName}`
        }
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },

        SET_POST(state, posts) {
            state.posts = posts
        },

        CREATE_POST(state, newPost) {
            state.posts.unshift(newPost)
        },

        UPDATE_USER(state, updatedUser) {
            state.user.description = updatedUser.description;
            state.user.picture = updatedUser.picture
        },
        UPDATE_POST(state, updateMyPost) {
            state.posts.forEach((post) => {
                if (post._id === updateMyPost._id) {
                    post.post = updateMyPost.post;
                    post.imageUrl = updateMyPost.imageUrl;


                }
            })


        },
        LIKE_POST(state, updateMyPost) {
            state.posts.forEach((post) => {
                if (post._id == updateMyPost._id) {
                    post.likes = updateMyPost.likes;

                    console.log("UPDATE_POST.likes", updateMyPost.likes);
                    console.log("post.likes", post.likes)
                }
            })
        }
    },

    actions: {
        async getAllPosts(context) {
            try {
                const response = await axios.get("publication", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                });
                context.commit("SET_POST", response.data)
            } catch (error) {
                console.log(error)
            }
        }
    }
})