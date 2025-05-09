<template>
  <div class="admin-projects-edit">
    <div class="admin-projects-edit__header">
      <div class="admin-projects-edit__back">
        <NuxtLink to="/admin/projects" class="back-link">
          <i class="fas fa-arrow-left"></i> Назад к списку проектов
        </NuxtLink>
      </div>
      <h1 class="admin-projects-edit__title">Редактирование проекта</h1>
    </div>
    
    <div v-if="loading" class="admin-projects-edit__loading">
      <i class="fas fa-spinner fa-spin"></i> Загрузка проекта...
    </div>
    
    <div v-else-if="error" class="admin-projects-edit__error">
      <i class="fas fa-exclamation-circle"></i> {{ error }}
    </div>
    
    <template v-else>
      <div class="admin-projects-edit__content">
        <div class="news-form-card">
          <form class="news-form" @submit.prevent="saveProject">
            <div class="form__row">
              <div class="form__group">
                <label class="form__label">Название проекта *</label>
                <input 
                  type="text" 
                  class="form__input" 
                  :class="{ 'form__input--error': errors.title }"
                  v-model="projectForm.title" 
                  placeholder="Введите название проекта"
                >
                <span v-if="errors.title" class="form__error">{{ errors.title }}</span>
              </div>
              
              <div class="form__group">
                <label class="form__label">Категория *</label>
                <select 
                  class="form__select" 
                  :class="{ 'form__select--error': errors.category }"
                  v-model="projectForm.category"
                >
                  <option value="">Выберите категорию</option>
                  <option v-for="category in projectsStore.categories" :key="category.value" :value="category.value">
                    {{ category.label }}
                  </option>
                </select>
                <span v-if="errors.category" class="form__error">{{ errors.category }}</span>
              </div>
            </div>
            
            <div class="form__group">
              <label class="form__label">Описание проекта *</label>
              <textarea 
                class="form__textarea" 
                :class="{ 'form__textarea--error': errors.description }"
                v-model="projectForm.description"
                placeholder="Введите описание проекта"
              ></textarea>
              <span v-if="errors.description" class="form__error">{{ errors.description }}</span>
            </div>
            
            <div class="form__group">
              <label class="form__label">Изображение</label>
              <div class="image-preview" v-if="projectForm.image">
                <img :src="projectForm.image" alt="Предпросмотр изображения" class="image-preview__img">
                <button type="button" @click="removeImage" class="image-preview__remove">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              
              <div class="form__file-upload">
                <input 
                  type="file" 
                  accept="image/*"
                  class="form__file-input"
                  @change="handleImageUpload"
                />
                <div class="form__file-button">
                  <i class="fas fa-cloud-upload-alt form__file-icon"></i>
                  <span class="form__file-text">Выберите изображение</span>
                </div>
              </div>
              <p class="form__hint">
                Рекомендуемый размер: 800x600px. Допустимые форматы: JPG, PNG, GIF.
              </p>
              <div v-if="projectForm.image" class="image-preview">
                <img :src="projectForm.image" alt="Предпросмотр изображения" class="image-preview__img" />
                <button 
                  type="button" 
                  @click="removeImage" 
                  class="image-preview__remove"
                  title="Удалить изображение"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div class="form__row">
              <div class="form__group">
                <label for="coordinator" class="form__label">Координатор проекта</label>
                <input 
                  id="coordinator" 
                  v-model="projectForm.coordinator" 
                  type="text" 
                  class="form__input" 
                  placeholder="ФИО координатора проекта"
                >
              </div>
              
              <div class="form__group">
                <label for="contact" class="form__label">Контактная информация</label>
                <input 
                  id="contact" 
                  v-model="projectForm.contact" 
                  type="text" 
                  class="form__input" 
                  placeholder="Телефон, email или другие контакты"
                >
              </div>
            </div>
            
            <div class="form__actions">
              <div>
                <button
                  type="submit"
                  class="btn btn--primary"
                  :disabled="submitting"
                >
                  <i class="fas fa-save"></i> {{ submitting ? 'Сохранение...' : 'Сохранить проект' }}
                </button>
                <button
                  type="button"
                  @click="resetForm"
                  class="btn btn--secondary"
                  :disabled="submitting"
                >
                  <i class="fas fa-eraser"></i> Сбросить
                </button>
              </div>
              <button
                type="button"
                @click="confirmDelete"
                class="btn btn--danger"
                :disabled="submitting"
              >
                <i class="fas fa-trash-alt"></i> Удалить проект
              </button>
            </div>
          </form>
        </div>
        
        <div class="admin-projects-edit__sidebar">
          <div class="sidebar-card">
            <h3 class="sidebar-card__title">Информация</h3>
            <div class="news-info">
              <div class="news-info__item">
                <span class="news-info__label">Создан:</span>
                <span class="news-info__value">{{ formatDate(projectForm.createdAt) }}</span>
              </div>
              <div class="news-info__item" v-if="projectForm.updatedAt">
                <span class="news-info__label">Обновлён:</span>
                <span class="news-info__value">{{ formatDate(projectForm.updatedAt) }}</span>
              </div>
              <div class="news-info__item">
                <span class="news-info__label">Категория:</span>
                <span class="news-info__value">{{ getCategoryLabel(projectForm.category) }}</span>
              </div>
              <div class="news-info__item">
                <span class="news-info__label">Статус:</span>
                <span class="news-info__value">{{ projectForm.status }}</span>
              </div>
            </div>
          </div>
          
          <div class="sidebar-card">
            <h3 class="sidebar-card__title">Предпросмотр</h3>
            <div class="news-preview">
              <div class="news-preview__image">
                <img :src="projectForm.image || '/images/avatar.svg'" alt="Изображение проекта" />
              </div>
              <h3 class="news-preview__title">{{ projectForm.title || 'Название проекта' }}</h3>
              <p class="news-preview__excerpt">{{ projectForm.description || 'Описание проекта' }}</p>
              <div class="news-preview__meta">
                <span class="news-preview__date">{{ formatDate(projectForm.createdAt) }}</span>
                <span class="news-preview__category">{{ getCategoryLabel(projectForm.category) }}</span>
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
          Вы уверены, что хотите удалить проект "{{ projectForm.title }}"? Это действие нельзя отменить.
        </p>
        <div class="delete-modal__actions">
          <button @click="cancelDelete" class="btn btn--secondary">
            <i class="fas fa-times"></i> Отмена
          </button>
          <button @click="deleteProject" class="btn btn--danger">
            <i class="fas fa-trash-alt"></i> Удалить
          </button>
        </div>
      </div>
    </div>
    
    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="success-modal">
      <div class="success-modal__content">
        <div class="success-modal__icon"><i class="fas fa-check-circle"></i></div>
        <h2 class="success-modal__title">Проект успешно сохранен!</h2>
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
import { useProjectsStore } from '~/stores/projects';

