<script setup lang="ts">
import { computed } from 'vue'

import FileIcon from './icons/FileIcon.vue'
import XIcon from './icons/XIcon.vue'

type FileUploadProps = {
  title: string
  totalSize: number
  uploadedSize: number
}

const props = defineProps<FileUploadProps>()

function handleCancel() {
  console.log('Cancelling upload')
}

const uploadProgress = computed(() => {
  const progress = (100 * props.uploadedSize) / props.totalSize
  return Math.round(progress)
})
</script>

<template>
  <div class="file">
    <button type="button" class="cancel__button" title="Cancelar" @click="handleCancel">
      <XIcon />
    </button>
    
    <div class="file__icon">
      <FileIcon />
    </div>
    <div class="file__content">
      <div class="file__info">
        <strong class="file__title">{{ title }}</strong>
        <span class="file__size">{{ uploadedSize }} MB / {{ totalSize }} MB</span>
      </div>
      <div class="file__progress">
        <div class="progress">
          <div class="progress__bar" :style="{ width: `${uploadProgress}%` }"></div>
        </div>
        <span class="progress__value">100 %</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.file {
  background-color: #fff;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0px 4px 16px #eae2fd;
  display: flex;
  gap: 12px;
  position: relative;
  font-style: italic;

  .cancel__button {
    display: flex;
    background-color: #fff;
    position: absolute;
    border: none;
    border-radius: 4px;
    right: 8px;
    top: 8px;

    &:hover {
      background-color: #e9e3f8;
      cursor: pointer;
    }
  }

  .file__icon {
    background-color: #e9e3f8;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 48px;
    min-height: 56px;
  }

  .file__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .file__info {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .file__title {
      font-size: 14px;
      font-weight: 700;
      line-height: 130%;
    }

    .file__size {
      font-size: 12px;
      font-weight: 500;
    }
  }

  .file__progress {
    display: flex;
    align-items: center;
    gap: 8px;

    .progress {
      flex: 1;
      height: 8px;
      background-color: #e3e3ed;
      border-radius: 20px;
      overflow: hidden;

      .progress__bar {
        background: linear-gradient(90deg, rgba(58, 97, 237, 0.52) 0%, #7c3aed 100%);
        height: 100%;
      }
    }

    .progress__value {
      font-size: 12px;
      font-weight: 500;
      min-width: 32px;
      text-align: center;
    }
  }
}
</style>
