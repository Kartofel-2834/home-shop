import { Swiper } from 'swiper';
import {
    Navigation,
    Scrollbar,
    Thumbs,
    Mousewheel,
    Autoplay,
    Pagination,
    FreeMode,
    EffectFade,
    Grid,
} from 'swiper/modules';

const swiperModules = {
    Navigation,
    Scrollbar,
    Thumbs,
    Mousewheel,
    Autoplay,
    Pagination,
    FreeMode,
    EffectFade,
    Grid,
};

export default {
    install(app) {
        app.config.globalProperties.$swiper = Swiper;
        app.config.globalProperties.$swiperModules = swiperModules;

        app.provide('swiper', Swiper);
        app.provide('swiper-modules', swiperModules);
    },
};
