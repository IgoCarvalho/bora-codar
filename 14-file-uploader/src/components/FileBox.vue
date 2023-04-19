<script setup lang="ts">
import CloudArrowUpIcon from './icons/CloudArrowUpIcon.vue'

const emit = defineEmits<{
  (e: 'files', files: FileList): void
}>()

function handleFiles(event: Event) {
  const input = event.target as HTMLInputElement

  if (input.files?.length) {
    emit('files', input.files)
  }
}
</script>

<template>
  <div class="file__box">
    <CloudArrowUpIcon />

    <p class="file__box__title">Importe seus arquivos</p>
    <span class="file__box__subtitle">Arraste ou clique para fazer upload</span>

    <input name="files" type="file" multiple @change="handleFiles" />
  </div>
</template>

<style scoped lang="scss">
.file__box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 160px;
  background-color: #f3f0ff;
  border-radius: 8px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23C1B2FAFF' stroke-width='1' stroke-dasharray='4%2c6' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");

  &:hover {
    background-color: #ebe5ff;
  }

  .file__box__title {
    font-size: 16px;
    font-weight: 700;
    color: #7a5fec;
    margin-top: 12px;
  }

  .file__box__subtitle {
    font-size: 14px;
    color: #746e82;
    margin-top: 1px;
  }

  input {
    opacity: 0;
    position: absolute;
    inset: 0;
  }
}
</style>
