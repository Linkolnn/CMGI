<template>
  <div class="admin-login-page">
    <div class="admin-login-container">
      <div class="admin-login-logo">
        <img src="/images/logo.svg" alt="Центр молодёжных и гражданских инициатив" />
      </div>
      
      <h1 class="admin-login-title">Вход в админ-панель</h1>
      
      <form class="admin-login-form" @submit.prevent="handleLogin">
        <div class="form__group">
          <label for="username" class="form__label">Имя пользователя</label>
          <input 
            id="username" 
            v-model="form.username" 
            type="text" 
            class="form__input" 
            required 
            :class="{ 'form__input--error': errors.username }"
          />
          <p v-if="errors.username" class="form__error">{{ errors.username }}</p>
        </div>
        
        <div class="form__group">
          <label for="password" class="form__label">Пароль</label>
          <input 
            id="password" 
            v-model="form.password" 
            type="password" 
            class="form__input" 
            required
            :class="{ 'form__input--error': errors.password }"
          />
          <p v-if="errors.password" class="form__error">{{ errors.password }}</p>
        </div>
        
        <div class="form__group">
          <div class="admin-login-remember">
            <input id="remember" v-model="form.remember" type="checkbox" />
            <label for="remember">Запомнить меня</label>
          </div>
        </div>
        
        <div class="form__actions">
          <button type="submit" class="btn btn--primary admin-login-button" :disabled="isLoading">
            {{ isLoading ? 'Вход...' : 'Войти' }}
          </button>
        </div>
        
        <p v-if="loginError" class="admin-login-error">{{ loginError }}</p>
      </form>
      
      <div class="admin-login-footer">
        <p>© {{ new Date().getFullYear() }} Центр молодёжных и гражданских инициатив</p>
        <p>
          <NuxtLink to="/">Вернуться на главную</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
  username: '',
  password: '',
  remember: false
});

const errors = reactive({
  username: '',
  password: ''
});

const isLoading = ref(false);
const loginError = ref('');

const validateForm = () => {
  let isValid = true;
  
  // Validate username
  if (!form.username.trim()) {
    errors.username = 'Введите имя пользователя';
    isValid = false;
  } else {
    errors.username = '';
  }
  
  // Validate password
  if (!form.password) {
    errors.password = 'Введите пароль';
    isValid = false;
  } else {
    errors.password = '';
  }
  
  return isValid;
};

const handleLogin = async () => {
  if (!validateForm()) return;
  
  isLoading.value = true;
  loginError.value = '';
  
  try {
    // In a real application, this would be an API call to authenticate the user
    // For demo purposes, we'll just simulate a delay and check hardcoded credentials
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo credentials check (in a real app, this would be done on the server)
    if (form.username === 'admin' && form.password === 'admin') {
      // Set a flag in localStorage to simulate authentication
      localStorage.setItem('cmgi_admin_auth', 'true');
      
      // Redirect to admin dashboard
      router.push('/admin');
    } else {
      loginError.value = 'Неверное имя пользователя или пароль';
    }
  } catch (error) {
    loginError.value = 'Ошибка при входе. Пожалуйста, попробуйте позже.';
    console.error('Login error:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style lang="scss">
.admin-login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $gray;
  padding: $spacing-md;
}

.admin-login-container {
  max-width: 400px;
  width: 100%;
  background-color: $white;
  border-radius: $border-radius-md;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: $spacing-xl;
  text-align: center;
}

.admin-login-logo {
  margin-bottom: $spacing-lg;
  
  img {
    max-width: 150px;
  }
}

.admin-login-title {
  font-size: $font-size-xl;
  margin-bottom: $spacing-xl;
  color: $primary-purple;
}

.admin-login-form {
  text-align: left;
  margin-bottom: $spacing-lg;
}

.admin-login-remember {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
}

.admin-login-button {
  width: 100%;
}

.admin-login-error {
  color: red;
  margin-top: $spacing-md;
  text-align: center;
}

.admin-login-footer {
  margin-top: $spacing-xl;
  font-size: $font-size-sm;
  color: lighten($dark-gray, 30%);
  
  p {
    margin-bottom: $spacing-xs;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  a {
    color: $primary-purple;
    
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
