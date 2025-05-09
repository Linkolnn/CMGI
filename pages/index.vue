<template>
  <div class="home-page">
    <!-- Hero Banner -->
    <div class="hero-banner" :style="{ backgroundImage: `url(${heroBackground})` }">
      <div class="container">
        <div class="hero-banner__content">
          <h1 class="hero-banner__title">Урай — город активной молодёжи!</h1>
          <p class="hero-banner__subtitle">Центр молодёжных и гражданских инициатив города Урай</p>
          <div class="hero-banner__actions">
            <NuxtLink to="/initiative" class="btn btn--primary btn--lg">
              Предложить инициативу
            </NuxtLink>
            <NuxtLink to="/about" class="btn btn--secondary btn--lg">
              Узнать больше
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <!-- About Section -->
    <section class="section about-section">
      <div class="container">
        <div class="about-section__content">
          <h2 class="section__title">О Центре</h2>
          <p class="about-section__text">
            Центр молодёжных и гражданских инициатив города Урай — это площадка для реализации 
            молодёжной политики, поддержки волонтёрства и гражданских инициатив. Мы помогаем 
            молодым людям и социально активным гражданам воплощать свои идеи в жизнь, 
            развивать навыки и таланты, участвовать в жизни города.
          </p>
          <NuxtLink to="/about" class="about-section__link">
            Подробнее о нас
            <span class="about-section__link-arrow"><i class="fas fa-arrow-right"></i></span>
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- Directions Section -->
    <DirectionsSection 
      title="Основные направления" 
      description="Центр молодёжных и гражданских инициатив работает по нескольким ключевым направлениям, каждое из которых направлено на поддержку и развитие различных сфер общественной жизни."
      :directions="directions"
    />
    
    <!-- News Section -->
    <NewsSection 
      title="Новости и события" 
      :news="latestNews"
    />
    
    <!-- Call to Action -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-section__content">
          <h2 class="cta-section__title">Есть идея? Поделитесь с нами!</h2>
          <p class="cta-section__text">
            Мы всегда открыты для новых идей и инициатив. Если у вас есть проект, 
            который может сделать жизнь в Урае лучше — расскажите нам о нём!
          </p>
          <NuxtLink to="/initiative" class="btn btn--primary btn--lg">
            Предложить инициативу
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNewsStore } from '../stores/news';
import DirectionsSection from '~/components/sections/DirectionsSection.vue';
import NewsSection from '~/components/sections/NewsSection.vue';

const newsStore = useNewsStore();
const heroBackground = ref('/images/newsCardBanner.jpg');

// Directions data
const directions = ref([
  {
    title: 'Урай Молодёжный',
    description: 'Проекты и мероприятия для молодёжи города, направленные на развитие талантов, навыков и реализацию потенциала.',
    image: '/images/uray-youth.jpg',
    link: '/uray-youth'
  },
  {
    title: 'Волонтёры Победы',
    description: 'Патриотические инициативы, помощь ветеранам, сохранение исторической памяти и проведение памятных мероприятий.',
    image: '/images/volonter.jpg',
    link: '/volunteers'
  },
  {
    title: 'Добро.Центр',
    description: 'Волонтёрские проекты, направленные на помощь нуждающимся, защиту окружающей среды и развитие культуры добровольчества.',
    image: '/images/dobro-center.jpg',
    link: '/dobro-center'
  }
]);

// Get latest news from store
const latestNews = ref([]);

onMounted(async () => {
  await newsStore.fetchNews();
  latestNews.value = newsStore.getLatestNews;
});
</script>

<style lang="scss">
.home-page {
  .hero-banner {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    height: 80vh;
    min-height: 600px;
    display: flex;
    align-items: center;
    color: $white;
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba($black, 0.5), rgba($black, 0.7));
    }
    
    &__content {
      position: relative;
      z-index: 2;
      max-width: 800px;
      text-align: center;
      margin: 0 auto;
    }
    
    &__title {
      font-size: $font-size-xxl;
      font-weight: 700;
      margin-bottom: $spacing-md;
      text-shadow: 0 2px 4px rgba($black, 0.3);
      
      @include mobile {
        font-size: $font-size-xl;
      }
    }
    
    &__subtitle {
      font-size: $font-size-lg;
      margin-bottom: $spacing-lg;
      text-shadow: 0 1px 2px rgba($black, 0.3);
      
      @include mobile {
        font-size: $font-size-base;
      }
    }
    
    &__actions {
      display: flex;
      justify-content: center;
      gap: $spacing-md;
      
      @include mobile {
        flex-direction: column;
        align-items: center;
      }
    }
  }
  
  .about-section {
    background-color: $white;
    
    &__content {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }
    
    &__text {
      margin-bottom: $spacing-lg;
      font-size: $font-size-lg;
      line-height: 1.6;
      color: lighten($dark-gray, 10%);
    }
    
    &__link {
      display: inline-flex;
      align-items: center;
      color: $primary-green;
      font-weight: 500;
      font-size: $font-size-lg;
      
      &-arrow {
        margin-left: $spacing-xs;
        transition: transform 0.2s ease;
      }
      
      &:hover {
        .about-section__link-arrow {
          transform: translateX(3px);
        }
      }
    }
  }
  
  .cta-section {
    background-color: $primary-purple;
    color: $white;
    
    &__content {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }
    
    &__title {
      color: $white;
      margin-bottom: $spacing-md;
    }
    
    &__text {
      margin-bottom: $spacing-lg;
      font-size: $font-size-lg;
      line-height: 1.6;
    }
  }
}
</style>
