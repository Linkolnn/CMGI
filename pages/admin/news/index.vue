<template>
  <div class="admin-news">
    <div class="admin-news__header">
      <h1 class="admin-news__title">Управление новостями</h1>
      <NuxtLink to="/admin/news/new" class="btn btn--primary">
        <i class="fas fa-plus-circle"></i> Добавить новость
      </NuxtLink>
    </div>
    
    <div class="admin-news__filters">
      <div class="filter-group">
        <label for="category-filter" class="filter-group__label">Категория:</label>
        <select id="category-filter" v-model="categoryFilter" class="filter-group__select">
          <option value="all">Все категории</option>
          <option value="events">События</option>
          <option value="volunteers">Волонтёрство</option>
          <option value="announcements">Объявления</option>
          <option value="news">Новости</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="search" class="filter-group__label">Поиск:</label>
        <input 
          id="search" 
          v-model="searchQuery" 
          type="text" 
          class="filter-group__input" 
          placeholder="Поиск по заголовку или содержанию"
        />
      </div>
    </div>
    
    <div v-if="loading" class="admin-news__loading">
      <p>Загрузка новостей...</p>
    </div>
    
    <div v-else-if="error" class="admin-news__error">
      <p>{{ error }}</p>
      <button @click="fetchNews" class="btn btn--primary">
        <i class="fas fa-sync-alt"></i> Попробовать снова
      </button>
    </div>
    
    <div v-else-if="filteredNews.length === 0" class="admin-news__empty">
      <p>Новостей не найдено.</p>
    </div>
    
    <div v-else class="admin-news__list">
      <div v-for="item in filteredNews" :key="item.id" class="news-item">
        <div class="news-item__image">
          <img :src="item.image || '/images/newsCardBanner.jpg'" :alt="item.title" />
        </div>
        
        <div class="news-item__content">
          <div class="news-item__meta">
            <span class="news-item__date">{{ formatDate(item.date) }}</span>
            <span class="news-item__category">{{ getCategoryLabel(item.category) }}</span>
          </div>
          
          <h3 class="news-item__title">{{ item.title }}</h3>
          <p class="news-item__excerpt">{{ item.excerpt }}</p>
          
          <div class="news-item__actions">
            <NuxtLink :to="`/admin/news/${item.id}`" class="btn btn--secondary btn--sm">
              <i class="fas fa-edit"></i> Редактировать
            </NuxtLink>
            <button @click="confirmDelete(item)" class="btn btn--danger btn--sm">
              <i class="fas fa-trash-alt"></i> Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="admin-news__pagination">
      <button 
        @click="prevPage" 
        class="pagination-btn" 
        :disabled="currentPage === 1"
      >
        <i class="fas fa-chevron-left"></i> Предыдущая
      </button>
      
      <span class="pagination-info">
        Страница {{ currentPage }} из {{ totalPages }}
      </span>
      
      <button 
        @click="nextPage" 
        class="pagination-btn" 
        :disabled="currentPage === totalPages"
      >
        Следующая <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="delete-modal">
      <div class="delete-modal__content">
        <h2 class="delete-modal__title">Подтверждение удаления</h2>
        <p class="delete-modal__text">
          Вы уверены, что хотите удалить новость "{{ newsToDelete?.title }}"?
          Это действие нельзя отменить.
        </p>
        <div class="delete-modal__actions">
          <button @click="cancelDelete" class="btn btn--secondary">
            <i class="fas fa-times"></i> Отмена
          </button>
          <button @click="deleteNews" class="btn btn--primary">
            <i class="fas fa-trash-alt"></i> Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useNewsStore } from '../../../stores/news';

definePageMeta({
  layout: 'admin'
});

const router = useRouter();
const newsStore = useNewsStore();

const loading = ref(true);
const error = ref(null);
const categoryFilter = ref('all');
const searchQuery = ref('');
const showDeleteModal = ref(false);
const newsToDelete = ref(null);
const currentPage = ref(1);
const itemsPerPage = 5;

// Check if user is authenticated
onMounted(() => {
  const isAuthenticated = localStorage.getItem('cmgi_admin_auth');
  if (!isAuthenticated) {
    router.push('/admin/login');
    return;
  }
  
  fetchNews();
});

// Fetch news
const fetchNews = async () => {
  try {
    loading.value = true;
    error.value = null;
    await newsStore.fetchNews();
  } catch (err) {
    error.value = 'Ошибка при загрузке новостей. Пожалуйста, попробуйте позже.';
    console.error('Error fetching news:', err);
  } finally {
    loading.value = false;
  }
};

