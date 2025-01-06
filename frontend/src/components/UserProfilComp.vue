<!-- User profil edit -->
<template>
  <article
    class="card container text-light d-flex flex-direction-column align-items-center justify-content-center"
  >
    <div class="mb-3">
      <ProfilPictureComp></ProfilPictureComp>
    </div>
    <h2 class="text-uppercase text-dark fs-5">My account</h2>
    <div class="user-profile border-0 mb-3 mt-3">
      <h3 class="profil-username text-capitalize text-dark">
        {{ $store.getters["fullName"] }}
      </h3>

      <p class="text-capitalize text-dark" v-if="$store.state.user.description">
        {{ $store.state.user.description }}
      </p>
    </div>
    <!-- user update profil picture -->
    <div class="mb-3" aria-label="update profil picture">
      <label for="formFile" class="form-label text-left text-white"
        >Change your profile picture</label
      >
      <input
        class="form-control"
        type="file"
        aria-label="Chargez une image"
        @change="uploadProfilPicture"
        id="formFile"
      />
    </div>

    <!-- textarea to write a description -->
    <p class="text-white text-left">Describe yourself in one sentence</p>
    <form
      @submit.prevent="userProfil"
      style="text-align: left"
      aria-label="update user profile"
      autocomplete="off"
    >
      <div class="mb-3">
        <div class="form-floating" aria-label="update user profile">
          <textarea
            autocomplete="off"
            aria-label="update user profile"
            class="form-control text-left"
            placeholder="description"
            id="floatingTextarea"
            v-model="user.description"
          ></textarea>
          <label for="floatingTextarea">Description</label>
        </div>
      </div>

      <!-- button to delete account and submit the changes -->
      <div class="d-flex flex-column gap-3">
        <button
          role="button"
          title="Save changes"
          type="submit"
          class="btn button-type-1"
        >
          <fa icon="fa fa-paper-plane" class="me-2" alt="icon" />
          Submit changes
        </button>

        <button
          role="button"
          title="Delete user account"
          class="btn button-type-1"
          @click="deleteAccount()"
        >
          <fa icon="fa fa-trash-alt" class="me-2" alt="icon" />
          Delete account
        </button>
      </div>
      <p class="text-white text-small mt-3">{{ errorMessage }}</p>
    </form>

    <!-- button logout -->
    <button
      role="button"
      title="logout"
      class="btn button-type-2 mb-3"
      @click="logOut"
    >
      Log out
      <fa
        icon="fa fa-right-from-bracket"
        class="ms-4"
        alt="image d'une flèche de sortie"
      />
    </button>
  </article>
</template>

<script>
import axios from "axios";
import ProfilPictureComp from "./ProfilPictureComp.vue";
export default {
  components: { ProfilPictureComp },
  name: "UserProfileComp",
  data() {
    return {
      user: {
        picture: "",
        description: "",
      },
      errorMessage: "",
    };
  },
  created() {
    this.user.description = this.$store.state.user.description;
  },
  methods: {
    // choose profil picture
    uploadProfilPicture(event) {
      this.user.picture = event.target.files[0];
    },
    // send the picture and profil description with FormData
    userProfil() {
      if (!this.user.picture || !this.user.description) {
        this.errorMessage = "⚠️ Describe yourself and choose a picture!";
        return;
      }
      let formData = new FormData();
      formData.append("file", this.user.picture);
      formData.append("description", this.user.description);
      const token = localStorage.getItem("token");
      const id = this.$store.state.user._id;
      axios
        .put("auth/" + id, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);

          // aft r submit the data, remove the error message from the card
          this.errorMessage = "";
          // after submit the data, remove the text in the textarea
          this.user.description = "";
          this.user.picture = "";
          // ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
          this.$store.commit("UPDATE_USER", response.data);
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage = error.response.data.message
            ? error.response.data.message
            : error;
        });
    },

    // delete account
    deleteAccount() {
      const token = localStorage.getItem("token");
      const id = this.$store.state.user._id;
      if (confirm("⚠️ Are you sure you want to delete this account? ⚠️")) {
        axios
          .delete("auth/" + id, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            // deleteProfile comes from backend, it is an object, it is response
            // here "acknowledged" is a boolean, it means, if the deletion is accepted get all posts
            // deleteProfile is an object that contains "acknowledged" and "deletedCount" shows the quantity of deleted item
            if (response.data.deleteProfile.acknowledged) {
              this.$router.push({ path: "/" });
            }
            localStorage.clear();
          })
          .catch((error) => {
            console.log(error);
            this.errorMessage =
              "⛔️ Error! You can not delete this account, please try again later.";
          });
      }
    },

    // logOut function, remove token from localhost
    logOut() {
      localStorage.removeItem("token");
      this.$router.push({ path: "/" });
      // localStorage.clear()
      // this.$store.commit("SET_USER", null);
      // this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #fd2d01;
  opacity: 0.8;
  transition: all 0.3s;
  margin-top: 4rem;
}
.card:hover {
  opacity: 1;
}
.button-type-1 {
  background-color: #ffd7d7;
  color: #4e5166;
  border: 1px solid #4e5166;
}
.button-type-1:hover {
  border: 1px solid white !important;
}
.button-type-2 {
  background-color: #4e5166;
  color: #ffd7d7;
  border: 1px solid #ffd7d7;
}
.button-type-2:hover {
  border: 1px solid white !important;
}
.profil-username {
  font-weight: 700;
  font-size: medium;
  margin-top: 0.7rem;
}
.user-profile {
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  background-color: transparent;
  padding: 0 0.5rem 0 0.5rem;
  border-radius: 0.3rem;
}
</style>