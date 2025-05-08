<template>
  <form class="form contact-form" @submit.prevent="submitForm">
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
      <label for="email" class="form__label">Email *</label>
      <input 
        id="email" 
        v-model="form.email" 
        type="email" 
        class="form__input" 
        required
        :class="{ 'form__input--error': errors.email }"
      />
      <p v-if="errors.email" class="form__error">{{ errors.email }}</p>
    </div>
    
    <div class="form__group">
      <label for="message" class="form__label">Сообщение *</label>
      <textarea 
        id="message" 
        v-model="form.message" 
        class="form__textarea" 
        required
        :class="{ 'form__input--error': errors.message }"
      ></textarea>
      <p v-if="errors.message" class="form__error">{{ errors.message }}</p>
    </div>
    
    <div class="form__actions">
      <button type="submit" class="btn btn--primary form__submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Отправка...' : 'Отправить' }}
      </button>
    </div>
    
    <div v-if="formSubmitted" class="form__success">
      <p>Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.</p>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue';

const form = reactive({
  name: '',
  email: '',
  message: ''
});

const errors = reactive({
  name: '',
  email: '',
  message: ''
});

const isSubmitting = ref(false);
const formSubmitted = ref(false);

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
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
  
  // Validate email
  if (!form.email.trim()) {
    errors.email = 'Email обязателен для заполнения';
    isValid = false;
  } else if (!validateEmail(form.email)) {
    errors.email = 'Введите корректный email';
    isValid = false;
  } else {
    errors.email = '';
  }
  
  // Validate message
  if (!form.message.trim()) {
    errors.message = 'Сообщение обязательно для заполнения';
    isValid = false;
  } else {
    errors.message = '';
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
    form.email = '';
    form.message = '';
    
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
.contact-form {
  max-width: 600px;
  
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
}
</style>
