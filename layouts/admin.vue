<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="admin-sidebar__logo">
        <NuxtLink to="/admin">
          <img src="/images/logo.jpg" alt="Центр молодёжных и гражданских инициатив" class="logo-image" />
        </NuxtLink>
      </div>
      <nav class="admin-nav">
        <ul class="admin-nav__list">
          <li class="admin-nav__item">
            <NuxtLink to="/admin" class="admin-nav__link">
              <span class="admin-nav__icon"><i class="fas fa-tachometer-alt"></i></span>
              <span class="admin-nav__text">Панель управления</span>
            </NuxtLink>
          </li>
          <li class="admin-nav__item">
            <NuxtLink to="/admin/initiatives" class="admin-nav__link">
              <span class="admin-nav__icon"><i class="fas fa-clipboard-list"></i></span>
              <span class="admin-nav__text">Заявки</span>
            </NuxtLink>
          </li>
          <li class="admin-nav__item">
            <NuxtLink to="/admin/news" class="admin-nav__link">
              <span class="admin-nav__icon"><i class="fas fa-newspaper"></i></span>
              <span class="admin-nav__text">Новости</span>
            </NuxtLink>
          </li>
          
          <li class="admin-nav__item">
            <NuxtLink to="/admin/projects" class="admin-nav__link">
              <span class="admin-nav__icon"><i class="fas fa-project-diagram"></i></span>
              <span class="admin-nav__text">Проекты</span>
            </NuxtLink>
          </li>
          
          <li class="admin-nav__item">
            <NuxtLink to="/admin/events" class="admin-nav__link">
              <span class="admin-nav__icon"><i class="fas fa-calendar-alt"></i></span>
              <span class="admin-nav__text">События</span>
            </NuxtLink>
          </li>
          
          <!-- Кнопка выхода в мобильной версии будет в списке навигации -->
          <li class="admin-nav__item admin-nav__item--logout">
            <button class="admin-nav__link admin-logout-btn" @click="handleLogout">
              <span class="admin-nav__icon"><i class="fas fa-sign-out-alt"></i></span>
              <span class="admin-nav__text">Выйти</span>
            </button>
          </li>
        </ul>
      </nav>
      <div class="admin-sidebar__footer">
        <button class="admin-logout-btn" @click="handleLogout">
          <span class="admin-nav__icon"><i class="fas fa-sign-out-alt"></i></span>
          <span class="admin-nav__text">Выйти</span>
        </button>
      </div>
    </aside>
    
    <div class="admin-content">
      <header class="admin-header">
        <div class="admin-header__left">
          <h1 class="admin-header__title">{{ pageTitle }}</h1>
        </div>
        <div class="admin-header__right">
          <div class="admin-user">
            <span class="admin-user__name">Администратор</span>
          </div>
        </div>
      </header>
      
      <main class="admin-main">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { isAdminAuthenticated, logoutAdmin } from '~/services/auth';

const route = useRoute();
const router = useRouter();
const isAuthenticated = ref(false);

// Проверяем авторизацию перед монтированием компонента
onBeforeMount(() => {
  checkAuth();
});

// Проверяем авторизацию при монтировании компонента (для клиентской стороны)
onMounted(() => {
  checkAuth();
});

// Функция проверки авторизации
const checkAuth = () => {
  if (!isAdminAuthenticated()) {
    router.push('/admin/login');
    return;
  }
  isAuthenticated.value = true;
};

// Compute page title based on current route
const pageTitle = computed(() => {
  const routePath = route.path;
  
  if (routePath === '/admin') return 'Панель управления';
  if (routePath.includes('/admin/initiatives')) return 'Управление заявками';
  if (routePath.includes('/admin/news')) return 'Управление новостями';
  if (routePath.includes('/admin/events')) return 'Управление событиями';
  if (routePath.includes('/admin/users')) return 'Управление пользователями';
  
  return 'Админ-панель';
});

// Handle logout
const handleLogout = () => {
  logoutAdmin();
  router.push('/admin/login');
};
</script>

<style lang="scss">
.admin-layout {
  display: flex;
  min-height: 100vh;
}

