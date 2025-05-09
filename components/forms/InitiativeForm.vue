<template>
  <div class="initiative-form-card">
    <form class="form initiative-form" @submit.prevent="submitForm">
      <div class="form__group">
        <label for="name" class="form__label">Имя *</label>
        <input 
          id="name" 
          v-model="form.name" 
          type="text" 
          class="form__input" 
          required 
          placeholder="Введите ваше имя"
          :class="{ 'form__input--error': errors.name }"
        />
        <span v-if="errors.name" class="form__error">{{ errors.name }}</span>
      </div>
      
      <div class="form__row">
        <div class="form__group">
          <label for="contact" class="form__label">Контакт (email или телефон) *</label>
          <input 
            id="contact" 
            v-model="form.contact" 
            type="text" 
            class="form__input" 
            required
            placeholder="Как с вами связаться"
            :class="{ 'form__input--error': errors.contact }"
          />
          <span v-if="errors.contact" class="form__error">{{ errors.contact }}</span>
        </div>
        
        <div class="form__group">
          <label for="direction" class="form__label">Направление *</label>
          <select 
            id="direction" 
            v-model="form.direction" 
            class="form__select" 
            required
            :class="{ 'form__select--error': errors.direction }"
          >
            <option value="" disabled>Выберите направление</option>
            <option value="uray-youth">Урай Молодёжный</option>
            <option value="volunteers">Волонтёры Победы</option>
            <option value="dobro-center">Добро.Центр</option>
            <option value="other">Другое</option>
          </select>
          <span v-if="errors.direction" class="form__error">{{ errors.direction }}</span>
        </div>
      </div>
      
      <div class="form__group">
        <label for="description" class="form__label">Описание инициативы *</label>
        <textarea 
          id="description" 
          v-model="form.description" 
          class="form__textarea" 
          required
          placeholder="Опишите вашу инициативу подробно"
          :class="{ 'form__textarea--error': errors.description }"
          maxlength="1000"
        ></textarea>
        <div class="form__textarea-counter">{{ form.description.length }}/1000</div>
        <span v-if="errors.description" class="form__error">{{ errors.description }}</span>
      </div>
      
      <div class="form__group">
        <label for="file" class="form__label">Прикрепить файл (до 10 МБ)</label>
        <div class="form__file-wrapper">
          <input 
            id="file" 
            type="file" 
            class="form__file" 
            @change="handleFileChange"
            :class="{ 'form__file--error': errors.file }"
          />
          <div class="form__file-info" v-if="form.file">
            <i class="fas fa-file"></i> {{ form.file.name }}
          </div>
        </div>
        <span v-if="errors.file" class="form__error">{{ errors.file }}</span>
      </div>
      
      <div class="form__actions">
        <button type="submit" class="btn btn--primary" :disabled="isSubmitting">
          <i class="fas fa-paper-plane"></i> {{ isSubmitting ? 'Отправка...' : 'Отправить инициативу' }}
        </button>
      </div>
    </form>
    
    <div v-if="formSubmitted" class="success-message">
      <div class="success-message__icon"><i class="fas fa-check-circle"></i></div>
      <h3 class="success-message__title">Инициатива отправлена!</h3>
      <p class="success-message__text">Ваша инициатива успешно отправлена. Мы рассмотрим её и свяжемся с вами в ближайшее время.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useInitiativesStore } from '~/stores/initiatives';

const form = reactive({
  name: '',
  contact: '',
  direction: '',
  description: '',
  file: null
});

const errors = reactive({
  name: '',
  contact: '',
  direction: '',
  description: '',
  file: ''
});

const isSubmitting = ref(false);
const formSubmitted = ref(false);

// Инициализация хранилища инициатив
const initiativesStore = useInitiativesStore();

const handleFileChange = (event) => {
  const file = event.target.files[0];
  
  if (file) {
    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      errors.file = 'Файл слишком большой. Максимальный размер 10 МБ.';
      form.file = null;
    } else {
      errors.file = '';
      form.file = file;
    }
  }
};

