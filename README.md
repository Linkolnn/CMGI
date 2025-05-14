# CMGI - Центр молодёжных и гражданских инициатив

Проект **CMGI** создан с использованием фреймворка **Nuxt 3** и представляет собой веб-портал для Центра молодёжных и гражданских инициатив города Урай. Основная цель проекта — создание современной платформы для поддержки молодёжных инициатив, волонтёрства и гражданской активности в городе Урай.

## Описание проекта

CMGI - это интерактивный веб-портал, который предоставляет информацию о деятельности Центра, актуальных новостях, проектах и инициативах. Портал разработан с учетом современных требований к пользовательскому интерфейсу и оптимизирован для различных устройств.

## Технологический стек

- **Nuxt 3** - современный фреймворк для создания веб-приложений на основе Vue.js
- **Vue.js 3** - прогрессивный JavaScript-фреймворк для создания пользовательских интерфейсов
- **Pinia** - хранилище состояний для Vue.js приложений
- **SASS/SCSS** - препроцессор CSS для создания стилей
- **FontAwesome** - библиотека иконок

## Основные функциональные возможности

- Информационные страницы о Центре и его деятельности
- Новостной раздел с возможностью фильтрации по категориям
- Административная панель для управления контентом
- Раздел для предложения гражданских инициатив
- Адаптивный дизайн для мобильных устройств и планшетов

## Описание компонента `app.vue`

Компонент `app.vue` является корневым компонентом приложения CMGI. Он задает основную структуру приложения и инициализирует хранилища данных при запуске.

### Объяснение кода в `app.vue`

```vue
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// This is the main app component that wraps all pages
import { useGalleryStore } from './stores/gallery';
import { useInitiativesStore } from './stores/initiatives';
import { onMounted } from 'vue';

const galleryStore = useGalleryStore();
const initiativesStore = useInitiativesStore();

onMounted(() => {
  // Инициализация хранилищ при запуске приложения
  galleryStore.initGallery();
  initiativesStore.initInitiatives();
});
</script>
```

## Описание компонента `index.vue`

Компонент `index.vue`, расположенный в папке `pages`, отвечает за главную страницу портала CMGI. Он представляет собой ключевой интерфейс, предоставляющий пользователю доступ к основной информации о Центре, его направлениях деятельности и актуальных новостях.

### Объяснение кода в `index.vue`

```vue
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

```

- Страница содержит несколько секций: баннер с призывом к действию, информацию о Центре, основные направления деятельности и последние новости
- Использует компоненты `DirectionsSection` и `NewsSection` для структурирования контента
- Получает данные о новостях из хранилища Pinia (`useNewsStore`)
- Стили определены с использованием препроцессора SCSS с применением переменных и миксинов для обеспечения единого стиля и адаптивности

## Особенности реализации

- **Адаптивная верстка**: Сайт корректно отображается на мобильных устройствах и планшетах благодаря использованию медиа-запросов и миксинов SCSS
- **Оптимизация загрузки**: Настроена оптимизация загрузки сайта через конфигурацию Nuxt и ленивую загрузку изображений
- **Хранение данных**: Реализовано сохранение новостей, созданных в админ-панели, в localStorage для отображения на других страницах
- **Фильтрация новостей**: Добавлена возможность фильтрации новостей по категориям


### Компоненты UI

#### `LazyImage.vue`

Компонент для оптимизированной загрузки изображений с поддержкой ленивой загрузки.

**Особенности:**
- Отложенная загрузка изображений (атрибут `loading="lazy"`)
- Отображение плейсхолдера с анимацией загрузки
- Асинхронное декодирование для улучшения производительности
- Обработка события загрузки изображения

**Пример использования:**
```vue
<LazyImage src="/images/example.jpg" alt="Описание изображения" />
```

#### `NewsCard.vue`

Компонент для отображения карточки новости с заголовком, изображением, датой, категорией и кратким описанием.

**Особенности:**
- Использует компонент `LazyImage` для оптимизации загрузки изображений
- Форматирование даты публикации
- Отображение метки категории
- Ссылка на полную страницу новости

**Пример использования:**
```vue
<NewsCard 
  title="Заголовок новости" 
  excerpt="Краткое описание новости..." 
  image="/images/news/example.jpg" 
  date="2025-05-10" 
  category="events" 
  link="/news/example-news" 
/>
```

#### `DirectionCard.vue`

Компонент для отображения карточки направления деятельности центра.

**Особенности:**
- Отображение изображения, заголовка и описания направления
- Ссылка на страницу с подробной информацией о направлении
- Адаптивный дизайн для различных устройств

