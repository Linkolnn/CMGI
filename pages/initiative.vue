<template>
  <div class="initiative-page">
    <!-- Banner -->
    <Banner 
      title="Предложить инициативу" 
      subtitle="Поделитесь своими идеями и предложениями"
      backgroundImage="/images/logo.jpg"
    />
    
    <!-- Main Content -->
    <section class="section initiative-content">
      <div class="container">
        <div class="initiative-content__inner">
          <div class="initiative-content__main">
            <h2 class="initiative-content__title">Как это работает</h2>
            <p class="initiative-content__text">
              Центр молодёжных и гражданских инициатив города Урай поддерживает и развивает 
              инициативы молодёжи и социально активных граждан. Если у вас есть идея проекта, 
              мероприятия или другой инициативы, которая может сделать жизнь в нашем городе лучше, 
              поделитесь ею с нами!
            </p>
            
            <div class="process-steps">
              <div class="process-step">
                <div class="process-step__number"><i class="fas fa-file-alt"></i></div>
                <div class="process-step__content">
                  <h3 class="process-step__title">Заполните форму</h3>
                  <p class="process-step__description">
                    Заполните форму подачи инициативы, указав свои контактные данные и подробно 
                    описав вашу идею. Вы также можете прикрепить дополнительные материалы.
                  </p>
                </div>
              </div>
              
              <div class="process-step">
                <div class="process-step__number"><i class="fas fa-search"></i></div>
                <div class="process-step__content">
                  <h3 class="process-step__title">Рассмотрение заявки</h3>
                  <p class="process-step__description">
                    Наши специалисты рассмотрят вашу инициативу в течение 5 рабочих дней и 
                    свяжутся с вами для уточнения деталей.
                  </p>
                </div>
              </div>
              
              <div class="process-step">
                <div class="process-step__number"><i class="fas fa-tasks"></i></div>
                <div class="process-step__content">
                  <h3 class="process-step__title">Разработка плана</h3>
                  <p class="process-step__description">
                    Вместе с вами мы разработаем план реализации инициативы, определим необходимые 
                    ресурсы и возможные источники финансирования.
                  </p>
                </div>
              </div>
              
              <div class="process-step">
                <div class="process-step__number"><i class="fas fa-rocket"></i></div>
                <div class="process-step__content">
                  <h3 class="process-step__title">Реализация</h3>
                  <p class="process-step__description">
                    После утверждения плана мы приступим к реализации инициативы. Вы сможете 
                    принять активное участие в этом процессе.
                  </p>
                </div>
              </div>
            </div>
            
            <h2 class="initiative-content__title">Форма подачи инициативы</h2>
            <InitiativeForm />
          </div>
          
          <div class="initiative-content__sidebar">
            <div class="sidebar-block">
              <h3 class="sidebar-block__title">Какие инициативы мы поддерживаем</h3>
              <ul class="sidebar-block__list">
                <li class="sidebar-block__item">
                  <span class="sidebar-block__icon"><i class="fas fa-check-circle"></i></span>
                  <span class="sidebar-block__text">
                    Социальные проекты, направленные на решение проблем города и его жителей
                  </span>
                </li>
                <li class="sidebar-block__item">
                  <span class="sidebar-block__icon"><i class="fas fa-check-circle"></i></span>
                  <span class="sidebar-block__text">
                    Образовательные и просветительские инициативы
                  </span>
                </li>
                <li class="sidebar-block__item">
                  <span class="sidebar-block__icon"><i class="fas fa-check-circle"></i></span>
                  <span class="sidebar-block__text">
                    Экологические проекты
                  </span>
                </li>
                <li class="sidebar-block__item">
                  <span class="sidebar-block__icon"><i class="fas fa-check-circle"></i></span>
                  <span class="sidebar-block__text">
                    Культурные и творческие мероприятия
                  </span>
                </li>
                <li class="sidebar-block__item">
                  <span class="sidebar-block__icon"><i class="fas fa-check-circle"></i></span>
                  <span class="sidebar-block__text">
                    Спортивные и оздоровительные проекты
                  </span>
                </li>
                <li class="sidebar-block__item">
                  <span class="sidebar-block__icon"><i class="fas fa-check-circle"></i></span>
                  <span class="sidebar-block__text">
                    Патриотические инициативы
                  </span>
                </li>
                <li class="sidebar-block__item">
                  <span class="sidebar-block__icon"><i class="fas fa-check-circle"></i></span>
                  <span class="sidebar-block__text">
                    Волонтёрские проекты
                  </span>
                </li>
              </ul>
            </div>
            
            <div class="sidebar-block">
              <h3 class="sidebar-block__title">Истории успеха</h3>
              <div class="success-stories">
                <div class="success-story-mini">
                  <h4 class="success-story-mini__title">Проект "ЭкоУрай"</h4>
                  <p class="success-story-mini__text">
                    Инициатива по улучшению экологической ситуации в городе, предложенная 
                    Алексеем Смирновым, переросла в масштабный проект с участием более 200 волонтёров.
                  </p>
                </div>
                
                <div class="success-story-mini">
                  <h4 class="success-story-mini__title">Молодёжный театр "Новая сцена"</h4>
                  <p class="success-story-mini__text">
                    Идея создания молодёжного театра, предложенная Екатериной Ивановой, получила 
                    поддержку Центра и сейчас является одним из самых успешных творческих проектов города.
                  </p>
                </div>
              </div>
            </div>
            
            <div class="sidebar-block">
              <h3 class="sidebar-block__title">Контакты</h3>
              <p class="sidebar-block__text">
                Если у вас возникли вопросы по подаче инициативы, вы можете связаться с нами:
              </p>
              <ul class="sidebar-block__list">
                <li class="sidebar-block__item">
                  <span class="sidebar-block__icon"><i class="fas fa-phone"></i></span>
                  <span class="sidebar-block__text">
                    +7 (34676) 2-23-45
                  </span>
                </li>
                <li class="sidebar-block__item">
                  <span class="sidebar-block__icon"><i class="fas fa-envelope"></i></span>
                  <span class="sidebar-block__text">
                    initiatives@cmgi-uray.ru
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Banner from '~/components/ui/Banner.vue';
import InitiativeForm from '~/components/forms/InitiativeForm.vue';
</script>

<style lang="scss">
.initiative-page {
  .initiative-content {
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
      margin-bottom: $spacing-lg;
      line-height: 1.6;
    }
  }
  
  .process-steps {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    margin-bottom: $spacing-xl;
  }
  
  .process-step {
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
      flex-shrink: 0;
    }
  }
  
  .success-stories {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }
  
  .success-story-mini {
    padding: $spacing-md;
    background-color: rgba($white, 0.5);
    border-radius: $border-radius-sm;
    border-left: 3px solid $primary-green;
    
    &__title {
      margin-bottom: $spacing-xs;
      font-size: $font-size-base;
    }
    
    &__text {
      font-size: $font-size-sm;
      color: lighten($dark-gray, 20%);
    }
  }
}
</style>
