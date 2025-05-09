<template>
  <div class="gallery-manager">
    <h2 class="section__title">Управление фотогалереей</h2>
    
    <div class="gallery-grid">
      <!-- Карточка добавления фото -->
      <div class="gallery-add-card" @click="showAddPhotoForm = true">
        <div class="gallery-add-card__icon">
          <i class="fas fa-plus-circle"></i>
        </div>
        <div class="gallery-add-card__title">Добавить фото</div>
      </div>
      
      <!-- Фотографии галереи -->
      <div 
        v-for="photo in galleryStore.photos" 
        :key="photo.id" 
        class="gallery-item"
        @mouseover="hoveredPhotoId = photo.id"
        @mouseleave="hoveredPhotoId = null"
      >
        <img :src="photo.image" :alt="photo.title" class="gallery-item__image" />
        
        <!-- Оверлей пустой, только для фотографий -->
        
        <!-- Оверлей для удаления -->
        <div 
          v-if="hoveredPhotoId === photo.id" 
          class="gallery-item__delete-overlay"
          @click="deletePhoto(photo.id)"
        >
          <div class="gallery-item__delete-content">
            <i class="fas fa-trash"></i>
            <span>Удалить</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Модальное окно добавления фото -->
    <div v-if="showAddPhotoForm" class="modal-overlay" @click.self="showAddPhotoForm = false">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Добавление новой фотографии</h3>
          <button class="modal-close" @click="showAddPhotoForm = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="upload-options">
            <div class="upload-option" :class="{ 'active': uploadMethod === 'url' }" @click="uploadMethod = 'url'">
              <i class="fas fa-link"></i> URL
            </div>
            <div class="upload-option" :class="{ 'active': uploadMethod === 'file' }" @click="uploadMethod = 'file'">
              <i class="fas fa-upload"></i> Загрузить файл
            </div>
          </div>
          
          <div v-if="uploadMethod === 'url'" class="form-group">
            <label for="photoImage">URL изображения</label>
            <input 
              type="text" 
              id="photoImage" 
              v-model="newPhoto.image" 
              class="form-control"
              placeholder="Введите URL изображения"
            >
            <small class="form-text">
              Укажите путь к изображению, например: /images/gallery/photo.jpg
            </small>
          </div>
          
          <div v-if="uploadMethod === 'file'" class="form-group">
            <label for="photoFile">Загрузить фото</label>
            <div class="file-upload-container">
              <input 
                type="file" 
                id="photoFile" 
                @change="handleFileUpload" 
                accept="image/*"
                class="file-input"
              >
              <div class="file-upload-button">
                <i class="fas fa-cloud-upload-alt"></i> Выбрать файл
              </div>
              <div v-if="selectedFileName" class="selected-file">
                <i class="fas fa-check-circle"></i> {{ selectedFileName }}
              </div>
            </div>
            <small class="form-text">
              Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер: 5MB
            </small>
          </div>
          
          <div v-if="previewImage" class="image-preview">
            <img :src="previewImage" alt="Предпросмотр" class="preview-image">
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="addPhoto" class="btn btn--primary" :disabled="!isFormValid">
            Добавить фотографию
          </button>
          <button @click="showAddPhotoForm = false" class="btn btn--secondary">
            Отмена
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useGalleryStore } from '~/stores/gallery';

const galleryStore = useGalleryStore();
const showAddPhotoForm = ref(false);
const hoveredPhotoId = ref(null);
const uploadMethod = ref('url'); // 'url' или 'file'
const selectedFileName = ref('');
const previewImage = ref('');

// Initialize new photo object
const newPhoto = ref({
  image: ''
});

// Validate form
const isFormValid = computed(() => {
  if (uploadMethod.value === 'url') {
    return newPhoto.value.image.trim() !== '';
  } else {
    return previewImage.value !== '';
  }
});

// Обработка загрузки файла
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  // Проверка размера файла (максимум 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('Файл слишком большой. Максимальный размер: 5MB');
    return;
  }
  
  // Сохраняем имя файла для отображения
  selectedFileName.value = file.name;
  
  // Конвертируем файл в base64
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.value = e.target.result;
    newPhoto.value.image = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Add new photo
function addPhoto() {
  if (!isFormValid.value) return;
  
  galleryStore.addPhoto({
    id: Date.now(),
    image: newPhoto.value.image,
    alt: 'Фотография галереи'
  });
  
  // Reset form
  newPhoto.value = {
    image: ''
  };
  selectedFileName.value = '';
  previewImage.value = '';
  
  showAddPhotoForm.value = false;
}

// Delete photo
function deletePhoto(id) {
  galleryStore.deletePhoto(id);
}
</script>

<style lang="scss" scoped>
.gallery-manager {
  margin-bottom: $spacing-lg;
}

