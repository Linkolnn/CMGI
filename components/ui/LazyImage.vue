<template>
  <div class="lazy-image" :class="{ 'lazy-image--loaded': isLoaded }">
    <img 
      :src="src" 
      :alt="alt" 
      :class="imgClass"
      @load="onImageLoaded" 
      loading="lazy"
      decoding="async"
    />
    <div v-if="!isLoaded" class="lazy-image__placeholder">
      <div class="lazy-image__spinner"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  imgClass: {
    type: String,
    default: ''
  }
});

const isLoaded = ref(false);

const onImageLoaded = () => {
  isLoaded.value = true;
};
</script>

<style lang="scss">
.lazy-image {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease;
    opacity: 0;
  }
  
  &--loaded {
    img {
      opacity: 1;
    }
  }
  
  &__placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $gray;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &__spinner {
    width: 30px;
    height: 30px;
    border: 3px solid rgba($primary-purple, 0.3);
    border-top-color: $primary-purple;
    border-radius: 50%;
    animation: spin 1s infinite linear;
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
