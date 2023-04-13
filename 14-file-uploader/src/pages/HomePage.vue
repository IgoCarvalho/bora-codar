<script setup lang="ts">
import FileUpload from '@/components/FileUpload.vue'
</script>

<template>
  <main class="container">
    <FileUpload title="Scann_158.pdf" :totalSize="74" :uploadedSize="30" />
  </main>
</template>

<style scoped>

.container {
  width: 100%;
  min-height: 100vh;
  max-width: 440px;
  margin: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
