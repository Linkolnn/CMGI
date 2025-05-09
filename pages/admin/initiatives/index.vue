<template>
  <div class="admin-initiatives">
    <div class="admin-initiatives__header">
      <h1 class="admin-initiatives__title">Управление заявками</h1>
      <NuxtLink to="/admin/initiatives/new" class="btn btn--primary">
        <i class="fas fa-plus-circle"></i> Добавить заявку
      </NuxtLink>
    </div>
    
    <div class="admin-initiatives__filters">
      <div class="filter-group">
        <label for="status-filter" class="filter-group__label">Статус:</label>
        <select id="status-filter" v-model="statusFilter" class="filter-group__select">
          <option value="all">Все статусы</option>
          <option value="new">Новые</option>
          <option value="in-progress">В работе</option>
          <option value="completed">Завершенные</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="direction-filter" class="filter-group__label">Направление:</label>
        <select id="direction-filter" v-model="directionFilter" class="filter-group__select">
          <option value="all">Все направления</option>
          <option value="uray-youth">Урай Молодёжный</option>
          <option value="volunteers">Волонтёры Победы</option>
          <option value="dobro-center">Добро.Центр</option>
          <option value="other">Другое</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="search" class="filter-group__label">Поиск:</label>
        <input 
          id="search" 
          v-model="searchQuery" 
          type="text" 
          class="filter-group__input" 
          placeholder="Поиск по имени или описанию"
        />
      </div>
    </div>
    
    <div v-if="loading" class="admin-initiatives__loading">
      <p>Загрузка заявок...</p>
    </div>
    
    <div v-else-if="error" class="admin-initiatives__error">
      <p>{{ error }}</p>
      <button @click="fetchInitiatives" class="btn btn--primary">
        <i class="fas fa-sync-alt"></i> Попробовать снова
      </button>
    </div>
    
    <div v-else-if="filteredInitiatives.length === 0" class="admin-initiatives__empty">
      <p>Заявок не найдено.</p>
    </div>
    
    <div v-else class="initiatives-cards">
      <div v-for="initiative in filteredInitiatives" :key="initiative.id" class="initiative-card">
        <div class="initiative-card__header">
          <span class="initiative-card__id">#{{ initiative.id }}</span>
          <span 
            class="status-badge" 
            :class="`status-badge--${initiative.status}`"
          >
            {{ getStatusLabel(initiative.status) }}
          </span>
        </div>
        
        <div class="initiative-card__content">
          <h3 class="initiative-card__name">{{ initiative.name }}</h3>
          <p class="initiative-card__description">{{ initiative.description.substring(0, 100) }}{{ initiative.description.length > 100 ? '...' : '' }}</p>
          
          <div class="initiative-card__meta">
            <div class="initiative-card__meta-item">
              <i class="fas fa-tag"></i> {{ getDirectionLabel(initiative.direction) }}
            </div>
            <div class="initiative-card__meta-item">
              <i class="fas fa-calendar"></i> {{ formatDate(initiative.date) }}
            </div>
            <div class="initiative-card__meta-item">
              <i class="fas fa-user"></i> {{ initiative.contact }}
            </div>
          </div>
        </div>
        
        <div class="initiative-card__actions">
          <div class="initiative-card__status-selector">
            <select 
              :id="`status-${initiative.id}`"
              v-model="initiative.status" 
              class="status-select"
              @change="updateInitiativeStatus(initiative.id, initiative.status)"
            >
              <option value="new">Новая</option>
              <option value="in-progress">В работе</option>
              <option value="completed">Завершена</option>
            </select>
          </div>
          
          <div class="initiative-card__buttons">
            <NuxtLink 
              :to="`/admin/initiatives/${initiative.id}`" 
              class="btn btn--primary btn--sm"
            >
              <i class="fas fa-edit"></i> Управление
            </NuxtLink>
            
            <button 
              class="btn btn--danger btn--sm"
              @click="confirmDelete(initiative)"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="delete-modal">
      <div class="delete-modal__content">
        <h2 class="delete-modal__title">Подтверждение удаления</h2>
        <p class="delete-modal__text">
          Вы уверены, что хотите удалить заявку от {{ initiativeToDelete?.name }}?
          Это действие нельзя отменить.
        </p>
        <div class="delete-modal__actions">
          <button @click="cancelDelete" class="btn btn--secondary">
            <i class="fas fa-times"></i> Отмена
          </button>
          <button @click="deleteInitiative" class="btn btn--danger">
            <i class="fas fa-trash-alt"></i> Удалить
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

const loading = ref(true);
const error = ref(null);
const statusFilter = ref('all');
const directionFilter = ref('all');
const searchQuery = ref('');
const showDeleteModal = ref(false);
const initiativeToDelete = ref(null);

