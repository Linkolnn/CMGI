<template>
  <div class="contacts-page">
    <!-- Banner -->
    <Banner 
      title="Контакты" 
      subtitle="Свяжитесь с нами любым удобным способом"
      backgroundImage="/images/newsCardBanner.jpg"
    />
    
    <!-- Main Content -->
    <section class="section contacts-content">
      <div class="container">
        <div class="contacts-content__inner">
          <div class="contacts-content__info">
            <h2 class="contacts-content__title">Наши контакты</h2>
            
            <div class="contact-items">
              <div class="contact-item">
                <div class="contact-item__icon"><i class="fas fa-map-marker-alt"></i></div>
                <div class="contact-item__content">
                  <h3 class="contact-item__title">Адрес</h3>
                  <p class="contact-item__text">г. Урай, ул. Ленина, 88</p>
                  <p class="contact-item__subtext">Время работы: Пн-Пт с 9:00 до 18:00</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-item__icon"><i class="fas fa-phone"></i></div>
                <div class="contact-item__content">
                  <h3 class="contact-item__title">Телефон</h3>
                  <p class="contact-item__text">+7 (34676) 2-23-45</p>
                  <p class="contact-item__subtext">Звоните в рабочее время</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-item__icon"><i class="fas fa-envelope"></i></div>
                <div class="contact-item__content">
                  <h3 class="contact-item__title">Email</h3>
                  <p class="contact-item__text">info@cmgi-uray.ru</p>
                  <p class="contact-item__subtext">Мы отвечаем в течение 24 часов</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-item__icon"><i class="fas fa-globe"></i></div>
                <div class="contact-item__content">
                  <h3 class="contact-item__title">Социальные сети</h3>
                  <div class="contact-item__social">
                    <a href="https://vk.com/cmgi_uray" target="_blank" class="contact-item__social-link">ВКонтакте</a>
                    <a href="https://t.me/Uray_Molodej" target="_blank" class="contact-item__social-link">Telegram</a>
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
          <div id="map" style="width:100%; height:450px;"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Banner from '~/components/ui/Banner.vue';
import ContactForm from '~/components/forms/ContactForm.vue';

// Получаем конфигурацию для доступа к переменным окружения
const config = useRuntimeConfig();

// Координаты центра Урая (приблизительные)
const centerCoords = [60.126589, 64.773679];
const officeCoords = [60.126589, 64.773679]; // Координаты офиса (замените на реальные)

// Получаем API ключ из конфигурации
const apiKey = config.public.apiKey;

onMounted(() => {
  // Загрузка API Яндекс Карт
  if (typeof window !== 'undefined' && !window.ymaps) {
    const yandexMapScript = document.createElement('script');
    yandexMapScript.setAttribute('src', `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`);
    yandexMapScript.addEventListener('load', initYandexMap);
    document.head.appendChild(yandexMapScript);
  } else if (window.ymaps) {
    // Если API уже загружен, просто инициализируем карту
    initYandexMap();
  }
});

// Инициализация карты
function initYandexMap() {
  ymaps.ready(() => {
    const map = new ymaps.Map('map', {
      center: centerCoords,
      zoom: 16,
      controls: ['zoomControl', 'fullscreenControl']
    });
    
    // Создаем кастомный макет для плейсмарка с круглой формой и белой границей
    const customLayoutClass = ymaps.templateLayoutFactory.createClass(
      '<div class="custom-placemark">' +
      '<div class="custom-placemark__inner">' +
      '<img src="/images/logo.jpg" alt="CMGI Logo" class="custom-placemark__image">' +
      '</div>' +
      '</div>',
      {
        build: function() {
          customLayoutClass.superclass.build.call(this);
          // Добавляем стили для кастомного плейсмарка
          const element = this.getElement();
          element.style.position = 'relative';
          element.style.width = '50px';
          element.style.height = '50px';
          element.style.marginLeft = '-25px';
          element.style.marginTop = '-25px';
          
          const inner = element.querySelector('.custom-placemark__inner');
          inner.style.width = '44px';
          inner.style.height = '44px';
          inner.style.borderRadius = '50%';
          inner.style.border = '3px solid #ffffff';
          inner.style.overflow = 'hidden';
          inner.style.boxShadow = '0 3px 6px rgba(0, 0, 0, 0.3)';
          
          const image = element.querySelector('.custom-placemark__image');
          image.style.width = '100%';
          image.style.height = '100%';
          image.style.objectFit = 'cover';
        }
      }
    );
    
    // Создание кастомного плейсмарка с логотипом
    const placemark = new ymaps.Placemark(officeCoords, {
      hintContent: 'Центр молодёжных и гражданских инициатив',
      balloonContent: '<strong>Центр молодёжных и гражданских инициатив</strong><br>г. Урай, ул. Ленина, 88'
    }, {
      // Опции иконки с кастомным макетом
      iconLayout: customLayoutClass,
      // Смещение иконки
      iconOffset: [-25, -25]
    });
    
    map.geoObjects.add(placemark);
    map.behaviors.disable('scrollZoom'); // Отключаем скролл карты колесом мыши
    
    // Добавляем кнопку для определения местоположения пользователя
    const geolocationControl = new ymaps.control.GeolocationControl({
      options: {
        noPlacemark: true
      }
    });
    map.controls.add(geolocationControl);
  });
}
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
    grid-template-columns: 1fr;
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
