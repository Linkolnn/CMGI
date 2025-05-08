<template>
  <section class="section directions-section">
    <div class="container">
      <h2 class="section__title">{{ title }}</h2>
      <p v-if="description" class="section__description">{{ description }}</p>
      
      <div class="directions-grid">
        <div v-for="(direction, index) in directions" :key="index" class="directions-grid__item">
          <DirectionCard 
            :title="direction.title"
            :description="direction.description"
            :image="direction.image"
            :link="direction.link"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import DirectionCard from '~/components/ui/DirectionCard.vue';

defineProps({
  title: {
    type: String,
    default: 'Основные направления'
  },
  description: {
    type: String,
    default: ''
  },
  directions: {
    type: Array,
    required: true
  }
});
</script>

<style lang="scss">
.directions-section {
  background-color: $light-purple;
  
  .section__description {
    text-align: center;
    max-width: 800px;
    margin: 0 auto $spacing-xl;
  }
}

.directions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-lg;
  
  @include tablet {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include mobile {
    grid-template-columns: 1fr;
  }
  
  &__item {
    height: 100%;
  }
}
</style>
