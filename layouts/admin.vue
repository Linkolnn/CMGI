<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="admin-sidebar__logo">
        <NuxtLink to="/admin">
          <img src="/images/logo.svg" alt="Центр молодёжных и гражданских инициатив" class="logo-image" />
        </NuxtLink>
      </div>
      <nav class="admin-nav">
        <ul class="admin-nav__list">
          <li class="admin-nav__item">
            <NuxtLink to="/admin" class="admin-nav__link">
              <span class="admin-nav__icon">📊</span>
              <span class="admin-nav__text">Панель управления</span>
            </NuxtLink>
          </li>
          <li class="admin-nav__item">
            <NuxtLink to="/admin/initiatives" class="admin-nav__link">
              <span class="admin-nav__icon">📝</span>
              <span class="admin-nav__text">Заявки</span>
            </NuxtLink>
          </li>
          <li class="admin-nav__item">
            <NuxtLink to="/admin/news" class="admin-nav__link">
              <span class="admin-nav__icon">📰</span>
              <span class="admin-nav__text">Новости</span>
            </NuxtLink>
          </li>
          <li class="admin-nav__item">
            <NuxtLink to="/admin/events" class="admin-nav__link">
              <span class="admin-nav__icon">🗓️</span>
              <span class="admin-nav__text">События</span>
            </NuxtLink>
          </li>
          <li class="admin-nav__item">
            <NuxtLink to="/admin/users" class="admin-nav__link">
              <span class="admin-nav__icon">👥</span>
              <span class="admin-nav__text">Пользователи</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="admin-sidebar__footer">
        <button class="admin-logout-btn" @click="handleLogout">
          <span class="admin-nav__icon">🚪</span>
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
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

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
  // Here would be authentication logic
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
      max-width: 150px;
      filter: brightness(0) invert(1);
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
    
    &__footer {
      display: none;
    }
  }
  
  .admin-nav {
    padding: $spacing-sm 0;
    
    &__list {
      flex-direction: row;
      overflow-x: auto;
      padding-bottom: $spacing-sm;
    }
    
    &__item {
      margin-bottom: 0;
      margin-right: $spacing-sm;
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
