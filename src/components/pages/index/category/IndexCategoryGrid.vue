<template>
    <div :class="[$style.IndexCategoryGrid, 'index-category-grid']">
        <h2
            :class="[$style.title, 'index-category-grid-title']"
            @click="$emit('close')"
        >
            <slot name="title" />
        </h2>

        <VSliderGrid
            :class="$style.slider"
            :slides="cards"
            :options="sliderOptions"
        >
            <template #cell="{ cell }">
                <CardPromo
                    :class="$style.card"
                    :title="cell?.title"
                    :description="cell?.description"
                    :image="cell?.image"
                    :background-color="cell?.color"
                    :with-button="false"
                    :active="checkIsCellActive(cell)"
                    @click="$emit('change', cell)"
                />
            </template>
        </VSliderGrid>
    </div>
</template>

<script>
export default {
    name: 'IndexCategotyGrid',
};
</script>

<script setup>
import { ref } from 'vue';

// UI
import VSliderGrid from '@/components/ui/slider/VSliderGrid.vue';

// Components
import CardPromo from '@/components/common/cards/CardPromo.vue';

// Props
const $props = defineProps({
    values: {
        type: Array,
        default: () => [],
    },

    cards: {
        type: Array,
        default: () => [],
    },

    valueName: {
        type: String,
        default: 'value',
    },
});

// Emits
defineEmits(['change', 'close']);

// Data
const sliderOptions = ref({
    slidesPerView: 4.2,
    spaceBetween: 20,
});

// Methods
function checkIsCellActive(cell) {
    if (!Array.isArray($props.values)) {
        return false;
    }

    return $props.values.includes(cell?.[$props.valueName]);
}
</script>

<style lang="scss" module>
    .IndexCategoryGrid {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .title {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 6rem;
        padding: 0 4rem;

        @include text(h, 3, montserrat);
    }

    .slider {
        padding: 0 4rem;

        :global(.v-slider-grid-column) {
            gap: 2rem;
        }
    }

    .card {
        width: 100%;
        height: 100%;
        background-color: $base-200;

        :global(.card-promo-image.v-image) {
            height: 16rem;
            width: 16rem;

            img {
                object-fit: contain;
            }
        }
    }
</style>
