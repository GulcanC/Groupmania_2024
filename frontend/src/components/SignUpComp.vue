<template>
  <div>
    <HeaderComp />
    <div class="login">
      <form
        @submit.prevent="signup"
        @input="signup"
        method="post"
        aria-label="Signup Form"
        class="form-login"
      >
        <div class="form-group">
          <label for="firstname">First name</label>
          <input
            type="text"
            id="firstname"
            class="form-control"
            placeholder="First name"
            autocomplete="off"
            v-model="user.firstName"
          />
        </div>
        <br />

        <div class="form-group">
          <label for="lastname">Last name</label>
          <input
            type="text"
            id="lastname"
            class="form-control"
            placeholder="Last name"
            autocomplete="off"
            v-model="user.lastName"
          />
        </div>
        <br />

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            class="form-control"
            placeholder="Email"
            autocomplete="off"
            v-model="user.email"
          />
        </div>
        <br />

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            class="form-control"
            placeholder="Xx123;"
            autocomplete="off"
            v-model="user.password"
          />
        </div>
        <br />

        <div class="form-group">
          <label for="password">Confirm your password</label>
          <input
            type="password"
            id="confirm-password"
            class="form-control"
            placeholder="Confirm password"
            autocomplete="off"
            v-model="user.passwordConfirm"
          />
        </div>
        <br />

        <button role="button" class="btn-login" type="submit">Sign up</button>
        <div class="error-message" v-if="errors.length">
          <p><b>Please check the errors to sign up!</b></p>
          <ul>
            <li v-for="error in errors" :key="error.message">{{ error }}</li>
          </ul>
        </div>
      </form>
    </div>
    <div class="go-to-login">
      <p class="text-center">Already have an account ?</p>
      <router-link to="/login" class="go-to-login-button">
        <p class="text-center">Sign in &rarr;</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HeaderComp from "@/components/HeaderComp.vue";
export default {
  name: "SignUpComp",
  components: { HeaderComp },
  data() {
    return {
      user: {
        firstName: "",
      },
      errors: [],
    };
  },
  methods: {
    async signup() {
      // var regExText = new RegExp(/^[a-zA-Z\s\'\-]{2,10}$/);
      var regExText = new RegExp(/^[a-zA-Z0-9!@#$&()-`.+,éüäöüÄÖÜß/"]{3,10}$/);
      var regExEmail = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
      var regExPassword = new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6}$/
      );
      this.errors = [];
      // first name
      if (regExText.test(this.user.firstName) === false) {
        this.errors.push("❗️Provide a valid name!");
      } else if (regExText.test(this.user.firstName)) {
        this.errors.push("✅ First name is valid!");
      }

      // last name
      if (regExText.test(this.user.lastName) === false) {
        this.errors.push("❗️Provide a valid last name!");
      } else if (regExText.test(this.user.lastName)) {
        this.errors.push("✅ Last name is valid!");
      }

      // email
      if (regExEmail.test(this.user.email) === true) {
        this.errors.push("✅ Email is valid!");
      } else {
        this.errors.push("❗️Email is not valid!");
      }

      // password
      if (regExPassword.test(this.user.password) === true) {
        this.errors.push("✅ Password is valid!");
      } else {
        this.errors.push("❗️Password is not valid!");
      }

      
      // password confirmation
      if (regExPassword.test(this.user.passwordConfirm) === true) {
        this.errors.push("✅ Password is confirmed!");
      } else {
        this.errors.push("❗️Password is not confirmed!");
      }


      if (
        this.user.firstName &&
        regExText.test(this.user.firstName) &&
        this.user.lastName &&
        regExText.test(this.user.lastName) &&
        this.user.email &&
        regExEmail.test(this.user.email) &&
        this.user.password &&
        regExPassword.test(this.user.password)
        && this.user.passwordConfirm
        &&
        regExPassword.test(this.user.passwordConfirm)
      ) {
        await axios
          .post("auth/signup", this.user)
          .then((response) => {
            console.log(response);
            this.$router.push("/login");
          })
          .catch((error) => {
            console.log(error);
            this.errorMessage =
              "⛔️ We do not have access to the server at the moment, please try again later.";
          });
      }
    },
  },
};
</script>
