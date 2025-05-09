// Middleware для проверки авторизации администратора

export default defineNuxtRouteMiddleware((to, from) => {
  // Пропускаем проверку на сервере
  if (import.meta.server) {
    return;
  }
  
  // Проверяем, авторизован ли администратор
  const isAuthenticated = localStorage.getItem('cmgi_admin_auth') === 'true';
  
  // Если путь начинается с /admin и это не страница входа
  if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
    // Если администратор не авторизован, перенаправляем на страницу входа
    if (!isAuthenticated) {
      return navigateTo('/admin/login');
    }
  }
  
  // Если это страница входа и администратор уже авторизован, перенаправляем на панель управления
  if (to.path === '/admin/login' && isAuthenticated) {
    return navigateTo('/admin');
  }
});
