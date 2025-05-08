<template>
  <div class="admin-news-edit">
    <div class="admin-news-edit__header">
      <div class="admin-news-edit__back">
        <NuxtLink to="/admin/news" class="back-link">
          ← Назад к списку новостей
        </NuxtLink>
      </div>
      <h1 class="admin-news-edit__title">
        Редактирование новости
      </h1>
    </div>
    
    <div v-if="loading" class="admin-news-edit__loading">
      <p>Загрузка новости...</p>
    </div>
    
    <div v-else-if="error" class="admin-news-edit__error">
      <p>{{ error }}</p>
      <button @click="fetchNews" class="btn btn--primary">
        Попробовать снова
      </button>
    </div>
    
    <template v-else-if="news">
      <div class="admin-news-edit__content">
        <div class="news-form-card">
          <form @submit.prevent="submitForm" class="news-form">
            <div class="form__group">
              <label for="title" class="form__label">Заголовок *</label>
              <input
                id="title"
                v-model="form.title"
                type="text"
                class="form__input"
                :class="{ 'form__input--error': errors.title }"
                placeholder="Введите заголовок новости"
                required
              />
              <span v-if="errors.title" class="form__error">{{ errors.title }}</span>
            </div>
            
            <div class="form__row">
              <div class="form__group">
                <label for="category" class="form__label">Категория *</label>
                <select
                  id="category"
                  v-model="form.category"
                  class="form__select"
                  :class="{ 'form__select--error': errors.category }"
                  required
                >
                  <option value="" disabled>Выберите категорию</option>
                  <option value="events">События</option>
                  <option value="announcements">Анонсы</option>
                  <option value="projects">Проекты</option>
                  <option value="other">Другое</option>
                </select>
                <span v-if="errors.category" class="form__error">{{ errors.category }}</span>
              </div>
              
              <div class="form__group">
                <label for="date" class="form__label">Дата публикации *</label>
                <input
                  id="date"
                  v-model="form.date"
                  type="date"
                  class="form__input"
                  :class="{ 'form__input--error': errors.date }"
                  required
                />
                <span v-if="errors.date" class="form__error">{{ errors.date }}</span>
              </div>
            </div>
            
            <div class="form__group">
              <label for="excerpt" class="form__label">Краткое описание *</label>
              <textarea
                id="excerpt"
                v-model="form.excerpt"
                class="form__textarea"
                :class="{ 'form__textarea--error': errors.excerpt }"
                placeholder="Введите краткое описание новости (до 200 символов)"
                rows="3"
                required
              ></textarea>
              <span v-if="errors.excerpt" class="form__error">{{ errors.excerpt }}</span>
            </div>
            
            <div class="form__group">
              <label for="content" class="form__label">Содержание *</label>
              <textarea
                id="content"
                v-model="form.content"
                class="form__textarea"
                :class="{ 'form__textarea--error': errors.content }"
                placeholder="Введите полное содержание новости"
                rows="10"
                required
              ></textarea>
              <span v-if="errors.content" class="form__error">{{ errors.content }}</span>
            </div>
            
            <div class="form__group">
              <label for="image" class="form__label">Изображение</label>
              <div class="form__file-upload">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  class="form__file-input"
                  @change="handleImageUpload"
                />
                <div class="form__file-button">
                  <span class="form__file-icon">🖼️</span>
                  <span class="form__file-text">{{ imageButtonText }}</span>
                </div>
              </div>
              <span class="form__hint">Рекомендуемый размер: 1200x800px. Максимальный размер файла: 2MB.</span>
            </div>
            
            <div v-if="imagePreview" class="image-preview">
              <img :src="imagePreview" alt="Preview" class="image-preview__img" />
              <button 
                type="button" 
                @click="removeImage" 
                class="image-preview__remove"
                title="Удалить изображение"
              >
                ✕
              </button>
            </div>
            
            <div class="form__actions">
              <button
                type="button"
                @click="confirmDelete"
                class="btn btn--danger"
                :disabled="submitting"
              >
                Удалить новость
              </button>
              <div>
                <button
                  type="button"
                  @click="cancelEdit"
                  class="btn btn--secondary"
                  :disabled="submitting"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  class="btn btn--primary"
                  :disabled="submitting"
                >
                  {{ submitting ? 'Сохранение...' : 'Сохранить изменения' }}
                </button>
              </div>
            </div>
          </form>
        </div>
        
        <div class="admin-news-edit__sidebar">
          <div class="sidebar-card">
            <h3 class="sidebar-card__title">Информация</h3>
            <div class="news-info">
              <div class="news-info__item">
                <span class="news-info__label">ID:</span>
                <span class="news-info__value">{{ news.id }}</span>
              </div>
              <div class="news-info__item">
                <span class="news-info__label">Создана:</span>
                <span class="news-info__value">{{ formatDate(news.date) }}</span>
              </div>
              <div class="news-info__item">
                <span class="news-info__label">Категория:</span>
                <span class="news-info__value">{{ getCategoryLabel(news.category) }}</span>
              </div>
            </div>
          </div>
          
          <div class="sidebar-card">
            <h3 class="sidebar-card__title">Предпросмотр</h3>
            <div class="news-preview">
              <div class="news-preview__image">
                <img :src="form.image || '/images/news-placeholder.jpg'" alt="Preview" />
              </div>
              <h4 class="news-preview__title">{{ form.title || 'Заголовок новости' }}</h4>
              <p class="news-preview__excerpt">{{ form.excerpt || 'Краткое описание новости' }}</p>
              <div class="news-preview__meta">
                <span class="news-preview__date">{{ formatDate(form.date) }}</span>
                <span class="news-preview__category">{{ getCategoryLabel(form.category) }}</span>
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
          Вы уверены, что хотите удалить эту новость?
          Это действие нельзя отменить.
        </p>
        <div class="delete-modal__actions">
          <button @click="cancelDelete" class="btn btn--secondary">
            Отмена
          </button>
          <button @click="deleteNews" class="btn btn--primary">
            Удалить
          </button>
        </div>
      </div>
    </div>
    
    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="success-modal">
      <div class="success-modal__content">
        <div class="success-modal__icon">✅</div>
        <h2 class="success-modal__title">Новость успешно обновлена!</h2>
        <p class="success-modal__text">
          Изменения были успешно сохранены.
        </p>
        <div class="success-modal__actions">
          <NuxtLink to="/admin/news" class="btn btn--secondary">
            Вернуться к списку
          </NuxtLink>
          <button @click="closeSuccessModal" class="btn btn--primary">
            Продолжить редактирование
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNewsStore } from '../../../stores/news';