// Filtered news based on filters and search
const filteredNews = computed(() => {
  let news = [...newsStore.news];
  
  // Apply category filter
  if (categoryFilter.value !== 'all') {
    news = news.filter(item => item.category === categoryFilter.value);
  }
  
  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    news = news.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.content.toLowerCase().includes(query) ||
      item.excerpt.toLowerCase().includes(query)
    );
  }
  
  // Sort by date (newest first)
  news = news.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return news;
});

// Paginated news
const paginatedNews = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredNews.value.slice(startIndex, endIndex);
});

// Total pages
const totalPages = computed(() => {
  return Math.ceil(filteredNews.value.length / itemsPerPage);
});

// Pagination methods
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Helper functions
const getCategoryLabel = (category) => {
  return newsStore.getCategoryLabel(category);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  }).format(date);
};

// Delete news
const confirmDelete = (news) => {
  newsToDelete.value = news;
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  newsToDelete.value = null;
  showDeleteModal.value = false;
};

const deleteNews = async () => {
  try {
    // In a real application, this would call an API to delete the news
    // For demo purposes, we'll just remove it from the store
    await newsStore.deleteNews(newsToDelete.value.id);
    
    showDeleteModal.value = false;
    newsToDelete.value = null;
    
    // Reset to first page if current page is now empty
    if (paginatedNews.value.length === 0 && currentPage.value > 1) {
      currentPage.value = 1;
    }
  } catch (error) {
    console.error('Error deleting news:', error);
    alert('Ошибка при удалении новости');
  }
};
</script>

<style lang="scss">
.admin-news {
  position: relative;
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-lg;
  }
  
  &__title {
    margin: 0;
  }
  
  &__filters {
    display: flex;
    gap: $spacing-lg;
    margin-bottom: $spacing-lg;
    background-color: $white;
    padding: $spacing-lg;
    border-radius: $border-radius-md;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    
    @include tablet {
      flex-wrap: wrap;
    }
    
    @include mobile {
      flex-direction: column;
    }
  }
  
  &__loading,
  &__error,
  &__empty {
    background-color: $white;
    padding: $spacing-xl;
    border-radius: $border-radius-md;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  &__list {
    margin-bottom: $spacing-lg;
  }
  
  &__pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: $spacing-lg;
    margin-top: $spacing-xl;
  }
}

.filter-group {
  flex: 1;
  
  &__label {
    display: block;
    margin-bottom: $spacing-xs;
    font-size: $font-size-sm;
    color: lighten($dark-gray, 20%);
  }
  
  &__select,
  &__input {
    width: 100%;
    padding: $spacing-sm;
    border: 1px solid rgba($dark-gray, 0.2);
    border-radius: $border-radius-sm;
    
    &:focus {
      outline: none;
      border-color: $primary-purple;
    }
  }
}

.news-item {
  display: flex;
  background-color: $white;
  border-radius: $border-radius-md;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  margin-bottom: $spacing-lg;
  overflow: hidden;
  
  @include mobile {
    flex-direction: column;
  }
  
  &__image {
    flex: 0 0 250px;
    
    @include tablet {
      flex: 0 0 200px;
    }
    
    @include mobile {
      flex: 0 0 auto;
      height: 200px;
    }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  &__content {
    flex: 1;
    padding: $spacing-lg;
    display: flex;
    flex-direction: column;
  }
  
  &__meta {
    display: flex;
    gap: $spacing-md;
    margin-bottom: $spacing-sm;
  }
  
  &__date {
    font-size: $font-size-sm;
    color: lighten($dark-gray, 30%);
  }
  
  &__category {
    font-size: $font-size-sm;
    color: $white;
    background-color: $primary-purple;
    padding: 2px 8px;
    border-radius: $border-radius-sm;
  }
  
  &__title {
    margin: 0 0 $spacing-sm;
    font-size: $font-size-lg;
  }
  
  &__excerpt {
    margin: 0 0 $spacing-md;
    color: lighten($dark-gray, 20%);
    flex-grow: 1;
  }
  
  &__actions {
    display: flex;
    gap: $spacing-md;
    margin-top: $spacing-md;
  }
}

.pagination-btn {
  padding: $spacing-sm $spacing-md;
  background-color: $light-purple;
  border: none;
  border-radius: $border-radius-sm;
  cursor: pointer;
  transition: $transition-base;
  
  &:hover:not(:disabled) {
    background-color: darken($light-purple, 5%);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.pagination-info {
  font-size: $font-size-sm;
  color: lighten($dark-gray, 20%);
}

.delete-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($black, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: $z-index-modal;
  
  &__content {
    background-color: $white;
    border-radius: $border-radius-md;
    padding: $spacing-xl;
    max-width: 500px;
    width: 100%;
  }
  
  &__title {
    margin-bottom: $spacing-md;
  }
  
  &__text {
    margin-bottom: $spacing-lg;
  }
  
  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: $spacing-md;
  }
}
</style>
