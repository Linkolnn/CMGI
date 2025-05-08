<template>
  <div class="admin-initiative-new">
    <div class="admin-initiative-new__header">
      <div class="admin-initiative-new__back">
        <NuxtLink to="/admin/initiatives" class="back-link">
          ← Назад к списку заявок
        </NuxtLink>
      </div>
      <h1 class="admin-initiative-new__title">
        Добавление новой заявки
      </h1>
    </div>
    
    <div class="admin-initiative-new__content">
      <div class="initiative-form-card">
        <form @submit.prevent="submitForm" class="initiative-form">
          <div class="form__row">
            <div class="form__group">
              <label for="name" class="form__label">Имя заявителя *</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                class="form__input"
                :class="{ 'form__input--error': errors.name }"
                placeholder="Введите имя заявителя"
                required
              />
              <span v-if="errors.name" class="form__error">{{ errors.name }}</span>
            </div>
            
            <div class="form__group">
              <label for="contact" class="form__label">Контактная информация *</label>
              <input
                id="contact"
                v-model="form.contact"
                type="text"
                class="form__input"
                :class="{ 'form__input--error': errors.contact }"
                placeholder="Телефон или email"
                required
              />
              <span v-if="errors.contact" class="form__error">{{ errors.contact }}</span>
            </div>
          </div>
          
          <div class="form__group">
            <label for="direction" class="form__label">Направление *</label>
            <select
              id="direction"
              v-model="form.direction"
              class="form__select"
              :class="{ 'form__select--error': errors.direction }"
              required
            >
              <option value="" disabled selected>Выберите направление</option>
              <option value="uray-youth">Урай Молодёжный</option>
              <option value="volunteers">Волонтёры Победы</option>
              <option value="dobro-center">Добро.Центр</option>
              <option value="other">Другое</option>
            </select>
            <span v-if="errors.direction" class="form__error">{{ errors.direction }}</span>
          </div>
          
          <div class="form__group">
            <label for="description" class="form__label">Описание инициативы *</label>
            <textarea
              id="description"
              v-model="form.description"
              class="form__textarea"
              :class="{ 'form__textarea--error': errors.description }"
              placeholder="Подробно опишите вашу инициативу"
              rows="6"
              required
            ></textarea>
            <span v-if="errors.description" class="form__error">{{ errors.description }}</span>
          </div>
          
          <div class="form__group">
            <label for="status" class="form__label">Статус</label>
            <select
              id="status"
              v-model="form.status"
              class="form__select"
            >
              <option value="new">Новая</option>
              <option value="in-progress">В работе</option>
              <option value="completed">Завершена</option>
            </select>
          </div>
          
          <div class="form__group">
            <label for="file" class="form__label">Прикрепить файл</label>
            <div class="form__file-upload">
              <input
                id="file"
                type="file"
                class="form__file-input"
                @change="handleFileUpload"
              />
              <div class="form__file-button">
                <span class="form__file-icon">📎</span>
                <span class="form__file-text">{{ fileButtonText }}</span>
              </div>
            </div>
            <span class="form__hint">Максимальный размер файла: 5MB. Поддерживаемые форматы: PDF, DOC, DOCX, JPG, PNG</span>
          </div>
          
          <div class="form__actions">
            <button
              type="button"
              @click="resetForm"
              class="btn btn--secondary"
              :disabled="submitting"
            >
              Очистить
            </button>
            <button
              type="submit"
              class="btn btn--primary"
              :disabled="submitting"
            >
              {{ submitting ? 'Сохранение...' : 'Сохранить заявку' }}
            </button>
          </div>
        </form>
      </div>
      
      <div class="admin-initiative-new__sidebar">
        <div class="sidebar-card">
          <h3 class="sidebar-card__title">Подсказки</h3>
          <div class="sidebar-tips">
            <div class="sidebar-tip">
              <h4 class="sidebar-tip__title">Заполнение формы</h4>
              <p class="sidebar-tip__text">
                Заполните все обязательные поля, отмеченные звездочкой (*).
                Предоставьте как можно более подробную информацию для облегчения обработки заявки.
              </p>
            </div>
            
            <div class="sidebar-tip">
              <h4 class="sidebar-tip__title">Статус заявки</h4>
              <p class="sidebar-tip__text">
                По умолчанию новые заявки получают статус "Новая".
                Вы можете сразу установить другой статус, если заявка уже находится в работе.
              </p>
            </div>
            
            <div class="sidebar-tip">
              <h4 class="sidebar-tip__title">Прикрепление файлов</h4>
              <p class="sidebar-tip__text">
                Прикрепите дополнительные материалы, если они помогут лучше понять инициативу.
                Поддерживаются форматы PDF, DOC, DOCX, JPG и PNG.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="success-modal">
      <div class="success-modal__content">
        <div class="success-modal__icon">✅</div>
        <h2 class="success-modal__title">Заявка успешно создана!</h2>
        <p class="success-modal__text">
          Заявка была успешно добавлена в систему.
        </p>
        <div class="success-modal__actions">
          <NuxtLink to="/admin/initiatives" class="btn btn--secondary">
            Вернуться к списку
          </NuxtLink>
          <button @click="createAnother" class="btn btn--primary">
            Создать еще одну
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useInitiativesStore } from '~/stores/initiatives';