// Sidebar styles
.admin-sidebar {
  width: 280px;
  background-color: $dark-gray;
  color: $white;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  
  &__logo {
    padding: $spacing-lg;
    border-bottom: 1px solid rgba($white, 0.1);
    
    .logo-image {
      width: 100%;
      max-width: 55px;
    }
  }
  
  &__footer {
    margin-top: auto;
    padding: $spacing-lg;
    border-top: 1px solid rgba($white, 0.1);
  }
}

// Admin navigation
.admin-nav {
  padding: $spacing-lg 0;
  
  &__list {
    display: flex;
    flex-direction: column;
  }
  
  &__item {
    margin-bottom: $spacing-xs;
  }
  
  &__link {
    display: flex;
    align-items: center;
    padding: $spacing-md $spacing-lg;
    color: rgba($white, 0.8);
    transition: $transition-base;
    border-left: 3px solid transparent;
    
    &:hover, &.router-link-active {
      background-color: rgba($white, 0.1);
      color: $white;
      border-left-color: $primary-green;
    }
  }
  
  &__icon {
    margin-right: $spacing-md;
    font-size: $font-size-lg;
  }
}

// Logout button
.admin-logout-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: $spacing-md 0;
  background: transparent;
  border: none;
  color: rgba($white, 0.8);
  cursor: pointer;
  transition: $transition-base;
  
  &:hover {
    color: $white;
  }
  
  // Стили для кнопки выхода в навигации на мобильных устройствах
  .admin-nav__item--logout & {
    display: none;
    width: auto;
    padding: $spacing-sm;
    justify-content: center;
    border-bottom: 3px solid transparent;
    
    &:hover, &:active {
      background-color: rgba($white, 0.1);
      border-bottom-color: $primary-green;
    }
  }
}

// Content area
.admin-content {
  flex: 1;
  margin-left: 280px;
  background-color: $gray;
}

// Header
.admin-header {
  background-color: $white;
  padding: $spacing-lg;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
  &__title {
    font-size: $font-size-xl;
    margin: 0;
  }
}

// User info
.admin-user {
  display: flex;
  align-items: center;
  
  &__name {
    font-weight: 500;
  }
}

// Main content
.admin-main {
  padding: $spacing-lg;
  overflow-x: hidden; // Предотвращает горизонтальную прокрутку всей страницы
  
  @include mobile {
    padding: $spacing-md;
  }
}

// Responsive adjustments
@include tablet {
  .admin-sidebar {
    width: 80px;
    overflow: hidden;
    
    &__logo {
      display: flex;
      justify-content: center;
      padding: $spacing-md;
      
      .logo-image {
        max-width: 40px;
      }
    }
  }
  
  .admin-nav {
    &__text {
      display: none;
    }
    
    &__icon {
      margin-right: 0;
      font-size: $font-size-xl;
    }
    
    &__link {
      justify-content: center;
      padding: $spacing-md;
    }
    
    &__item--logout {
      display: none; // Скрываем кнопку выхода в навигации на планшетах
    }
  }
  
  .admin-logout-btn {
    justify-content: center;
    
    .admin-nav__text {
      display: none;
    }
  }
  
  .admin-content {
    margin-left: 80px;
  }
}

@include mobile {
  .admin-layout {
    flex-direction: column;
  }
  
  .admin-sidebar {
    width: 100%;
    height: auto;
    position: relative;
    
    &__logo {
      padding: $spacing-sm;
    }

    &__footer{
      display: none;
    }
    
  }
  
  .admin-nav {
    padding: $spacing-sm 0;
    
    &__list {
      flex-direction: row;
      justify-content: space-around;
      overflow-x: auto;
      padding-bottom: $spacing-sm;
      gap: 10px;
    }
    
    &__item {
      margin-bottom: 0;
      width: 100%;
      
      &--logout {
        display: block;
        .admin-logout-btn {
          display: block;
          height: 100%;
          width: 100%;
          .admin-nav__item--logout & {
            display: block;
          }          
        } // Показываем кнопку выхода в мобильной версии
      }
    }
    
    &__link {
      padding: $spacing-sm;
      border-left: none;
      border-bottom: 3px solid transparent;
      
      &:hover, &.router-link-active {
        border-left-color: transparent;
        border-bottom-color: $primary-green;
      }
    }
    
    &__text {
      display: none;
    }
  }
  
  .admin-content {
    margin-left: 0;
  }
}
</style>
