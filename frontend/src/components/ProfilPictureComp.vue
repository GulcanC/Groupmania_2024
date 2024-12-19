<template>
  <div>
    <img v-if="$store.state.user.picture" :src="$store.state.user.picture" />
    <img v-else src="../assets/avatar.png" />
   
  </div>
</template>


