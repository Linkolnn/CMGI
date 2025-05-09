<template>
  <div class="admin-projects">
    <div class="admin-projects__header">
      <h1 class="admin-projects__title">Управление проектами</h1>
      <NuxtLink to="/admin/projects/new" class="btn btn--primary">
        <i class="fas fa-plus-circle"></i> Добавить проект
      </NuxtLink>
    </div>
    
    <div class="admin-projects__filters">
      <div class="filter-group">
        <label for="category-filter" class="filter-group__label">Категория:</label>
        <select id="category-filter" v-model="selectedCategory" class="filter-group__select">
          <option value="all">Все категории</option>
          <option v-for="category in projectsStore.categories" :key="category.value" :value="category.value">
            {{ category.label }}
          </option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="status-filter" class="filter-group__label">Статус:</label>
        <select id="status-filter" v-model="selectedStatus" class="filter-group__select">
          <option value="all">Все статусы</option>
          <option value="Активный проект">Активные</option>
          <option value="Завершённый проект">Завершённые</option>
          <option value="Планируемый проект">Планируемые</option>
          <option value="Набор волонтёров">Набор волонтёров</option>
        </select>
      </div>
    </div>
    
    <div v-if="filteredProjects.length === 0" class="admin-projects__empty">
      <i class="fas fa-folder-open admin-projects__empty-icon"></i>
      <p class="admin-projects__empty-text">Проекты не найдены. Создайте новый проект!</p>
    </div>
    
    <div v-else class="admin-projects__list">
      <div v-for="project in filteredProjects" :key="project.id" class="project-card">
        <div class="project-card__image">
          <img :src="project.image || '/images/avatar.svg'" :alt="project.title" />
        </div>
        
        <div class="project-card__content">
          <div class="project-card__meta">
            <span class="project-card__date">{{ formatDate(project.createdAt) }}</span>
            <span class="project-card__category">{{ projectsStore.getCategoryLabel(project.category) }}</span>
            <span class="project-card__status">{{ project.status || 'Активный проект' }}</span>
          </div>
          
          <h3 class="project-card__title">{{ project.title }}</h3>
          <p class="project-card__description">{{ project.description }}</p>
          
          <div class="project-card__actions">
            <button @click="editProject(project.id)" class="btn btn--secondary btn--sm">
              <i class="fas fa-edit"></i> Редактировать
            </button>
            <button @click="confirmDelete(project)" class="btn btn--danger btn--sm">
              <i class="fas fa-trash-alt"></i> Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Модальное окно подтверждения удаления -->
    <div v-if="showDeleteModal" class="admin-modal">
      <div class="admin-modal__content">
        <h3 class="admin-modal__title">Подтверждение удаления</h3>
        <p class="admin-modal__text">
          Вы уверены, что хотите удалить проект "{{ projectToDelete?.title }}"?
          Это действие невозможно отменить.
        </p>
        <div class="admin-modal__actions">
          <button class="admin-button admin-button--secondary" @click="showDeleteModal = false">
            Отмена
          </button>
          <button class="admin-button admin-button--danger" @click="deleteProject">
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProjectsStore } from '~/stores/projects';

definePageMeta({
  layout: 'admin'
});

const router = useRouter();
const projectsStore = useProjectsStore();

// Состояние компонента
const selectedCategory = ref('all');
const selectedStatus = ref('all');
const showDeleteModal = ref(false);
const projectToDelete = ref(null);

// Инициализация данных
onMounted(() => {
  projectsStore.initProjects();
});

// Отфильтрованные проекты
const filteredProjects = computed(() => {
  let projects = projectsStore.getProjectsByCategory(selectedCategory.value === 'all' ? null : selectedCategory.value);
  
  // Фильтрация по статусу
  if (selectedStatus.value !== 'all') {
    projects = projects.filter(project => {
      const projectStatus = project.status || 'Активный проект';
      return projectStatus === selectedStatus.value;
    });
  }
  
  return projects;
});

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

// Редактирование проекта
const editProject = (id) => {
  router.push(`/admin/projects/${id}`);
};

