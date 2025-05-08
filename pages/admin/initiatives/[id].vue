<template>
  <div class="admin-initiative-detail">
    <div class="admin-initiative-detail__header">
      <div class="admin-initiative-detail__back">
        <NuxtLink to="/admin/initiatives" class="back-link">
          ← Назад к списку заявок
        </NuxtLink>
      </div>
      <h1 class="admin-initiative-detail__title">
        Заявка #{{ initiativeId }}
      </h1>
    </div>
    
    <div v-if="loading" class="admin-initiative-detail__loading">
      <p>Загрузка заявки...</p>
    </div>
    
    <div v-else-if="error" class="admin-initiative-detail__error">
      <p>{{ error }}</p>
      <button @click="fetchInitiative" class="btn btn--primary">
        Попробовать снова
      </button>
    </div>
    
    <template v-else-if="initiative">
      <div class="admin-initiative-detail__content">
        <div class="admin-initiative-detail__main">
          <div class="initiative-card">
            <div class="initiative-card__header">
              <h2 class="initiative-card__title">Информация о заявке</h2>
              <div class="initiative-card__status">
                <label for="status" class="initiative-card__status-label">Статус:</label>
                <select 
                  id="status" 
                  v-model="initiative.status" 
                  class="initiative-card__status-select"
                  @change="updateStatus"
                >
                  <option value="new">Новая</option>
                  <option value="in-progress">В работе</option>
                  <option value="completed">Завершена</option>
                </select>
              </div>
            </div>
            
            <div class="initiative-card__body">
              <div class="initiative-info">
                <div class="initiative-info__group">
                  <h3 class="initiative-info__label">Имя:</h3>
                  <p class="initiative-info__value">{{ initiative.name }}</p>
                </div>
                
                <div class="initiative-info__group">
                  <h3 class="initiative-info__label">Контакт:</h3>
                  <p class="initiative-info__value">{{ initiative.contact }}</p>
                </div>
                
                <div class="initiative-info__group">
                  <h3 class="initiative-info__label">Направление:</h3>
                  <p class="initiative-info__value">{{ getDirectionLabel(initiative.direction) }}</p>
                </div>
                
                <div class="initiative-info__group">
                  <h3 class="initiative-info__label">Дата подачи:</h3>
                  <p class="initiative-info__value">{{ formatDate(initiative.date) }}</p>
                </div>
                
                <div class="initiative-info__group initiative-info__group--full">
                  <h3 class="initiative-info__label">Описание инициативы:</h3>
                  <p class="initiative-info__value initiative-info__description">{{ initiative.description }}</p>
                </div>
                
                <div v-if="initiative.file" class="initiative-info__group initiative-info__group--full">
                  <h3 class="initiative-info__label">Прикрепленный файл:</h3>
                  <div class="initiative-info__file">
                    <span class="initiative-info__file-name">{{ initiative.file }}</span>
                    <button class="btn btn--secondary btn--sm">Скачать</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="comments-card">
            <h2 class="comments-card__title">Комментарии</h2>
            
            <div v-if="initiative.comments.length === 0" class="comments-card__empty">
              <p>Комментариев пока нет.</p>
            </div>
            
            <div v-else class="comments-list">
              <div v-for="(comment, index) in initiative.comments" :key="index" class="comment-item">
                <div class="comment-item__header">
                  <div class="comment-item__author">{{ comment.author }}</div>
                  <div class="comment-item__date">{{ formatDate(comment.date) }}</div>
                </div>
                <div class="comment-item__text">{{ comment.text }}</div>
              </div>
            </div>
            
            <div class="comments-form">
              <h3 class="comments-form__title">Добавить комментарий</h3>
              <div class="form__group">
                <textarea 
                  v-model="newComment" 
                  class="form__textarea" 
                  placeholder="Введите ваш комментарий..."
                  rows="4"
                ></textarea>
              </div>
              <div class="form__actions">
                <button 
                  @click="addComment" 
                  class="btn btn--primary" 
                  :disabled="!newComment.trim() || addingComment"
                >
                  {{ addingComment ? 'Добавление...' : 'Добавить комментарий' }}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="admin-initiative-detail__sidebar">
          <div class="sidebar-card">
            <h3 class="sidebar-card__title">Действия</h3>
            <div class="sidebar-actions">
              <button @click="printInitiative" class="sidebar-action">
                <span class="sidebar-action__icon">🖨️</span>
                <span class="sidebar-action__text">Печать</span>
              </button>
              
              <button @click="exportInitiative" class="sidebar-action">
                <span class="sidebar-action__icon">📥</span>
                <span class="sidebar-action__text">Экспорт в PDF</span>
              </button>
              
              <button @click="confirmDelete" class="sidebar-action sidebar-action--danger">
                <span class="sidebar-action__icon">🗑️</span>
                <span class="sidebar-action__text">Удалить заявку</span>
              </button>
            </div>
          </div>
          
          <div class="sidebar-card">
            <h3 class="sidebar-card__title">Похожие заявки</h3>
            
            <div v-if="similarInitiatives.length === 0" class="sidebar-card__empty">
              <p>Похожих заявок не найдено.</p>
            </div>
            
            <div v-else class="similar-initiatives">
              <div v-for="item in similarInitiatives" :key="item.id" class="similar-initiative">
                <NuxtLink :to="`/admin/initiatives/${item.id}`" class="similar-initiative__link">
                  <div class="similar-initiative__name">{{ item.name }}</div>
                  <div class="similar-initiative__details">
                    <span class="similar-initiative__direction">{{ getDirectionLabel(item.direction) }}</span>
                    <span class="similar-initiative__date">{{ formatDate(item.date) }}</span>
                  </div>
                </NuxtLink>
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
          Вы уверены, что хотите удалить эту заявку?
          Это действие нельзя отменить.
        </p>
        <div class="delete-modal__actions">
          <button @click="cancelDelete" class="btn btn--secondary">
            Отмена
          </button>
          <button @click="deleteInitiative" class="btn btn--primary">
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useInitiativesStore } from '~/stores/initiatives';