definePageMeta({
  layout: 'admin'
});

const route = useRoute();
const router = useRouter();
const newsStore = useNewsStore();

const loading = ref(true);
const error = ref(null);
const news = ref(null);
const submitting = ref(false);
const showDeleteModal = ref(false);
const showSuccessModal = ref(false);
const selectedImage = ref(null);
const imagePreview = ref(null);

const form = ref({
  title: '',
  category: '',
  date: '',
  excerpt: '',
  content: '',
  image: null
});

const errors = ref({
  title: '',
  category: '',
  date: '',
  excerpt: '',
  content: ''
});

// Get news ID from route params
const newsId = computed(() => parseInt(route.params.id));

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
    
    const newsData = newsStore.getNewsById(newsId.value);
    if (!newsData) {
      error.value = 'Новость не найдена';
      return;
    }
    
    news.value = newsData;
    
    // Initialize form with news data
    form.value = {
      title: newsData.title,
      category: newsData.category,
      date: newsData.date,
      excerpt: newsData.excerpt,
      content: newsData.content,
      image: newsData.image
    };
    
    // Set image preview if image exists
    if (newsData.image && newsData.image !== '/images/news-placeholder.jpg') {
      imagePreview.value = newsData.image;
    }
  } catch (err) {
    error.value = 'Ошибка при загрузке новости. Пожалуйста, попробуйте позже.';
    console.error('Error fetching news:', err);
  } finally {
    loading.value = false;
  }
};

