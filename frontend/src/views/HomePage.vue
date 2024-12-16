<template>
  <div>
    <HeaderComp />

    <main class="home">
      <h1>
        <HomeMsgComp>{{ message }}</HomeMsgComp>
      </h1>
      <div class="connection p-4">
        <router-link to="/signup">
          <button type="button" class="btn-connection">
            Sign up
          </button></router-link
        >

        <router-link to="/login">
          <button type="button" class="btn-connection">
            Sign in
          </button></router-link
        >
      </div>
    </main>
    <footer><FooterComp /></footer>
  </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";
import HomeMsgComp from "@/components/HomeMsgComp.vue";
import FooterComp from "@/components/FooterComp.vue";

export default {
  name: "HomePage",
  components: {
    HeaderComp,
    HomeMsgComp,
    FooterComp,
  },
};
</script>

<style scoped>
.connection {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    margin-top: 15rem;
    gap: 4rem;
    background-color: #fd2d01;
    width: 25rem;
    height:10rem;
    margin: 10rem auto;
    border-radius: 0.3rem;
    opacity: 0.8;
    box-shadow: 0.8 1.5rem 3rem rgba(black, 0.5);
    z-index: 10;
    transition: all 0.4s;
    outline-offset: 1rem;
}
.connection:hover {
    opacity: 1;
    transform: scale(1.05);
    z-index: 15;
}
.btn-connection {
    background-color: #ffd7d7;
    border:none;
    width: 8rem;
    padding: 0.5rem;
    font-weight: bold;
    font-size:1.2rem;
    background-size: 220%;
    transition: all 0.4s;
}
.btn-connection:hover, .btn-connection:active {
    background-position: 100%;
    color: #fd2d01
}


</style>