definePageMeta({
  layout: 'admin'
});

const route = useRoute();
const router = useRouter();
const initiativesStore = useInitiativesStore();

const loading = ref(true);
const error = ref(null);
const initiative = ref(null);
const newComment = ref('');
const addingComment = ref(false);
const showDeleteModal = ref(false);

// Get initiative ID from route params
const initiativeId = computed(() => parseInt(route.params.id));

// Similar initiatives (same direction, excluding current)
const similarInitiatives = computed(() => {
  if (!initiative.value) return [];
  
  return initiativesStore.initiatives
    .filter(item => 
      item.direction === initiative.value.direction && 
      item.id !== initiative.value.id
    )
    .slice(0, 3);
});

// Check if user is authenticated
onMounted(() => {
  const isAuthenticated = localStorage.getItem('cmgi_admin_auth');
  if (!isAuthenticated) {
    router.push('/admin/login');
    return;
  }
  
  fetchInitiative();
});

// Fetch initiative
const fetchInitiative = async () => {
  try {
    loading.value = true;
    error.value = null;
    
    await initiativesStore.fetchInitiatives();
    
    const initiativeData = initiativesStore.getInitiativeById(initiativeId.value);
    if (!initiativeData) {
      error.value = 'Заявка не найдена';
      return;
    }
    
    initiative.value = initiativeData;
  } catch (err) {
    error.value = 'Ошибка при загрузке заявки. Пожалуйста, попробуйте позже.';
    console.error('Error fetching initiative:', err);
  } finally {
    loading.value = false;
  }
};

// Helper functions
const getDirectionLabel = (direction) => {
  const directions = {
    'uray-youth': 'Урай Молодёжный',
    'volunteers': 'Волонтёры Победы',
    'dobro-center': 'Добро.Центр',
    'other': 'Другое'
  };
  return directions[direction] || direction;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  }).format(date);
};

// Update initiative status
const updateStatus = async () => {
  try {
    await initiativesStore.updateInitiativeStatus(initiative.value.id, initiative.value.status);
  } catch (error) {
    console.error('Error updating initiative status:', error);
    alert('Ошибка при обновлении статуса заявки');
  }
};

// Add comment
const addComment = async () => {
  if (!newComment.value.trim()) return;
  
  try {
    addingComment.value = true;
    
    await initiativesStore.addComment(initiative.value.id, newComment.value);
    
    newComment.value = '';
  } catch (error) {
    console.error('Error adding comment:', error);
    alert('Ошибка при добавлении комментария');
  } finally {
    addingComment.value = false;
  }
};

// Print initiative
const printInitiative = () => {
  window.print();
};

// Export initiative to PDF
const exportInitiative = () => {
  // In a real application, this would generate a PDF
  alert('Экспорт в PDF будет доступен в полной версии');
};

// Delete initiative
const confirmDelete = () => {
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  showDeleteModal.value = false;
};

