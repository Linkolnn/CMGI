<template>
  <div class="news-detail-page">
    <div v-if="loading" class="news-detail-loading">
      <p>Загрузка новости...</p>
    </div>
    
    <div v-else-if="error" class="news-detail-error">
      <div class="container">
        <h1 class="news-detail-error__title">Ошибка</h1>
        <p class="news-detail-error__text">{{ error }}</p>
        <NuxtLink to="/news" class="btn btn--primary">
          Вернуться к списку новостей
        </NuxtLink>
      </div>
    </div>
    
    <template v-else>
      <!-- Banner with news image -->
      <div class="news-detail-banner" :style="{ backgroundImage: `url(${newsItem.image})` }">
        <div class="container">
          <div class="news-detail-banner__content">
            <div class="news-detail-banner__meta">
              <span class="news-detail-banner__date">{{ formatDate(newsItem.date) }}</span>
              <span class="news-detail-banner__category">{{ getCategoryLabel(newsItem.category) }}</span>
            </div>
            <h1 class="news-detail-banner__title">{{ newsItem.title }}</h1>
          </div>
        </div>
      </div>
      
      <!-- News content -->
      <section class="section news-detail-content">
        <div class="container">
          <div class="news-detail-content__inner">
            <div class="news-detail-content__main">
              <div class="news-detail-content__text" v-html="formattedContent"></div>
              
              <div class="news-detail-share">
                <h3 class="news-detail-share__title">Поделиться новостью</h3>
                <div class="news-detail-share__buttons">
                  <button class="news-detail-share__button" @click="shareOnVk">
                    ВКонтакте
                  </button>
                  <button class="news-detail-share__button" @click="shareOnTelegram">
                    Telegram
                  </button>
                  <button class="news-detail-share__button" @click="copyLink">
                    Копировать ссылку
                  </button>
                </div>
                <p v-if="linkCopied" class="news-detail-share__copied">
                  Ссылка скопирована в буфер обмена
                </p>
              </div>
              
              <div class="news-detail-navigation">
                <NuxtLink 
                  v-if="prevNewsId" 
                  :to="`/news/${prevNewsId}`" 
                  class="news-detail-navigation__link news-detail-navigation__link--prev"
                >
                  ← Предыдущая новость
                </NuxtLink>
                <NuxtLink 
                  to="/news" 
                  class="news-detail-navigation__link news-detail-navigation__link--all"
                >
                  Все новости
                </NuxtLink>
                <NuxtLink 
                  v-if="nextNewsId" 
                  :to="`/news/${nextNewsId}`" 
                  class="news-detail-navigation__link news-detail-navigation__link--next"
                >
                  Следующая новость →
                </NuxtLink>
              </div>
            </div>
            
            <div class="news-detail-content__sidebar">
              <div class="sidebar-block">
                <h3 class="sidebar-block__title">Последние новости</h3>
                <div class="latest-news-list">
                  <div v-for="(item, index) in latestNews" :key="index" class="latest-news-item">
                    <NuxtLink :to="`/news/${item.id}`" class="latest-news-item__link">
                      <div class="latest-news-item__image">
                        <img :src="item.image" :alt="item.title" />
                      </div>
                      <div class="latest-news-item__content">
                        <h4 class="latest-news-item__title">{{ item.title }}</h4>
                        <p class="latest-news-item__date">{{ formatDate(item.date) }}</p>
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </div>
              
              <div class="sidebar-block">
                <h3 class="sidebar-block__title">Категории</h3>
                <ul class="categories-list">
                  <li v-for="(category, index) in categories" :key="index" class="categories-list__item">
                    <NuxtLink 
                      :to="`/news?category=${encodeURIComponent(category)}`" 
                      class="categories-list__link"
                    >
                      {{ getCategoryLabel(category) }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Related news -->
      <section class="section related-news-section">
        <div class="container">
          <h2 class="section__title">Похожие новости</h2>
          <div class="related-news-grid">
            <div v-for="(item, index) in relatedNews" :key="index" class="related-news-grid__item">
              <NewsCard 
                :title="item.title"
                :excerpt="item.excerpt"
                :image="item.image"
                :date="item.date"
                :category="item.category"
                :link="`/news/${item.id}`"
              />
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useNewsStore } from '../../stores/news';
import NewsCard from '~/components/ui/NewsCard.vue';

const route = useRoute();
const newsStore = useNewsStore();
const loading = ref(true);
const error = ref(null);
const newsItem = ref(null);
const linkCopied = ref(false);

// Get news ID from route params
const newsId = computed(() => parseInt(route.params.id));

// Format content with paragraphs
const formattedContent = computed(() => {
  if (!newsItem.value) return '';
  return newsItem.value.content.split('\n').map(p => `<p>${p}</p>`).join('');
});

// Get latest news (excluding current)
const latestNews = computed(() => {
  return newsStore.getLatestNews.filter(item => item.id !== newsId.value);
});

// Get related news (same category, excluding current)
const relatedNews = computed(() => {
  if (!newsItem.value) return [];
  return newsStore.news
    .filter(item => item.category === newsItem.value.category && item.id !== newsId.value)
    .slice(0, 3);
});

// Get previous and next news IDs
const prevNewsId = computed(() => {
  const allIds = newsStore.news.map(item => item.id).sort((a, b) => a - b);
  const currentIndex = allIds.indexOf(newsId.value);
  return currentIndex > 0 ? allIds[currentIndex - 1] : null;
});