definePageMeta({
  layout: 'admin'
});

const router = useRouter();
const initiativesStore = useInitiativesStore();

const form = ref({
  name: '',
  contact: '',
  direction: '',
  description: '',
  status: 'new',
  file: null
});

const errors = ref({
  name: '',
  contact: '',
  direction: '',
  description: ''
});

const submitting = ref(false);
const showSuccessModal = ref(false);
const selectedFile = ref(null);

// Check if user is authenticated
onMounted(() => {
  const isAuthenticated = localStorage.getItem('cmgi_admin_auth');
  if (!isAuthenticated) {
    router.push('/admin/login');
  }
});

// File upload handling
const fileButtonText = computed(() => {
  return selectedFile.value ? selectedFile.value.name : 'Выберите файл';
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Файл слишком большой. Максимальный размер: 5MB');
      event.target.value = null;
      selectedFile.value = null;
      return;
    }
    
    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Неподдерживаемый формат файла. Поддерживаемые форматы: PDF, DOC, DOCX, JPG, PNG');
      event.target.value = null;
      selectedFile.value = null;
      return;
    }
    
    selectedFile.value = file;
    form.value.file = file.name;
  }
};

// Form validation
const validateForm = () => {
  let isValid = true;
  errors.value = {
    name: '',
    contact: '',
    direction: '',
    description: ''
  };
  
  if (!form.value.name.trim()) {
    errors.value.name = 'Имя заявителя обязательно';
    isValid = false;
  }
  
  if (!form.value.contact.trim()) {
    errors.value.contact = 'Контактная информация обязательна';
    isValid = false;
  }
  
  if (!form.value.direction) {
    errors.value.direction = 'Выберите направление';
    isValid = false;
  }
  
  if (!form.value.description.trim()) {
    errors.value.description = 'Описание инициативы обязательно';
    isValid = false;
  } else if (form.value.description.trim().length < 20) {
    errors.value.description = 'Описание должно содержать не менее 20 символов';
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
    
    // In a real application, this would call an API to create the initiative
    // For demo purposes, we'll just add it to the store
    const newInitiative = {
      id: Date.now(), // Generate a unique ID
      name: form.value.name,
      contact: form.value.contact,
      direction: form.value.direction,
      description: form.value.description,
      status: form.value.status,
      file: form.value.file,
      date: new Date().toISOString(),
      comments: []
    };
    
    await initiativesStore.addInitiative(newInitiative);
    
    // Show success modal
    showSuccessModal.value = true;
  } catch (error) {
    console.error('Error creating initiative:', error);
    alert('Ошибка при создании заявки. Пожалуйста, попробуйте позже.');
  } finally {
    submitting.value = false;
  }
};

// Reset form
const resetForm = () => {
  form.value = {
    name: '',
    contact: '',
    direction: '',
    description: '',
    status: 'new',
    file: null
  };
  
  selectedFile.value = null;
  
  // Reset file input
  const fileInput = document.querySelector('.form__file-input');
  if (fileInput) {
    fileInput.value = null;
  }
  
  errors.value = {
    name: '',
    contact: '',
    direction: '',
    description: ''
  };
};

// Create another initiative
const createAnother = () => {
  resetForm();
  showSuccessModal.value = false;
};
</script>

<style lang="scss">
.admin-initiative-new {
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

.initiative-form-card {
  background-color: $white;
  border-radius: $border-radius-md;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  padding: $spacing-lg;
}

.initiative-form {
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
    justify-content: flex-end;
    gap: $spacing-md;
    margin-top: $spacing-xl;
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
