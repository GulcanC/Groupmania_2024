<template>
  <main>
    <div>
      <img src="../assets/hello.jpg" alt="" />
      <h5>
        Hello
        <b>{{ $store.getters["fullName"] }}</b>
      </h5>
    </div>

    <div>
      <section><UserProfilComp /></section>
            <section>
   <UserNewPostComp />

            </section>
   
      <UserPostComp
        v-for="post in $store.state.posts"
        :key="post._id"
        :post="post"
      />
    </div>
  </main>
</template>

<script>

import UserPostComp from "@/components/UserPostComp.vue";
import UserNewPostComp from "@/components/UserNewPostComp.vue";
import UserProfilComp from "@/components/UserProfilComp.vue";

export default {
  name: "PostPage",
  components: {
 
    UserPostComp,
    UserNewPostComp,
    UserProfilComp,
  },

  async created() {
    if (this.$store.state.user) {
      this.$store.dispatch("getAllPosts");
      if (!this.$store.state.posts || this.$store.state.posts.length === 0) {
        console.log('error')
      }
    } else {
      this.$router.push("/login");
    }
  },
};




</script>

<style scoped>
img {
  width: 10%;
  height: 10%;
}
</style>
