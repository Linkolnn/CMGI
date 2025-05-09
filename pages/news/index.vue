<template>
  <div class="news-page">
    <!-- Banner -->
    <Banner 
      title="Новости и события" 
      subtitle="Будьте в курсе последних событий и мероприятий"
      backgroundImage="/images/logo.jpg"
    />
    
    <!-- Main Content -->
    <section class="section news-content">
      <div class="container">
        <div class="news-filter">
          <h2 class="news-filter__title">Фильтр новостей</h2>
          <div class="news-filter__options">
            <button 
              v-for="(option, index) in filterOptions" 
              :key="index"
              class="news-filter__option"
              :class="{ 'news-filter__option--active': activeFilter === option.value }"
              @click="setFilter(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
        
        <div v-if="loading" class="news-loading">
          <p>Загрузка новостей...</p>
        </div>
        
        <div v-else-if="error" class="news-error">
          <p>{{ error }}</p>
        </div>
        
        <div v-else-if="filteredNews.length === 0" class="news-empty">
          <p>По выбранному фильтру новостей не найдено.</p>
        </div>
        
        <div v-else class="news-grid">
          <div v-for="(newsItem, index) in filteredNews" :key="index" class="news-grid__item">
            <NewsCard 
              :title="newsItem.title"
              :excerpt="newsItem.excerpt"
              :image="newsItem.image"
              :date="newsItem.date"
              :category="newsItem.category"
              :link="`/news/${newsItem.id}`"
            />
          </div>
        </div>
        
        <div class="news-archive">
          <h2 class="news-archive__title">Архив событий</h2>
          <p class="news-archive__text">
            Вы можете ознакомиться с архивом прошедших мероприятий и новостей за предыдущие годы.
          </p>
          <div class="news-archive__years">
            <button 
              v-for="year in archiveYears" 
              :key="year"
              class="news-archive__year"
              @click="showArchiveYear(year)"
            >
              {{ year }}
            </button>
          </div>
        </div>
        
        <div class="news-subscribe">
          <h2 class="news-subscribe__title">Подписка на новости</h2>
          <p class="news-subscribe__text">
            Подпишитесь на нашу рассылку, чтобы получать информацию о новостях и предстоящих мероприятиях.
          </p>
          <form class="news-subscribe__form" @submit.prevent="subscribeToNews">
            <input 
              v-model="subscribeEmail" 
              type="email" 
              class="news-subscribe__input" 
              placeholder="Введите ваш email" 
              required
            />
            <button type="submit" class="btn btn--primary news-subscribe__button">
              <i class="fas fa-envelope"></i> Подписаться
            </button>
          </form>
          <p v-if="subscribeSuccess" class="news-subscribe__success">
            Спасибо за подписку! Мы отправили письмо с подтверждением на ваш email.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useNewsStore } from '../../stores/news';
import { useRoute, useRouter } from 'vue-router';
import Banner from '~/components/ui/Banner.vue';
import NewsCard from '~/components/ui/NewsCard.vue';

const newsStore = useNewsStore();
const route = useRoute();
const router = useRouter();
const loading = ref(true);
const error = ref(null);
const activeFilter = ref('all');
const subscribeEmail = ref('');
const subscribeSuccess = ref(false);

// Filter options
const filterOptions = [
  { label: newsStore.getCategoryLabel('all'), value: 'all' },
  { label: newsStore.getCategoryLabel('events'), value: 'events' },
  { label: newsStore.getCategoryLabel('volunteers'), value: 'volunteers' },
  { label: newsStore.getCategoryLabel('announcements'), value: 'announcements' },
  { label: newsStore.getCategoryLabel('other'), value: 'other' }
];

// Archive years
const archiveYears = [2024, 2023, 2022];

// Filtered news based on active filter
const filteredNews = computed(() => {
  return newsStore.getNewsByCategory(activeFilter.value);
});

// Set active filter and update URL
const setFilter = (filter) => {
  activeFilter.value = filter;
  
  // Обновляем URL с параметром категории
  if (filter === 'all') {
    router.push({ path: '/news' }); // Убираем параметр из URL если выбраны все категории
  } else {
    router.push({ path: '/news', query: { category: filter } });
  }
};

