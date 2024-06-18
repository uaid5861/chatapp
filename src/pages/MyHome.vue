<template>
   <div class="container">
      <ChatNavbar />
      <router-view></router-view>
    </div>
</template>

<script setup>
import ChatNavbar from '@/components/ChatNavbar.vue'
</script>

<style lang="scss" scoped>
.container {
  width: 1400px;
    height: 800px;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 80px;
    display: flex;
    justify-content: flex-start;
}
</style>
