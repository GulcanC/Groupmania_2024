<template>
  <div class="home">
    <h1>Welcome to your new business social network!</h1>
  </div>
</template>

<script>
export default {
  name: "HomeMsgComp",
  props: {
    message: String,
  },
};
</script>

<style>
.home h1 {
  display: inline-block;
  background-image: linear-gradient(to right, #fd2d01, #4e5166);
  font-weight: bold;
  background-clip: text;
  -ms-background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  color: transparent;
  letter-spacing: 0.2rem;
  transition: all 0.2s;
  margin: 0 1rem 0 1rem;
}

@media (max-width: 992px) {
    h1 {
        display: inline-block;
        text-align: center;
        font-size: 1.2rem;
    }
}

@media (max-width: 400px) {
    h1 {
        margin-left: 1.8rem;
        text-align:left;
    }
}
</style>
