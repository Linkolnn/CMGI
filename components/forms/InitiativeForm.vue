<template>
  <form class="form initiative-form" @submit.prevent="submitForm">
    <div class="form__group">
      <label for="name" class="form__label">Имя *</label>
      <input 
        id="name" 
        v-model="form.name" 
        type="text" 
        class="form__input" 
        required 
        :class="{ 'form__input--error': errors.name }"
      />
      <p v-if="errors.name" class="form__error">{{ errors.name }}</p>
    </div>
    
    <div class="form__group">
      <label for="contact" class="form__label">Контакт (email или телефон) *</label>
      <input 
        id="contact" 
        v-model="form.contact" 
        type="text" 
        class="form__input" 
        required
        :class="{ 'form__input--error': errors.contact }"
      />
      <p v-if="errors.contact" class="form__error">{{ errors.contact }}</p>
    </div>
    
    <div class="form__group">
      <label for="direction" class="form__label">Направление *</label>
      <select 
        id="direction" 
        v-model="form.direction" 
        class="form__select" 
        required
        :class="{ 'form__input--error': errors.direction }"
      >
        <option value="" disabled>Выберите направление</option>
        <option value="uray-youth">Урай Молодёжный</option>
        <option value="volunteers">Волонтёры Победы</option>
        <option value="dobro-center">Добро.Центр</option>
        <option value="other">Другое</option>
      </select>
      <p v-if="errors.direction" class="form__error">{{ errors.direction }}</p>
    </div>
    
    <div class="form__group">
      <label for="description" class="form__label">Описание инициативы *</label>
      <textarea 
        id="description" 
        v-model="form.description" 
        class="form__textarea" 
        required
        :class="{ 'form__input--error': errors.description }"
        maxlength="1000"
      ></textarea>
      <div class="form__textarea-counter">{{ form.description.length }}/1000</div>
      <p v-if="errors.description" class="form__error">{{ errors.description }}</p>
    </div>
    
    <div class="form__group">
      <label for="file" class="form__label">Прикрепить файл (до 10 МБ)</label>
      <input 
        id="file" 
        type="file" 
        class="form__file" 
        @change="handleFileChange"
        :class="{ 'form__input--error': errors.file }"
      />
      <p v-if="errors.file" class="form__error">{{ errors.file }}</p>
    </div>
    
    <div class="form__actions">
      <button type="submit" class="btn btn--primary form__submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Отправка...' : 'Отправить' }}
      </button>
    </div>
    
    <div v-if="formSubmitted" class="form__success">
      <p>Ваша инициатива отправлена, мы свяжемся с вами.</p>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue';

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
    // Here would be API call to submit the form
    // For demo purposes, we'll just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form after successful submission
    form.name = '';
    form.contact = '';
    form.direction = '';
    form.description = '';
    form.file = null;
    
    formSubmitted.value = true;
    
    // Hide success message after 5 seconds
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
.initiative-form {
  max-width: 700px;
  margin: 0 auto;
  
  .form__textarea-counter {
    text-align: right;
    font-size: $font-size-sm;
    color: lighten($dark-gray, 30%);
    margin-top: $spacing-xs;
  }
  
  .form__file {
    padding: $spacing-md;
    border: 1px dashed lighten($dark-gray, 50%);
    border-radius: $border-radius-sm;
    background-color: rgba($light-purple, 0.3);
    cursor: pointer;
  }
  
  .form__actions {
    margin-top: $spacing-xl;
  }
  
  .form__success {
    margin-top: $spacing-lg;
    padding: $spacing-md;
    background-color: rgba($primary-green, 0.1);
    border-left: 3px solid $primary-green;
    border-radius: $border-radius-sm;
    
    p {
      color: darken($primary-green, 30%);
      margin: 0;
    }
  }
  
  .form__input--error {
    border-color: red;
  }
}
</style>