definePageMeta({
  layout: 'admin'
});

const router = useRouter();
const route = useRoute();
const projectsStore = useProjectsStore();
const projectId = route.params.id;

const loading = ref(true);
const error = ref(null);
const submitting = ref(false);
const showDeleteModal = ref(false);
const showSuccessModal = ref(false);

// Форма проекта
const projectForm = reactive({
  title: '',
  category: '',
  description: '',
  image: '/images/avatar.svg',
  status: 'Активный проект',
  coordinator: '',
  contact: '',
  createdAt: '',
  updatedAt: ''
});

// Ошибки валидации
const errors = reactive({
  title: '',
  category: '',
  description: '',
  status: ''
});

// Загрузка проекта
onMounted(() => {
  projectsStore.initProjects();
  loadProject();
});

// Загрузка данных проекта
const loadProject = () => {
  loading.value = true;
  error.value = null;
  
  try {
    const project = projectsStore.projects.find(p => p.id === projectId);
    
    if (!project) {
      error.value = 'Проект не найден';
      loading.value = false;
      return;
    }
    
    // Заполняем форму данными проекта
    Object.keys(projectForm).forEach(key => {
      if (project[key] !== undefined) {
        projectForm[key] = project[key];
      }
    });
    
    // Сбрасываем ошибки
    Object.keys(errors).forEach(key => {
      errors[key] = '';
    });
    
    loading.value = false;
  } catch (err) {
    console.error('Ошибка при загрузке проекта:', err);
    error.value = 'Ошибка при загрузке проекта';
    loading.value = false;
  }
};

// Валидация формы
const validateForm = () => {
  let isValid = true;
  
  // Валидация заголовка
  if (!projectForm.title.trim()) {
    errors.title = 'Необходимо указать название проекта';
    isValid = false;
  } else if (projectForm.title.length > 100) {
    errors.title = 'Название проекта не должно превышать 100 символов';
    isValid = false;
  } else {
    errors.title = '';
  }
  
  // Валидация категории
  if (!projectForm.category) {
    errors.category = 'Необходимо выбрать категорию';
    isValid = false;
  } else {
    errors.category = '';
  }
  
  // Валидация описания
  if (!projectForm.description.trim()) {
    errors.description = 'Необходимо указать описание проекта';
    isValid = false;
  } else {
    errors.description = '';
  }
  
  // Валидация статуса
  if (!projectForm.status) {
    errors.status = 'Необходимо указать статус проекта';
    isValid = false;
  } else {
    errors.status = '';
  }
  
  return isValid;
};

// Обработка загрузки изображения
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  // В реальном приложении здесь была бы загрузка на сервер
  // Для примера просто используем URL.createObjectURL
  projectForm.image = URL.createObjectURL(file);
};

// Удаление изображения
const removeImage = () => {
  projectForm.image = '/images/avatar.svg';
};

// Сохранение проекта
const saveProject = () => {
  if (!validateForm()) return;
  
  submitting.value = true;
  
  try {
    projectsStore.updateProject(projectId, {
      ...projectForm,
      // Если изображение не указано, используем значение по умолчанию
      image: projectForm.image || '/images/avatar.svg'
    });
    
    // Показываем модальное окно успеха
    showSuccessModal.value = true;
    submitting.value = false;
  } catch (err) {
    console.error('Ошибка при сохранении проекта:', err);
    alert('Ошибка при сохранении проекта');
    submitting.value = false;
  }
};

// Сброс формы
const resetForm = () => {
  loadProject();
};

// Подтверждение удаления
const confirmDelete = () => {
  showDeleteModal.value = true;
};

// Отмена удаления
const cancelDelete = () => {
  showDeleteModal.value = false;
};

// Удаление проекта
const deleteProject = () => {
  try {
    projectsStore.deleteProject(projectId);
    showDeleteModal.value = false;
    router.push('/admin/projects');
  } catch (err) {
    console.error('Ошибка при удалении проекта:', err);
    alert('Ошибка при удалении проекта');
  }
};

// Закрытие модального окна успеха
const closeSuccessModal = () => {
  showSuccessModal.value = false;
  router.push('/admin/projects');
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
  return projectsStore.getCategoryLabel(value);
};
</script>

<style lang="scss">
.admin-projects-edit {
  position: relative;
  
  &__header {
    margin-bottom: $spacing-lg;
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
