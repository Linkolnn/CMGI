import { defineStore } from 'pinia';

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [],
    categories: [
      { value: 'uray-youth', label: 'Урай Молодёжный' },
      { value: 'dobro-center', label: 'Добро.Центр' },
      { value: 'volunteers', label: 'Волонтёры Победы' }
    ]
  }),

  actions: {
    // Загрузка проектов из localStorage при инициализации
    initProjects() {
      if (process.client) {
        const storedProjects = localStorage.getItem('cmgi-projects');
        if (storedProjects) {
          try {
            this.projects = JSON.parse(storedProjects);
          } catch (error) {
            // Тихая обработка ошибки при загрузке проектов
          }
        } else {
          // Если в localStorage нет проектов, инициализируем хранилище проектами с основных страниц
          this.initDefaultProjects();
        }
      }
    },
    
    // Инициализация хранилища проектами с основных страниц
    initDefaultProjects() {
      // Проекты из страницы Урай Молодёжный
      const urayYouthProjects = [
        {
          id: 'uy-1',
          title: 'Молодёжный форум "Урай 2025"',
          description: 'Ежегодный форум для активной молодёжи города и региона. Образовательные площадки, мастер-классы, нетворкинг и проектная деятельность.',
          image: '/images/uray-youth.jpg',
          category: 'uray-youth',
          status: 'Активный проект',
          createdAt: new Date().toISOString()
        },
        {
          id: 'uy-2',
          title: 'Школа молодого лидера',
          description: 'Образовательная программа для развития лидерских качеств, навыков командной работы и проектного мышления у молодёжи.',
          image: '/images/uray-youth.jpg',
          category: 'uray-youth',
          status: 'Активный проект',
          createdAt: new Date().toISOString()
        },
        {
          id: 'uy-3',
          title: 'Фестиваль молодёжных субкультур "StreetFest"',
          description: 'Площадка для самовыражения представителей различных молодёжных субкультур: скейтбординг, граффити, брейк-данс, рэп и многое другое.',
          image: '/images/uray-youth.jpg',
          category: 'uray-youth',
          status: 'Активный проект',
          createdAt: new Date().toISOString()
        },
        {
          id: 'uy-4',
          title: 'Конкурс молодёжных проектов',
          description: 'Ежегодный конкурс для поддержки социально значимых инициатив молодёжи. Победители получают финансирование на реализацию своих проектов.',
          image: '/images/uray-youth.jpg',
          category: 'uray-youth',
          status: 'Активный проект',
          createdAt: new Date().toISOString()
        }
      ];
      
      // Проекты из страницы Добро.Центр
      const dobroCenterProjects = [
        {
          id: 'dc-1',
          title: 'ЭкоУрай',
          description: 'Проект направлен на улучшение экологической ситуации в городе и формирование экологической культуры среди жителей. Регулярные акции по очистке территорий, высадке деревьев и экологическому просвещению.',
          image: '/images/dobro-center.jpg',
          category: 'dobro-center',
          status: 'Активный проект',
          createdAt: new Date().toISOString()
        },
        {
          id: 'dc-2',
          title: 'Помощь пожилым',
          description: 'Волонтёры оказывают помощь пожилым людям и ветеранам в бытовых вопросах: доставка продуктов и лекарств, уборка, мелкий ремонт, а также организуют досуговые мероприятия.',
          image: '/images/dobro-center.jpg',
          category: 'dobro-center',
          status: 'Активный проект',
          createdAt: new Date().toISOString()
        },
        {
          id: 'dc-3',
          title: 'Уроки доброты',
          description: 'Образовательный проект для школьников, направленный на формирование культуры добровольчества и развитие эмпатии. Волонтёры проводят интерактивные занятия в школах города.',
          image: '/images/dobro-center.jpg',
          category: 'dobro-center',
          status: 'Активный проект',
          createdAt: new Date().toISOString()
        },
        {
          id: 'dc-4',
          title: 'Больничные клоуны',
          description: 'Волонтёры в образах клоунов посещают детские отделения больниц, чтобы поднять настроение маленьким пациентам и помочь им легче переносить лечение.',
          image: '/images/dobro-center.jpg',
          category: 'dobro-center',
          status: 'Набор волонтёров',
          createdAt: new Date().toISOString()
        }
      ];
      
      // Проекты из страницы Волонтёры Победы
      const volunteersProjects = [
        {
          id: 'vp-1',
          title: 'Георгиевская ленточка',
          description: 'Ежегодная акция по раздаче георгиевских ленточек жителям города в преддверии Дня Победы. Волонтёры рассказывают о символике ленты и её исторической значимости.',
          image: '/images/volonter.jpg',
          category: 'volunteers',
          status: 'Активный проект',
          createdAt: new Date().toISOString()
        },
        {
          id: 'vp-2',
          title: 'Письмо Победы',
          description: 'Акция, в рамках которой школьники и студенты пишут письма ветеранам Великой Отечественной войны со словами благодарности за их подвиг.',
          image: '/images/volonter.jpg',
          category: 'volunteers',
          status: 'Активный проект',
          createdAt: new Date().toISOString()
        },
        {
          id: 'vp-3',
          title: 'Уроки мужества',
          description: 'Интерактивные занятия в школах города, посвящённые ключевым событиям Великой Отечественной войны и подвигам героев.',
          image: '/images/volonter.jpg',
          category: 'volunteers',
          status: 'Активный проект',
          createdAt: new Date().toISOString()
        },
        {
          id: 'vp-4',
          title: 'Благоустройство памятных мест',
          description: 'Регулярные акции по уборке и благоустройству памятников, мемориалов и воинских захоронений на территории города.',
          image: '/images/volonter.jpg',
          category: 'volunteers',
          status: 'Активный проект',
          createdAt: new Date().toISOString()
        }
      ];
      
      // Объединяем все проекты
      this.projects = [...urayYouthProjects, ...dobroCenterProjects, ...volunteersProjects];
      
      // Сохраняем в localStorage
      this.saveProjectsToStorage();
      console.log('Инициализированы проекты по умолчанию:', this.projects);
    },

    // Сохранение проектов в localStorage
    saveProjectsToStorage() {
      if (process.client) {
        localStorage.setItem('cmgi-projects', JSON.stringify(this.projects));
        console.log('Проекты сохранены в localStorage');
      }
    },

    // Добавление нового проекта
    addProject(project) {
      // Генерация уникального ID
      const newProject = {
        ...project,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      this.projects.unshift(newProject);
      this.saveProjectsToStorage();
      
      console.log('Проект добавлен:', newProject);
      return newProject;
    },

    // Обновление проекта
    updateProject(id, updatedProject) {
      const index = this.projects.findIndex(project => project.id === id);
      if (index !== -1) {
        this.projects[index] = { 
          ...this.projects[index], 
          ...updatedProject,
          updatedAt: new Date().toISOString()
        };
        this.saveProjectsToStorage();
        console.log('Проект обновлен:', this.projects[index]);
        return true;
      }
      return false;
    },

    // Удаление проекта
    deleteProject(id) {
      const index = this.projects.findIndex(project => project.id === id);
      if (index !== -1) {
        this.projects.splice(index, 1);
        this.saveProjectsToStorage();
        console.log('Проект удален, ID:', id);
        return true;
      }
      return false;
    },

    // Получение проектов по категории
    getProjectsByCategory(category) {
      if (!category || category === 'all') {
        return this.projects;
      }
      return this.projects.filter(project => project.category === category);
    },

    // Получение названия категории по значению
    getCategoryLabel(value) {
      const category = this.categories.find(cat => cat.value === value);
      return category ? category.label : value;
    }
  }
});
