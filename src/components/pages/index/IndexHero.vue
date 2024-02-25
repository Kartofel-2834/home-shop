<template>
    <section :class="$style.IndexHero">
        <VSliderBase
            :class="$style.slider"
            :slides="slides"
            :options="sliderOptions"
        >
            <template #slide="{ slide }">
                <div :class="$style.slide">
                    <!-- Image -->
                    <VImage
                        v-if="slide?.image"
                        :class="$style.slideImage"
                        :src="slide.image"
                        no-lazy
                        alt="intro-image"
                    />

                    <!-- Shadow -->
                    <div :class="$style.shadow" />

                    <!-- Title & Description -->
                    <div :class="$style.info">
                        <div
                            v-if="slide?.title"
                            :class="$style.title"
                            v-html="slide.title"
                        />

                        <div
                            v-if="slide?.description"
                            :class="$style.description"
                            v-html="slide.description"
                        />

                        <VButton
                            :class="$style.button"
                            size="size-56"
                        >
                            Перейти к товару
                        </VButton>
                    </div>
                </div>
            </template>
        </VSliderBase>
    </section>
</template>

<script>
export default {
    name: 'IndexHero',
};
</script>

<script setup>
import { ref, inject } from 'vue';

// UI
import VSliderBase from '@/components/ui/slider/VSliderBase.vue';
import VImage from '@/components/ui/image/VImage.vue';
import VButton from '@/components/ui/button/VButton.vue';

// Plugins
const $swiperModules = inject('swiper-modules');

// Data
const sliderOptions = ref({
    modules: [$swiperModules?.Autoplay],

    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },

    loop: true,
});

const slides = ref([
    {
        title: 'Создайте уютную атмосферу<br>с нашим стильным постельным бельем',
        description: 'Погрузитесь в мир комфорта и стиля с нашим широким выбором постельного белья. От классических дизайнов до современных узоров - у нас есть все, чтобы сделать ваш сон незабываемым.',
        image: '/images/index/bed.png',
    },
    {
        title: 'Освежите свой интерьер<br>нашими коврами',
        description: 'Добавьте уют и теплоту в свой дом с помощью наших ковров различных цветов и текстур. Независимо от вашего стиля и предпочтений, у нас есть идеальный ковер, чтобы дополнить ваш интерьер и создать уютную атмосферу.',
        image: '/images/index/carpet.jpg',
    },
    {
        title: 'Сделайте готовку еще приятнее<br>с нашей кухонной утварью',
        description: 'У нас есть все необходимое для ваших кулинарных приключений! Наш ассортимент кухонной утвари включает в себя посуду, кухонные приборы, посуду для выпечки и многое другое. Доверьте нам заботу о вашей кухне, и наслаждайтесь готовкой еще больше',
        image: '/images/index/kitchen.jpg',
    },
    {
        title: 'Укутайтесь в уют<br>с нашими мягкими одеялами',
        description: 'Наши одеяла созданы, чтобы обеспечить вам тепло и комфорт в течение всей ночи. С широким выбором размеров, тканей и узоров, у нас есть одеяло для каждого вкуса. Укройтесь им и наслаждайтесь спокойным сном каждую ночь.',
        image: '/images/index/odeyalo.jpg',
        
    },
    {
        title: 'Преобразите свои окна<br>с нашими элегантными зановесками',
        description: 'Добавьте шарм и стиль своему интерьеру с нашими красивыми зановесками. Независимо от того, ищете ли вы темные шторы для блокировки света или легкие занавески для создания атмосферы, у нас есть идеальное решение для вас. Создайте уют и уют в своем доме с нашими зановесками',
        image: '/images/index/zanoveski.jpg',
    },
]);
</script>

<style lang="scss" module>
    .IndexHero {
        height: calc(100dvh - $header-h);
        max-height: 78rem;
    }

    .slider {
        width: 100%;
        height: 100%;
    }

    .slide {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .slideImage,
    .shadow {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .slideImage {
        z-index: 1;
    }

    .shadow {
        z-index: 2;
        background: linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
    }

    .info {
        position: relative;
        z-index: 3;
        display: flex;
        flex-direction: column;
        max-width: calc(100% - 8rem);
        margin-left: 6rem;
        cursor: default;
    }

    .title {
        width: 100rem;
        max-width: 100%;
        margin-bottom: 2.8rem;
        color: $white;

        @include text(h, 2, montserrat);
        @include text-ellipsis(3);
    }

    .description {
        width: 54rem;
        max-width: 100%;
        color: $base-100;

        @include text(l, 2, montserrat);
        @include text-ellipsis(10);
    }

    .button {
        width: max-content;
        margin-top: 7.2rem;
    }
</style>
