<template>
  <div>
    <HeaderComp />

    <main>
      <h1>
        <HomeMsgComp>{{ message }}</HomeMsgComp>
      </h1>
    </main>
  </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";
import HomeMsgComp from "@/components/HomeMsgComp.vue";

export default {
  name: "HomePage",
  components: {
    HeaderComp,
    HomeMsgComp
  },
};
</script>
