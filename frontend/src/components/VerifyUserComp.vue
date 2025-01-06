<template>
  <p></p>
</template>

<script>
import axios from "axios";

export default {
  name: "VerifyUserComp",
  created() {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .post("auth/verify", this.user, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.$store.commit("SET_USER", res.data);
          this.$router.push("/post");
        });
    } else if (!token) {
      this.$router.push("/");
    }
  },
};
</script>