**Пример кода:**
```vue
<template>
  <div class="direction-card" @click="navigateToLink">
    <div class="direction-card__image">
      <img :src="image" :alt="title" />
    </div>
    <div class="direction-card__content">
      <h3 class="direction-card__title">{{ title }}</h3>
      <p class="direction-card__description">{{ description }}</p>
      <NuxtLink :to="link" class="btn btn--primary direction-card__button" @click.stop>
        Узнать больше
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

const navigateToLink = (event) => {
  // Если клик был не на кнопке, переходим по ссылке
  if (!event.target.closest('.direction-card__button')) {
    router.push(props.link);
  }
};
</script>
```

**Пример использования:**
```vue
<DirectionCard
  title="Волонтёрство"
  description="Программы и проекты для добровольцев в различных сферах деятельности."
  image="/images/directions/volunteering.jpg"
  link="/directions/volunteering"
/>
```

#### `Banner.vue`

Компонент для отображения баннера на страницах сайта.

**Особенности:**
- Поддержка фонового изображения
- Настраиваемый заголовок и подзаголовок
- Возможность добавления кнопок действия

**Пример кода:**
```vue
<template>
  <div class="banner" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="container">
      <div class="banner__content">
        <h1 class="banner__title">{{ title }}</h1>
        <p v-if="subtitle" class="banner__subtitle">{{ subtitle }}</p>
        <div v-if="$slots.default" class="banner__actions">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  backgroundImage: {
    type: String,
    default: '/images/banner-bg.jpg'
  }
});
</script>
```

**Пример использования:**
```vue
<Banner 
  title="Центр молодёжных инициатив" 
  subtitle="Место, где ваши идеи становятся реальностью"
  backgroundImage="/images/hero-bg.jpg"
>
  <NuxtLink to="/initiative" class="btn btn--primary">Предложить инициативу</NuxtLink>
  <NuxtLink to="/about" class="btn btn--secondary">О центре</NuxtLink>
</Banner>
```

### Компоненты секций

#### `NewsSection.vue`

Секция для отображения блока новостей на страницах сайта.

**Особенности:**
- Отображение заголовка секции
- Сетка новостей с использованием компонента `NewsCard`
- Опциональная ссылка на страницу всех новостей
- Адаптивная сетка для различных устройств

**Пример использования:**
```vue
<NewsSection 
  title="Новости и события" 
  :news="latestNews" 
  :showAllLink="true" 
/>
```

#### `DirectionsSection.vue`

Секция для отображения основных направлений деятельности центра.

**Особенности:**
- Заголовок и описание секции
- Отображение карточек направлений с использованием компонента `DirectionCard`
- Адаптивная сетка для различных устройств

#### `GallerySection.vue`

Секция для отображения галереи изображений.

**Особенности:**
- Отображение сетки изображений с использованием компонента `LazyImage`
- Возможность фильтрации изображений по категориям
- Модальное окно для просмотра изображений в полном размере

### Компоненты форм

#### `ContactForm.vue`

Форма для отправки сообщений и обратной связи.

**Особенности:**
- Валидация полей формы
- Отправка данных на сервер
- Отображение сообщений об успешной отправке или ошибках
- Защита от спама

**Пример кода:**
```vue
<template>
  <form class="form contact-form" @submit.prevent="submitForm">
    <div class="form__group">
      <label for="name" class="form__label">Имя *</label>
      <input 
        id="name" 
        v-model="form.name" 
        type="text" 
        class="form__input" 
        required 
        :class="{ 'form__input--error': errors.name }"
      />
      <p v-if="errors.name" class="form__error">{{ errors.name }}</p>
    </div>
    
    <div class="form__group">
      <label for="email" class="form__label">Email *</label>
      <input 
        id="email" 
        v-model="form.email" 
        type="email" 
        class="form__input" 
        required
        :class="{ 'form__input--error': errors.email }"
      />
      <p v-if="errors.email" class="form__error">{{ errors.email }}</p>
    </div>
    
    <div class="form__group">
      <label for="message" class="form__label">Сообщение *</label>
      <textarea 
        id="message" 
        v-model="form.message" 
        class="form__textarea" 
        required
        :class="{ 'form__input--error': errors.message }"
      ></textarea>
      <p v-if="errors.message" class="form__error">{{ errors.message }}</p>
    </div>
    
    <div class="form__actions">
      <button type="submit" class="btn btn--primary form__submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Отправка...' : 'Отправить' }}
      </button>
    </div>
    
    <div v-if="formSubmitted" class="form__success">
      <p>Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.</p>
    </div>
  </form>
</template>
```

