// Сервис для аутентификации администратора
import { useRuntimeConfig } from 'nuxt/app';

/**
 * Проверяет учетные данные администратора
 * @param {string} username - Имя пользователя
 * @param {string} password - Пароль
 * @returns {boolean} - Результат проверки
 */
export const checkAdminCredentials = (username, password) => {
  const config = useRuntimeConfig();
  const adminUsername = config.public.adminUsername || 'admin';
  const adminPassword = config.public.adminPassword || 'admin123';
  
  return username === adminUsername && password === adminPassword;
};

/**
 * Проверяет, авторизован ли администратор
 * @returns {boolean} - Результат проверки
 */
export const isAdminAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  
  return localStorage.getItem('cmgi_admin_auth') === 'true';
};

/**
 * Авторизует администратора
 * @param {boolean} remember - Запомнить пользователя
 */
export const authenticateAdmin = (remember = false) => {
  localStorage.setItem('cmgi_admin_auth', 'true');
  
  if (remember) {
    // Устанавливаем куки на 7 дней
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    document.cookie = `cmgi_admin_remember=true; expires=${expiryDate.toUTCString()}; path=/`;
  }
};

/**
 * Выход из админ-панели
 */
export const logoutAdmin = () => {
  localStorage.removeItem('cmgi_admin_auth');
  document.cookie = 'cmgi_admin_remember=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};