.section__title {
  font-size: $font-size-lg;
  margin-bottom: $spacing-md;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;
  
  @include tablet {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include mobile {
    grid-template-columns: 1fr;
  }
}

// Стили для карточки добавления фото
.gallery-add-card {
  height: 250px;
  border-radius: $border-radius-md;
  background-color: $light-gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    background-color: darken($light-gray, 5%);
  }
  
  &__icon {
    font-size: 3rem;
    color: $primary-purple;
    margin-bottom: $spacing-sm;
  }
  
  &__title {
    font-size: $font-size-base;
    font-weight: bold;
    color: $dark-gray;
  }
}

// Стили для элемента галереи
.gallery-item {
  height: 250px;
  border-radius: $border-radius-md;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &__info-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    color: white;
    padding: $spacing-md;
    transition: opacity 0.3s ease;
    
    h3 {
      margin: 0 0 $spacing-xs 0;
      font-size: $font-size-base;
    }
    
    p {
      margin: 0 0 $spacing-xs 0;
      font-size: $font-size-sm;
      opacity: 0.9;
    }
    
    .gallery-item__category {
      font-size: $font-size-xs;
      opacity: 0.8;
    }
  }
  
  &__delete-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(220, 53, 69, 0.7); // Полупрозрачный красный цвет
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    
    &:hover {
      background-color: rgba(220, 53, 69, 0.8);
    }
  }
  
  &__delete-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    
    i {
      font-size: 2rem;
      margin-bottom: $spacing-xs;
    }
    
    span {
      font-size: $font-size-base;
      font-weight: bold;
    }
  }
}

// Стили для модального окна
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: $white;
  border-radius: $border-radius-md;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-md;
  border-bottom: 1px solid $light-gray;
  
  h3 {
    margin: 0;
    font-size: $font-size-lg;
  }
  
  .modal-close {
    background: none;
    border: none;
    font-size: $font-size-lg;
    cursor: pointer;
    color: lighten($dark-gray, 20%);
    
    &:hover {
      color: $dark-gray;
    }
  }
}

.modal-body {
  padding: $spacing-md;
  
  .upload-options {
    display: flex;
    margin-bottom: $spacing-md;
    border-radius: $border-radius-sm;
    overflow: hidden;
    border: 1px solid $light-gray;
    
    .upload-option {
      flex: 1;
      padding: $spacing-sm;
      text-align: center;
      background-color: $light-gray;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:first-child {
        border-right: 1px solid darken($light-gray, 5%);
      }
      
      &:hover {
        background-color: darken($light-gray, 5%);
      }
      
      &.active {
        background-color: $primary-purple;
        color: white;
      }
      
      i {
        margin-right: $spacing-xs;
      }
    }
  }
  
  .file-upload-container {
    position: relative;
    margin-bottom: $spacing-sm;
    
    .file-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      z-index: 2;
    }
    
    .file-upload-button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: $spacing-md;
      background-color: $light-purple;
      border-radius: $border-radius-sm;
      color: $primary-purple;
      transition: all 0.3s ease;
      
      i {
        margin-right: $spacing-xs;
      }
      
      &:hover {
        background-color: darken($light-purple, 5%);
      }
    }
    
    .selected-file {
      margin-top: $spacing-sm;
      padding: $spacing-xs $spacing-sm;
      background-color: lighten($light-purple, 5%);
      border-radius: $border-radius-sm;
      color: $primary-purple;
      display: flex;
      align-items: center;
      
      i {
        margin-right: $spacing-xs;
        color: $success-green;
      }
    }
  }
  
  .image-preview {
    margin-top: $spacing-md;
    border-radius: $border-radius-sm;
    overflow: hidden;
    border: 1px solid $light-gray;
    
    .preview-image {
      width: 100%;
      max-height: 200px;
      object-fit: contain;
    }
  }
}

.modal-footer {
  padding: $spacing-md;
  border-top: 1px solid $light-gray;
  display: flex;
  justify-content: flex-end;
  gap: $spacing-sm;
}

.form-group {
  margin-bottom: $spacing-md;
  
  label {
    display: block;
    margin-bottom: $spacing-xs;
    font-weight: bold;
  }
  
  .form-control {
    width: 100%;
    padding: $spacing-sm;
    border: 1px solid $light-gray;
    border-radius: $border-radius-sm;
    font-size: $font-size-base;
    
    &:focus {
      outline: none;
      border-color: $primary-purple;
    }
  }
  
  .form-text {
    display: block;
    margin-top: $spacing-xs;
    font-size: $font-size-xs;
    color: lighten($dark-gray, 20%);
  }
}

.btn {
  padding: $spacing-sm $spacing-md;
  border: none;
  border-radius: $border-radius-sm;
  font-size: $font-size-base;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &--primary {
    background-color: $primary-purple;
    color: white;
    
    &:hover {
      background-color: darken($primary-purple, 10%);
    }
    
    &:disabled {
      background-color: lighten($primary-purple, 20%);
      cursor: not-allowed;
    }
  }
  
  &--secondary {
    background-color: $light-gray;
    color: $dark-gray;
    
    &:hover {
      background-color: darken($light-gray, 10%);
    }
  }
}
</style>
