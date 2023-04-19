<script setup lang="ts">
import { ref } from 'vue'

import FileBox from '@/components/FileBox.vue'
import FileUpload from '@/components/FileUpload.vue'

const uploadedFiles = ref<File[]>([])

function handleFiles(files: FileList) {
  console.log(files)

  uploadedFiles.value.push(...Array.from(files))
}
</script>

<template>
  <main class="container">
    <div class="uploader">
      <FileBox @files="handleFiles" />

      <div class="uploader__files">
        <FileUpload
          v-for="file in uploadedFiles"
          :key="file.name"
          :title="file.name"
          :totalSize="file.size"
          :uploadedSize="30"
          completed
        />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.container {
  width: calc(100% - 32px);
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
