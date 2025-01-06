<template>
  <article>
    <div>
      <figure aria-label="user info">
        <div>
          <img v-if="post.authorImg" :src="post.authorImg" />
          <img v-else src="../assets/avatar.png" />
        </div>
        <figcaption aria-label="user name">
          {{ post.userName }}
          <span>{{ timestamp }}</span>
        </figcaption>
      </figure>

      <div>
        <button
          role="button"
          type="button"
          v-if="post.userId == user.userId || user.admin == true"
          @click="showModal = true"
        >   OPEN MODEL</button>

        <ModalPostComp v-if="showModal" @closePostModal="showModal = false">
          <form @submit.prevent="UpdatePost">
            <div>
              <label for="formFile">Add or change img</label>

              <input
                accept="image/*"
                type="file"
                @change="uploadPicture"
                id="formFile"
              />
            </div>

            <div>
              <div>
                <p>Add message</p>
                <textarea
                  v-model="newPost.post"
                  id="floatingTextarea"
                ></textarea>
              </div>
            </div>

            <div>
              <button role="button" type="button" @click="deletePost()">
                delete post
              </button>

              <button role="button" type="submit">Save changes</button>
            </div>

            <p>{{ errorMessage }}</p>
          </form>
        </ModalPostComp>
      </div>
    </div>

    <div>
      <div v-if="post.imageUrl != null">
        <img :src="post.imageUrl" />
      </div>
    </div>

    <p>{{ post.post }}</p>

    <div>
      <div>
        <button type="button" role="button" @click="likePost()">
          <span>{{ post.likes }}</span>
         <p>LIKE</p>
        </button>
      </div>
    </div>
  </article>
</template>

<script>
import axios from "axios";
import ModalPostComp from "./ModalPostComp.vue";

export default {
  name: "UserPostComp",
  components: {
    ModalPostComp,
  },
  data() {
    return {
      publications: [],
      showModal: false,
      newPost: { post: "", image: "" },
      user: {
        admin: this.$store.state.user.admin,
        userId: this.$store.state.user._id,
      },
      timestamp: "",
      errorMessage: "",
    };
  },

  created() {
    setInterval(this.getDate, 1000);
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getDate() {
      const currentDate = new Date();
      const timeStamp =
        currentDate.getDate() +
        "/" +
        (currentDate.getMonth() + 1) +
        "/" +
        currentDate.getFullYear();
      this.timestamp = timeStamp;
    },

    uploadPicture(event) {
      this.newPost.image = event.target.files[0];
    },

    UpdatePost() {
      const token = localStorage.getItem("token");
      let formData = new FormData();
      formData.append("post", this.newPost.post);
      formData.append("id", this.post._id);

      if (this.newPost.image != "") {
        formData.append("file", this.newPost.image);
      }

      let id = this.post._id;
      axios
        .put(`publication/${id}`, formData, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$store.commit("UPDATE_POST", response.data.post);
          this.showModal = false;
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage = "⛔️ You cannot edit post";
        });
    },

    deletePost() {
      let id = this.post._id;
      const token = localStorage.getItem("token");
      axios
        .delete("publication/" + `${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          console.log(response.data);

          if (response.data.deleteUserPost.acknowledged) {
            this.$store.dispatch("getAllPosts");
          }
          this.showModal = false;
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage = "ERROORR"
        });
    },

    likePost() {
      const userId = this.$store.state.user._id;
      const postId = this.post._id;
      const likeData = {
        userId,
        postId,
        like: 1,
      };
      axios
        .post(`publication/${postId}/likeDislike/`, likeData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.$store.commit("LIKE_POST", response.data.updatedPost);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style></style>
