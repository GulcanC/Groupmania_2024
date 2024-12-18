<template>
  <div>
    <HeaderComp />
    <div>
      <form
        @submit.prevent="login"
        method="post"
        aria-label="Sign in form"
        class="form-login"
      >
        <div>
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="xxx@xxx.xxx"
            autocomplete="off"
            v-model="user.email"
          />
        </div>
        <br />

        <div>
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Xx123;"
            autocomplete="off"
            v-model="user.password"
          />
        </div>

        <button role="button" class="btn-login" type="submit">Sign in</button>
        <p>{{ errorMessage }}</p>
      </form>
    </div>

    <div>
      <p>If you have not registered yet, click!</p>
      <router-link to="/signup">
        <p>Sign up &rarr;</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";
import axios from "axios";

export default {
  name: "SignInComp",
  components: { HeaderComp },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      if (this.user.email || this.user.password) {
        await axios
          .post("auth/login", this.user)
          .then((response) => {
            console.log(response);
            if (response.status == 200) {
              localStorage.setItem("token", response.data.token);
              this.$router.push("/post");
              this.$store.commit("SET_USER", response.data);
            }
          })
          .catch((error) => {
            if (error.response.status == 401) {
              this.errorMessage = error.response.data.errorMessage
                ? error.response.data.errorMessage
                : error;
            } else {
              this.errorMessage =
                "⛔️ We don't have access to the server at the moment, please try again later.";
            }
          });
      } else if (!this.user.email || !this.user.password) {
        this.errorMessage = "⛔️ Plesae fill in the fields!";
      }
    },
  },
};
</script>
