<script setup lang="ts">
import FileBox from '@/components/FileBox.vue'
import FileUpload from '@/components/FileUpload.vue'

function handleFiles(files: FileList) {
  console.log(files)
}
</script>

<template>
  <main class="container">
    <div class="uploader">
      <FileBox @files="handleFiles" />

      <div class="uploader__files">
        <FileUpload title="Scann_158.pdf" :totalSize="74" :uploadedSize="30" />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  min-height: 100vh;
  max-width: 440px;
  margin: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.uploader {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__files {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
