<template>
  <q-no-ssr>
    <swiper-container
      class="cursor-pointer"
      v-bind="$attrs"
      v-if="showSlide"
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
      :pagination-dynamic-bullets="opts?.paginationDynamic"
      :pagination-type="opts?.paginationType"
      :direction="opts?.direction"
      :loop="opts?.loop"
      :effect="opts?.effect"
      :allow-touch-move="opts?.allowTouchMove"
      @swiperslidechange="onSlideChange"
    >
      <slot />
    </swiper-container>
  </q-no-ssr>
</template>
<script setup lang="ts">
import { PropType, ref, onMounted, watch } from 'vue';
import { SlideOptions, SlidePaginationy } from '@/types/common';
// import { register } from 'swiper/element/bundle';
// register();
interface Props {
  paramiters: SlideOptions;
  max?: number;
}

type SlideAction = 'next' | 'prev';

const props = withDefaults(defineProps<Props>(), {
  max: 0,
});
const showSlide = ref(false);
const opts = ref<SlideOptions>();
const modules = ref<any[]>([]);
const swiperRef = ref<any>(undefined);
const currentIndex = defineModel('currentIndex', { type: Number, default: 0 });
const slideAction = defineModel('slideAction', {
  type: String as PropType<SlideAction | undefined>,
  default: undefined,
});
const swiperEl = ref<any>();
onMounted(async () => {
  await onInitSwiper();
  await initSlides();
  showSlide.value = true;
});
const initSlides = () => {
  return new Promise((resolve) => {
    const params = props.paramiters;
    let initPagination: SlidePaginationy | undefined = undefined;
    if (params?.pagination != undefined) {
      if (typeof params?.pagination === 'boolean') {
        initPagination = {
          enabled: params?.pagination,
        };
      } else {
        initPagination = params?.pagination;
      }
    }
    opts.value = {
      keyboard: params?.keyboard || false,
      // pagination: params?.pagination || undefined,
      pagination: initPagination,
      allowTouchMove:
        params?.allowTouchMove != undefined ? params.allowTouchMove : true,
      navigation: params?.navigation || false,
      scrollbar: params?.scrollbar || false,
      updateOnWindowResize: params?.updateOnWindowResize || false,
      zoom: params?.zoom || false,
      initialSlide: params?.initialSlide || 0,
      slidesPerGroup: params?.slidesPerGroup || 0,
      freeMode: params?.freeMode || false,
      lazy: params?.lazy || true,
      style: params?.style || {
        '--swiper-navigation-color': '#2e86de',
        '--swiper-pagination-color': '#2e86de',
        '--swiper-navigation-size': '20px',
        '--swiper-navigation-top-offset': '50%',
        '--swiper-navigation-sides-offset': '5px',
      },
      speed: params?.speed || 300,
      slidesPerView: params?.slidesPerView || 1,
      spaceBetween: params?.spaceBetween || 0,
      centeredSlides: params?.centeredSlides || false,
      autoplay: params?.autoplay || false,
      paginationDynamic: params?.paginationDynamic || false,
      paginationType: params?.paginationType || 'bullets',
      direction: params?.direction || 'horizontal',
      loop: params?.loop || false,
      effect: params?.effect || 'slide',
    };
    resolve(true);
  });
};
const onSlideChange = (e: any) => {};
const onInitSwiper = () => {
  return new Promise((resolve) => {
    if (!process.env.SERVER) {
      swiperEl.value = document.querySelector('swiper-container');
    }
    resolve(true);
  });
};
const onNext = () => {
  if (swiperEl.value) {
    swiperEl.value.swiper.slideNext();
  }
};
const onPrev = () => {
  if (swiperEl.value) {
    swiperEl.value.swiper.slidePrev();
  }
};
watch(slideAction, (newAction) => {
  if (newAction != undefined) {
    if (newAction == 'next') {
      onNext();
    } else if (newAction == 'prev') {
      onPrev();
    }
  }
  slideAction.value = undefined;
});
</script>
