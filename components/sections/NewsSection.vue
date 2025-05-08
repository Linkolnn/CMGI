<template>
  <section class="section news-section">
    <div class="container">
      <div class="section__header">
        <h2 class="section__title">{{ title }}</h2>
        <NuxtLink v-if="showAllLink" to="/news" class="news-section__all-link">
          Все новости
          <span class="news-section__all-link-arrow">→</span>
        </NuxtLink>
      </div>
      
      <div class="news-grid">
        <div v-for="(newsItem, index) in news" :key="index" class="news-grid__item">
          <NewsCard 
            :title="newsItem.title"
            :excerpt="newsItem.excerpt"
            :image="newsItem.image"
            :date="newsItem.date"
            :category="newsItem.category"
            :link="newsItem.link"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import NewsCard from '~/components/ui/NewsCard.vue';

defineProps({
  title: {
    type: String,
    default: 'Новости и события'
  },
  news: {
    type: Array,
    required: true
  },
  showAllLink: {
    type: Boolean,
    default: true
  }
});
</script>

<style lang="scss">
.news-section {
  background-color: $white;
  
  .section__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-xl;
    
    @include mobile {
      flex-direction: column;
      align-items: flex-start;
      gap: $spacing-sm;
    }
  }
  
  &__all-link {
    color: $primary-green;
    font-weight: 500;
    display: flex;
    align-items: center;
    
    &-arrow {
      margin-left: $spacing-xs;
      transition: transform 0.2s ease;
    }
    
    &:hover {
      .news-section__all-link-arrow {
        transform: translateX(3px);
      }
    }
  }
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-lg;
  
  @include tablet {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include mobile {
    grid-template-columns: 1fr;
  }
  
  &__item {
    height: 100%;
  }
}
</style>
