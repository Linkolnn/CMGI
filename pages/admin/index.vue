<template>
  <div class="admin-dashboard">
    <div class="dashboard-stats">
      <div class="dashboard-stat-card">
        <div class="dashboard-stat-card__icon">📝</div>
        <div class="dashboard-stat-card__content">
          <h3 class="dashboard-stat-card__title">Новые заявки</h3>
          <div class="dashboard-stat-card__value">{{ newInitiativesCount }}</div>
        </div>
      </div>
      
      <div class="dashboard-stat-card">
        <div class="dashboard-stat-card__icon">📰</div>
        <div class="dashboard-stat-card__content">
          <h3 class="dashboard-stat-card__title">Новости</h3>
          <div class="dashboard-stat-card__value">{{ newsCount }}</div>
        </div>
      </div>
      
      <div class="dashboard-stat-card">
        <div class="dashboard-stat-card__icon">🗓️</div>
        <div class="dashboard-stat-card__content">
          <h3 class="dashboard-stat-card__title">События</h3>
          <div class="dashboard-stat-card__value">{{ eventsCount }}</div>
        </div>
      </div>
      
      <div class="dashboard-stat-card">
        <div class="dashboard-stat-card__icon">👥</div>
        <div class="dashboard-stat-card__content">
          <h3 class="dashboard-stat-card__title">Пользователи</h3>
          <div class="dashboard-stat-card__value">{{ usersCount }}</div>
        </div>
      </div>
    </div>
    
    <div class="dashboard-sections">
      <div class="dashboard-section">
        <div class="dashboard-section__header">
          <h2 class="dashboard-section__title">Последние заявки</h2>
          <NuxtLink to="/admin/initiatives" class="dashboard-section__link">
            Все заявки
          </NuxtLink>
        </div>
        
        <div class="dashboard-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Направление</th>
                <th>Дата</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="initiative in latestInitiatives" :key="initiative.id">
                <td>{{ initiative.id }}</td>
                <td>{{ initiative.name }}</td>
                <td>{{ getDirectionLabel(initiative.direction) }}</td>
                <td>{{ formatDate(initiative.date) }}</td>
                <td>
                  <span 
                    class="status-badge" 
                    :class="`status-badge--${initiative.status}`"
                  >
                    {{ getStatusLabel(initiative.status) }}
                  </span>
                </td>
                <td>
                  <NuxtLink 
                    :to="`/admin/initiatives/${initiative.id}`" 
                    class="dashboard-table__action"
                  >
                    Просмотр
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="dashboard-section">
        <div class="dashboard-section__header">
          <h2 class="dashboard-section__title">Последние новости</h2>
          <NuxtLink to="/admin/news" class="dashboard-section__link">
            Все новости
          </NuxtLink>
        </div>
        
        <div class="dashboard-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Заголовок</th>
                <th>Категория</th>
                <th>Дата</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="news in latestNews" :key="news.id">
                <td>{{ news.id }}</td>
                <td>{{ news.title }}</td>
                <td>{{ news.category }}</td>
                <td>{{ formatDate(news.date) }}</td>
                <td>
                  <NuxtLink 
                    :to="`/admin/news/${news.id}`" 
                    class="dashboard-table__action"
                  >
                    Редактировать
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <div class="dashboard-quick-actions">
      <h2 class="dashboard-quick-actions__title">Быстрые действия</h2>
      <div class="dashboard-quick-actions__grid">
        <NuxtLink to="/admin/initiatives/new" class="dashboard-quick-action">
          <div class="dashboard-quick-action__icon">📝</div>
          <div class="dashboard-quick-action__title">Добавить заявку</div>
        </NuxtLink>
        
        <NuxtLink to="/admin/news/new" class="dashboard-quick-action">
          <div class="dashboard-quick-action__icon">📰</div>
          <div class="dashboard-quick-action__title">Добавить новость</div>
        </NuxtLink>
        
        <NuxtLink to="/admin/events/new" class="dashboard-quick-action">
          <div class="dashboard-quick-action__icon">🗓️</div>
          <div class="dashboard-quick-action__title">Добавить событие</div>
        </NuxtLink>
        
        <NuxtLink to="/admin/users/new" class="dashboard-quick-action">
          <div class="dashboard-quick-action__icon">👥</div>
          <div class="dashboard-quick-action__title">Добавить пользователя</div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useNewsStore } from '~/stores/news';
import { useInitiativesStore } from '~/stores/initiatives';

definePageMeta({
  layout: 'admin'
});

const router = useRouter();
const newsStore = useNewsStore();
const initiativesStore = useInitiativesStore();

// Check if user is authenticated
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
const newInitiativesCount = computed(() => initiativesStore.getNewInitiativesCount);
const newsCount = computed(() => newsStore.news.length);
const eventsCount = ref(12); // Mock data
const usersCount = ref(5); // Mock data

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
    grid-template-columns: repeat(4, 1fr);
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
    
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: $spacing-lg;
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
    
    table {
      width: 100%;
      border-collapse: collapse;
      
      th, td {
        padding: $spacing-md;
        text-align: left;
        border-bottom: 1px solid rgba($dark-gray, 0.1);
      }
      
      th {
        font-weight: 600;
        color: lighten($dark-gray, 20%);
        font-size: $font-size-sm;
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
      grid-template-columns: repeat(4, 1fr);
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
    
    &:hover {
      transform: translateY(-5px);
      background-color: $primary-purple;
      color: $white;
    }
    
    &__icon {
      font-size: $font-size-xxl;
      margin-bottom: $spacing-md;
    }
    
    &__title {
      font-weight: 500;
    }
  }
}
</style>
