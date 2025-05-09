<template>
  <div class="admin-events-edit">
    <div class="admin-events-edit__header">
      <div class="admin-events-edit__back">
        <NuxtLink to="/admin/events" class="back-link">
          <i class="fas fa-arrow-left"></i> Назад к списку событий
        </NuxtLink>
      </div>
      <h1 class="admin-events-edit__title">Редактирование события</h1>
    </div>
    
    <div v-if="loading" class="admin-events-edit__loading">
      <i class="fas fa-spinner fa-spin"></i> Загрузка события...
    </div>
    
    <div v-else-if="error" class="admin-events-edit__error">
      <i class="fas fa-exclamation-circle"></i> {{ error }}
    </div>
    
    <template v-else>
      <div class="admin-events-edit__content">
        <div class="news-form-card">
          <form class="news-form" @submit.prevent="saveEvent">
            <div class="form__row">
              <div class="form__group">
                <label class="form__label">Название события *</label>
                <input 
                  type="text" 
                  class="form__input" 
                  :class="{ 'form__input--error': errors.title }"
                  v-model="eventForm.title" 
                  placeholder="Введите название события"
                >
                <span v-if="errors.title" class="form__error">{{ errors.title }}</span>
              </div>
              
              <div class="form__group">
                <label class="form__label">Категория *</label>
                <select 
                  class="form__select" 
                  :class="{ 'form__select--error': errors.category }"
                  v-model="eventForm.category"
                >
                  <option value="">Выберите категорию</option>
                  <option v-for="category in eventsStore.categories" :key="category.value" :value="category.value">
                    {{ category.label }}
                  </option>
                </select>
                <span v-if="errors.category" class="form__error">{{ errors.category }}</span>
              </div>
            </div>
            
            <div class="form__row">
              <div class="form__group">
                <label class="form__label">Дата и время проведения *</label>
                <input 
                  type="datetime-local" 
                  class="form__input" 
                  :class="{ 'form__input--error': errors.date }"
                  v-model="eventForm.date"
                >
                <span v-if="errors.date" class="form__error">{{ errors.date }}</span>
              </div>
              
              <div class="form__group">
                <label class="form__label">Место проведения *</label>
                <input 
                  type="text" 
                  class="form__input" 
                  :class="{ 'form__input--error': errors.location }"
                  v-model="eventForm.location" 
                  placeholder="Укажите адрес или место проведения"
                >
                <span v-if="errors.location" class="form__error">{{ errors.location }}</span>
              </div>
            </div>
            
            <div class="form__group">
              <label class="form__label">Описание события *</label>
              <textarea 
                class="form__textarea" 
                :class="{ 'form__textarea--error': errors.description }"
                v-model="eventForm.description"
                placeholder="Введите описание события"
              ></textarea>
              <span v-if="errors.description" class="form__error">{{ errors.description }}</span>
            </div>
            
            <div class="form__group">
              <label class="form__label">Изображение</label>
              <div class="image-preview" v-if="eventForm.image">
                <img :src="eventForm.image" alt="Предпросмотр изображения" class="image-preview__img">
                <button type="button" @click="removeImage" class="image-preview__remove">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              
              <div class="form__file-upload">
                <input 
                  type="file" 
                  accept="image/*"
                  @change="handleImageUpload"
                  class="form__file-input"
                >
                <div class="form__file-button">
                  <i class="fas fa-upload form__file-icon"></i>
                  <span class="form__file-text">Загрузить изображение</span>
                </div>
              </div>
              <span class="form__hint">Рекомендуемый размер: 1200x630 пикселей, JPG или PNG</span>
            </div>
            
            <div class="form__row">
              <div class="form__group">
                <label class="form__label">Организатор</label>
                <input 
                  type="text" 
                  class="form__input" 
                  v-model="eventForm.organizer"
                  placeholder="Название организации или ФИО организатора"
                >
              </div>
              
              <div class="form__group">
                <label class="form__label">Контактная информация</label>
                <input 
                  type="text" 
                  class="form__input" 
                  v-model="eventForm.contact"
                  placeholder="Телефон, email или другая контактная информация"
                >
              </div>
            </div>
            
            <div class="form__actions">
              <div>
                <button type="submit" class="btn btn--primary" :disabled="submitting">
                  <i class="fas" :class="submitting ? 'fa-spinner fa-spin' : 'fa-save'"></i> 
                  {{ submitting ? 'Сохранение...' : 'Сохранить' }}
                </button>
                <button type="button" @click="resetForm" class="btn btn--secondary">
                  <i class="fas fa-undo"></i> Сбросить
                </button>
              </div>
              <div>
                <button type="button" @click="confirmDelete" class="btn btn--danger">
                  <i class="fas fa-trash-alt"></i> Удалить
                </button>
              </div>
            </div>
          </form>
        </div>
        
        <div class="admin-events-edit__sidebar">
          <div class="sidebar-card">
            <h3 class="sidebar-card__title">Информация</h3>
            <div class="news-info">
              <div class="news-info__item">
                <span class="news-info__label">Создано:</span>
                <span class="news-info__value">{{ formatDate(eventForm.createdAt) }}</span>
              </div>
              <div class="news-info__item" v-if="eventForm.updatedAt">
                <span class="news-info__label">Обновлёно:</span>
                <span class="news-info__value">{{ formatDate(eventForm.updatedAt) }}</span>
              </div>
              <div class="news-info__item">
                <span class="news-info__label">Категория:</span>
                <span class="news-info__value">{{ getCategoryLabel(eventForm.category) }}</span>
              </div>
              <div class="news-info__item">
                <span class="news-info__label">Дата:</span>
                <span class="news-info__value">{{ formatEventDate(eventForm.date) }}</span>
              </div>
            </div>
          </div>
          
          <div class="sidebar-card">
            <h3 class="sidebar-card__title">Предпросмотр</h3>
            <div class="news-preview">
              <div class="news-preview__image">
                <img :src="eventForm.image || '/images/avatar.svg'" alt="Изображение события" />
              </div>
              <h3 class="news-preview__title">{{ eventForm.title || 'Название события' }}</h3>
              <p class="news-preview__excerpt">{{ eventForm.description || 'Описание события' }}</p>
              <div class="news-preview__meta">
                <span class="news-preview__date">{{ formatEventDate(eventForm.date) }}</span>
                <span class="news-preview__category">{{ getCategoryLabel(eventForm.category) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="delete-modal">
      <div class="delete-modal__content">
        <h2 class="delete-modal__title">Подтверждение удаления</h2>
        <p class="delete-modal__text">
          Вы уверены, что хотите удалить событие "{{ eventForm.title }}"? Это действие нельзя отменить.
        </p>
        <div class="delete-modal__actions">
          <button @click="cancelDelete" class="btn btn--secondary">
            <i class="fas fa-times"></i> Отмена
          </button>
          <button @click="deleteEvent" class="btn btn--danger">
            <i class="fas fa-trash-alt"></i> Удалить
          </button>
        </div>
      </div>
    </div>
    
    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="success-modal">
      <div class="success-modal__content">
        <div class="success-modal__icon"><i class="fas fa-check-circle"></i></div>
        <h2 class="success-modal__title">Событие успешно сохранено!</h2>
        <p class="success-modal__text">
          Изменения были успешно сохранены.
        </p>
        <div class="success-modal__actions">
          <button @click="closeSuccessModal" class="btn btn--primary">
            <i class="fas fa-check"></i> Готово
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useEventsStore } from '~/stores/events';

definePageMeta({
  layout: 'admin'
});

const router = useRouter();
const route = useRoute();
const eventsStore = useEventsStore();
const eventId = route.params.id;

const loading = ref(true);
const error = ref(null);
const submitting = ref(false);
const showDeleteModal = ref(false);
const showSuccessModal = ref(false);

// Форма события
const eventForm = reactive({
  title: '',
  category: '',
  description: '',
  date: '',
  location: '',
  image: '/images/avatar.svg',
  organizer: '',
  contact: '',
  createdAt: '',
  updatedAt: ''
});

// Ошибки валидации
const errors = reactive({
  title: '',
  category: '',
  description: '',
  date: '',
  location: ''
});

// Загрузка события
onMounted(() => {
  eventsStore.initEvents();
  loadEvent();
});

// Загрузка данных события
const loadEvent = () => {
  loading.value = true;
  error.value = null;
  
  try {
    const event = eventsStore.events.find(e => e.id === eventId);
    
    if (!event) {
      error.value = 'Событие не найдено';
      loading.value = false;
      return;
    }
    
    // Заполняем форму данными события
    Object.keys(eventForm).forEach(key => {
      if (event[key] !== undefined) {
        eventForm[key] = event[key];
      }
    });
    
    // Преобразуем дату в формат для input type="datetime-local"
    if (event.date) {
      const date = new Date(event.date);
      const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        .toISOString()
        .slice(0, 16);
      eventForm.date = localDate;
    }
    
    // Сбрасываем ошибки
    Object.keys(errors).forEach(key => {
      errors[key] = '';
    });
    
    loading.value = false;
  } catch (err) {
    console.error('Ошибка при загрузке события:', err);
    error.value = 'Ошибка при загрузке события';
    loading.value = false;
  }
};

// Валидация формы
const validateForm = () => {
  let isValid = true;
  
  // Валидация заголовка
  if (!eventForm.title.trim()) {
    errors.title = 'Необходимо указать название события';
    isValid = false;
  } else if (eventForm.title.length > 100) {
    errors.title = 'Название события не должно превышать 100 символов';
    isValid = false;
  } else {
    errors.title = '';
  }
  
  // Валидация категории
  if (!eventForm.category) {
    errors.category = 'Необходимо выбрать категорию';
    isValid = false;
  } else {
    errors.category = '';
  }
  
  // Валидация описания
  if (!eventForm.description.trim()) {
    errors.description = 'Необходимо указать описание события';
    isValid = false;
  } else {
    errors.description = '';
  }
  
  // Валидация даты
  if (!eventForm.date) {
    errors.date = 'Необходимо указать дату и время проведения';
    isValid = false;
  } else {
    errors.date = '';
  }
  
  // Валидация места проведения
  if (!eventForm.location.trim()) {
    errors.location = 'Необходимо указать место проведения';
    isValid = false;
  } else {
    errors.location = '';
  }
  
  return isValid;
};

// Сохранение события
const saveEvent = () => {
  if (!validateForm()) return;
  
  submitting.value = true;
  
  try {
    // Преобразуем дату в ISO формат
    const formattedDate = eventForm.date ? new Date(eventForm.date).toISOString() : new Date().toISOString();
    
    eventsStore.updateEvent(eventId, {
      ...eventForm,
      date: formattedDate,
      // Если изображение не указано, используем значение по умолчанию
      image: eventForm.image || '/images/avatar.svg'
    });
    
    // Показываем модальное окно успеха
    showSuccessModal.value = true;
    submitting.value = false;
  } catch (err) {
    console.error('Ошибка при сохранении события:', err);
    alert('Ошибка при сохранении события');
    submitting.value = false;
  }
};

// Сброс формы
const resetForm = () => {
  loadEvent();
};

// Подтверждение удаления
const confirmDelete = () => {
  showDeleteModal.value = true;
};

// Отмена удаления
const cancelDelete = () => {
  showDeleteModal.value = false;
};

// Удаление события
const deleteEvent = () => {
  try {
    eventsStore.deleteEvent(eventId);
    showDeleteModal.value = false;
    router.push('/admin/events');
  } catch (err) {
    console.error('Ошибка при удалении события:', err);
    alert('Ошибка при удалении события');
  }
};

// Закрытие модального окна успеха
const closeSuccessModal = () => {
  showSuccessModal.value = false;
  router.push('/admin/events');
};

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

// Получение названия категории
const getCategoryLabel = (value) => {
  if (!value) return '';
  return eventsStore.getCategoryLabel(value);
};

// Форматирование даты и времени события для отображения
const formatEventDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
</script>

<style lang="scss">
.admin-events-edit {
  position: relative;
  
  &__header {
    margin-bottom: $spacing-lg;
  }
  
  &__back {
    margin-bottom: $spacing-sm;
  }
  
  &__title {
    margin: 0;
  }
  
  &__loading,
  &__error {
    background-color: $white;
    padding: $spacing-xl;
    border-radius: $border-radius-md;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    margin-bottom: $spacing-lg;
  }
  
  &__content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-areas: "form sidebar";
    gap: $spacing-lg;
    
    @include tablet {
      grid-template-columns: 1fr;
      grid-template-areas: 
        "sidebar"
        "form";
    }
  }
  
  &__sidebar {
    grid-area: sidebar;
  }
}

