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

<style lang="scss">
.banner {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  padding: $spacing-xxl 0;
  color: $white;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba($black, 0.5), rgba($black, 0.7));
    z-index: 1;
  }
  
  &__content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    text-align: center;
    margin: 0 auto;
    padding: $spacing-xl 0;
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
</style>
