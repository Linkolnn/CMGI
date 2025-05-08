<template>
  <div class="contacts-page">
    <!-- Banner -->
    <Banner 
      title="Контакты" 
      subtitle="Свяжитесь с нами любым удобным способом"
      backgroundImage="/images/contacts-banner.jpg"
    />
    
    <!-- Main Content -->
    <section class="section contacts-content">
      <div class="container">
        <div class="contacts-content__inner">
          <div class="contacts-content__info">
            <h2 class="contacts-content__title">Наши контакты</h2>
            
            <div class="contact-items">
              <div class="contact-item">
                <div class="contact-item__icon">📍</div>
                <div class="contact-item__content">
                  <h3 class="contact-item__title">Адрес</h3>
                  <p class="contact-item__text">г. Урай, ул. Ленина, 88</p>
                  <p class="contact-item__subtext">Время работы: Пн-Пт с 9:00 до 18:00</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-item__icon">📞</div>
                <div class="contact-item__content">
                  <h3 class="contact-item__title">Телефон</h3>
                  <p class="contact-item__text">+7 (34676) 2-23-45</p>
                  <p class="contact-item__subtext">Звоните в рабочее время</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-item__icon">✉️</div>
                <div class="contact-item__content">
                  <h3 class="contact-item__title">Email</h3>
                  <p class="contact-item__text">info@cmgi-uray.ru</p>
                  <p class="contact-item__subtext">Мы отвечаем в течение 24 часов</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-item__icon">🌐</div>
                <div class="contact-item__content">
                  <h3 class="contact-item__title">Социальные сети</h3>
                  <div class="contact-item__social">
                    <a href="https://vk.com/" target="_blank" class="contact-item__social-link">ВКонтакте</a>
                    <a href="https://t.me/" target="_blank" class="contact-item__social-link">Telegram</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="contacts-departments">
              <h2 class="contacts-content__title">Направления</h2>
              
              <div class="department-items">
                <div class="department-item">
                  <h3 class="department-item__title">Урай Молодёжный</h3>
                  <p class="department-item__contact">
                    <strong>Координатор:</strong> Козлова Мария Александровна
                  </p>
                  <p class="department-item__contact">
                    <strong>Телефон:</strong> +7 (34676) 2-23-45
                  </p>
                  <p class="department-item__contact">
                    <strong>Email:</strong> youth@cmgi-uray.ru
                  </p>
                </div>
                
                <div class="department-item">
                  <h3 class="department-item__title">Волонтёры Победы</h3>
                  <p class="department-item__contact">
                    <strong>Координатор:</strong> Петрова Анна Сергеевна
                  </p>
                  <p class="department-item__contact">
                    <strong>Телефон:</strong> +7 (34676) 2-23-46
                  </p>
                  <p class="department-item__contact">
                    <strong>Email:</strong> volunteers@cmgi-uray.ru
                  </p>
                </div>
                
                <div class="department-item">
                  <h3 class="department-item__title">Добро.Центр</h3>
                  <p class="department-item__contact">
                    <strong>Координатор:</strong> Сидоров Алексей Петрович
                  </p>
                  <p class="department-item__contact">
                    <strong>Телефон:</strong> +7 (34676) 2-23-47
                  </p>
                  <p class="department-item__contact">
                    <strong>Email:</strong> dobro@cmgi-uray.ru
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="contacts-content__form">
            <h2 class="contacts-content__title">Обратная связь</h2>
            <p class="contacts-content__text">
              Если у вас есть вопросы, предложения или вы хотите узнать больше о нашей деятельности, 
              заполните форму обратной связи, и мы свяжемся с вами в ближайшее время.
            </p>
            
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
    
    <!-- Map Section -->
    <section class="section map-section">
      <div class="container">
        <h2 class="section__title">Как нас найти</h2>
        <div class="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2269.5033022587707!2d60.12345678901234!3d61.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjHCsDA3JzM0LjQiTiA2MMKwMDcnMzQuNCJF!5e0!3m2!1sru!2sru!4v1620000000000!5m2!1sru!2sru" 
            width="100%" 
            height="450" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Карта расположения Центра молодёжных и гражданских инициатив"
          ></iframe>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Banner from '~/components/ui/Banner.vue';
import ContactForm from '~/components/forms/ContactForm.vue';
</script>

<style lang="scss">
.contacts-page {
  .contacts-content {
    background-color: $white;
    
    &__inner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: $spacing-xl;
      
      @include tablet {
        grid-template-columns: 1fr;
      }
    }
    
    &__title {
      margin-bottom: $spacing-lg;
    }
    
    &__text {
      margin-bottom: $spacing-lg;
      line-height: 1.6;
    }
  }
  
  .contact-items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-lg;
    margin-bottom: $spacing-xl;
    
    @include mobile {
      grid-template-columns: 1fr;
    }
  }
  
  .contact-item {
    display: flex;
    align-items: flex-start;
    
    &__icon {
      font-size: $font-size-xl;
      margin-right: $spacing-md;
      background-color: $light-purple;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    
    &__title {
      font-size: $font-size-lg;
      margin-bottom: $spacing-xs;
    }
    
    &__text {
      font-weight: 500;
      margin-bottom: $spacing-xs;
    }
    
    &__subtext {
      font-size: $font-size-sm;
      color: lighten($dark-gray, 20%);
    }
    
    &__social {
      display: flex;
      gap: $spacing-md;
    }
    
    &__social-link {
      color: $primary-purple;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
  
  .contacts-departments {
    margin-top: $spacing-xl;
  }
  
  .department-items {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: $spacing-lg;
    
    @include tablet {
      grid-template-columns: 1fr 1fr;
    }
    
    @include mobile {
      grid-template-columns: 1fr;
    }
  }
  
  .department-item {
    background-color: $light-purple;
    border-radius: $border-radius-md;
    padding: $spacing-lg;
    
    &__title {
      margin-bottom: $spacing-md;
      font-size: $font-size-lg;
      color: $primary-purple;
      border-bottom: 2px solid $primary-green;
      padding-bottom: $spacing-sm;
    }
    
    &__contact {
      margin-bottom: $spacing-sm;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  
  .map-section {
    background-color: $gray;
  }
  
  .map-container {
    border-radius: $border-radius-md;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
