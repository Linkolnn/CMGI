<template>
  <div class="admin-project-form">
    <div class="admin-page-header">
      <h2 class="admin-page-title">Добавление нового проекта</h2>
      <NuxtLink to="/admin/projects" class="admin-button admin-button--secondary">
        <i class="fas fa-arrow-left"></i> Назад к списку
      </NuxtLink>
    </div>
    
    <form @submit.prevent="saveProject" class="admin-form">
      <div class="admin-form__group">
        <label for="title" class="admin-form__label">Название проекта*</label>
        <input 
          id="title" 
          v-model="projectForm.title" 
          type="text" 
          class="admin-form__input" 
          required
          placeholder="Введите название проекта"
        >
      </div>
      
      <div class="admin-form__group">
        <label for="category" class="admin-form__label">Категория*</label>
        <select 
          id="category" 
          v-model="projectForm.category" 
          class="admin-form__select" 
          required
        >
          <option value="" disabled>Выберите категорию</option>
          <option v-for="category in projectsStore.categories" :key="category.value" :value="category.value">
            {{ category.label }}
          </option>
        </select>
      </div>
      
      <div class="admin-form__group">
        <label for="description" class="admin-form__label">Описание проекта*</label>
        <textarea 
          id="description" 
          v-model="projectForm.description" 
          class="admin-form__textarea" 
          required
          placeholder="Введите описание проекта"
          rows="5"
        ></textarea>
      </div>
      
      <div class="admin-form__group">
        <label for="image" class="admin-form__label">Изображение</label>
        <input 
          id="image" 
          v-model="projectForm.image" 
          type="text" 
          class="admin-form__input" 
          placeholder="URL изображения (например, /images/projects/project1.jpg)"
        >
        <p class="admin-form__hint">
          Укажите путь к изображению. Рекомендуемый размер: 800x600px
        </p>
      </div>
      
      <div class="admin-form__group">
        <label for="status" class="admin-form__label">Статус проекта</label>
        <select 
          id="status" 
          v-model="projectForm.status" 
          class="admin-form__select"
        >
          <option value="Активный проект">Активный проект</option>
          <option value="Завершённый проект">Завершённый проект</option>
          <option value="Планируемый проект">Планируемый проект</option>
        </select>
      </div>
      
      <div class="admin-form__group">
        <label for="coordinator" class="admin-form__label">Координатор проекта</label>
        <input 
          id="coordinator" 
          v-model="projectForm.coordinator" 
          type="text" 
          class="admin-form__input" 
          placeholder="ФИО координатора проекта"
        >
      </div>
      
      <div class="admin-form__group">
        <label for="contact" class="admin-form__label">Контактная информация</label>
        <input 
          id="contact" 
          v-model="projectForm.contact" 
          type="text" 
          class="admin-form__input" 
          placeholder="Телефон, email или другие контакты"
        >
      </div>
      
      <div class="admin-form__actions">
        <button type="button" class="admin-button admin-button--secondary" @click="resetForm">
          Сбросить
        </button>
        <button type="submit" class="admin-button admin-button--primary">
          <i class="fas fa-save"></i> Сохранить проект
        </button>
      </div>
    </form>
    
    <!-- Сообщение об успешном сохранении -->
    <div v-if="showSuccessMessage" class="admin-success-message">
      <i class="fas fa-check-circle"></i>
      Проект успешно сохранен!
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProjectsStore } from '~/stores/projects';

definePageMeta({
  layout: 'admin'
});

const router = useRouter();
const projectsStore = useProjectsStore();
const showSuccessMessage = ref(false);

// Инициализация хранилища
onMounted(() => {
  projectsStore.initProjects();
});

// Форма проекта
const projectForm = reactive({
  title: '',
  category: '',
  description: '',
  image: '/images/avatar.svg', // Значение по умолчанию
  status: 'Активный проект',
  coordinator: '',
  contact: ''
});

// Сохранение проекта
const saveProject = () => {
  projectsStore.addProject({
    ...projectForm,
    // Если изображение не указано, используем значение по умолчанию
    image: projectForm.image || '/images/avatar.svg'
  });
  
  // Показываем сообщение об успехе
  showSuccessMessage.value = true;
  
  // Скрываем сообщение через 3 секунды
  setTimeout(() => {
    showSuccessMessage.value = false;
    // Перенаправляем на список проектов
    router.push('/admin/projects');
  }, 3000);
};

// Сброс формы
const resetForm = () => {
  Object.keys(projectForm).forEach(key => {
    if (key === 'image') {
      projectForm[key] = '/images/avatar.svg';
    } else if (key === 'status') {
      projectForm[key] = 'Активный проект';
    } else if (key === 'category') {
      projectForm[key] = '';
    } else {
      projectForm[key] = '';
    }
  });
};
</script>

<style lang="scss">
.admin-project-form {
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
    
    &__group {
      margin-bottom: $spacing-lg;
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