// Show archive year
const showArchiveYear = (year) => {
  // In a real application, this would fetch news for the selected year
  // For demo purposes, we'll just show an alert
  alert(`Показать архив новостей за ${year} год`);
};

// Subscribe to news
const subscribeToNews = () => {
  // In a real application, this would send a request to the server
  // For demo purposes, we'll just show a success message
  subscribeSuccess.value = true;
  subscribeEmail.value = '';
  
  // Hide success message after 5 seconds
  setTimeout(() => {
    subscribeSuccess.value = false;
  }, 5000);
};

// Обработка изменений URL параметров
watch(() => route.query.category, (newCategory) => {
  if (newCategory) {
    activeFilter.value = newCategory;
  } else {
    activeFilter.value = 'all';
  }
});

// Fetch news on component mount
onMounted(async () => {
  try {
    loading.value = true;
    await newsStore.fetchNews();
    
    // Проверяем URL-параметры при загрузке
    if (route.query.category) {
      activeFilter.value = route.query.category;
    }
  } catch (err) {
    error.value = 'Ошибка при загрузке новостей. Пожалуйста, попробуйте позже.';
    console.error('Error fetching news:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss">
.news-page {
  .news-content {
    background-color: $white;
  }
  
  .news-filter {
    margin-bottom: $spacing-xl;
    
    &__title {
      margin-bottom: $spacing-md;
    }
    
    &__options {
      display: flex;
      flex-wrap: wrap;
      gap: $spacing-sm;
    }
    
    &__option {
      padding: $spacing-sm $spacing-md;
      background-color: $light-purple;
      border: none;
      border-radius: $border-radius-sm;
      cursor: pointer;
      transition: $transition-base;
      
      &:hover {
        background-color: darken($light-purple, 5%);
      }
      
      &--active {
        background-color: $primary-purple;
        color: $white;
        
        &:hover {
          background-color: darken($primary-purple, 5%);
        }
      }
    }
  }
  
  .news-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-lg;
    margin-bottom: $spacing-xl;
    
    @include tablet {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @include mobile {
      grid-template-columns: 1fr;
    }
  }
  
  .news-loading,
  .news-error,
  .news-empty {
    text-align: center;
    padding: $spacing-xl 0;
    color: lighten($dark-gray, 20%);
  }
  
  .news-archive {
    margin-bottom: $spacing-xl;
    padding: $spacing-lg;
    background-color: $light-purple;
    border-radius: $border-radius-md;
    
    &__title {
      margin-bottom: $spacing-sm;
    }
    
    &__text {
      margin-bottom: $spacing-md;
    }
    
    &__years {
      display: flex;
      gap: $spacing-md;
      
      @include mobile {
        flex-wrap: wrap;
      }
    }
    
    &__year {
      padding: $spacing-sm $spacing-lg;
      background-color: $white;
      border: none;
      border-radius: $border-radius-sm;
      cursor: pointer;
      transition: $transition-base;
      
      &:hover {
        background-color: $primary-green;
        color: $black;
      }
    }
  }
  
  .news-subscribe {
    padding: $spacing-lg;
    background-color: $primary-purple;
    color: $white;
    border-radius: $border-radius-md;
    
    &__title {
      color: $white;
      margin-bottom: $spacing-sm;
    }
    
    &__text {
      margin-bottom: $spacing-md;
    }
    
    &__form {
      display: flex;
      gap: $spacing-md;
      
      @include mobile {
        flex-direction: column;
      }
    }
    
    &__input {
      flex: 1;
      padding: $spacing-md;
      border: none;
      border-radius: $border-radius-sm;
      font-size: $font-size-base;
      
      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba($primary-green, 0.5);
      }
    }
    
    &__button {
      white-space: nowrap;
    }
    
    &__success {
      margin-top: $spacing-md;
      padding: $spacing-sm;
      background-color: rgba($primary-green, 0.2);
      border-radius: $border-radius-sm;
      color: $white;
    }
  }
}
</style>
