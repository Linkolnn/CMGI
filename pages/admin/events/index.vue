<template>
  <div class="admin-events">
    <div class="admin-events__header">
      <h1 class="admin-events__title">Управление событиями</h1>
      <NuxtLink to="/admin/events/new" class="btn btn--primary">
        <i class="fas fa-plus-circle"></i> Добавить событие
      </NuxtLink>
    </div>
    
    <div class="admin-events__filters">
      <div class="filter-group">
        <label for="category-filter" class="filter-group__label">Категория:</label>
        <select id="category-filter" v-model="selectedCategory" class="filter-group__select">
          <option value="all">Все категории</option>
          <option v-for="category in eventsStore.categories" :key="category.value" :value="category.value">
            {{ category.label }}
          </option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="status-filter" class="filter-group__label">Статус:</label>
        <select id="status-filter" v-model="selectedStatus" class="filter-group__select">
          <option value="all">Все события</option>
          <option value="upcoming">Предстоящие</option>
          <option value="past">Прошедшие</option>
        </select>
      </div>
    </div>
    
    <div v-if="filteredEvents.length === 0" class="admin-events__empty">
      <i class="fas fa-calendar-times admin-events__empty-icon"></i>
      <p class="admin-events__empty-text">События не найдены. Создайте новое событие!</p>
    </div>
    
    <div v-else class="admin-events__list">
      <div v-for="event in filteredEvents" :key="event.id" class="event-card">
        <div class="event-card__image">
          <img :src="event.image || '/images/newsCardBanner.jpg'" :alt="event.title" />
        </div>
        
        <div class="event-card__content">
          <div class="event-card__meta">
            <span class="event-card__date">{{ formatDate(event.date) }}</span>
            <span class="event-card__category">{{ eventsStore.getCategoryLabel(event.category) }}</span>
            <span class="event-card__status" :class="{ 'event-card__status--past': isPastEvent(event) }">
              {{ isPastEvent(event) ? 'Прошедшее' : 'Предстоящее' }}
            </span>
          </div>
          
          <h3 class="event-card__title">{{ event.title }}</h3>
          <p class="event-card__description">{{ event.description }}</p>
          
          <div class="event-card__details">
            <div class="event-card__location">
              <i class="fas fa-map-marker-alt"></i> {{ event.location }}
            </div>
          </div>
          
          <div class="event-card__actions">
            <button @click="editEvent(event.id)" class="btn btn--secondary btn--sm">
              <i class="fas fa-edit"></i> Редактировать
            </button>
            <button @click="confirmDelete(event)" class="btn btn--danger btn--sm">
              <i class="fas fa-trash-alt"></i> Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Модальное окно подтверждения удаления -->
    <div v-if="showDeleteModal" class="admin-modal">
      <div class="admin-modal__content">
        <h3 class="admin-modal__title">Подтверждение удаления</h3>
        <p class="admin-modal__text">
          Вы уверены, что хотите удалить событие "{{ eventToDelete?.title }}"?
          Это действие невозможно отменить.
        </p>
        <div class="admin-modal__actions">
          <button class="admin-button admin-button--secondary" @click="showDeleteModal = false">
            Отмена
          </button>
          <button class="admin-button admin-button--danger" @click="deleteEvent">
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useEventsStore } from '~/stores/events';

definePageMeta({
  layout: 'admin'
});

const router = useRouter();
const eventsStore = useEventsStore();

// Состояние компонента
const selectedCategory = ref('all');
const selectedStatus = ref('all');
const showDeleteModal = ref(false);
const eventToDelete = ref(null);

// Инициализация данных
onMounted(() => {
  eventsStore.initEvents();
});

// Отфильтрованные события
const filteredEvents = computed(() => {
  let events = [];
  
  // Фильтрация по статусу (предстоящие/прошедшие)
  if (selectedStatus.value === 'upcoming') {
    events = eventsStore.getUpcomingEvents();
  } else if (selectedStatus.value === 'past') {
    events = eventsStore.getPastEvents();
  } else {
    events = eventsStore.events;
  }
  
  // Фильтрация по категории
  if (selectedCategory.value !== 'all') {
    events = events.filter(event => event.category === selectedCategory.value);
  }
  
  return events;
});

// Форматирование даты
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Проверка, является ли событие прошедшим
const isPastEvent = (event) => {
  if (!event.date) return false;
  const eventDate = new Date(event.date);
  const now = new Date();
  return eventDate < now;
};

// Редактирование события
const editEvent = (id) => {
  router.push(`/admin/events/${id}`);
};

// Подтверждение удаления
const confirmDelete = (event) => {
  eventToDelete.value = event;
  showDeleteModal.value = true;
};

// Удаление события
const deleteEvent = () => {
  if (eventToDelete.value) {
    eventsStore.deleteEvent(eventToDelete.value.id);
    showDeleteModal.value = false;
    eventToDelete.value = null;
  }
};
</script>

<style lang="scss">
.admin-events {
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
  
  &__empty {
    background-color: $white;
    padding: $spacing-xl;
    border-radius: $border-radius-md;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    
    &-icon {
      font-size: 3rem;
      color: $light-gray;
      margin-bottom: $spacing-md;
    }
    
    &-text {
      color: $dark-gray;
    }
  }
  
  &__list {
    margin-bottom: $spacing-lg;
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
  
  &__select {
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

.event-card {
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
    flex-wrap: wrap;
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
  
  &__status {
    font-size: $font-size-sm;
    color: $white;
    background-color: $primary-green;
    padding: 2px 8px;
    border-radius: $border-radius-sm;
    
    &--past {
      background-color: $dark-gray;
    }
  }
  
  &__title {
    margin: 0 0 $spacing-sm;
    font-size: $font-size-lg;
  }
  
  &__description {
    margin: 0 0 $spacing-md;
    color: lighten($dark-gray, 20%);
    flex-grow: 1;
    
    // Ограничиваем высоту описания
    max-height: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  
  &__details {
    margin-bottom: $spacing-md;
  }
  
  &__location {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    color: lighten($dark-gray, 20%);
    font-size: $font-size-sm;
    
    i {
      color: $primary-purple;
    }
  }
  
  &__actions {
    display: flex;
    gap: $spacing-md;
    margin-top: auto;
  }
}

.admin-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($black, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  
  &__content {
    background-color: $white;
    border-radius: $border-radius-md;
    padding: $spacing-lg;
    width: 90%;
    max-width: 500px;
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

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-sm $spacing-md;
  border-radius: $border-radius-sm;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  gap: $spacing-xs;
  
  &--primary {
    background-color: $primary-purple;
    color: $white;
    
    &:hover {
      background-color: darken($primary-purple, 10%);
    }
  }
  
  &--secondary {
    background-color: $light-purple;
    color: $primary-purple;
    
    &:hover {
      background-color: darken($light-purple, 5%);
    }
  }
  
  &--danger {
    background-color: $error-red;
    color: $white;
    
    &:hover {
      background-color: darken($error-red, 10%);
    }
  }
  
  &--sm {
    font-size: $font-size-sm;
    padding: $spacing-xs $spacing-sm;
  }
}
</style>
