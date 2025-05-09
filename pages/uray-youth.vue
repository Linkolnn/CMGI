<template>
  <div class="uray-youth-page">
    <!-- Banner -->
    <Banner 
      title="Урай Молодёжный" 
      subtitle="Возможности для молодёжи, проекты и мероприятия"
      backgroundImage="/images/uray-youth.jpg"
    />
    
    <!-- Main Content -->
    <section class="section uray-youth-content">
      <div class="container">
        <div class="uray-youth-content__inner">
          <div class="uray-youth-content__main">
            <h2 class="uray-youth-content__title">О направлении</h2>
            <p class="uray-youth-content__text">
              «Урай Молодёжный» — это направление деятельности Центра молодёжных и гражданских инициатив, 
              ориентированное на создание условий для самореализации молодёжи города Урай, развитие их талантов, 
              навыков и компетенций, вовлечение в социально значимую деятельность.
            </p>
            <p class="uray-youth-content__text">
              В рамках направления проводятся форумы, мастер-классы, конкурсы, фестивали и другие мероприятия, 
              направленные на поддержку молодёжных инициатив, развитие творческого потенциала и формирование 
              активной гражданской позиции.
            </p>
            
            <h2 class="uray-youth-content__title">Проекты и мероприятия</h2>
            <div class="projects-grid">
              <div v-for="(project, index) in projects" :key="index" class="project-card">
                <div class="project-card__image">
                  <img :src="project.image" :alt="project.title" />
                </div>
                <div class="project-card__content">
                  <h3 class="project-card__title">{{ project.title }}</h3>
                  <p class="project-card__description">{{ project.description }}</p>
                </div>
              </div>
            </div>
            
            <h2 class="uray-youth-content__title">Календарь событий</h2>
            <div class="events-list">
              <div v-for="(event, index) in events" :key="index" class="event-item">
                <div class="event-item__date">
                  <span class="event-item__day">{{ formatDay(event.date) }}</span>
                  <span class="event-item__month">{{ formatMonth(event.date) }}</span>
                </div>
                <div class="event-item__content">
                  <h3 class="event-item__title">{{ event.title }}</h3>
                  <p class="event-item__description">{{ event.description }}</p>
                  <div class="event-item__details">
                    <span class="event-item__location">
                      <span class="event-item__icon"><i class="fas fa-map-marker-alt"></i></span>
                      {{ event.location }}
                    </span>
                    <span class="event-item__time">
                      <span class="event-item__icon"><i class="fas fa-clock"></i></span>
                      {{ event.time }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <h2 class="uray-youth-content__title">Истории успеха</h2>
            <div class="success-stories">
              <div v-for="(story, index) in successStories" :key="index" class="success-story">
                <div class="success-story__image">
                  <img :src="story.image" :alt="story.name" />
                </div>
                <div class="success-story__content">
                  <h3 class="success-story__name">{{ story.name }}</h3>
                  <p class="success-story__text">{{ story.story }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="uray-youth-content__sidebar">
            <div class="sidebar-block">
              <h3 class="sidebar-block__title">Предложить инициативу</h3>
              <p class="sidebar-block__text">
                У вас есть идея проекта для молодёжи? Поделитесь ею с нами, и мы поможем воплотить её в жизнь!
              </p>
              <NuxtLink to="/initiative" class="btn btn--primary sidebar-block__button">
                Предложить инициативу
              </NuxtLink>
            </div>
            
            <div class="sidebar-block">
              <h3 class="sidebar-block__title">Контакты</h3>
              <ul class="sidebar-block__list">
                <li class="sidebar-block__item">
                  <span class="sidebar-block__icon"><i class="fas fa-user"></i></span>
                  <span class="sidebar-block__text">
                    <strong>Координатор:</strong> Козлова Мария Александровна
                  </span>
                </li>
                <li class="sidebar-block__item">
                  <span class="sidebar-block__icon"><i class="fas fa-phone"></i></span>
                  <span class="sidebar-block__text">
                    <strong>Телефон:</strong> +7 (34676) 2-23-45
                  </span>
                </li>
                <li class="sidebar-block__item">
                  <span class="sidebar-block__icon"><i class="fas fa-envelope"></i></span>
                  <span class="sidebar-block__text">
                    <strong>Email:</strong> youth@cmgi-uray.ru
                  </span>
                </li>
              </ul>
            </div>
            
            <div class="sidebar-block">
              <h3 class="sidebar-block__title">Полезные ссылки</h3>
              <ul class="sidebar-block__list">
                <li v-for="(link, index) in usefulLinks" :key="index" class="sidebar-block__item">
                  <a :href="link.url" target="_blank" class="sidebar-block__link">
                    <span class="sidebar-block__icon"><i class="fas fa-link"></i></span>
                    {{ link.title }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Фотогалерея -->
    <GallerySection 
      title="Фотогалерея" 
      description="Фотографии с мероприятий и проектов направления 'Урай Молодёжный'" 
      category="uray-youth" 
      :limit="6" 
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Banner from '~/components/ui/Banner.vue';
import GallerySection from '~/components/sections/GallerySection.vue';
import { useProjectsStore } from '~/stores/projects';
import { useEventsStore } from '~/stores/events';
import { useGalleryStore } from '~/stores/gallery';

// Инициализация хранилищ
const projectsStore = useProjectsStore();
const eventsStore = useEventsStore();

onMounted(() => {
  // Загрузка данных из localStorage
  projectsStore.initProjects();
  eventsStore.initEvents();
});

// Получение проектов категории 'uray-youth'
const projects = computed(() => {
  return projectsStore.getProjectsByCategory('uray-youth');
});

// Получение предстоящих событий категории 'uray-youth'
const events = computed(() => {
  const urayYouthEvents = eventsStore.getEventsByCategory('uray-youth');
  return urayYouthEvents
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(event => {
      const eventDate = new Date(event.date);
      return {
        ...event,
        formattedDate: eventDate.toLocaleDateString('ru-RU'),
        time: `${eventDate.getHours().toString().padStart(2, '0')}:${eventDate.getMinutes().toString().padStart(2, '0')}`
      };
    });
});

// Форматирование даты для отображения
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU');
};

// Форматирование времени для отображения
const formatTime = (dateString) => {
  const date = new Date(dateString);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

// Format date functions
const formatDay = (dateString) => {
  const date = new Date(dateString);
  return date.getDate();
};

const formatMonth = (dateString) => {
  const date = new Date(dateString);
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];
  return months[date.getMonth()];
};

// Success stories data
const successStories = computed(() => {
  return [
    {
      name: 'Алексей Смирнов',
      story: 'Благодаря поддержке Центра молодёжных инициатив я смог реализовать свой проект "ЭкоУрай". Мы организовали серию экологических акций, привлекли более 200 волонтёров и высадили более 500 деревьев в городе. Сейчас проект получил региональную поддержку и развивается в других городах округа.',
      image: '/images/avatar.svg'
    },
    {
      name: 'Екатерина Иванова',
      story: 'Я начала свой путь как волонтёр на городских мероприятиях. Центр молодёжных инициатив помог мне пройти обучение по организации мероприятий, а затем поддержал мою идею создания молодёжного театра. Сейчас наш театр "Новая сцена" известен не только в Урае, но и за его пределами.',
      image: '/images/avatar.svg'
    }
  ];
});

// Useful links data
const usefulLinks = computed(() => {
  return [
    {
      title: 'Федеральное агентство по делам молодёжи',
      url: 'https://fadm.gov.ru/'
    },
    {
      title: 'Портал "Добро.ру"',
      url: 'https://dobro.ru/'
    },
    {
      title: 'Грантовый конкурс молодёжных инициатив',
      url: 'https://grants.myrosmol.ru/'
    },
    {
      title: 'Департамент молодёжной политики ХМАО-Югры',
      url: 'https://depms.admhmao.ru/'
    }
  ];
});

</script>

<style lang="scss">
.uray-youth-page {
  .uray-youth-content {
    background-color: $white;
    
    &__inner {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: $spacing-xl;
      
      @include tablet {
        grid-template-columns: 1fr;
      }
    }
    
    &__title {
      margin-top: $spacing-xl;
      margin-bottom: $spacing-md;
      
      &:first-child {
        margin-top: 0;
      }
    }
    
    &__text {
      margin-bottom: $spacing-md;
      line-height: 1.6;
    }
  }
  
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-lg;
    margin-bottom: $spacing-xl;
    
    @include mobile {
      grid-template-columns: 1fr;
    }
  }
  
  .project-card {
    @include card;
    display: flex;
    flex-direction: column;
    height: 100%;
    
    &__image {
      height: 180px;
      overflow: hidden;
      margin: -#{$spacing-lg} -#{$spacing-lg} $spacing-md;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
      
      &:hover img {
        transform: scale(1.05);
      }
    }
    
    &__title {
      font-size: $font-size-lg;
      margin-bottom: $spacing-sm;
    }
    
    &__description {
      color: lighten($dark-gray, 20%);
    }
  }
  
  .events-list {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    margin-bottom: $spacing-xl;
  }
  
  .event-item {
    display: flex;
    background-color: $light-purple;
    border-radius: $border-radius-md;
    overflow: hidden;
    
    &__date {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: $primary-purple;
      color: $white;
      padding: $spacing-md;
      min-width: 80px;
      text-align: center;
    }
    
    &__day {
      font-size: $font-size-xl;
      font-weight: 700;
    }
    
    &__month {
      font-size: $font-size-sm;
    }
    
    &__content {
      padding: $spacing-md;
      flex: 1;
    }
    
    &__title {
      margin-bottom: $spacing-xs;
      font-size: $font-size-lg;
    }
    
    &__description {
      margin-bottom: $spacing-sm;
      color: lighten($dark-gray, 20%);
    }
    
    &__details {
      display: flex;
      gap: $spacing-lg;
      font-size: $font-size-sm;
      
      @include mobile {
        flex-direction: column;
        gap: $spacing-xs;
      }
    }
    
    &__location,
    &__time {
      display: flex;
      align-items: center;
    }
    
    &__icon {
      margin-right: $spacing-xs;
    }
  }
  
  .success-stories {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
    margin-bottom: $spacing-xl;
  }
  
  .success-story {
    display: flex;
    gap: $spacing-lg;
    background-color: $light-purple;
    border-radius: $border-radius-md;
    padding: $spacing-lg;
    
    @include mobile {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    
    &__image {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
      background: $primary-green;
      border: 3px solid $primary-green;
      
      img {
        width: 100%;
        height: 100%;
        transform: translate(-1%, -2%);
        object-fit: cover;
      }
    }
    
    &__name {
      margin-bottom: $spacing-sm;
      font-size: $font-size-lg;
    }
    
    &__text {
      line-height: 1.6;
    }
  }
  
  .sidebar-block {
    background-color: $light-purple;
    border-radius: $border-radius-md;
    padding: $spacing-lg;
    margin-bottom: $spacing-lg;
    
    &__title {
      margin-bottom: $spacing-md;
      font-size: $font-size-lg;
      color: $primary-purple;
      border-bottom: 2px solid $primary-green;
      padding-bottom: $spacing-sm;
    }
    
    &__text {
      margin-bottom: $spacing-md;
    }
    
    &__button {
      width: 100%;
      text-align: center;
    }
    
    &__list {
      display: flex;
      flex-direction: column;
      gap: $spacing-md;
    }
    
    &__item {
      display: flex;
      align-items: flex-start;
    }
    
    &__icon {
      margin-right: $spacing-sm;
      font-size: $font-size-lg;
    }
    
    &__link {
      display: flex;
      align-items: center;
      color: $primary-purple;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