.back-link {
  color: $primary-purple;
  
  &:hover {
    text-decoration: underline;
  }
}

.news-form-card {
  background-color: $white;
  border-radius: $border-radius-md;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  padding: $spacing-lg;
  grid-area: form;
}

.news-form {
  .form__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-lg;
    
    @include mobile {
      grid-template-columns: 1fr;
    }
  }
  
  .form__group {
    margin-bottom: $spacing-lg;
  }
  
  .form__label {
    display: block;
    margin-bottom: $spacing-xs;
    font-weight: 500;
  }
  
  .form__input,
  .form__select,
  .form__textarea {
    width: 100%;
    padding: $spacing-md;
    border: 1px solid rgba($dark-gray, 0.2);
    border-radius: $border-radius-sm;
    
    &:focus {
      outline: none;
      border-color: $primary-purple;
    }
    
    &--error {
      border-color: $error-red;
    }
  }
  
  .form__error {
    display: block;
    color: $error-red;
    font-size: $font-size-sm;
    margin-top: $spacing-xs;
  }
  
  .form__hint {
    display: block;
    font-size: $font-size-sm;
    color: lighten($dark-gray, 30%);
    margin-top: $spacing-xs;
  }
  
  .form__textarea {
    resize: vertical;
    min-height: 120px;
  }
  
  .form__file-upload {
    position: relative;
    margin-bottom: $spacing-xs;
  }
  
  .form__file-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 2;
  }
  
  .form__file-button {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-md;
    background-color: $light-purple;
    border: 1px dashed $primary-purple;
    border-radius: $border-radius-sm;
    cursor: pointer;
  }
  
  .form__file-icon {
    font-size: $font-size-lg;
  }
  
  .form__file-text {
    font-weight: 500;
  }
  
  .form__actions {
    display: flex;
    justify-content: space-between;
    margin-top: $spacing-xl;
    
    div {
      display: flex;
      gap: $spacing-md;
    }
    
    @include mobile {
      flex-direction: column;
      gap: $spacing-md;
      
      div {
        justify-content: space-between;
      }
    }
  }
}