const validateForm = () => {
  let isValid = true;
  
  // Validate name
  if (!form.name.trim()) {
    errors.name = 'Имя обязательно для заполнения';
    isValid = false;
  } else {
    errors.name = '';
  }
  
  // Validate contact
  if (!form.contact.trim()) {
    errors.contact = 'Контакт обязателен для заполнения';
    isValid = false;
  } else {
    errors.contact = '';
  }
  
  // Validate direction
  if (!form.direction) {
    errors.direction = 'Выберите направление';
    isValid = false;
  } else {
    errors.direction = '';
  }
  
  // Validate description
  if (!form.description.trim()) {
    errors.description = 'Описание инициативы обязательно для заполнения';
    isValid = false;
  } else if (form.description.length > 1000) {
    errors.description = 'Описание не должно превышать 1000 символов';
    isValid = false;
  } else {
    errors.description = '';
  }
  
  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) return;
  
  isSubmitting.value = true;
  
  try {
    // Создаем объект инициативы для сохранения в хранилище
    const initiative = {
      name: form.name,
      contact: form.contact,
      direction: form.direction,
      description: form.description,
      file: form.file ? form.file.name : null,
      date: new Date().toISOString().split('T')[0]
    };
    
    // Сохраняем инициативу в хранилище
    await initiativesStore.addInitiative(initiative);
    
    // Ресет формы после успешной отправки
    form.name = '';
    form.contact = '';
    form.direction = '';
    form.description = '';
    form.file = null;
    
    formSubmitted.value = true;
    
    // Скрываем сообщение об успехе через 5 секунд
    setTimeout(() => {
      formSubmitted.value = false;
    }, 5000);
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style lang="scss">
.initiative-form-card {
  background-color: $white;
  border-radius: $border-radius-md;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: $spacing-lg;
  margin-bottom: $spacing-xl;
}

.initiative-form {
  .form__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-md;
    
    @include mobile {
      grid-template-columns: 1fr;
    }
  }
  
  .form__group {
    margin-bottom: $spacing-md;
  }
  
  .form__label {
    display: block;
    margin-bottom: $spacing-xs;
    font-weight: 500;
    color: $dark-gray;
  }
  
  .form__input,
  .form__select,
  .form__textarea {
    width: 100%;
    padding: $spacing-sm;
    border: 1px solid lighten($dark-gray, 50%);
    border-radius: $border-radius-sm;
    font-size: $font-size-base;
    transition: border-color 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: $primary-purple;
      box-shadow: 0 0 0 2px rgba($primary-purple, 0.1);
    }
    
    &::placeholder {
      color: lighten($dark-gray, 40%);
    }
  }
  
  .form__textarea {
    min-height: 150px;
    resize: vertical;
  }
  
  .form__textarea-counter {
    text-align: right;
    font-size: $font-size-sm;
    color: lighten($dark-gray, 30%);
    margin-top: $spacing-xs;
  }
  
  .form__file-wrapper {
    border: 1px dashed lighten($dark-gray, 40%);
    border-radius: $border-radius-sm;
    padding: $spacing-md;
    background-color: rgba($light-purple, 0.2);
    position: relative;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: rgba($light-purple, 0.3);
    }
  }
  
  .form__file {
    width: 100%;
    cursor: pointer;
  }
  
  .form__file-info {
    margin-top: $spacing-sm;
    padding: $spacing-sm;
    background-color: rgba($primary-purple, 0.05);
    border-radius: $border-radius-sm;
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    font-size: $font-size-sm;
    
    i {
      color: $primary-purple;
    }
  }
  
  .form__error {
    color: $error-red;
    font-size: $font-size-sm;
    margin-top: $spacing-xs;
    display: block;
  }
  
  .form__input--error,
  .form__select--error,
  .form__textarea--error,
  .form__file--error {
    border-color: $error-red;
  }
  
  .form__actions {
    margin-top: $spacing-lg;
    display: flex;
    justify-content: flex-end;
    
    .btn {
      min-width: 200px;
      
      @include mobile {
        width: 100%;
      }
    }
  }
}

.success-message {
  background-color: rgba($success-green, 0.1);
  border-radius: $border-radius-md;
  padding: $spacing-lg;
  margin-top: $spacing-lg;
  text-align: center;
  
  &__icon {
    font-size: 48px;
    color: $success-green;
    margin-bottom: $spacing-md;
  }
  
  &__title {
    color: $success-green;
    margin-bottom: $spacing-sm;
  }
  
  &__text {
    color: $dark-gray;
    margin-bottom: 0;
  }
}
</style>