// Подтверждение удаления
const confirmDelete = (project) => {
  projectToDelete.value = project;
  showDeleteModal.value = true;
};

// Удаление проекта
const deleteProject = () => {
  if (projectToDelete.value) {
    projectsStore.deleteProject(projectToDelete.value.id);
    showDeleteModal.value = false;
    projectToDelete.value = null;
  }
};
</script>

<style lang="scss">
.admin-projects {
  position: relative;
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-lg;
  }
  
  &__title {
    margin: 0;
  }
  
  &__filters {
    display: flex;
    gap: $spacing-lg;
    margin-bottom: $spacing-lg;
    background-color: $white;
    padding: $spacing-lg;
    border-radius: $border-radius-md;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    
    @include tablet {
      flex-wrap: wrap;
    }
    
    @include mobile {
      flex-direction: column;
    }
  }
  
  &__empty {
    background-color: $white;
    padding: $spacing-xl;
    border-radius: $border-radius-md;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    
    &-icon {
      font-size: 3rem;
      color: $light-gray;
      margin-bottom: $spacing-md;
    }
    
    &-text {
      color: $dark-gray;
    }
  }
  
  &__list {
    margin-bottom: $spacing-lg;
  }
}

.filter-group {
  flex: 1;
  
  &__label {
    display: block;
    margin-bottom: $spacing-xs;
    font-size: $font-size-sm;
    color: lighten($dark-gray, 20%);
  }
  
  &__select {
    width: 100%;
    padding: $spacing-sm;
    border: 1px solid rgba($dark-gray, 0.2);
    border-radius: $border-radius-sm;
    
    &:focus {
      outline: none;
      border-color: $primary-purple;
    }
  }
}

.project-card {
  display: flex;
  background-color: $white;
  border-radius: $border-radius-md;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  margin-bottom: $spacing-lg;
  overflow: hidden;
  
  @include mobile {
    flex-direction: column;
  }
  
  &__image {
    flex: 0 0 250px;
    
    @include tablet {
      flex: 0 0 200px;
    }
    
    @include mobile {
      flex: 0 0 auto;
      height: 200px;
    }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  &__content {
    flex: 1;
    padding: $spacing-lg;
    display: flex;
    flex-direction: column;
  }
  
  &__meta {
    display: flex;
    gap: $spacing-md;
    margin-bottom: $spacing-sm;
    flex-wrap: wrap;
  }
  
  &__date {
    font-size: $font-size-sm;
    color: lighten($dark-gray, 30%);
  }
  
  &__category {
    font-size: $font-size-sm;
    color: $white;
    background-color: $primary-purple;
    padding: 2px 8px;
    border-radius: $border-radius-sm;
  }
  
  &__status {
    font-size: $font-size-sm;
    color: $white;
    background-color: $primary-green;
    padding: 2px 8px;
    border-radius: $border-radius-sm;
  }
  
  &__title {
    margin: 0 0 $spacing-sm;
    font-size: $font-size-lg;
  }
  
  &__description {
    margin: 0 0 $spacing-md;
    color: lighten($dark-gray, 20%);
    flex-grow: 1;
    
    // Ограничиваем высоту описания
    max-height: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  
  &__actions {
    display: flex;
    gap: $spacing-md;
    margin-top: $spacing-md;
  }
}

.admin-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($black, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  
  &__content {
    background-color: $white;
    border-radius: $border-radius-md;
    padding: $spacing-lg;
    width: 90%;
    max-width: 500px;
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
  
  &--primary {
    background-color: $primary-purple;
    color: $white;
    
    &:hover {
      background-color: darken($primary-purple, 10%);
    }
  }
  
  &--secondary {
    background-color: $light-purple;
    color: $primary-purple;
    
    &:hover {
      background-color: darken($light-purple, 5%);
    }
  }
  
  &--danger {
    background-color: $error-red;
    color: $white;
    
    &:hover {
      background-color: darken($error-red, 10%);
    }
  }
  
  &--sm {
    font-size: $font-size-sm;
    padding: $spacing-xs $spacing-sm;
  }
}
</style>
