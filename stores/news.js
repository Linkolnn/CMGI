import { defineStore } from 'pinia';

// Функция для загрузки новостей из localStorage
const loadNewsFromStorage = () => {
  if (typeof window === 'undefined') return null; // Проверка для SSR
  
  try {
    const savedNews = localStorage.getItem('cmgi_news');
    return savedNews ? JSON.parse(savedNews) : null;
  } catch (error) {
    // Тихая обработка ошибки при загрузке новостей
    return null;
  }
};

// Функция для сохранения новостей в localStorage
const saveNewsToStorage = (news) => {
  if (typeof window === 'undefined') return; // Проверка для SSR
  
  try {
    localStorage.setItem('cmgi_news', JSON.stringify(news));
  } catch (error) {
    // Тихая обработка ошибки при сохранении новостей
  }
};

// Дефолтные новости
const defaultNews = [
  {
    id: 1,
    title: 'Молодёжный форум "Урай 2025" собрал более 200 участников',
    excerpt: 'Форум стал площадкой для обсуждения актуальных вопросов и проблем молодёжи города Урай, а также для разработки новых проектов и инициатив.',
    content: 'В минувшие выходные в Урае прошёл ежегодный молодёжный форум "Урай 2025", который собрал более 200 участников из числа активной молодёжи города и региона. Форум стал площадкой для обсуждения актуальных вопросов и проблем молодёжи города Урай, а также для разработки новых проектов и инициатив.\n\nВ рамках форума работали несколько тематических площадок: "Социальное предпринимательство", "Волонтёрство и добровольчество", "Креативные индустрии", "Экология и устойчивое развитие". Участники форума имели возможность не только прослушать лекции и мастер-классы от ведущих экспертов, но и представить свои проекты, получить обратную связь и найти единомышленников для их реализации.\n\nПо итогам форума были отобраны 10 лучших проектов, которые получат финансовую и организационную поддержку от Центра молодёжных и гражданских инициатив города Урай.',
    image: '/images/newsCardBanner.jpg',
    date: '2025-05-05',
    category: 'events',
    link: '/news/1'
  },
  {
    id: 2,
    title: 'Волонтёры Победы провели акцию "Георгиевская ленточка"',
    excerpt: 'В преддверии Дня Победы волонтёры раздали более 1000 георгиевских ленточек жителям города и рассказали о её истории и значении.',
    content: 'В преддверии празднования Дня Победы волонтёры городского отделения движения "Волонтёры Победы" провели традиционную акцию "Георгиевская ленточка". В течение недели волонтёры раздали более 1000 георгиевских ленточек жителям города и рассказали о её истории и значении.\n\n"Георгиевская ленточка - это символ памяти, уважения и благодарности участникам Великой Отечественной войны. Важно не просто раздать ленточки, но и рассказать людям, особенно молодёжи, о её значении и правилах ношения", - рассказала координатор акции Анна Сидорова.\n\nПомимо раздачи ленточек, волонтёры провели серию уроков мужества в школах города, где рассказали учащимся о подвигах героев Великой Отечественной войны и о деятельности движения "Волонтёры Победы".',
    image: '/images/logo.jpg',
    date: '2025-05-01',
    category: 'volunteers',
    link: '/news/2'
  },
  {
    id: 3,
    title: 'Открыт набор на курсы компьютерной грамотности для пожилых людей',
    excerpt: 'Центр молодёжных и гражданских инициатив объявляет набор на бесплатные курсы компьютерной грамотности для людей старшего возраста.',
    content: 'Центр молодёжных и гражданских инициатив города Урай объявляет набор на бесплатные курсы компьютерной грамотности для людей старшего возраста. Курсы будут проходить два раза в неделю в течение месяца.\n\nВ программе курсов: базовые навыки работы с компьютером, использование интернета, социальных сетей, мессенджеров, а также работа с порталом госуслуг и другими полезными сервисами.\n\n"Наша цель - помочь старшему поколению освоить современные технологии, которые могут значительно упростить их жизнь. Мы хотим, чтобы они могли свободно общаться с родственниками через интернет, получать государственные услуги онлайн и чувствовать себя уверенно в современном цифровом мире", - рассказала руководитель проекта Мария Иванова.\n\nЗаписаться на курсы можно по телефону или заполнив форму на сайте Центра. Количество мест ограничено.',
    image: '/images/dobro-center.jpg',
    date: '2025-04-25',
    category: 'announcements',
    link: '/news/3'
  },
  {
    id: 4,
    title: 'В Урае прошёл фестиваль молодёжных субкультур "StreetFest"',
    excerpt: 'Фестиваль собрал представителей различных молодёжных субкультур и направлений: скейтбордистов, BMX-райдеров, граффити-художников и брейк-дансеров.',
    content: 'В минувшие выходные в Урае прошёл фестиваль молодёжных субкультур "StreetFest", организованный Центром молодёжных и гражданских инициатив. Фестиваль собрал представителей различных молодёжных субкультур и направлений: скейтбордистов, BMX-райдеров, граффити-художников и брейк-дансеров.\n\nВ рамках фестиваля прошли соревнования по экстремальным видам спорта, мастер-классы по граффити и брейк-дансу, а также выступления местных музыкальных групп. Особый интерес вызвал конкурс граффити, в ходе которого художники создали яркие работы на тему "Город будущего".\n\n"Фестиваль "StreetFest" - это возможность для молодёжи проявить себя, показать свои таланты и найти единомышленников. Мы хотим, чтобы молодые люди знали, что в нашем городе есть место для их творчества и самовыражения", - рассказал организатор фестиваля Дмитрий Волков.\n\nПобедители соревнований и конкурсов получили ценные призы от спонсоров фестиваля, а лучшие работы граффити-художников украсят стены городского скейт-парка.',
    image: '/images/uray-youth.jpg',
    date: '2025-04-20',
    category: 'events',
    link: '/news/4'
  }
];

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: loadNewsFromStorage() || defaultNews,
    loading: false,
    error: null
  }),
  
  getters: {
    getNewsById: (state) => (id) => {
      return state.news.find(item => item.id === parseInt(id));
    },
    getLatestNews: (state) => {
      return [...state.news].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
    },
    getNewsByCategory: (state) => (category) => {
      if (!category || category === 'all') return state.news;
      return state.news.filter(item => item.category === category);
    },
    // Функция для перевода категорий на русский язык
    getCategoryLabel: () => (category) => {
      const categories = {
        'events': 'События',
        'volunteers': 'Волонтёрство',
        'announcements': 'Объявления',
        'news': 'Новости',
        'all': 'Все категории'
      };
      return categories[category] || category;
    }
  },
  
  actions: {
    async fetchNews() {
      this.loading = true;
      this.error = null;
      
      try {
        // В реальном приложении здесь был бы API-запрос
        // Для демонстрации используем статические данные
        // const response = await fetch('/api/news');
        // const data = await response.json();
        // this.news = data;
        
        // Имитация задержки API
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        this.error = 'Ошибка при загрузке новостей';
        console.error('Error fetching news:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async addNews(newsItem) {
      this.loading = true;
      this.error = null;
      
      try {
        // В реальном приложении здесь был бы API-запрос
        // Для демонстрации просто добавляем в локальное состояние
        const newId = Math.max(...this.news.map(item => item.id)) + 1;
        const newNewsItem = {
          ...newsItem,
          id: newId,
          link: `/news/${newId}`
        };
        
        console.log('Добавление новости:', newNewsItem);
        
        // Имитация задержки API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        this.news.unshift(newNewsItem);
        
        // Сохраняем обновленные новости в localStorage
        console.log('Сохранение в localStorage, количество новостей:', this.news.length);
        saveNewsToStorage(this.news);
        
        return true;
      } catch (error) {
        this.error = 'Ошибка при добавлении новости';
        console.error('Error adding news:', error);
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async updateNews(newsItem) {
      this.loading = true;
      this.error = null;
      
      try {
        // В реальном приложении здесь был бы API-запрос
        // Для демонстрации просто обновляем локальное состояние
        const index = this.news.findIndex(item => item.id === newsItem.id);
        if (index === -1) throw new Error('Новость не найдена');
        
        // Имитация задержки API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Обновляем новость
        this.news[index] = { ...newsItem };
        
        // Сохраняем обновленные новости в localStorage
        saveNewsToStorage(this.news);
        
        return true;
      } catch (error) {
        this.error = 'Ошибка при обновлении новости';
        console.error('Error updating news:', error);
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async deleteNews(id) {
      this.loading = true;
      this.error = null;
      
      try {
        // В реальном приложении здесь был бы API-запрос
        // Для демонстрации просто удаляем из локального состояния
        const index = this.news.findIndex(item => item.id === id);
        if (index === -1) throw new Error('Новость не найдена');
        
        // Имитация задержки API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Удаляем новость
        this.news.splice(index, 1);
        
        // Сохраняем обновленные новости в localStorage
        saveNewsToStorage(this.news);
        
        return true;
      } catch (error) {
        this.error = 'Ошибка при удалении новости';
        console.error('Error deleting news:', error);
        return false;
      } finally {
        this.loading = false;
      }
    }
  }
});
