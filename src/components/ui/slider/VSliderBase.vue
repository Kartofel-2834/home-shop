<template>
    <div
        :class="[$style.VSliderBase, 'v-slider-base']"
        :style="currentStyles"
    >
        <VSlider
            :class="$style.sliderWrapper"
            :slides="slides"
            :keymap="keymap"
            :options="sliderOptions"
            :init-on-mount="initOnMount"
            v-bind="$attrs"
            @slide-change="onSlideChange"
        >
            <template #slide="attributes">
                <slot
                    name="slide"
                    v-bind="attributes"
                />
            </template>
        </VSlider>

        <!-- Navigation & Pagination -->
        <template v-if="withNavigation || withPagination">
            <div
                v-show="slides?.length >= 2"
                :class="[$style.navigationWrapper, 'v-slider-nav-wrapper', navClassList]"
            >
                <div
                    v-if="withPagination"
                    ref="paginationEl"
                    :class="[$style.pagination, 'v-slider-pagination']"
                />
            
                <VSliderNavigation
                    v-if="withNavigation"
                    ref="navigationEl"
                    :type="navigationType"
                />
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'VSliderBase',
};
</script>

<script setup>
import { computed, inject, onMounted, ref, useCssModule, watch } from 'vue';

// Components
import VSlider from '@/components/ui/slider/VSlider.vue';
import VSliderNavigation from '@/components/ui/slider/VSliderNavigation.vue';

// Plugins
const $swiperModules = inject('swiper-modules');

// Elements
const navigationEl = ref(null);
const paginationEl = ref(null);

// Data
const progress = ref(0);
const activeIndex = ref(0);
const sliderOptions = ref({});

// Props
const $props = defineProps({
    slides: {
        type: Array,
        default: () => [],
    },

    keymap: {
        type: Function,
        default: (slide, index) => slide || index,
    },

    options: {
        type: Object,
        default: () => ({}),
    },

    paginationType: {
        type: String,
        default: 'bullets',
        validator: v => [
            'bullets',
            'fraction',
        ].includes(v),
    },

    navigationType: {
        type: String,
        default: 'line',
        validator: v => [
            'line',
            'circle',
        ].includes(v),
    },

    withNavigation: {
        type: Boolean,
        default: true,
    },

    withPagination: {
        type: Boolean,
        default: true,
    },

    initOnMount: {
        type: Boolean,
        default: false,
    },
});

// Emits
const $emit = defineEmits(['slide-change']);

// Styles
const $style = useCssModule();

// Computed
const currentStyles = computed(() => ({
    '--progress': `${progress.value}`,
}));

const navClassList = computed(() => ({
    _pagination: $props.withPagination,
    _navigation: $props.withNavigation,
}));

const navigation = computed(() => {
    if (!$props.withNavigation) {
        return null;
    }

    return {
        navigation: {
            nextEl: navigationEl.value?.$refs?.prev,
            prevEl: navigationEl.value?.$refs?.next,
        },
    };   
});

const pagination = computed(() => {
    if (!$props.withPagination || !paginationEl.value) {
        return null;
    }

    return {
        pagination: {
            el: paginationEl.value,
            type: $props.paginationType,
            bulletClass: $style.bullet,
            renderFraction: (currentClass, totalClass) => `
                <span class="${currentClass}"></span>
                    из
                <span class="${totalClass}"></span>
            `,
        },
    };
});

// Watch
watch(() => $props.options, newOptions => {
    updateSliderOptions(newOptions);
});

// Lifecycle Hooks
onMounted(() => {
    updateSliderOptions($props.options);
});

// Methods
function onSlideChange(slideIndex, slider) {
    activeIndex.value = slideIndex;
    $emit('slide-change', slideIndex, slider);
}

function updateSliderOptions(newOptions = {}) {
    if (!newOptions) {
        return;
    }

    const modules = Array.isArray(newOptions?.modules) ? newOptions.modules : [];

    let options = {
        on: {
            autoplayTimeLeft: (swiper, timeLeft, percentage) => {
                progress.value = Math.floor((1 - percentage) * 1000) / 1000;
            },
        },
    };

    if (pagination.value) {
        modules.push($swiperModules?.Pagination);
        options = {
            ...options,
            ...pagination.value,
        };
    }

    if (navigation.value) {
        modules.push($swiperModules?.Navigation);
        options = {
            ...options,
            ...navigation.value,
        };
    }

    sliderOptions.value = {
        ...options,
        ...newOptions,
        modules,
    };
}
</script>

<style lang="scss" module>
    .VSliderBase {
        position: relative;
    }

    .navigationWrapper {
        position: absolute;
        left: 6rem;
        bottom: 4rem;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: calc(100% - 12rem);
    }

    .pagination {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
    }

    .bullet {
        overflow: hidden;
        display: flex;
        width: .8rem;
        height: .8rem;
        background-color: $base-300;
        border-radius: 100rem;
        transition:
            transform $default-transition,
            background-color $default-transition;

        &:not(:last-child) {
            margin-right: .8rem;
        }

        &:global(.swiper-pagination-bullet-active) {
            background-color: $primary;
            transform: scale(1.5);

            &:before {
                transform: scale(var(--progress));
            }
        }

        &:before {
            content: '';
            width: 100%;
            height: 100%;
            background-color: $base-200;
            border-radius: inherit;
            transform: scale(0);
        }
    }
</style>