.image-preview {
  position: relative;
  margin-bottom: $spacing-lg;
  
  &__img {
    width: 100%;
    max-height: 300px;
    object-fit: contain;
    border-radius: $border-radius-md;
  }
  
  &__remove {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    background-color: rgba($black, 0.7);
    color: $white;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: $font-size-base;
    
    &:hover {
      background-color: rgba($black, 0.9);
    }
  }
}

.sidebar-card {
  background-color: $white;
  border-radius: $border-radius-md;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  padding: $spacing-lg;
  margin-bottom: $spacing-lg;
  
  &__title {
    margin: 0 0 $spacing-lg;
    font-size: $font-size-lg;
  }
}

.news-info {
  &__item {
    display: flex;
    margin-bottom: $spacing-md;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  &__label {
    flex: 0 0 100px;
    font-weight: 500;
  }
  
  &__value {
    flex: 1;
  }
}

.news-preview {
  &__image {
    margin-bottom: $spacing-md;
    
    img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: $border-radius-sm;
    }
  }
  
  &__title {
    margin: 0 0 $spacing-sm;
    font-size: $font-size-base;
  }
  
  &__excerpt {
    margin: 0 0 $spacing-md;
    font-size: $font-size-sm;
    color: lighten($dark-gray, 20%);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  &__meta {
    display: flex;
    justify-content: space-between;
    font-size: $font-size-sm;
  }
  
  &__date {
    color: lighten($dark-gray, 30%);
  }
  
  &__category {
    color: $primary-purple;
    font-weight: 500;
  }
}

.delete-modal,
.success-modal {
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
}

.delete-modal {
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

.success-modal {
  &__content {
    background-color: $white;
    border-radius: $border-radius-md;
    padding: $spacing-xl;
    max-width: 500px;
    width: 100%;
    text-align: center;
  }
  
  &__icon {
    font-size: 48px;
    margin-bottom: $spacing-md;
    color: $success-green;
  }
  
  &__title {
    margin-bottom: $spacing-md;
    color: $success-green;
  }
  
  &__text {
    margin-bottom: $spacing-lg;
  }
  
  &__actions {
    display: flex;
    justify-content: center;
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
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  &--primary {
    background-color: $primary-purple;
    color: $white;
    
    &:hover:not(:disabled) {
      background-color: darken($primary-purple, 10%);
    }
  }
  
  &--secondary {
    background-color: $light-purple;
    color: $primary-purple;
    
    &:hover:not(:disabled) {
      background-color: darken($light-purple, 5%);
    }
  }
  
  &--danger {
    background-color: $error-red;
    color: $white;
    
    &:hover:not(:disabled) {
      background-color: darken($error-red, 10%);
    }
  }
}
</style>
