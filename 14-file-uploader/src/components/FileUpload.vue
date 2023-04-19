<script setup lang="ts">
import { computed } from 'vue'
import { filesize } from 'filesize'

import FileIcon from './icons/FileIcon.vue'
import XIcon from './icons/XIcon.vue'
import RetryIcon from './icons/RetryIcon.vue'

type FileUploadProps = {
  title: string
  totalSize: number
  uploadedSize: number
  completed?: boolean
  error?: boolean
}

const props = defineProps<FileUploadProps>()

function handleCancel() {
  console.log('Cancelling upload')
}

function formatFileSize(size: number) {
  const sizeFormatted = filesize(size)

  return sizeFormatted
}

const uploadProgress = computed(() => {
  if (props.error) {
    return 0
  }

  if (props.completed) {
    return 100
  }

  const progress = (100 * props.uploadedSize) / props.totalSize
  return Math.round(progress)
})

const isUploading = computed(() => {
  return !props.completed && !props.error
})
</script>

<template>
  <div :class="['file', { 'file--completed': completed }, { 'file--error': error }]">
    <button
      v-if="isUploading"
      type="button"
      class="file__action__button"
      title="Cancelar"
      @click="handleCancel"
    >
      <XIcon />
    </button>

    <button
      v-if="error"
      type="button"
      class="file__action__button"
      title="Tentar novamente"
      @click="handleCancel"
    >
      <RetryIcon />
    </button>

    <div class="file__icon">
      <FileIcon />
    </div>
    <div class="file__content">
      <div class="file__info">
        <strong class="file__title">{{ title }}</strong>
        <div class="file__size">
          <span v-if="isUploading">{{ uploadedSize }} / </span>
          <span>{{ formatFileSize(totalSize) }}</span>
        </div>
      </div>
      <div class="file__progress">
        <div class="progress">
          <div class="progress__bar" :style="{ width: `${uploadProgress}%` }"></div>
        </div>

        <span v-if="error" class="progress__value">Erro</span>
        <span v-else class="progress__value">{{ uploadProgress }} %</span>
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

  .file__action__button {
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
    color: #ac96e4;
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
      color: #9892a6;
      font-size: 12px;
      font-weight: 500;
      min-width: 32px;
      text-align: center;
    }
  }

  &--completed {
    .file__icon {
      background-color: #daf2d9;
      color: #73b172;
    }

    .file__progress {
      .progress {
        .progress__bar {
          background: #73b172;
        }
      }

      .progress__value {
        color: #4e884d;
      }
    }
  }

  &--error {
    .file__icon {
      background-color: #f2d9d9;
      color: #e36363;
    }

    .file__progress {
      .progress {
        .progress__bar {
          background: #e36363;
        }
      }

      .progress__value {
        color: #e36363;
      }
    }
  }
}
</style>
