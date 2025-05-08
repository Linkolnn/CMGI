<template>
  <div class="direction-card">
    <div class="direction-card__image">
      <img :src="image" :alt="title" />
    </div>
    <div class="direction-card__content">
      <h3 class="direction-card__title">{{ title }}</h3>
      <p class="direction-card__description">{{ description }}</p>
      <NuxtLink :to="link" class="btn btn--primary direction-card__button">
        Узнать больше
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
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
</script>

<style lang="scss">
.direction-card {
  @include card;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  &__image {
    height: 200px;
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
  
  &__content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  
  &__title {
    color: $dark-gray;
    margin-bottom: $spacing-sm;
    font-size: $font-size-lg;
  }
  
  &__description {
    color: lighten($dark-gray, 20%);
    margin-bottom: $spacing-lg;
    flex: 1;
  }
  
  &__button {
    align-self: flex-start;
  }
}
</style>