// Helper functions
const getCategoryLabel = (category) => {
  const categories = {
    'events': 'События',
    'announcements': 'Анонсы',
    'projects': 'Проекты',
    'other': 'Другое'
  };
  return categories[category] || 'Не указана';
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  }).format(date);
};

// Image upload handling
const imageButtonText = computed(() => {
  return selectedImage.value ? selectedImage.value.name : 'Изменить изображение';
});

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Check file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      alert('Файл слишком большой. Максимальный размер: 2MB');
      event.target.value = null;
      selectedImage.value = null;
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      event.target.value = null;
      selectedImage.value = null;
      return;
    }
    
    selectedImage.value = file;
    
    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
    
    // In a real application, this would be the file path or URL
    form.value.image = URL.createObjectURL(file);
  }
};

const removeImage = () => {
  selectedImage.value = null;
  imagePreview.value = null;
  form.value.image = '/images/news-placeholder.jpg';
  
  // Reset file input
  const fileInput = document.querySelector('.form__file-input');
  if (fileInput) {
    fileInput.value = null;
  }
};

// Form validation
const validateForm = () => {
  let isValid = true;
  errors.value = {
    title: '',
    category: '',
    date: '',
    excerpt: '',
    content: ''
  };
  
  if (!form.value.title.trim()) {
    errors.value.title = 'Заголовок обязателен';
    isValid = false;
  } else if (form.value.title.length > 100) {
    errors.value.title = 'Заголовок не должен превышать 100 символов';
    isValid = false;
  }
  
  if (!form.value.category) {
    errors.value.category = 'Выберите категорию';
    isValid = false;
  }
  
  if (!form.value.date) {
    errors.value.date = 'Дата публикации обязательна';
    isValid = false;
  }
  
  if (!form.value.excerpt.trim()) {
    errors.value.excerpt = 'Краткое описание обязательно';
    isValid = false;
  } else if (form.value.excerpt.length > 200) {
    errors.value.excerpt = 'Краткое описание не должно превышать 200 символов';
    isValid = false;
  }
  
  if (!form.value.content.trim()) {
    errors.value.content = 'Содержание обязательно';
    isValid = false;
  }
  
  return isValid;
};

// Form submission
const submitForm = async () => {
  if (!validateForm()) {
    // Scroll to the first error
    const firstError = document.querySelector('.form__input--error, .form__select--error, .form__textarea--error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }
  
  try {
    submitting.value = true;
    
    // In a real application, this would call an API to update the news
    // For demo purposes, we'll just update it in the store
    const updatedNews = {
      ...news.value,
      title: form.value.title,
      category: form.value.category,
      date: form.value.date,
      excerpt: form.value.excerpt,
      content: form.value.content,
      image: form.value.image
    };
    
    await newsStore.updateNews(updatedNews);
    
    // Show success modal
    showSuccessModal.value = true;
  } catch (error) {
    console.error('Error updating news:', error);
    alert('Ошибка при обновлении новости. Пожалуйста, попробуйте позже.');
  } finally {
    submitting.value = false;
  }
};

// Cancel edit
const cancelEdit = () => {
  router.push('/admin/news');
};

// Delete news
const confirmDelete = () => {
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  showDeleteModal.value = false;
};

const deleteNews = async () => {
  try {
    await newsStore.deleteNews(news.value.id);
    
    showDeleteModal.value = false;
    
    // Redirect to news list
    router.push('/admin/news');
  } catch (error) {
    console.error('Error deleting news:', error);
    alert('Ошибка при удалении новости');
  }
};

// Close success modal
const closeSuccessModal = () => {
  showSuccessModal.value = false;
};
</script>

<style lang="scss">
.admin-news-edit {
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
  }
  
  &__content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: $spacing-lg;
    
    @include tablet {
      grid-template-columns: 1fr;
    }
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
        justify-content: flex-end;
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
</style>