**Пример использования:**
```vue
<template>
  <div class="contact-page">
    <h1 class="page-title">Обратная связь</h1>
    <p class="contact-page__intro">Если у вас есть вопросы или предложения, заполните форму ниже:</p>
    <ContactForm />
  </div>
</template>
```

#### `InitiativeForm.vue`

Форма для предложения гражданских инициатив.

**Особенности:**
- Многошаговая форма с валидацией
- Загрузка файлов и изображений
- Выбор категории инициативы
- Сохранение черновика в localStorage
- Отправка данных на сервер

### Компоненты админ-панели

#### `GalleryManager.vue`

Компонент для управления галереей изображений в админ-панели.

**Особенности:**
- Загрузка новых изображений
- Редактирование метаданных изображений (заголовок, описание, категория)
- Удаление изображений
- Сортировка и фильтрация изображений

**Пример кода:**
```vue
<template>
  <div class="gallery-manager">
    <h2 class="section__title">Управление фотогалереей</h2>
    
    <div class="gallery-grid">
      <!-- Карточка добавления фото -->
      <div class="gallery-add-card" @click="showAddPhotoForm = true">
        <div class="gallery-add-card__icon">
          <i class="fas fa-plus-circle"></i>
        </div>
        <div class="gallery-add-card__title">Добавить фото</div>
      </div>
      
      <!-- Фотографии галереи -->
      <div 
        v-for="photo in galleryStore.photos" 
        :key="photo.id" 
        class="gallery-item"
        @mouseover="hoveredPhotoId = photo.id"
        @mouseleave="hoveredPhotoId = null"
      >
        <img :src="photo.image" :alt="photo.title" class="gallery-item__image" />
        
        <!-- Оверлей для удаления -->
        <div 
          v-if="hoveredPhotoId === photo.id" 
          class="gallery-item__delete-overlay"
          @click="deletePhoto(photo.id)"
        >
          <div class="gallery-item__delete-content">
            <i class="fas fa-trash"></i>
            <span>Удалить</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Модальное окно добавления фото -->
    <div v-if="showAddPhotoForm" class="modal-overlay" @click.self="showAddPhotoForm = false">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Добавление новой фотографии</h3>
          <button class="modal-close" @click="showAddPhotoForm = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useGalleryStore } from '~/stores/gallery';

const galleryStore = useGalleryStore();
const showAddPhotoForm = ref(false);
const hoveredPhotoId = ref(null);

const deletePhoto = (photoId) => {
  if (confirm('Вы действительно хотите удалить это изображение?')) {
    galleryStore.deletePhoto(photoId);
  }
};
</script>
```

**Пример использования:**
```vue
<template>
  <div class="admin-page">
    <h1 class="admin-page__title">Управление сайтом</h1>
    
    <div class="admin-tabs">
      <button 
        class="admin-tabs__item" 
        :class="{ 'admin-tabs__item--active': activeTab === 'gallery' }"
        @click="activeTab = 'gallery'"
      >
        Галерея
      </button>
      <!-- Другие вкладки -->
    </div>
    
    <div class="admin-content">
      <GalleryManager v-if="activeTab === 'gallery'" />
      <!-- Другие компоненты управления -->
    </div>
  </div>
</template>
```

## Хранилища данных (Pinia)

В проекте используются следующие хранилища Pinia для управления состоянием приложения:

### `news.js`

Хранилище для управления новостями.

**Основные функции:**
- Загрузка списка новостей
- Фильтрация новостей по категориям
- Добавление, редактирование и удаление новостей
- Сохранение новостей в localStorage для отображения на других страницах

### `gallery.js`

Хранилище для управления галереей изображений.

**Основные функции:**
- Инициализация галереи при запуске приложения
- Загрузка изображений
- Фильтрация изображений по категориям
- Управление метаданными изображений

### `initiatives.js`

Хранилище для управления гражданскими инициативами.

**Основные функции:**
- Инициализация списка инициатив
- Добавление новых инициатив
- Отслеживание статуса инициатив
- Фильтрация инициатив по категориям и статусу

## Дополнительная информация

Для получения дополнительной информации о Nuxt 3 посетите [документацию Nuxt](https://nuxt.com/docs/getting-started/introduction).

## Шаги установки

1. Клонировать репозиторий:
```bash
git clone [url-вашего-репозитория]
cd [имя-директории]
```

2. Установить зависимости:
```bash
yarn install
# или
npm install
```

3. Запустить в режиме разработки:
```bash
yarn dev
# или
npm run dev
```

4. Сборка для production:
```bash
yarn build
# или
npm run build
```

5. Предпросмотр production версии:
```bash
yarn preview
# или
npm run preview
```