const nextNewsId = computed(() => {
  const allIds = newsStore.news.map(item => item.id).sort((a, b) => a - b);
  const currentIndex = allIds.indexOf(newsId.value);
  return currentIndex < allIds.length - 1 ? allIds[currentIndex + 1] : null;
});

// Get all categories
const categories = computed(() => {
  return [...new Set(newsStore.news.map(item => item.category))];
});

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

// Get category label in Russian
const getCategoryLabel = (category) => {
  return newsStore.getCategoryLabel(category);
};

// Share functions
const shareOnVk = () => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(newsItem.value.title);
  window.open(`https://vk.com/share.php?url=${url}&title=${title}`, '_blank');
};

const shareOnTelegram = () => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(newsItem.value.title);
  window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
};

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    linkCopied.value = true;
    setTimeout(() => {
      linkCopied.value = false;
    }, 3000);
  });
};

// Fetch news on component mount
onMounted(async () => {
  try {
    loading.value = true;
    await newsStore.fetchNews();
    
    const news = newsStore.getNewsById(newsId.value);
    if (!news) {
      error.value = 'Новость не найдена';
      return;
    }
    
    newsItem.value = news;
  } catch (err) {
    error.value = 'Ошибка при загрузке новости. Пожалуйста, попробуйте позже.';
    console.error('Error fetching news:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss">
.news-detail-page {
  .news-detail-loading,
  .news-detail-error {
    min-height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    
    &__title {
      margin-bottom: $spacing-md;
    }
    
    &__text {
      margin-bottom: $spacing-lg;
    }
  }
  
  .news-detail-banner {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    padding: $spacing-xxl 0;
    color: $white;
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba($black, 0.5), rgba($black, 0.7));
      z-index: 1;
    }
    
    &__content {
      position: relative;
      z-index: 2;
      max-width: 800px;
    }
    
    &__meta {
      display: flex;
      gap: $spacing-md;
      margin-bottom: $spacing-md;
      font-size: $font-size-sm;
    }
    
    &__date {
      background-color: rgba($white, 0.2);
      padding: $spacing-xs $spacing-sm;
      border-radius: $border-radius-sm;
    }
    
    &__category {
      background-color: $primary-green;
      color: $black;
      padding: $spacing-xs $spacing-sm;
      border-radius: $border-radius-sm;
      font-weight: 500;
    }
    
    &__title {
      font-size: $font-size-xxl;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba($black, 0.3);
      
      @include mobile {
        font-size: $font-size-xl;
      }
    }
  }
  
  .news-detail-content {
    background-color: $white;
    
    &__inner {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: $spacing-xl;
      
      @include tablet {
        grid-template-columns: 1fr;
      }
    }
    
    &__text {
      line-height: 1.8;
      margin-bottom: $spacing-xl;
      
      p {
        margin-bottom: $spacing-md;
      }
    }
  }
  
  .news-detail-share {
    margin-bottom: $spacing-xl;
    padding: $spacing-lg;
    background-color: $light-purple;
    border-radius: $border-radius-md;
    
    &__title {
      margin-bottom: $spacing-md;
    }
    
    &__buttons {
      display: flex;
      gap: $spacing-md;
      
      @include mobile {
        flex-wrap: wrap;
      }
    }
    
    &__button {
      padding: $spacing-sm $spacing-md;
      background-color: $white;
      border: none;
      border-radius: $border-radius-sm;
      cursor: pointer;
      transition: $transition-base;
      
      &:hover {
        background-color: $primary-green;
      }
    }
    
    &__copied {
      margin-top: $spacing-sm;
      font-size: $font-size-sm;
      color: $primary-green;
    }
  }
  
  .news-detail-navigation {
    display: flex;
    justify-content: space-between;
    margin-bottom: $spacing-xl;
    
    @include mobile {
      flex-direction: column;
      gap: $spacing-sm;
    }
    
    &__link {
      padding: $spacing-sm $spacing-md;
      background-color: $light-purple;
      border-radius: $border-radius-sm;
      transition: $transition-base;
      
      &:hover {
        background-color: $primary-purple;
        color: $white;
      }
      
      &--all {
        text-align: center;
      }
      
      &--prev {
        text-align: left;
      }
      
      &--next {
        text-align: right;
      }
    }
  }
  
  .sidebar-block {
    background-color: $light-purple;
    border-radius: $border-radius-md;
    padding: $spacing-lg;
    margin-bottom: $spacing-lg;
    
    &__title {
      margin-bottom: $spacing-md;
      font-size: $font-size-lg;
      color: $primary-purple;
      border-bottom: 2px solid $primary-green;
      padding-bottom: $spacing-sm;
    }
  }
  
  .latest-news-list {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }
  
  .latest-news-item {
    &__link {
      display: flex;
      gap: $spacing-md;
    }
    
    &__image {
      width: 80px;
      height: 80px;
      border-radius: $border-radius-sm;
      overflow: hidden;
      flex-shrink: 0;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    &__title {
      font-size: $font-size-base;
      margin-bottom: $spacing-xs;
      
      // Limit to 2 lines with ellipsis
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    &__date {
      font-size: $font-size-sm;
      color: lighten($dark-gray, 30%);
    }
  }
  
  .categories-list {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
    
    &__link {
      display: block;
      padding: $spacing-sm;
      background-color: rgba($white, 0.5);
      border-radius: $border-radius-sm;
      transition: $transition-base;
      
      &:hover {
        background-color: $primary-green;
        color: $black;
      }
    }
  }
  
  .related-news-section {
    background-color: $gray;
  }
  
  .related-news-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-lg;
    
    @include tablet {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @include mobile {
      grid-template-columns: 1fr;
    }
  }
}
</style>