const deleteInitiative = async () => {
  try {
    // In a real application, this would call an API to delete the initiative
    // For demo purposes, we'll just remove it from the store
    const index = initiativesStore.initiatives.findIndex(item => item.id === initiative.value.id);
    if (index !== -1) {
      initiativesStore.initiatives.splice(index, 1);
    }
    
    showDeleteModal.value = false;
    
    // Redirect to initiatives list
    router.push('/admin/initiatives');
  } catch (error) {
    console.error('Error deleting initiative:', error);
    alert('Ошибка при удалении заявки');
  }
};
</script>

<style lang="scss">
.admin-initiative-detail {
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

.initiative-card {
  background-color: $white;
  border-radius: $border-radius-md;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  margin-bottom: $spacing-lg;
  
  &__header {
    padding: $spacing-lg;
    border-bottom: 1px solid rgba($dark-gray, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    @include mobile {
      flex-direction: column;
      align-items: flex-start;
      gap: $spacing-md;
    }
  }
  
  &__title {
    margin: 0;
    font-size: $font-size-lg;
  }
  
  &__status {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }
  
  &__status-label {
    font-weight: 500;
  }
  
  &__status-select {
    padding: $spacing-xs $spacing-sm;
    border: 1px solid rgba($dark-gray, 0.2);
    border-radius: $border-radius-sm;
    
    &:focus {
      outline: none;
      border-color: $primary-purple;
    }
  }
  
  &__body {
    padding: $spacing-lg;
  }
}

.initiative-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-lg;
  
  @include mobile {
    grid-template-columns: 1fr;
  }
  
  &__group {
    &--full {
      grid-column: 1 / -1;
    }
  }
  
  &__label {
    margin: 0 0 $spacing-xs;
    font-size: $font-size-base;
    color: lighten($dark-gray, 20%);
  }
  
  &__value {
    margin: 0;
    font-weight: 500;
  }
  
  &__description {
    white-space: pre-line;
    line-height: 1.6;
  }
  
  &__file {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    
    &-name {
      font-weight: 500;
    }
  }
}

.comments-card {
  background-color: $white;
  border-radius: $border-radius-md;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  padding: $spacing-lg;
  
  &__title {
    margin: 0 0 $spacing-lg;
    font-size: $font-size-lg;
  }
  
  &__empty {
    text-align: center;
    padding: $spacing-lg 0;
    color: lighten($dark-gray, 30%);
  }
}

.comments-list {
  margin-bottom: $spacing-xl;
}

.comment-item {
  padding: $spacing-md;
  background-color: $light-purple;
  border-radius: $border-radius-md;
  margin-bottom: $spacing-md;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: $spacing-sm;
  }
  
  &__author {
    font-weight: 500;
  }
  
  &__date {
    font-size: $font-size-sm;
    color: lighten($dark-gray, 30%);
  }
  
  &__text {
    line-height: 1.6;
  }
}

.comments-form {
  border-top: 1px solid rgba($dark-gray, 0.1);
  padding-top: $spacing-lg;
  
  &__title {
    margin: 0 0 $spacing-md;
    font-size: $font-size-base;
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
  
  &__empty {
    text-align: center;
    padding: $spacing-md 0;
    color: lighten($dark-gray, 30%);
  }
}

.sidebar-actions {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.sidebar-action {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md;
  background-color: $light-purple;
  border: none;
  border-radius: $border-radius-md;
  cursor: pointer;
  transition: $transition-base;
  text-align: left;
  
  &:hover {
    background-color: darken($light-purple, 5%);
  }
  
  &--danger {
    &:hover {
      background-color: rgba(red, 0.1);
    }
  }
  
  &__icon {
    font-size: $font-size-lg;
  }
  
  &__text {
    font-weight: 500;
  }
}

.similar-initiatives {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.similar-initiative {
  &__link {
    display: block;
    padding: $spacing-md;
    background-color: $light-purple;
    border-radius: $border-radius-md;
    transition: $transition-base;
    
    &:hover {
      background-color: darken($light-purple, 5%);
    }
  }
  
  &__name {
    font-weight: 500;
    margin-bottom: $spacing-xs;
  }
  
  &__details {
    display: flex;
    justify-content: space-between;
    font-size: $font-size-sm;
    color: lighten($dark-gray, 20%);
  }
}

.delete-modal {
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

@media print {
  .admin-initiative-detail__back,
  .admin-initiative-detail__sidebar,
  .comments-form,
  .initiative-card__status {
    display: none;
  }
  
  .admin-initiative-detail__content {
    display: block;
  }
  
  .initiative-card,
  .comments-card {
    box-shadow: none;
    margin-bottom: $spacing-xl;
    page-break-inside: avoid;
  }
}
</style>
