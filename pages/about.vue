<template>
  <div class="about-page">
    <!-- Banner -->
    <Banner 
      title="О нас" 
      subtitle="Центр молодёжных и гражданских инициатив города Урай"
      backgroundImage="/images/newsCardBanner.jpg"
    />
    
    <!-- Main Content -->
    <section class="section about-content">
      <div class="container">
        <div class="about-content__inner">
          <div class="about-content__main">
            <h2 class="about-content__title">История и миссия</h2>
            <p class="about-content__text">
              Центр молодёжных и гражданских инициатив города Урай был создан в 2020 году как площадка 
              для реализации молодёжной политики, поддержки волонтёрства и гражданских инициатив.
            </p>
            <p class="about-content__text">
              Наша миссия — создавать условия для самореализации молодёжи и социально активных граждан, 
              поддерживать некоммерческие организации, волонтёрские объединения и креативные сообщества, 
              способствовать развитию гражданского общества и улучшению качества жизни в городе Урай.
            </p>
            
            <h2 class="about-content__title">Структура организации</h2>
            <p class="about-content__text">
              В структуру Центра входят два ресурсных центра:
            </p>
            <ul class="about-content__list">
              <li>
                <strong>Ресурсный центр поддержки НКО</strong> — оказывает информационную, 
                консультационную, методическую и организационную поддержку некоммерческим организациям 
                города Урай.
              </li>
              <li>
                <strong>Ресурсный центр поддержки волонтёрства</strong> — координирует деятельность 
                волонтёрских объединений, проводит обучение волонтёров, организует добровольческие акции 
                и мероприятия.
              </li>
            </ul>
            
            <h2 class="about-content__title">Наша команда</h2>
            <p class="about-content__text">
              В Центре молодёжных и гражданских инициатив работает команда профессионалов, 
              имеющих опыт в сфере молодёжной политики, социального проектирования, организации 
              мероприятий и работы с волонтёрами.
            </p>
            
            <div class="team-grid">
              <div v-for="(member, index) in team" :key="index" class="team-member">
                <div class="team-member__photo">
                  <img :src="member.photo" :alt="member.name" />
                </div>
                <h3 class="team-member__name">{{ member.name }}</h3>
                <p class="team-member__position">{{ member.position }}</p>
              </div>
            </div>
          </div>
          
          <div class="about-content__sidebar">
            <div class="about-sidebar-block">
              <h3 class="about-sidebar-block__title">Документы</h3>
              <ul class="about-sidebar-block__list">
                <li v-for="(doc, index) in documents" :key="index" class="about-sidebar-block__item">
                  <a :href="doc.link" target="_blank" class="about-sidebar-block__link">
                    <span class="about-sidebar-block__icon"><i class="fas fa-file-alt"></i></span>
                    {{ doc.title }}
                  </a>
                </li>
              </ul>
            </div>
            
            <div class="about-sidebar-block">
              <h3 class="about-sidebar-block__title">Контакты</h3>
              <ul class="about-sidebar-block__list">
                <li class="about-sidebar-block__item">
                  <span class="about-sidebar-block__icon"><i class="fas fa-map-marker-alt"></i></span>
                  г. Урай, ул. Ленина, 88
                </li>
                <li class="about-sidebar-block__item">
                  <span class="about-sidebar-block__icon"><i class="fas fa-phone"></i></span>
                  +7 (34676) 2-23-45
                </li>
                <li class="about-sidebar-block__item">
                  <span class="about-sidebar-block__icon"><i class="fas fa-envelope"></i></span>
                  info@cmgi-uray.ru
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Photo Gallery -->
    <GallerySection 
      title="Фотогалерея" 
      description="Фотографии с мероприятий и акций Центра молодёжных и гражданских инициатив"
      :limit="6"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import GallerySection from '~/components/sections/GallerySection.vue';
import Banner from '~/components/ui/Banner.vue';

// Team members data
const team = ref([
  {
    name: 'Иванов Иван Иванович',
    position: 'Директор',
    photo: '/images/avatar.svg'
  },
  {
    name: 'Петрова Анна Сергеевна',
    position: 'Руководитель Ресурсного центра поддержки НКО',
    photo: '/images/avatar.svg'
  },
  {
    name: 'Сидоров Алексей Петрович',
    position: 'Руководитель Ресурсного центра поддержки волонтёрства',
    photo: '/images/avatar.svg'
  },
  {
    name: 'Козлова Мария Александровна',
    position: 'Специалист по работе с молодёжью',
    photo: '/images/avatar.svg'
  }
]);

// Documents data
const documents = ref([
  {
    title: 'Устав организации',
    link: '/documents/ustav.pdf'
  },
  {
    title: 'Положение о Ресурсном центре поддержки НКО',
    link: '/documents/polozhenie-nko.pdf'
  },
  {
    title: 'Положение о Ресурсном центре поддержки волонтёрства',
    link: '/documents/polozhenie-volunteer.pdf'
  },
  {
    title: 'Годовой отчет за 2024 год',
    link: '/documents/report-2024.pdf'
  }
]);


</script>

<style lang="scss">
.about-page {
  .about-content {
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
    
    &__list {
      margin-bottom: $spacing-lg;
      padding-left: $spacing-lg;
      
      li {
        margin-bottom: $spacing-sm;
        position: relative;
        
        &:before {
          content: '';
          position: absolute;
          left: -$spacing-lg;
          top: $spacing-sm;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: $primary-green;
        }
      }
    }
  }
  
  .team-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-lg;
    margin-top: $spacing-lg;
    
    @include mobile {
      grid-template-columns: 1fr;
    }
  }
  
  .team-member {
    background-color: $light-purple;
    border-radius: $border-radius-md;
    padding: $spacing-md;
    text-align: center;
    
    &__photo {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto $spacing-md;
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
      margin-bottom: $spacing-xs;
      font-size: $font-size-lg;
    }
    
    &__position {
      color: lighten($dark-gray, 20%);
      font-size: $font-size-sm;
    }
  }
  
  .about-sidebar-block {
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
  
  .gallery-section {
    background-color: $gray;
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
    height: 250px;
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
}
</style>