// Check if user is authenticated
onMounted(() => {
  const isAuthenticated = localStorage.getItem('cmgi_admin_auth');
  if (!isAuthenticated) {
    router.push('/admin/login');
    return;
  }
  
  fetchInitiatives();
});

// Fetch initiatives
const fetchInitiatives = async () => {
  try {
    loading.value = true;
    error.value = null;
    await initiativesStore.fetchInitiatives();
  } catch (err) {
    error.value = 'Ошибка при загрузке заявок. Пожалуйста, попробуйте позже.';
    console.error('Error fetching initiatives:', err);
  } finally {
    loading.value = false;
  }
};

// Filtered initiatives based on filters and search
const filteredInitiatives = computed(() => {
  let initiatives = [...initiativesStore.initiatives];
  
  // Apply status filter
  if (statusFilter.value !== 'all') {
    initiatives = initiatives.filter(item => item.status === statusFilter.value);
  }
  
  // Apply direction filter
  if (directionFilter.value !== 'all') {
    initiatives = initiatives.filter(item => item.direction === directionFilter.value);
  }
  
  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    initiatives = initiatives.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query)
    );
  }
  
  // Sort by date (newest first)
  return initiatives.sort((a, b) => new Date(b.date) - new Date(a.date));
});

// Helper functions
const getStatusLabel = (status) => {
  const statuses = {
    'new': 'Новая',
    'in-progress': 'В работе',
    'completed': 'Завершена'
  };
  return statuses[status] || status;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const getDirectionLabel = (direction) => {
  const directions = {
    'uray-youth': 'Урай Молодёжный',
    'volunteers': 'Волонтёры Победы',
    'dobro-center': 'Добро.Центр',
    'other': 'Другое'
  };
  return directions[direction] || direction;
};

// Функция formatDate уже объявлена выше

// Update initiative status
const updateInitiativeStatus = async (id, status) => {
  try {
    await initiativesStore.updateInitiativeStatus(id, status);
  } catch (error) {
    console.error('Error updating initiative status:', error);
    alert('Ошибка при обновлении статуса заявки');
  }
};

// Delete initiative
const confirmDelete = (initiative) => {
  initiativeToDelete.value = initiative;
  showDeleteModal.value = true;
};

// Cancel delete action
const cancelDelete = () => {
  showDeleteModal.value = false;
  initiativeToDelete.value = null;
};

// Delete initiative
const deleteInitiative = async () => {
  try {
    await initiativesStore.deleteInitiative(initiativeToDelete.value.id);
    showDeleteModal.value = false;
    initiativeToDelete.value = null;
  } catch (err) {
    console.error('Error deleting initiative:', err);
  }
};
</script>

<style lang="scss">
.admin-initiatives {
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
  
  &__loading,
  &__error,
  &__empty {
    background-color: $white;
    padding: $spacing-xl;
    border-radius: $border-radius-md;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
}

.initiatives-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-lg;
  
  @include tablet {
    grid-template-columns: 1fr;
  }
}

.initiative-card {
  background-color: $white;
  border-radius: $border-radius-md;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $spacing-sm $spacing-md;
    background-color: $light-purple;
    border-bottom: 1px solid rgba($dark-gray, 0.1);
  }
  
  &__id {
    font-weight: 600;
    color: $primary-purple;
  }
  
  &__content {
    padding: $spacing-md;
    flex: 1;
  }
  
  &__name {
    font-size: $font-size-base;
    margin-bottom: $spacing-sm;
  }
  
  &__description {
    color: lighten($dark-gray, 20%);
    margin-bottom: $spacing-md;
    font-size: $font-size-sm;
  }
  
  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-md;
    margin-bottom: $spacing-md;
    font-size: $font-size-xs;
  }
  
  &__meta-item {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    color: lighten($dark-gray, 30%);
    
    i {
      color: $primary-purple;
    }
  }
  
  &__status-selector {
    flex: 1;
    
    select {
      padding: $spacing-xs $spacing-sm;
      border: 1px solid $light-gray;
      border-radius: $border-radius-sm;
      font-size: $font-size-sm;
      width: 100%;
      
      &:focus {
        outline: none;
        border-color: $primary-purple;
      }
    }
  }
  
  &__actions {
    padding: $spacing-sm $spacing-md;
    border-top: 1px solid rgba($dark-gray, 0.1);
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
  }
  
  &__buttons {
    display: flex;
    gap: $spacing-sm;
  }
}

.action-buttons {
  display: flex;
  gap: $spacing-sm;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: $font-size-lg;
  padding: $spacing-xs;
  border-radius: $border-radius-sm;
  transition: $transition-base;
  
  &--view {
    &:hover {
      background-color: rgba($primary-purple, 0.1);
    }
  }
  
  &--delete {
    &:hover {
      background-color: rgba(red, 0.1);
    }
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
</style>
