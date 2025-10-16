<script setup lang="ts">
  import "@/views/ProfilesView.vue"
</script>

<template>
  <main>
    <RouterView to="/profilesview"/>
  </main>
  
</template>

<style scoped>
  main {
    display: flex;
    justify-content: center;
    margin: 40px 0px;
    padding: 0px 40px;
    box-sizing: border-box;
  }
</style>
