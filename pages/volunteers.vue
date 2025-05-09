<template>
  <div class="volunteers-page">
    <!-- Banner -->
    <Banner 
      title="Волонтёры Победы. Урай ХМАО-Югры" 
      subtitle="Патриотические инициативы, помощь ветеранам, сохранение исторической памяти"
      backgroundImage="/images/volonter.jpg"
    />
    
    <!-- Main Content -->
    <section class="section volunteers-content">
      <div class="container">
        <div class="volunteers-content__inner">
          <div class="volunteers-content__main">
            <h2 class="volunteers-content__title">О движении</h2>
            <p class="volunteers-content__text">
              «Волонтёры Победы» — это всероссийское общественное движение, которое занимается сохранением 
              исторической памяти, гражданско-патриотическим воспитанием и популяризацией изучения истории 
              с помощью современных форматов.
            </p>
            <p class="volunteers-content__text">
              В Урае отделение движения «Волонтёры Победы» активно развивается с 2018 года. Наши волонтёры 
              помогают ветеранам, участвуют в организации патриотических мероприятий, занимаются 
              благоустройством памятных мест и воинских захоронений, проводят исторические квесты и уроки 
              мужества для школьников.
            </p>
            
            <div class="volunteers-stats">
              <div class="volunteers-stat-item">
                <div class="volunteers-stat-item__number">150+</div>
                <div class="volunteers-stat-item__text">Активных волонтёров</div>
              </div>
              <div class="volunteers-stat-item">
                <div class="volunteers-stat-item__number">50+</div>
                <div class="volunteers-stat-item__text">Мероприятий в год</div>
              </div>
              <div class="volunteers-stat-item">
                <div class="volunteers-stat-item__number">1000+</div>
                <div class="volunteers-stat-item__text">Участников акций</div>
              </div>
            </div>
            
            <h2 class="volunteers-content__title">Проекты и акции</h2>
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
            
            <h2 class="volunteers-content__title">Как стать волонтёром</h2>
            <div class="join-steps">
              <div v-for="(step, index) in joinSteps" :key="index" class="join-step">
                <div class="join-step__number">{{ index + 1 }}</div>
                <div class="join-step__content">
                  <h3 class="join-step__title">{{ step.title }}</h3>
                  <p class="join-step__description">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="volunteers-content__sidebar">
            <div class="sidebar-block">
              <h3 class="sidebar-block__title">Предложить инициативу</h3>
              <p class="sidebar-block__text">
                У вас есть идея патриотического проекта? Поделитесь ею с нами, и мы поможем воплотить её в жизнь!
              </p>
              <NuxtLink to="/initiative" class="btn btn--primary sidebar-block__button">
                Предложить инициативу
              </NuxtLink>
            </div>
            
            <div class="sidebar-block">
              <h3 class="sidebar-block__title">Ближайшие мероприятия</h3>
              <ul class="sidebar-block__list">
                <li v-for="(event, index) in events" :key="index" class="sidebar-event">
                  <div class="sidebar-event__date">
                    <span class="sidebar-event__day">{{ formatDay(event.date) }}</span>
                    <span class="sidebar-event__month">{{ formatMonth(event.date) }}</span>
                  </div>
                  <div class="sidebar-event__content">
                    <h4 class="sidebar-event__title">{{ event.title }}</h4>
                    <p class="sidebar-event__location">
                      <span class="sidebar-event__icon"><i class="fas fa-map-marker-alt"></i></span>
                      {{ event.location }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div class="sidebar-block">
              <h3 class="sidebar-block__title">Контакты</h3>
              <ul class="sidebar-block__list">
                <li class="sidebar-block__item">
                  <span class="sidebar-block__icon"><i class="fas fa-map-marker-alt"></i></span>
                  <span class="sidebar-block__text">
                    <strong>Координатор:</strong> Петрова Анна Сергеевна
                  </span>
                </li>
                <li class="sidebar-block__item">
                  <span class="sidebar-block__icon"><i class="fas fa-phone"></i></span>
                  <span class="sidebar-block__text">
                    <strong>Телефон:</strong> +7 (34676) 2-23-46
                  </span>
                </li>
                <li class="sidebar-block__item">
                  <span class="sidebar-block__icon"><i class="fas fa-envelope"></i></span>
                  <span class="sidebar-block__text">
                    <strong>Email:</strong> volunteers@cmgi-uray.ru
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <GallerySection 
      title="Фотогалерея" 
      description="Фотографии с мероприятий и проектов направления 'Волонтёры Победы'" 
      category="volunteers" 
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

// Инициализация хранилищ
const projectsStore = useProjectsStore();
const eventsStore = useEventsStore();

onMounted(() => {
  // Загрузка данных из localStorage
  projectsStore.initProjects();
  eventsStore.initEvents();
});

// Получение проектов категории 'volunteers'
const projects = computed(() => {
  return projectsStore.getProjectsByCategory('volunteers');
});

// Join steps data
const joinSteps = ref([
  {
    title: 'Заполните анкету',
    description: 'Заполните анкету волонтёра на сайте волонтёрыпобеды.рф или отправьте заявку через форму на нашем сайте.'
  },
  {
    title: 'Пройдите собеседование',
    description: 'После получения заявки мы свяжемся с вами и пригласим на собеседование, где расскажем о деятельности движения и ответим на ваши вопросы.'
  },
  {
    title: 'Пройдите обучение',
    description: 'Новые волонтёры проходят базовое обучение, где знакомятся с историей движения, основными проектами и правилами работы.'
  },
  {
    title: 'Присоединяйтесь к мероприятиям',
    description: 'После прохождения обучения вы сможете принимать участие в мероприятиях и акциях движения «Волонтёры Победы».'
  }
]);



// Получение предстоящих событий категории 'volunteers'
const events = computed(() => {
  const volunteersEvents = eventsStore.getEventsByCategory('volunteers');
  return volunteersEvents
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
</script>

<style lang="scss">
.volunteers-page {
  .volunteers-content {
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
  
  .volunteers-stats {
    display: flex;
    justify-content: space-between;
    margin: $spacing-lg 0 $spacing-xl;
    
    @include mobile {
      flex-direction: column;
      gap: $spacing-md;
    }
  }
  
  .volunteers-stat-item {
    text-align: center;
    padding: $spacing-md;
    background-color: $light-purple;
    border-radius: $border-radius-md;
    width: 30%;
    
    @include mobile {
      width: 100%;
    }
    
    &__number {
      font-size: $font-size-xxl;
      font-weight: 700;
      color: $primary-purple;
      margin-bottom: $spacing-xs;
    }
    
    &__text {
      font-size: $font-size-sm;
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
  
  .join-steps {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    margin-bottom: $spacing-xl;
  }
  
  .join-step {
    display: flex;
    align-items: flex-start;
    background-color: $light-purple;
    border-radius: $border-radius-md;
    padding: $spacing-md;
    
    &__number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background-color: $primary-purple;
      color: $white;
      border-radius: 50%;
      font-weight: 700;
      margin-right: $spacing-md;
      flex-shrink: 0;
    }
    
    &__title {
      margin-bottom: $spacing-xs;
      font-size: $font-size-lg;
    }
    
    &__description {
      color: lighten($dark-gray, 20%);
    }
  }
  
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-md;
    
    @include tablet {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @include mobile {
      grid-template-columns: 1fr;
    }
  }
  
  .gallery-item {
    border-radius: $border-radius-md;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
    }
    
    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
  }
  
  .sidebar-event {
    display: flex;
    align-items: center;
    
    &__date {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: $primary-purple;
      color: $white;
      padding: $spacing-sm;
      min-width: 60px;
      text-align: center;
      border-radius: $border-radius-sm;
      margin-right: $spacing-md;
    }
    
    &__day {
      font-size: $font-size-lg;
      font-weight: 700;
    }
    
    &__month {
      font-size: $font-size-xs;
    }
    
    &__title {
      margin-bottom: $spacing-xs;
      font-size: $font-size-base;
    }
    
    &__location {
      display: flex;
      align-items: center;
      font-size: $font-size-sm;
      color: lighten($dark-gray, 20%);
    }
    
    &__icon {
      margin-right: $spacing-xs;
    }
  }
}
</style>
