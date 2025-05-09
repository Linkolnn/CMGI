import { defineStore } from 'pinia';

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [],
    categories: [
      { value: 'uray-youth', label: 'Урай Молодёжный' },
      { value: 'dobro-center', label: 'Добро.Центр' },
      { value: 'volunteers', label: 'Волонтёры Победы' },
      { value: 'other', label: 'Другое' }
    ]
  }),

  actions: {
    // Загрузка событий из localStorage при инициализации
    initEvents() {
      if (process.client) {
        const storedEvents = localStorage.getItem('cmgi-events');
        if (storedEvents) {
          try {
            this.events = JSON.parse(storedEvents);
          } catch (error) {
            // Тихая обработка ошибки при загрузке событий
          }
        } else {
          // Если в localStorage нет событий, инициализируем хранилище событиями с основных страниц
          this.initDefaultEvents();
        }
      }
    },
    
    // Инициализация хранилища событиями с основных страниц
    initDefaultEvents() {
      // События из страницы Урай Молодёжный
      const urayYouthEvents = [
        {
          id: 'uy-event-1',
          title: 'Мастер-класс "Социальное проектирование"',
          description: 'Практический мастер-класс по разработке и реализации социальных проектов.',
          date: '2025-05-15T15:00:00',
          location: 'Центр молодёжных инициатив, ул. Ленина, 88',
          category: 'uray-youth',
          image: '/images/uray-youth.jpg',
          createdAt: new Date().toISOString()
        },
        {
          id: 'uy-event-2',
          title: 'Встреча с успешными предпринимателями города',
          description: 'Открытый диалог с молодыми предпринимателями, которые поделятся своим опытом и историями успеха.',
          date: '2025-05-20T18:00:00',
          location: 'Коворкинг "Точка роста", ул. Мира, 24',
          category: 'uray-youth',
          image: '/images/uray-youth.jpg',
          createdAt: new Date().toISOString()
        },
        {
          id: 'uy-event-3',
          title: 'Фестиваль молодёжных субкультур "StreetFest"',
          description: 'Ежегодный фестиваль, объединяющий представителей различных молодёжных субкультур.',
          date: '2025-06-12T12:00:00',
          location: 'Городской парк',
          category: 'uray-youth',
          image: '/images/uray-youth.jpg',
          createdAt: new Date().toISOString()
        },
        {
          id: 'uy-event-4',
          title: 'Молодёжный форум "Урай 2025"',
          description: 'Главное молодёжное событие года. Образовательные площадки, мастер-классы, нетворкинг.',
          date: '2025-07-10T10:00:00',
          location: 'Дворец культуры "Нефтяник"',
          category: 'uray-youth',
          image: '/images/uray-youth.jpg',
          createdAt: new Date().toISOString()
        }
      ];
      
      // События из страницы Добро.Центр
      const dobroCenterEvents = [
        {
          id: 'dc-event-1',
          title: 'День добровольца',
          description: 'Праздник, посвящённый волонтёрам и добровольческим инициативам города.',
          date: '2025-05-25T14:00:00',
          location: 'Центральная площадь',
          category: 'dobro-center',
          image: '/images/dobro-center.jpg',
          createdAt: new Date().toISOString()
        },
        {
          id: 'dc-event-2',
          title: 'Тренинг для волонтёров',
          description: 'Обучающий тренинг по основам добровольчества и навыкам коммуникации.',
          date: '2025-06-05T16:00:00',
          location: 'Добро.Центр, ул. Ленина, 88',
          category: 'dobro-center',
          image: '/images/dobro-center.jpg',
          createdAt: new Date().toISOString()
        }
      ];
      
      // События из страницы Волонтёры Победы
      const volunteersEvents = [
        {
          id: 'vp-event-1',
          title: 'Акция "Георгиевская ленточка"',
          description: 'Раздача георгиевских ленточек жителям города и рассказ о её исторической значимости.',
          date: '2025-05-05T10:00:00',
          location: 'Центральные улицы города',
          category: 'volunteers',
          image: '/images/volonter.jpg',
          createdAt: new Date().toISOString()
        },
        {
          id: 'vp-event-2',
          title: 'Урок мужества',
          description: 'Интерактивный урок для школьников, посвящённый подвигам героев Великой Отечественной войны.',
          date: '2025-05-08T12:00:00',
          location: 'Школа №1, ул. Школьная, 10',
          category: 'volunteers',
          image: '/images/volonter.jpg',
          createdAt: new Date().toISOString()
        }
      ];
      
      // Объединяем все события
      this.events = [...urayYouthEvents, ...dobroCenterEvents, ...volunteersEvents];
      
      // Сохраняем в localStorage
      this.saveEventsToStorage();
      console.log('Инициализированы события по умолчанию:', this.events);
    },

    // Сохранение событий в localStorage
    saveEventsToStorage() {
      if (process.client) {
        localStorage.setItem('cmgi-events', JSON.stringify(this.events));
        console.log('События сохранены в localStorage');
      }
    },

    // Добавление нового события
    addEvent(event) {
      // Генерация уникального ID
      const newEvent = {
        ...event,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      this.events.unshift(newEvent);
      this.saveEventsToStorage();
      
      console.log('Событие добавлено:', newEvent);
      return newEvent;
    },

    // Обновление события
    updateEvent(id, updatedEvent) {
      const index = this.events.findIndex(event => event.id === id);
      if (index !== -1) {
        this.events[index] = { 
          ...this.events[index], 
          ...updatedEvent,
          updatedAt: new Date().toISOString()
        };
        this.saveEventsToStorage();
        console.log('Событие обновлено:', this.events[index]);
        return true;
      }
      return false;
    },

    // Удаление события
    deleteEvent(id) {
      const index = this.events.findIndex(event => event.id === id);
      if (index !== -1) {
        this.events.splice(index, 1);
        this.saveEventsToStorage();
        console.log('Событие удалено, ID:', id);
        return true;
      }
      return false;
    },

    // Получение событий по категории
    getEventsByCategory(category) {
      if (!category || category === 'all') {
        return this.events;
      }
      return this.events.filter(event => event.category === category);
    },

    // Получение предстоящих событий
    getUpcomingEvents() {
      const now = new Date();
      return this.events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= now;
      }).sort((a, b) => new Date(a.date) - new Date(b.date));
    },

    // Получение прошедших событий
    getPastEvents() {
      const now = new Date();
      return this.events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate < now;
      }).sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    // Получение названия категории по значению
    getCategoryLabel(value) {
      const category = this.categories.find(cat => cat.value === value);
      return category ? category.label : value;
    }
  }
});
