<template>
  <section class="section gallery-section">
    <div class="container">
      <h2 class="section__title">{{ title }}</h2>
      <p v-if="description" class="section__description">{{ description }}</p>
      
      <div class="gallery-grid">
        <div v-for="photo in photos" :key="photo.id" class="gallery-item">
          <img :src="photo.image" :alt="photo.alt" class="gallery-item__image" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useGalleryStore } from '~/stores/gallery';

const props = defineProps({
  title: {
    type: String,
    default: 'Фотогалерея'
  },
  description: {
    type: String,
    default: ''
  },
  limit: {
    type: Number,
    default: 6
  }
});

const galleryStore = useGalleryStore();

onMounted(() => {
  galleryStore.initGallery();
});

// Получение фотографий для отображения
const photos = computed(() => {
  // Берем все фотографии и ограничиваем количество
  return galleryStore.photos.slice(0, props.limit);
});
</script>

<style lang="scss">
.gallery-section {
  .section__description {
    text-align: center;
    max-width: 800px;
    margin: 0 auto $spacing-xl;
  }
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;
  
  @include tablet {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include mobile {
    grid-template-columns: 1fr;
  }
}

.gallery-item {
  position: relative;
  border-radius: $border-radius-md;
  overflow: hidden;
  aspect-ratio: 4/3;
  
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }
  
  &__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    color: $white;
    padding: $spacing-md;
    transform: translateY(100%);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
  }
  
  &__title {
    font-size: $font-size-base;
    margin-bottom: $spacing-xs;
  }
  
  &__description {
    font-size: $font-size-sm;
    margin-bottom: $spacing-xs;
    opacity: 0.8;
  }
  
  &__date {
    font-size: $font-size-xs;
    opacity: 0.6;
  }
  
  &:hover {
    img {
      transform: scale(1.05);
    }
    
    .gallery-item__overlay {
      transform: translateY(0);
    }
  }
}
</style>
