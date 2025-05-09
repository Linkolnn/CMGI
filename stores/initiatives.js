import { defineStore } from 'pinia';

export const useInitiativesStore = defineStore('initiatives', {
  state: () => ({
    initiatives: [
      {
        id: 1,
        name: 'Иван Петров',
        contact: 'ivan@example.com',
        direction: 'uray-youth',
        description: 'Предлагаю организовать серию мастер-классов по программированию для школьников. Я работаю разработчиком и готов поделиться знаниями с молодежью.',
        file: null,
        status: 'new',
        date: '2025-05-01',
        comments: []
      },
      {
        id: 2,
        name: 'Анна Сидорова',
        contact: '+7 (900) 123-45-67',
        direction: 'volunteers',
        description: 'Хочу предложить проект "Связь поколений" - организовать регулярные встречи ветеранов со школьниками для записи воспоминаний и создания архива устной истории.',
        file: null,
        status: 'in-progress',
        date: '2025-04-28',
        comments: [
          {
            author: 'Администратор',
            text: 'Отличная идея! Свяжемся с вами для обсуждения деталей.',
            date: '2025-04-29'
          }
        ]
      },
      {
        id: 3,
        name: 'Дмитрий Волков',
        contact: 'dmitry@example.com',
        direction: 'dobro-center',
        description: 'Предлагаю создать волонтерскую группу для помощи пожилым людям с доставкой продуктов и лекарств. Уже есть 5 человек, готовых участвовать.',
        file: null,
        status: 'completed',
        date: '2025-04-15',
        comments: [
          {
            author: 'Администратор',
            text: 'Проект одобрен. Приглашаем на встречу для обсуждения организационных вопросов.',
            date: '2025-04-16'
          },
          {
            author: 'Администратор',
            text: 'Проект запущен! Спасибо за инициативу.',
            date: '2025-04-20'
          }
        ]
      }
    ],
    loading: false,
    error: null
  }),
  
  getters: {
    getInitiativeById: (state) => (id) => {
      return state.initiatives.find(item => item.id === parseInt(id));
    },
    getInitiativesByStatus: (state) => (status) => {
      if (!status || status === 'all') return state.initiatives;
      return state.initiatives.filter(item => item.status === status);
    },
    getInitiativesByDirection: (state) => (direction) => {
      if (!direction || direction === 'all') return state.initiatives;
      return state.initiatives.filter(item => item.direction === direction);
    },
    getNewInitiativesCount: (state) => {
      return state.initiatives.filter(item => item.status === 'new').length;
    }
  },
  
  actions: {
    // Загрузка инициатив из localStorage при инициализации
    initInitiatives() {
      if (process.client) {
        const storedInitiatives = localStorage.getItem('cmgi_initiatives');
        if (storedInitiatives) {
          try {
            this.initiatives = JSON.parse(storedInitiatives);
          } catch (error) {
            console.error('Ошибка при загрузке инициатив из localStorage:', error);
            // Если произошла ошибка, оставляем дефолтные данные
          }
        }
      }
    },
    
    // Сохранение инициатив в localStorage
    saveInitiatives() {
      if (process.client) {
        try {
          localStorage.setItem('cmgi_initiatives', JSON.stringify(this.initiatives));
        } catch (error) {
          console.error('Ошибка при сохранении инициатив в localStorage:', error);
        }
      }
    },
    
    async fetchInitiatives() {
      this.loading = true;
      this.error = null;
      
      try {
        // Загружаем инициативы из localStorage
        this.initInitiatives();
        
        // Имитация задержки API
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        this.error = 'Ошибка при загрузке инициатив';
      } finally {
        this.loading = false;
      }
    },
    
    async addInitiative(initiative) {
      this.loading = true;
      this.error = null;
      
      try {
        // Создаем новую инициативу
        const newId = this.initiatives.length > 0 
          ? Math.max(...this.initiatives.map(item => item.id)) + 1 
          : 1;
        const newInitiative = {
          ...initiative,
          id: newId,
          status: 'new',
          date: new Date().toISOString().split('T')[0],
          comments: []
        };
        
        // Имитация задержки API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        this.initiatives.unshift(newInitiative);
        
        // Сохраняем в localStorage
        this.saveInitiatives();
        
        return true;
      } catch (error) {
        this.error = 'Ошибка при добавлении инициативы';
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async updateInitiativeStatus(id, status) {
      this.loading = true;
      this.error = null;
      
      try {
        const initiative = this.getInitiativeById(id);
        if (!initiative) throw new Error('Инициатива не найдена');
        
        // Имитация задержки API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        initiative.status = status;
        
        // Сохраняем в localStorage
        this.saveInitiatives();
        
        return true;
      } catch (error) {
        this.error = 'Ошибка при обновлении статуса инициативы';
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async addComment(id, comment) {
      this.loading = true;
      this.error = null;
      
      try {
        const initiative = this.getInitiativeById(id);
        if (!initiative) throw new Error('Инициатива не найдена');
        
        const newComment = {
          author: 'Администратор',
          text: comment,
          date: new Date().toISOString().split('T')[0]
        };
        
        // Имитация задержки API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        initiative.comments.push(newComment);
        
        // Сохраняем в localStorage
        this.saveInitiatives();
        
        return true;
      } catch (error) {
        this.error = 'Ошибка при добавлении комментария';
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async deleteInitiative(id) {
      this.loading = true;
      this.error = null;
      
      try {
        const index = this.initiatives.findIndex(item => item.id === parseInt(id));
        if (index === -1) throw new Error('Инициатива не найдена');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        this.initiatives.splice(index, 1);
        
        // Сохраняем обновленные заявки в localStorage
        localStorage.setItem('cmgi_initiatives', JSON.stringify(this.initiatives));
        
        return true;
      } catch (error) {
        this.error = 'Ошибка при удалении инициативы';
        return false;
      } finally {
        this.loading = false;
      }
    }
  }
});
