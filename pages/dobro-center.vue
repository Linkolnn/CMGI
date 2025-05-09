<template>
  <div class="dobro-center-page">
    <!-- Banner -->
    <Banner 
      title="Добро.Центр | Доброволец Урая" 
      subtitle="Волонтёрские проекты, помощь нуждающимся, развитие культуры добровольчества"
      backgroundImage="/images/dobro-center.jpg"
    />
    
    <!-- Main Content -->
    <section class="section dobro-content">
      <div class="container">
        <div class="dobro-content__inner">
          <div class="dobro-content__main">
            <h2 class="dobro-content__title">О Добро.Центре</h2>
            <p class="dobro-content__text">
              Добро.Центр — это ресурсный центр поддержки и развития добровольчества в городе Урай. 
              Мы объединяем волонтёров, некоммерческие организации и всех неравнодушных граждан для 
              решения социальных проблем и помощи тем, кто в ней нуждается.
            </p>
            <p class="dobro-content__text">
              Наша миссия — развивать культуру добровольчества, поддерживать волонтёрские инициативы 
              и создавать условия для участия каждого жителя города в добровольческой деятельности.
            </p>
            
            <div class="dobro-stats">
              <div class="dobro-stat-item">
                <div class="dobro-stat-item__number">300+</div>
                <div class="dobro-stat-item__text">Активных волонтёров</div>
              </div>
              <div class="dobro-stat-item">
                <div class="dobro-stat-item__number">20+</div>
                <div class="dobro-stat-item__text">Волонтёрских объединений</div>
              </div>
              <div class="dobro-stat-item">
                <div class="dobro-stat-item__number">100+</div>
                <div class="dobro-stat-item__text">Мероприятий в год</div>
              </div>
            </div>
            
            <h2 class="dobro-content__title">Текущие проекты</h2>
            <div class="projects-grid">
              <div v-for="(project, index) in projects" :key="index" class="project-card">
                <div class="project-card__image">
                  <img :src="project.image" :alt="project.title" />
                </div>
                <div class="project-card__content">
                  <h3 class="project-card__title">{{ project.title }}</h3>
                  <p class="project-card__description">{{ project.description }}</p>
                  <div class="project-card__status">
                    <span class="project-card__status-icon"><i class="fas fa-star"></i></span>
                    <span class="project-card__status-text">{{ project.status }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <h2 class="dobro-content__title">Как участвовать</h2>
            <div class="participation-options">
              <div v-for="(option, index) in participationOptions" :key="index" class="participation-option">
                <div class="participation-option__icon"><i :class="option.icon"></i></div>
                <div class="participation-option__content">
                  <h3 class="participation-option__title">{{ option.title }}</h3>
                  <p class="participation-option__description">{{ option.description }}</p>
                </div>
              </div>
            </div>
            
            <h2 class="dobro-content__title">Отзывы волонтёров</h2>
            <div class="testimonials">
              <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonial">
                <div class="testimonial__content">
                  <p class="testimonial__text">{{ testimonial.text }}</p>
                </div>
                <div class="testimonial__author">
                  <div class="testimonial__photo">
                    <img :src="testimonial.photo" :alt="testimonial.name" />
                  </div>
                  <div class="testimonial__info">
                    <h4 class="testimonial__name">{{ testimonial.name }}</h4>
                    <p class="testimonial__role">{{ testimonial.role }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="dobro-content__sidebar">
            <div class="sidebar-block">
              <h3 class="sidebar-block__title">Предложить инициативу</h3>
              <p class="sidebar-block__text">
                У вас есть идея волонтёрского проекта? Поделитесь ею с нами, и мы поможем воплотить её в жизнь!
              </p>
              <NuxtLink to="/initiative" class="btn btn--primary sidebar-block__button">
                Предложить инициативу
              </NuxtLink>
            </div>
            
            <div class="sidebar-block">
              <h3 class="sidebar-block__title">Нужна помощь волонтёров?</h3>
              <p class="sidebar-block__text">
                Если вам или вашей организации нужна помощь волонтёров, заполните заявку, и мы свяжемся с вами.
              </p>
              <NuxtLink to="/contacts" class="btn btn--secondary sidebar-block__button">
                Оставить заявку
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
    
    <!-- Фотогалерея -->
    <GallerySection 
      title="Фотогалерея" 
      description="Фотографии с мероприятий и проектов направления 'Добро.Центр'" 
      category="dobro-center" 
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

// Получение проектов категории 'dobro-center'
const projects = computed(() => {
  return projectsStore.getProjectsByCategory('dobro-center');
});

// Получение предстоящих событий категории 'dobro-center'
const events = computed(() => {
  const dobroCenterEvents = eventsStore.getEventsByCategory('dobro-center');
  return dobroCenterEvents
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

// Participation options data
const participationOptions = ref([
  {
    icon: '👥',
    title: 'Стать волонтёром',
    description: 'Присоединяйтесь к нашей команде волонтёров и участвуйте в социально значимых проектах. Мы проводим обучение и предоставляем все необходимые материалы.'
  },
  {
    icon: '💡',
    title: 'Предложить идею',
    description: 'Если у вас есть идея социального проекта или волонтёрской акции, поделитесь ею с нами. Мы поможем разработать план реализации и найти единомышленников.'
  },
  {
    icon: '🏢',
    title: 'Стать партнёром',
    description: 'Приглашаем организации и предприятия города стать партнёрами наших проектов. Вместе мы сможем сделать больше добрых дел.'
  },
  {
    icon: '💰',
    title: 'Оказать поддержку',
    description: 'Вы можете поддержать наши проекты финансово или предоставить необходимые ресурсы (помещения, транспорт, материалы и т.д.).'
  }
]);

// Testimonials data
const testimonials = ref([
  {
    text: 'Я стала волонтёром Добро.Центра год назад и ни разу не пожалела об этом. Здесь я нашла единомышленников, научилась многому новому и поняла, что даже небольшая помощь может изменить чью-то жизнь к лучшему.',
    name: 'Мария Иванова',
    role: 'Волонтёр проекта "Помощь пожилым"',
    photo: '/images/avatar.svg'
  },
  {
    text: 'Добро.Центр помог мне реализовать мою идею экологического проекта. Команда центра оказала поддержку на всех этапах: от разработки концепции до привлечения партнёров. Теперь "ЭкоУрай" — один из самых успешных волонтёрских проектов в городе.',
    name: 'Алексей Смирнов',
    role: 'Руководитель проекта "ЭкоУрай"',
    photo: '/images/avatar.svg'
  }
]);

// Примечание: переменная events уже определена выше как вычисляемое свойство

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
.dobro-center-page {
  .dobro-content {
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
  
  .dobro-stats {
    display: flex;
    justify-content: space-between;
    margin: $spacing-lg 0 $spacing-xl;
    
    @include mobile {
      flex-direction: column;
      gap: $spacing-md;
    }
  }
  
  .dobro-stat-item {
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
      margin-bottom: $spacing-md;
    }
    
    &__status {
      display: flex;
      align-items: center;
      margin-top: auto;
      padding-top: $spacing-sm;
      border-top: 1px solid rgba($dark-gray, 0.1);
    }
    
    &__status-icon {
      margin-right: $spacing-xs;
      color: $primary-green;
    }
    
    &__status-text {
      font-size: $font-size-sm;
      font-weight: 500;
    }
  }
  
  .participation-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-lg;
    margin-bottom: $spacing-xl;
    
    @include mobile {
      grid-template-columns: 1fr;
    }
  }
  
  .participation-option {
    background-color: $light-purple;
    border-radius: $border-radius-md;
    padding: $spacing-lg;
    display: flex;
    align-items: flex-start;
    
    &__icon {
      font-size: $font-size-xxl;
      margin-right: $spacing-md;
      flex-shrink: 0;
    }
    
    &__title {
      margin-bottom: $spacing-sm;
      font-size: $font-size-lg;
    }
    
    &__description {
      color: lighten($dark-gray, 20%);
      font-size: $font-size-sm;
    }
  }
  
  .testimonials {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
    margin-bottom: $spacing-xl;
  }
  
  .testimonial {
    background-color: $light-purple;
    border-radius: $border-radius-md;
    padding: $spacing-lg;
    
    &__content {
      margin-bottom: $spacing-md;
      position: relative;
      
      &:before {
        content: '"';
        position: absolute;
        top: -20px;
        left: -10px;
        font-size: 60px;
        color: rgba($primary-purple, 0.2);
        font-family: serif;
      }
    }
    
    &__text {
      line-height: 1.6;
      font-style: italic;
    }
    
    &__author {
      display: flex;
      align-items: center;
    }
    
    &__photo {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: $spacing-md;
      background: $primary-green;
      border: 2px solid $primary-green;
      
      img {
        width: 100%;
        height: 100%;
        transform: translate(-1%, -2%);
        object-fit: cover;
      }
    }
    
    &__name {
      margin-bottom: $spacing-xs;
      font-size: $font-size-base;
    }
    
    &__role {
      color: lighten($dark-gray, 20%);
      font-size: $font-size-sm;
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
