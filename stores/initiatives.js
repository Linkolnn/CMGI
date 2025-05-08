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
    async fetchInitiatives() {
      this.loading = true;
      this.error = null;
      
      try {
        // In a real application, this would be an API call
        // For demo purposes, we're using the static data
        // const response = await fetch('/api/initiatives');
        // const data = await response.json();
        // this.initiatives = data;
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        this.error = 'Ошибка при загрузке инициатив';
        console.error('Error fetching initiatives:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async addInitiative(initiative) {
      this.loading = true;
      this.error = null;
      
      try {
        // In a real application, this would be an API call
        // For demo purposes, we're just adding to the local state
        const newId = Math.max(...this.initiatives.map(item => item.id)) + 1;
        const newInitiative = {
          ...initiative,
          id: newId,
          status: 'new',
          date: new Date().toISOString().split('T')[0],
          comments: []
        };
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        this.initiatives.unshift(newInitiative);
        return true;
      } catch (error) {
        this.error = 'Ошибка при добавлении инициативы';
        console.error('Error adding initiative:', error);
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
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        initiative.status = status;
        return true;
      } catch (error) {
        this.error = 'Ошибка при обновлении статуса инициативы';
        console.error('Error updating initiative status:', error);
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
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        initiative.comments.push(newComment);
        return true;
      } catch (error) {
        this.error = 'Ошибка при добавлении комментария';
        console.error('Error adding comment:', error);
        return false;
      } finally {
        this.loading = false;
      }
    }
  }
});
