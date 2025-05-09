import { defineStore } from 'pinia';

export const useGalleryStore = defineStore('gallery', {
  state: () => ({
    photos: []
  }),

  actions: {
    // Загрузка фотографий из localStorage при инициализации
    initGallery() {
      if (process.client) {
        const storedPhotos = localStorage.getItem('cmgi-gallery');
        if (storedPhotos) {
          try {
            this.photos = JSON.parse(storedPhotos);
          } catch (error) {
            // Тихая обработка ошибки при загрузке фотографий
          }
        } else {
          // Если в localStorage нет фотографий, инициализируем хранилище дефолтными фотографиями
          this.initDefaultGallery();
        }
      }
    },

    // Инициализация хранилища дефолтными фотографиями
    initDefaultGallery() {
      this.photos = [
        {
          id: 1,
          image: '/images/newsCardBanner.jpg',
          alt: 'Молодёжный форум'
        },
        {
          id: 2,
          image: '/images/logo.jpg',
          alt: 'Волонтёрская акция'
        },
        {
          id: 3,
          image: '/images/uray-youth.jpg',
          alt: 'Мастер-класс для молодёжи'
        },
        {
          id: 4,
          image: '/images/volonter.jpg',
          alt: 'Экологическая акция'
        },
        {
          id: 5,
          image: '/images/dobro-center.jpg',
          alt: 'Добро.Центр'
        },
        {
          id: 6,
          image: '/images/gallery/forum.jpg',
          alt: 'Форум молодёжных инициатив'
        },
        {
          id: 7,
          image: '/images/gallery/eco.jpg',
          alt: 'Экологическая акция'
        },
        {
          id: 8,
          image: '/images/gallery/veterans.jpg',
          alt: 'Встреча с ветеранами'
        }
      ];
      this.saveGallery();
    },

    // Сохранение фотографий в localStorage
    saveGallery() {
      if (process.client) {
        try {
          localStorage.setItem('cmgi-gallery', JSON.stringify(this.photos));
        } catch (error) {
          // Тихая обработка ошибки при сохранении фотографий
        }
      }
    },

    // Добавление новой фотографии
    addPhoto(photo) {
      const newId = this.photos.length > 0 
        ? Math.max(...this.photos.map(p => p.id)) + 1 
        : 1;
      
      const newPhoto = {
        ...photo,
        id: newId
      };
      
      this.photos.unshift(newPhoto);
      this.saveGallery();
      return newId;
    },

    // Удаление фотографии
    deletePhoto(id) {
      const index = this.photos.findIndex(photo => photo.id === id);
      if (index !== -1) {
        this.photos.splice(index, 1);
        this.saveGallery();
        return true;
      }
      return false;
    },

    // Получение фотографии по ID
    getPhotoById(id) {
      return this.photos.find(photo => photo.id === parseInt(id));
    }
  }
});
