<template>
    <div :class="[$style.VImage, 'v-image', classList]">
        <img
            :class="$style.image"
            :src="src"
            :loading="noLazy ? 'eager' : 'lazy'"
        />
    </div>
</template>

<script>
export default {
    name: 'VImage',
};
</script>

<script setup>
import { computed, useCssModule } from 'vue';

// Props
const $props = defineProps({
    src: {
        type: String,
        default: '',
    },

    contain: Boolean,
    noLazy: Boolean,
});

// Styles
const $style = useCssModule();

// Computed
const classList = computed(() => ({
    [$style._contain]: $props.contain,
}));
</script>

<style lang="scss" module>
    .VImage {
        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        &._contain img {
            object-fit: contain;
        }
    }
</style>
