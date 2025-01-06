<!-- create a new post -->
<template>
  <article class="card post-card mb-4">
    <form
      @submit.prevent="createPost"
      class="form-post p-2 d-flex flex-column"
      name="myForm"
      id="myForm"
      aria-label="form for creating new post"
    >
      <div class="d-flex flex-column">
        <div class="m-auto">
          <ProfilPictureComp></ProfilPictureComp>
        </div>

        <!-- input to upload an image -->
        <div class="mb-3">
          <label for="formFile" class="form-label mt-3">Add an image</label>
          <!-- This input will allow the user to open the browser file selection dialog and select one or more files -->
          <!-- The key acts as a sort of flag that tells Vue "if the data associated with this child component is moved somewhere else, then move the component along with it to preserve the changes that already exist".-->
          <input
            :key="profilPictureInputKey"
            @change="uploadPicture"
            name="file"
            accept="image/*"
            class="form-control"
            type="file"
            id="formFile"
          />
        </div>

        <!-- textarea for writing your post -->
        <div class="">
          <label class="new-post m-2" for="postContent">Create your post</label>
          <div>
            <textarea
              name="post"
              id="floatingTextarea"
              rows="2"
              placeholder="Create your post"
              class="form-control text-left"
              v-model="post"
            ></textarea>

            <!-- If the fields are empties show an error message -->
            <p class="err-msg">{{ errorMessage }}</p>
            <button role="button" type="submit" class="btn-post text-dark">
              <fa icon="fa fa-paper-plane" />
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  </article>
</template>

<script>
import axios from "axios";
import ProfilPictureComp from "./ProfilPictureComp.vue";
export default {
  components: { ProfilPictureComp },
  name: "UserNewPostComp",
  data() {
    return {
      post: "",
      file: "",
      errorMessage: null,
      profilPictureInputKey: 0,
    };
  },
  methods: {
    uploadPicture(event) {
      this.file = event.target.files[0];
    },
    createPost() {
      // if the post text or image is empty show an error message
      if (!this.post || !this.file) {
        this.errorMessage = "⛔️ Write your message and choose a picture!";
        return;
      }
      // Create an object formData which contains the data that will be posted
      let formData = new FormData();
      formData.append("post", this.post);
      formData.append("file", this.file);
      formData.append("userId", this.$store.state.user._id);
      formData.append("authorImg", this.$store.state.user.picture);
      formData.append("userName", this.$store.getters["fullName"]);
      // use axios to send formData, http://localhost:3000/api/publication
      axios
        .post("publication", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            this.$store.commit("CREATE_POST", response.data.post);
            this.post = "";
            this.errorMessage = "";
            this.profilPictureInputKey++;
            // this.$emit("postCree", true);
          }
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage = error.response.data.message
            ? error.response.data.message
            : error;
        });
    },
  },
};
</script>

<style scoped>
.card {
  margin: auto;
  margin-top: 4rem;
  background-color: #fd2d01;
  color: white;
  opacity: 0.8;
  transition: all 0.3s;
}
.card:hover {
  opacity: 1;
}

.btn-post {
  border-radius: 0.3rem;
  transition: all 300ms ease-in-out;
  border: none;
  color: white;
}
.btn-post:hover {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .new-post {
    margin-top: 15px;
    margin-bottom: 20px;
  }
  .mb-5 {
    margin-top: 1rem;
    margin-bottom: 2rem !important;
  }
}
</style>
@media (max-width: 768px) { .picture-user-container { width: 5rem !important;
height: 5rem !important; } .picture-user-profile { height: 6rem; width: 6rem; }
}