<template>
  <div class="admin-news-new">
    <div class="admin-news-new__header">
      <div class="admin-news-new__back">
        <NuxtLink to="/admin/news" class="back-link">
          <i class="fas fa-arrow-left"></i> Назад к списку новостей
        </NuxtLink>
      </div>
      <h1 class="admin-news-new__title">
        Добавление новой новости
      </h1>
    </div>
    
    <div class="admin-news-new__content">
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
                <option value="" disabled selected>Выберите категорию</option>
                <option value="events">События</option>
                <option value="volunteers">Волонтёрство</option>
                <option value="announcements">Объявления</option>
                <option value="news">Новости</option>
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
                <div class="form__file-icon"><i class="fas fa-image"></i></div>
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
              @click="resetForm"
              class="btn btn--secondary"
              :disabled="submitting"
            >
              <i class="fas fa-eraser"></i> Очистить
            </button>
            <button
              type="submit"
              class="btn btn--primary"
              :disabled="submitting"
            >
              <i class="fas fa-paper-plane"></i> {{ submitting ? 'Сохранение...' : 'Опубликовать новость' }}
            </button>
          </div>
        </form>
      </div>
      
      <div class="admin-news-new__sidebar">
        <div class="sidebar-card">
          <h3 class="sidebar-card__title">Подсказки</h3>
          <div class="sidebar-tips">
            <div class="sidebar-tip">
              <h4 class="sidebar-tip__title">Заголовок</h4>
              <p class="sidebar-tip__text">
                Используйте краткие, но информативные заголовки, которые привлекут внимание читателей.
              </p>
            </div>
            
            <div class="sidebar-tip">
              <h4 class="sidebar-tip__title">Краткое описание</h4>
              <p class="sidebar-tip__text">
                Краткое описание отображается в списке новостей. Оно должно быть информативным и привлекать внимание.
              </p>
            </div>
            
            <div class="sidebar-tip">
              <h4 class="sidebar-tip__title">Содержание</h4>
              <p class="sidebar-tip__text">
                Структурируйте текст с помощью абзацев. Используйте факты, цитаты и конкретные детали.
              </p>
            </div>
            
            <div class="sidebar-tip">
              <h4 class="sidebar-tip__title">Изображение</h4>
              <p class="sidebar-tip__text">
                Качественное изображение увеличивает вовлеченность. Используйте фотографии высокого разрешения.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="success-modal">
      <div class="success-modal__content">
        <div class="success-modal__icon"><i class="fas fa-check-circle"></i></div>
        <h2 class="success-modal__title">Новость успешно опубликована!</h2>
        <p class="success-modal__text">
          Новость была успешно добавлена и опубликована на сайте.
        </p>
        <div class="success-modal__actions">
          <NuxtLink to="/admin/news" class="btn btn--secondary">
            <i class="fas fa-list"></i> Вернуться к списку
          </NuxtLink>
          <button @click="createAnother" class="btn btn--primary">
            <i class="fas fa-plus"></i> Создать еще одну
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

const form = ref({
  title: '',
  category: '',
  date: new Date().toISOString().split('T')[0], // Today's date as default
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

const submitting = ref(false);
const showSuccessModal = ref(false);
const selectedImage = ref(null);
const imagePreview = ref(null);

// Check if user is authenticated
onMounted(() => {
  const isAuthenticated = localStorage.getItem('cmgi_admin_auth');
  if (!isAuthenticated) {
    router.push('/admin/login');
  }
});

// Image upload handling
const imageButtonText = computed(() => {
  return selectedImage.value ? selectedImage.value.name : 'Выберите изображение';
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
  form.value.image = null;
  
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
    
    // In a real application, this would call an API to create the news
    // For demo purposes, we'll just add it to the store
    const newNews = {
      id: Date.now(), // Generate a unique ID
      title: form.value.title,
      category: form.value.category,
      date: form.value.date,
      excerpt: form.value.excerpt,
      content: form.value.content,
      image: form.value.image || '/images/newsCardBanner.jpg'
    };
    
    await newsStore.addNews(newNews);
    
    // Show success modal
    showSuccessModal.value = true;
  } catch (error) {
    console.error('Error creating news:', error);
    alert('Ошибка при создании новости. Пожалуйста, попробуйте позже.');
  } finally {
    submitting.value = false;
  }
};

// Reset form
const resetForm = () => {
  form.value = {
    title: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    excerpt: '',
    content: '',
    image: null
  };
  
  selectedImage.value = null;
  imagePreview.value = null;
  
  // Reset file input
  const fileInput = document.querySelector('.form__file-input');
  if (fileInput) {
    fileInput.value = null;
  }
  
  errors.value = {
    title: '',
    category: '',
    date: '',
    excerpt: '',
    content: ''
  };
};

// Create another news
const createAnother = () => {
  resetForm();
  showSuccessModal.value = false;
};
</script>

<style lang="scss">
.admin-news-new {
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
    gap: $spacing-md;
    margin-top: $spacing-xl;
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
  
  &__title {
    margin: 0 0 $spacing-lg;
    font-size: $font-size-lg;
  }
}

.sidebar-tips {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.sidebar-tip {
  &__title {
    margin: 0 0 $spacing-xs;
    font-size: $font-size-base;
  }
  
  &__text {
    margin: 0;
    line-height: 1.6;
    color: lighten($dark-gray, 20%);
  }
}

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
