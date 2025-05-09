<template>
  <div class="admin-event-form">
    <div class="admin-page-header">
      <h2 class="admin-page-title">Добавление нового события</h2>
      <NuxtLink to="/admin/events" class="admin-button admin-button--secondary">
        <i class="fas fa-arrow-left"></i> Назад к списку
      </NuxtLink>
    </div>
    
    <form @submit.prevent="saveEvent" class="admin-form">
      <div class="admin-form__group">
        <label for="title" class="admin-form__label">Название события*</label>
        <input 
          id="title" 
          v-model="eventForm.title" 
          type="text" 
          class="admin-form__input" 
          required
          placeholder="Введите название события"
        >
      </div>
      
      <div class="admin-form__group">
        <label for="category" class="admin-form__label">Категория*</label>
        <select 
          id="category" 
          v-model="eventForm.category" 
          class="admin-form__select" 
          required
        >
          <option value="" disabled>Выберите категорию</option>
          <option v-for="category in eventsStore.categories" :key="category.value" :value="category.value">
            {{ category.label }}
          </option>
        </select>
      </div>
      
      <div class="admin-form__row">
        <div class="admin-form__group admin-form__group--half">
          <label for="date" class="admin-form__label">Дата проведения*</label>
          <input 
            id="date" 
            v-model="eventForm.date" 
            type="datetime-local" 
            class="admin-form__input" 
            required
          >
        </div>
        
        <div class="admin-form__group admin-form__group--half">
          <label for="location" class="admin-form__label">Место проведения*</label>
          <input 
            id="location" 
            v-model="eventForm.location" 
            type="text" 
            class="admin-form__input" 
            required
            placeholder="Укажите место проведения"
          >
        </div>
      </div>
      
      <div class="admin-form__group">
        <label for="description" class="admin-form__label">Описание события*</label>
        <textarea 
          id="description" 
          v-model="eventForm.description" 
          class="admin-form__textarea" 
          required
          placeholder="Введите описание события"
          rows="5"
        ></textarea>
      </div>
      
      <div class="admin-form__group">
        <label for="image" class="admin-form__label">Изображение</label>
        <input 
          id="image" 
          v-model="eventForm.image" 
          type="text" 
          class="admin-form__input" 
          placeholder="URL изображения (например, /images/events/event1.jpg)"
        >
        <p class="admin-form__hint">
          Укажите путь к изображению. Рекомендуемый размер: 800x600px
        </p>
      </div>
      
      <div class="admin-form__group">
        <label for="organizer" class="admin-form__label">Организатор</label>
        <input 
          id="organizer" 
          v-model="eventForm.organizer" 
          type="text" 
          class="admin-form__input" 
          placeholder="Укажите организатора события"
        >
      </div>
      
      <div class="admin-form__group">
        <label for="contact" class="admin-form__label">Контактная информация</label>
        <input 
          id="contact" 
          v-model="eventForm.contact" 
          type="text" 
          class="admin-form__input" 
          placeholder="Телефон, email или другие контакты"
        >
      </div>
      
      <div class="admin-form__group">
        <label class="admin-form__label">Регистрация</label>
        <div class="admin-form__checkbox-group">
          <input 
            id="registration" 
            v-model="eventForm.registrationRequired" 
            type="checkbox" 
            class="admin-form__checkbox"
          >
          <label for="registration" class="admin-form__checkbox-label">
            Требуется предварительная регистрация
          </label>
        </div>
      </div>
      
      <div v-if="eventForm.registrationRequired" class="admin-form__group">
        <label for="registrationLink" class="admin-form__label">Ссылка для регистрации</label>
        <input 
          id="registrationLink" 
          v-model="eventForm.registrationLink" 
          type="text" 
          class="admin-form__input" 
          placeholder="Укажите ссылку для регистрации"
        >
      </div>
      
      <div class="admin-form__actions">
        <button type="button" class="admin-button admin-button--secondary" @click="resetForm">
          Сбросить
        </button>
        <button type="submit" class="admin-button admin-button--primary">
          <i class="fas fa-save"></i> Сохранить событие
        </button>
      </div>
    </form>
    
    <!-- Сообщение об успешном сохранении -->
    <div v-if="showSuccessMessage" class="admin-success-message">
      <i class="fas fa-check-circle"></i>
      Событие успешно сохранено!
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useEventsStore } from '~/stores/events';

definePageMeta({
  layout: 'admin'
});

const router = useRouter();
const eventsStore = useEventsStore();
const showSuccessMessage = ref(false);

// Инициализация хранилища
onMounted(() => {
  eventsStore.initEvents();
});

// Форма события
const eventForm = reactive({
  title: '',
  category: '',
  date: '',
  location: '',
  description: '',
  image: '/images/newsCardBanner.jpg', // Значение по умолчанию
  organizer: '',
  contact: '',
  registrationRequired: false,
  registrationLink: ''
});

// Сохранение события
const saveEvent = () => {
  eventsStore.addEvent({
    ...eventForm,
    // Если изображение не указано, используем значение по умолчанию
    image: eventForm.image || '/images/newsCardBanner.jpg'
  });
  
  // Показываем сообщение об успехе
  showSuccessMessage.value = true;
  
  // Скрываем сообщение через 3 секунды
  setTimeout(() => {
    showSuccessMessage.value = false;
    // Перенаправляем на список событий
    router.push('/admin/events');
  }, 3000);
};

// Сброс формы
const resetForm = () => {
  Object.keys(eventForm).forEach(key => {
    if (key === 'image') {
      eventForm[key] = '/images/newsCardBanner.jpg';
    } else if (key === 'registrationRequired') {
      eventForm[key] = false;
    } else if (key === 'category') {
      eventForm[key] = '';
    } else {
      eventForm[key] = '';
    }
  });
};
</script>

<style lang="scss">
.admin-event-form {
  width: 100%;
  
  .admin-page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-lg;
  }
  
  .admin-form {
    background-color: $white;
    border-radius: $border-radius-md;
    padding: $spacing-lg;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    &__row {
      display: flex;
      gap: $spacing-md;
      
      @include mobile {
        flex-direction: column;
      }
    }
    
    &__group {
      margin-bottom: $spacing-lg;
      
      &--half {
        flex: 1;
      }
    }
    
    &__label {
      display: block;
      margin-bottom: $spacing-xs;
      font-weight: 500;
    }
    
    &__input,
    &__select,
    &__textarea {
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
    
    &__textarea {
      resize: vertical;
      min-height: 120px;
    }
    
    &__hint {
      font-size: $font-size-sm;
      color: $dark-gray;
      margin-top: $spacing-xs;
    }
    
    &__checkbox-group {
      display: flex;
      align-items: center;
    }
    
    &__checkbox {
      margin-right: $spacing-xs;
    }
    
    &__checkbox-label {
      cursor: pointer;
    }
    
    &__actions {
      display: flex;
      justify-content: flex-end;
      gap: $spacing-md;
      margin-top: $spacing-xl;
    }
  }
  
  .admin-success-message {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: $success-green;
    color: $white;
    padding: $spacing-md $spacing-lg;
    border-radius: $border-radius-md;
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    
    i {
      font-size: $font-size-lg;
    }
  }
}
</style>
