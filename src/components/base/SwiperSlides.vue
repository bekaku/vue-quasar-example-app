<template>
  <div></div>
  <!-- <swiper
    v-if="showSlide"
    :modules="[Autoplay, Keyboard, Scrollbar, Zoom, Navigation, Pagination]"
    :keyboard="opts?.keyboard"
    :pagination="opts?.pagination"
    :navigation="opts?.navigation"
    :scrollbar="opts?.scrollbar"
    :zoom="opts?.zoom"
    :initial-slide="opts?.initialSlide"
    :lazy="opts?.lazy"
    :style="opts?.style"
    :autoplay="opts?.autoplay"
    :speed="opts?.speed"
    :slides-per-view="opts?.slidesPerView"
    :space-between="opts?.spaceBetween"
    :centered-slides="opts?.centeredSlides"
  >
    <slot />
  </swiper> -->
</template>
<script setup lang="ts">
import { PropType, ref, onMounted } from 'vue';
import { SlideOptions } from '@/types/common';
// import {
//   Autoplay,
//   Keyboard,
//   Scrollbar,
//   Zoom,
//   Navigation,
//   Pagination,
// } from 'swiper';

// import { Swiper } from 'swiper/vue';
// import 'swiper/swiper.min.css';

// import 'swiper/css/autoplay';
// import 'swiper/css/keyboard';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import 'swiper/css/scrollbar';
// import 'swiper/css/zoom';
// import 'swiper/css/lazy';
const props = defineProps({
  paramiters: {
    type: Object as PropType<SlideOptions>,
  },
});
const showSlide = ref(false);
const opts = ref<SlideOptions>();
onMounted(async () => {
  await initSlides();
  showSlide.value = true;
});
const initSlides = () => {
  return new Promise((resolve) => {
    const params = props.paramiters;
    opts.value = {
      keyboard: params?.keyboard ? params.keyboard : false,
      pagination: params?.pagination ? params.pagination : false,
      navigation: params?.navigation ? params.navigation : false,
      scrollbar: params?.scrollbar ? params.scrollbar : false,
      zoom: params?.zoom ? params.zoom : false,
      initialSlide: params?.initialSlide ? params.initialSlide : 0,
      lazy: params?.lazy ? params.lazy : false,
      style: params?.style ? params.style : undefined,
      speed: params?.speed ? params.speed : 300,
      slidesPerView: params?.slidesPerView ? params.slidesPerView : 1,
      spaceBetween: params?.spaceBetween ? params.spaceBetween : 0,
      centeredSlides: params?.centeredSlides ? params.centeredSlides : false,
      autoplay: params?.autoplay ? params.autoplay : false,
    };
    resolve(true);
  });
};
</script>
