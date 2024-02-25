<template>
    <VSlider
        :class="[$style.VSliderGrid, 'v-slider-grid']"
        :slides="grid"
        :keymap="columnKeymap"
        v-bind="$attrs"
    >
        <template #slide="{ slide: column }">
            <div
                v-if="column?.length"
                :class="[$style.column, 'v-slider-grid-column']"
            >
                <slot
                    v-for="(cell, cellIndex) of column"
                    :key="cellKeymap(cell, cellIndex)"
                    :cell="cell"
                    :index="cellIndex"
                    name="cell"
                />
            </div>
        </template>
    </VSlider>  
</template>

<script>
export default {
    name: 'VSliderGrid',
};
</script>

<script setup>
import { computed } from 'vue';

// UI
import VSlider from '@/components/ui/slider/VSlider.vue';

// Props
const $props = defineProps({
    slides: {
        type: Array,
        default: () => [],
    },

    rows: {
        type: Number,
        default: 2,
    },

    columnKeymap: {
        type: Function,
        default: (row, index) => index,
    },

    cellKeymap: {
        type: Function,
        default: (cell, index) => cell?.id || index,
    },
});

// Computed
const grid = computed(() => {
    if (!Array.isArray($props.slides)) {
        return [];
    }

    const rowsCount = Number($props.rows) || 2;

    return $props.slides.reduce((res, slide) => {
        const updatedRes = Array.from(res);

        if (res?.[res.length - 1]?.length === rowsCount) {
            updatedRes.push([]);
        }

        updatedRes[updatedRes.length - 1].push(slide);

        return updatedRes;
    }, [[]]);
});
</script>

<style lang="scss" module>
    .VSliderGrid {
        width: 100%;
        height: 100%;
    }

    .column {
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-flow: row;
        grid-auto-rows: 1fr;
        height: 100%;
    }
</style>
