<template>
  <div class="admin-dashboard">
    <div class="dashboard-stats">
      <div class="dashboard-stat-card">
        <div class="dashboard-stat-card__icon"><i class="fas fa-file-signature"></i></div>
        <div class="dashboard-stat-card__content">
          <h3 class="dashboard-stat-card__title">Новые заявки</h3>
          <div class="dashboard-stat-card__value">{{ newInitiativesCount }}</div>
        </div>
      </div>
      
      <div class="dashboard-stat-card">
        <div class="dashboard-stat-card__icon"><i class="fas fa-newspaper"></i></div>
        <div class="dashboard-stat-card__content">
          <h3 class="dashboard-stat-card__title">Новости</h3>
          <div class="dashboard-stat-card__value">{{ newsCount }}</div>
        </div>
      </div>
      
      <div class="dashboard-stat-card">
        <div class="dashboard-stat-card__icon"><i class="fas fa-images"></i></div>
        <div class="dashboard-stat-card__content">
          <h3 class="dashboard-stat-card__title">Фотографии</h3>
          <div class="dashboard-stat-card__value">{{ photosCount }}</div>
        </div>
      </div>
    </div>
    
    <div class="dashboard-quick-actions">
      <h2 class="dashboard-quick-actions__title">Быстрые действия</h2>
      <div class="dashboard-quick-actions__grid">
        <NuxtLink to="/admin/initiatives/new" class="dashboard-quick-action">
          <div class="dashboard-quick-action__icon"><i class="fas fa-file-signature"></i></div>
          <div class="dashboard-quick-action__title">Добавить заявку</div>
        </NuxtLink>
        
        <NuxtLink to="/admin/news/new" class="dashboard-quick-action">
          <div class="dashboard-quick-action__icon"><i class="fas fa-plus-circle"></i></div>
          <div class="dashboard-quick-action__title">Добавить новость</div>
        </NuxtLink>
        
        <NuxtLink to="/admin/projects/new" class="dashboard-quick-action">
          <div class="dashboard-quick-action__icon"><i class="fas fa-project-diagram"></i></div>
          <div class="dashboard-quick-action__title">Добавить проект</div>
        </NuxtLink>
        
        <NuxtLink to="/admin/events/new" class="dashboard-quick-action">
          <div class="dashboard-quick-action__icon"><i class="fas fa-calendar-plus"></i></div>
          <div class="dashboard-quick-action__title">Добавить событие</div>
        </NuxtLink>
        
        <div @click="scrollToGallery" class="dashboard-quick-action dashboard-quick-action--purple">
          <div class="dashboard-quick-action__icon"><i class="fas fa-image"></i></div>
          <div class="dashboard-quick-action__title">Добавить фото</div>
        </div>
      </div>
    </div>

    <div class="dashboard-sections">

      <div class="dashboard-section">
        <GalleryManager />
      </div>

      <div class="dashboard-section">
        <div class="dashboard-section__header">
          <h2 class="dashboard-section__title">Последние заявки</h2>
          <NuxtLink to="/admin/initiatives" class="dashboard-section__link">
            Все заявки
          </NuxtLink>
        </div>
        
        <div class="initiatives-cards">
          <div v-for="initiative in latestInitiatives" :key="initiative.id" class="initiative-card">
            <div class="initiative-card__header">
              <span class="initiative-card__id">#{{ initiative.id }}</span>
              <span 
                class="status-badge" 
                :class="`status-badge--${initiative.status}`"
              >
                {{ getStatusLabel(initiative.status) }}
              </span>
            </div>
            
            <div class="initiative-card__content">
              <h3 class="initiative-card__name">{{ initiative.name }}</h3>
              <p class="initiative-card__description">{{ initiative.description.substring(0, 100) }}{{ initiative.description.length > 100 ? '...' : '' }}</p>
              
              <div class="initiative-card__meta">
                <div class="initiative-card__meta-item">
                  <i class="fas fa-tag"></i> {{ getDirectionLabel(initiative.direction) }}
                </div>
                <div class="initiative-card__meta-item">
                  <i class="fas fa-calendar"></i> {{ formatDate(initiative.date) }}
                </div>
              </div>
            </div>
            
            <div class="initiative-card__actions">
              <NuxtLink 
                :to="`/admin/initiatives/${initiative.id}`" 
                class="btn btn--primary btn--sm"
              >
                <i class="fas fa-edit"></i> Управление
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useNewsStore } from '~/stores/news';
import { useInitiativesStore } from '~/stores/initiatives';
import { useGalleryStore } from '~/stores/gallery';
import GalleryManager from '~/components/admin/GalleryManager.vue';

definePageMeta({
  layout: 'admin'
});

const router = useRouter();
const newsStore = useNewsStore();
const initiativesStore = useInitiativesStore();
const galleryStore = useGalleryStore();

// UI state
const showAddPhotoForm = ref(false);

// Функция для плавного скролла к галерее
function scrollToGallery() {
  const galleryElement = document.querySelector('.gallery-manager');
  if (galleryElement) {
    galleryElement.scrollIntoView({ behavior: 'smooth' });
  }
}

onMounted(() => {
  const isAuthenticated = localStorage.getItem('cmgi_admin_auth');
  if (!isAuthenticated) {
    router.push('/admin/login');
  }
  
  // Fetch data
  newsStore.fetchNews();
  initiativesStore.fetchInitiatives();
});

// Stats
const newsCount = computed(() => newsStore.news.length);
const newInitiativesCount = computed(() => initiativesStore.initiatives.filter(i => i.status === 'new').length);
const photosCount = computed(() => galleryStore.photos.length);

