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
