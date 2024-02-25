<template>
    <component
        :is="tag"
        ref="sliderEl"
        class="v-slider swiper"
    >
        <div class="swiper-wrapper v-slider-wrapper">
            <div
                v-for="(slide, index) of slides"
                :key="keymap(slide, index)"
                class="swiper-slide v-slider-slide"
            >
                <slot
                    name="slide"
                    :slide="slide"
                    :slide-to="slideTo"
                    :slider="slider"
                    :index="index"
                    :current-slide="currentSlide"
                />
            </div>
        </div>

        <slot
            :slider="slider"
            :active-index="activeIndex"
            :current-slide="currentSlide"
        />
    </component>
</template>

<script>
export default {
    name: 'VSlider',
};
</script>

<script setup>
import { ref, nextTick, inject, watch, computed, onMounted, onUnmounted } from 'vue';

// Utils
import { simpleEquality } from '@/assets/utils/common-utils';

// Swiper
const $swiper = inject('swiper');

// Emits
const $emit = defineEmits([
    'slide-change',
    'touch-start',
    'touch-end',
    'init',
]);

// Props
const $props = defineProps({
    tag: {
        type: String,
        default: 'div',
    },

    slides: {
        type: Array,
        default: () => [],
    },

    keymap: {
        type: Function,
        default: (slide, index) => slide?.id || index,
    },

    options: {
        type: Object,
        default: null,
    },

    initOnMount: {
        type: Boolean,
        default: true,
    },

    destroyTimestamp: {
        type: Number,
        default: 400,
    },
});

// Data
const sliderEl = ref(null);
const slider = ref(null);
const activeIndex = ref(0);

// Lifecycle hooks
onMounted(() => {
    if ($props.initOnMount) {
        initSlider();
    }
});

onUnmounted(() => {
    setTimeout(() => {
        destroySlider();
    }, $props.destroyTimestamp);
});

// Computed
const currentSlide = computed(() => {
    if (
        !Array.isArray($props.slides) ||
        $props.slides?.length <= activeIndex.value
    ) {
        return null;
    }

    return $props.slides[activeIndex.value];
});

// Watch
watch(() => $props.options, (newOptions, lastOptions) => {
    if (simpleEquality(newOptions, lastOptions)) {
        return;
    }

    initSlider();
}, {
    deep: true,
});

watch(() => $props.slides, newSlides => {
    if (!newSlides?.length) {
        destroySlider();
        return;
    }

    if (!slider.value) {
        initSlider();
    } else {
        updateSlider();
    }
}, {
    deep: true,
});

// Methods
function slideTo(slideIndex = 0) {
    const config = getSliderConfig();

    if (config.loop) {
        slider.value?.slideToLoop(slideIndex);
    } else {
        slider.value?.slideTo(slideIndex);
    }
}

function destroySlider() {
    slider.value?.destroy();
    slider.value = null;

    $emit('destroy');
}

function initSlider() {
    if (!sliderEl.value) {
        return;
    }

    if (slider.value) {
        destroySlider();
    }

    slider.value = new $swiper(sliderEl.value, getSliderConfig());
}

async function updateSlider() {
    if (!slider.value) {
        return;
    }

    await nextTick();

    activeIndex.value = 0;
    slideTo(0);

    slider.value?.update();
    slider.value?.pagination?.update();
    slider.value?.navigation?.update();

    await slider.value?.lazy?.load();

    $emit('update', slider.value);
}

function getSliderConfig() {
    const customConfig = $props.options ? { ...$props.options } : {};
    const customListeners = customConfig?.on || {};
    delete customConfig.on;

    return {
        slidesPerView: 1,
        speed: 800,
        spaceBetween: 0,

        on: {
            slideChange: swiper => {
                activeIndex.value = swiper.realIndex;
                $emit('slide-change', activeIndex.value, swiper);
            },

            touchStart: (swiper, event) => {
                $emit('touch-start', event, swiper);
            },

            touchEnd: (swiper, event) => {
                $emit('touch-end', event, swiper);
            },

            init: swiper => {
                $emit('init', swiper);
            },

            ...customListeners,
        },

        ...customConfig,
    };
}
</script>
