<template>
  <div class="admin-initiatives">
    <div class="admin-initiatives__header">
      <h1 class="admin-initiatives__title">Управление заявками</h1>
      <NuxtLink to="/admin/initiatives/new" class="btn btn--primary">
        Добавить заявку
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
        Попробовать снова
      </button>
    </div>
    
    <div v-else-if="filteredInitiatives.length === 0" class="admin-initiatives__empty">
      <p>Заявок не найдено.</p>
    </div>
    
    <div v-else class="admin-initiatives__table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Контакт</th>
            <th>Направление</th>
            <th>Дата</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="initiative in filteredInitiatives" :key="initiative.id">
            <td>{{ initiative.id }}</td>
            <td>{{ initiative.name }}</td>
            <td>{{ initiative.contact }}</td>
            <td>{{ getDirectionLabel(initiative.direction) }}</td>
            <td>{{ formatDate(initiative.date) }}</td>
            <td>
              <select 
                v-model="initiative.status" 
                class="status-select"
                @change="updateInitiativeStatus(initiative.id, initiative.status)"
              >
                <option value="new">Новая</option>
                <option value="in-progress">В работе</option>
                <option value="completed">Завершена</option>
              </select>
            </td>
            <td>
              <div class="action-buttons">
                <NuxtLink 
                  :to="`/admin/initiatives/${initiative.id}`" 
                  class="action-button action-button--view"
                  title="Просмотр"
                >
                  👁️
                </NuxtLink>
                <button 
                  class="action-button action-button--delete"
                  title="Удалить"
                  @click="confirmDelete(initiative)"
                >
                  🗑️
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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

const cancelDelete = () => {
  initiativeToDelete.value = null;
  showDeleteModal.value = false;
};

const deleteInitiative = async () => {
  try {
    // In a real application, this would call an API to delete the initiative
    // For demo purposes, we'll just remove it from the store
    const index = initiativesStore.initiatives.findIndex(item => item.id === initiativeToDelete.value.id);
    if (index !== -1) {
      initiativesStore.initiatives.splice(index, 1);
    }
    
    showDeleteModal.value = false;
    initiativeToDelete.value = null;
  } catch (error) {
    console.error('Error deleting initiative:', error);
    alert('Ошибка при удалении заявки');
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
  
  &__table {
    background-color: $white;
    border-radius: $border-radius-md;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    overflow-x: auto;
    
    table {
      width: 100%;
      border-collapse: collapse;
      
      th, td {
        padding: $spacing-md;
        text-align: left;
        border-bottom: 1px solid rgba($dark-gray, 0.1);
      }
      
      th {
        font-weight: 600;
        color: lighten($dark-gray, 20%);
        font-size: $font-size-sm;
      }
      
      tr:last-child td {
        border-bottom: none;
      }
    }
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
  
  &__select,
  &__input {
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

.status-select {
  padding: $spacing-xs $spacing-sm;
  border: 1px solid rgba($dark-gray, 0.2);
  border-radius: $border-radius-sm;
  
  &:focus {
    outline: none;
    border-color: $primary-purple;
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