// Latest initiatives
const latestInitiatives = computed(() => {
  return [...initiativesStore.initiatives].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  }).slice(0, 5);
});

// Latest news
const latestNews = computed(() => {
  return [...newsStore.news].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  }).slice(0, 5);
});

// Helper functions
const getDirectionLabel = (direction) => {
  const directions = {
    'uray-youth': 'Урай Молодёжный',
    'volunteers': 'Волонтёры Победы',
    'dobro-center': 'Добро.Центр',
    'other': 'Другое'
  };
  return directions[direction] || direction;
};

const getStatusLabel = (status) => {
  const statuses = {
    'new': 'Новая',
    'in-progress': 'В работе',
    'completed': 'Завершена'
  };
  return statuses[status] || status;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  }).format(date);
};
</script>

<style lang="scss">
.admin-dashboard {
  .dashboard-stats {
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
  
  .dashboard-stat-card {
    background-color: $white;
    border-radius: $border-radius-md;
    padding: $spacing-lg;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    
    &__icon {
      font-size: $font-size-xxl;
      margin-right: $spacing-md;
      background-color: $light-purple;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    &__title {
      font-size: $font-size-sm;
      color: lighten($dark-gray, 20%);
      margin-bottom: $spacing-xs;
    }
    
    &__value {
      font-size: $font-size-xl;
      font-weight: 700;
      color: $primary-purple;
    }
  }
  
  .dashboard-sections {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-xl;
    margin-bottom: $spacing-xl;
  }
  
  .dashboard-section {
    background-color: $white;
    border-radius: $border-radius-md;
    padding: $spacing-lg;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    margin-bottom: $spacing-lg;
    overflow-x: auto; // Добавляем горизонтальную прокрутку для секций
    
    @include mobile {
      padding: $spacing-md;
    }
    
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: $spacing-lg;
      
      @include mobile {
        flex-direction: column;
        align-items: flex-start;
        gap: $spacing-sm;
      }
    }
    
    &__title {
      font-size: $font-size-lg;
      margin: 0;
    }
    
    &__link {
      color: $primary-purple;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
  
  .dashboard-table {
    overflow-x: auto;
    max-width: 100%;
    margin-bottom: $spacing-md;
    
    table {
      width: 100%;
      min-width: 600px; // Минимальная ширина таблицы для прокрутки на мобильных устройствах
      border-collapse: collapse;
      
      th, td {
        padding: $spacing-md;
        text-align: left;
        border-bottom: 1px solid rgba($dark-gray, 0.1);
        
        @include mobile {
          padding: $spacing-sm;
          font-size: $font-size-sm;
        }
      }
      
      th {
        font-weight: 600;
        color: lighten($dark-gray, 20%);
        font-size: $font-size-sm;
        white-space: nowrap;
      }
      
      tr:last-child td {
        border-bottom: none;
      }
    }
    
    &__action {
      color: $primary-purple;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
  
  .status-badge {
    display: inline-block;
    padding: $spacing-xs $spacing-sm;
    border-radius: $border-radius-sm;
    font-size: $font-size-xs;
    font-weight: 500;
    
    &--new {
      background-color: rgba($primary-purple, 0.1);
      color: $primary-purple;
    }
    
    &--in-progress {
      background-color: rgba($primary-green, 0.1);
      color: darken($primary-green, 30%);
    }
    
    &--completed {
      background-color: rgba(#4CAF50, 0.1);
      color: #4CAF50;
    }
  }
  
  .dashboard-quick-actions {
    background-color: $white;
    border-radius: $border-radius-md;
    padding: $spacing-lg;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    
    &__title {
      font-size: $font-size-lg;
      margin-bottom: $spacing-lg;
    }
    
    &__grid {
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
  
  .dashboard-quick-action {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: $spacing-lg;
    background-color: $light-purple;
    border-radius: $border-radius-md;
    text-align: center;
    transition: $transition-base;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-5px);
      background-color: $primary-purple;
      color: $white;
    }
    
    &--purple {
      background-color: $light-purple;
      
      .dashboard-quick-action__icon,
      .dashboard-quick-action__title {
        color: $primary-purple;
      }
      
      &:hover {
        background-color: $primary-purple;
        
        .dashboard-quick-action__icon,
        .dashboard-quick-action__title {
          color: $white;
        }
      }
    }
    
    &__icon {
      font-size: $font-size-xxl;
      margin-bottom: $spacing-md;
    }
    
    &__title {
      font-weight: 500;
    }
  }
  
  .initiatives-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-lg;
    
    @include tablet {
      grid-template-columns: 1fr;
    }
  }
  
  .initiative-card {
    background-color: $white;
    border-radius: $border-radius-md;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $spacing-sm $spacing-md;
      background-color: $light-purple;
      border-bottom: 1px solid rgba($dark-gray, 0.1);
    }
    
    &__id {
      font-weight: 600;
      color: $primary-purple;
    }
    
    &__content {
      padding: $spacing-md;
      flex: 1;
    }
    
    &__name {
      font-size: $font-size-base;
      margin-bottom: $spacing-sm;
    }
    
    &__description {
      color: lighten($dark-gray, 20%);
      margin-bottom: $spacing-md;
      font-size: $font-size-sm;
    }
    
    &__meta {
      display: flex;
      flex-wrap: wrap;
      gap: $spacing-md;
      margin-bottom: $spacing-md;
      font-size: $font-size-xs;
    }
    
    &__meta-item {
      display: flex;
      align-items: center;
      gap: $spacing-xs;
      color: lighten($dark-gray, 30%);
      
      i {
        color: $primary-purple;
      }
    }
    
    &__actions {
      padding: $spacing-sm $spacing-md;
      border-top: 1px solid rgba($dark-gray, 0.1);
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
