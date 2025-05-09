<template>
  <NuxtLink :to="link" class="news-card">
    <div class="news-card__image">
      <LazyImage :src="image" :alt="title" />
    </div>
    <div class="news-card__content">
      <div class="news-card__meta">
        <span class="news-card__date">{{ formatDate(date) }}</span>
        <span v-if="category" class="news-card__category">{{ getCategoryLabel(category) }}</span>
      </div>
      <h3 class="news-card__title">{{ title }}</h3>
      <p class="news-card__excerpt">{{ excerpt }}</p>
      <NuxtLink :to="link" class="news-card__link">
        Подробнее
      </NuxtLink>
    </div>
  </NuxtLink>
</template>

<script setup>
import LazyImage from './LazyImage.vue';
import { useNewsStore } from '~/stores/news';

defineProps({
  title: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    required: true
  }
});

// Инициализация хранилища новостей
const newsStore = useNewsStore();

// Format date to Russian format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

// Получение названия категории на русском языке
const getCategoryLabel = (category) => {
  return newsStore.getCategoryLabel(category);
};
</script>

<style lang="scss">
.news-card {
  @include card;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &__image {
    height: 180px;
    overflow: hidden;
    margin: -#{$spacing-lg} -#{$spacing-lg} $spacing-md;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    &:hover img {
      transform: scale(1.05);
    }
  }
  
  &__content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  
  &__meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: $spacing-sm;
    font-size: $font-size-sm;
    color: lighten($dark-gray, 30%);
  }
  
  &__category {
    color: $primary-purple;
    font-weight: 500;
  }
  
  &__title {
    font-size: $font-size-lg;
    margin-bottom: $spacing-sm;
    
    // Limit to 2 lines with ellipsis
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  &__excerpt {
    color: lighten($dark-gray, 20%);
    margin-bottom: $spacing-md;
    flex: 1;
    
    // Limit to 3 lines with ellipsis
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  &__link {
    align-self: flex-start;
    color: $primary-green;
    font-weight: 500;
    position: relative;
    padding-right: 20px;
    
    &:after {
      content: '→';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      transition: transform 0.2s ease;
    }
    
    &:hover:after {
      transform: translate(3px, -50%);
    }
  }
}
</style>
