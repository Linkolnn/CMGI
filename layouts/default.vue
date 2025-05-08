<template>
  <div class="app-layout">
    <div class="menu-overlay" v-if="isMenuOpen" @click="isMenuOpen = false"></div>
    <header class="header">
      <div class="container">
        <div class="header__content">
          <div class="header__logo">
            <NuxtLink to="/">
              <img src="/images/logo.svg" alt="Центр молодёжных и гражданских инициатив" class="logo-image" />
            </NuxtLink>
          </div>
          <nav class="header__nav">
            <button class="header__menu-toggle" @click="isMenuOpen = !isMenuOpen" aria-label="Меню">
              <span></span>
              <span></span>
              <span></span>
            </button>
            <ul class="nav-list" :class="{ 'nav-list--open': isMenuOpen }">
              <button class="nav-list__close" @click="isMenuOpen = false" aria-label="Закрыть меню">
                ✕
              </button>
              <li class="nav-item">
                <NuxtLink to="/" class="nav-link" @click="isMenuOpen = false">Главная</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink to="/about" class="nav-link" @click="isMenuOpen = false">О нас</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink to="/uray-youth" class="nav-link" @click="isMenuOpen = false">Урай Молодёжный</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink to="/volunteers" class="nav-link" @click="isMenuOpen = false">Волонтёры Победы</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink to="/dobro-center" class="nav-link" @click="isMenuOpen = false">Добро.Центр</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink to="/news" class="nav-link" @click="isMenuOpen = false">Новости</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink to="/contacts" class="nav-link" @click="isMenuOpen = false">Контакты</NuxtLink>
              </li>
              <li class="nav-item nav-item--highlight">
                <NuxtLink to="/initiative" class="nav-link nav-link--highlight" @click="isMenuOpen = false">Подать инициативу</NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <div class="container">
        <div class="footer__content">
          <div class="footer__logo">
            <img src="/images/logo.svg" alt="Центр молодёжных и гражданских инициатив" class="logo-image" />
          </div>
          <div class="footer__info">
            <div class="footer__contacts">
              <h3 class="footer__title">Контакты</h3>
              <p>Адрес: г. Урай, ул. Ленина, 88</p>
              <p>Телефон: +7 (34676) 2-23-45</p>
              <p>Email: info@cmgi-uray.ru</p>
            </div>
            <div class="footer__social">
              <h3 class="footer__title">Мы в соцсетях</h3>
              <div class="social-links">
                <a href="https://vk.com/" target="_blank" class="social-link">ВКонтакте</a>
                <a href="https://t.me/" target="_blank" class="social-link">Telegram</a>
              </div>
            </div>
          </div>
          <div class="footer__nav">
            <h3 class="footer__title">Навигация</h3>
            <ul class="footer-nav-list">
              <li><NuxtLink to="/" class="footer-nav-link">Главная</NuxtLink></li>
              <li><NuxtLink to="/about" class="footer-nav-link">О нас</NuxtLink></li>
              <li><NuxtLink to="/uray-youth" class="footer-nav-link">Урай Молодёжный</NuxtLink></li>
              <li><NuxtLink to="/volunteers" class="footer-nav-link">Волонтёры Победы</NuxtLink></li>
              <li><NuxtLink to="/dobro-center" class="footer-nav-link">Добро.Центр</NuxtLink></li>
              <li><NuxtLink to="/news" class="footer-nav-link">Новости</NuxtLink></li>
              <li><NuxtLink to="/contacts" class="footer-nav-link">Контакты</NuxtLink></li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          <p>© {{ new Date().getFullYear() }} Центр молодёжных и гражданских инициатив города Урай. Все права защищены.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);
</script>

<style lang="scss">
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.main {
  flex: 1;
}

// Header styles
.header {
  background-color: $white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: $z-index-sticky;
  
  &__content {
    @include flex-between;
    padding: $spacing-md 0;
  }
  
  &__logo {
    max-width: 180px;
    
    .logo-image {
      width: 100%;
      height: auto;
    }
  }
  
  &__menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 21px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 101;
    
    span {
      display: block;
      height: 3px;
      width: 100%;
      background-color: $primary-green;
      border-radius: 3px;
      transition: $transition-base;
    }
    
    @include tablet {
      display: flex;
    }
  }
}

.nav-list {
  @include flex-between;
  gap: $spacing-lg;
  
  @include tablet {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    height: 100vh;
    background-color: $white;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 80px $spacing-lg $spacing-lg;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    overflow-y: auto;
    z-index: 100;
    
    &--open {
      right: 0;
    }
  }
  
  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    border: none;
    font-size: 24px;
    color: $primary-green;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: none;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: $transition-base;
    
    @include tablet {
      display: flex;
    }
    
    &:hover {
      background-color: rgba($primary-green, 0.1);
    }
  }
}

.nav-item {
  position: relative;
  
  &--highlight {
    .nav-link {
      @include button-primary;
      padding: $spacing-xs $spacing-md;
    }
  }
}

.nav-link {
  color: $dark-gray;
  font-weight: 500;
  transition: $transition-base;
  
  &:hover {
    color: $primary-green;
  }
  
  &--highlight {
    color: $black;
    
    &:hover {
      color: $black;
    }
    
    &.router-link-active {
      color: $white;
    }
  }
  
  &.router-link-active {    
    &:after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: $primary-green;
    }
  }
}

// Footer styles
.footer {
  background-color: $dark-gray;
  color: $white;
  padding: $spacing-xl 0 $spacing-md;
  
  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: $spacing-xl;
    margin-bottom: $spacing-xl;
    
    @include tablet {
      grid-template-columns: 1fr 1fr;
    }
    
    @include mobile {
      grid-template-columns: 1fr;
    }
  }
  
  &__logo {
    max-width: 150px;
    margin-bottom: $spacing-md;
    
    .logo-image {
      filter: brightness(0) invert(1);
    }
  }
  
  &__title {
    color: $primary-green;
    margin-bottom: $spacing-md;
    font-size: $font-size-lg;
  }
  
  &__info {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
  }
  
  &__social {
    .social-links {
      display: flex;
      gap: $spacing-md;
    }
    
    .social-link {
      color: $white;
      
      &:hover {
        color: $primary-green;
      }
    }
  }
  
  &__bottom {
    border-top: 1px solid rgba($white, 0.2);
    padding-top: $spacing-md;
    text-align: center;
    font-size: $font-size-sm;
    color: rgba($white, 0.7);
  }
}

.footer-nav-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.footer-nav-link {
  color: $white;
  
  &:hover {
    color: $primary-green;
  }
}
</style>
