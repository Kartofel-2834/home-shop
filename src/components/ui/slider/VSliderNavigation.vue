<template>
    <div :class="$style.VSliderNavigation">
        <button
            ref="next"
            :class="[$style.arrow, $style._prev]"
        >
            <VIcon
                name="triangle"
                size="size-16"
            />
        </button>

        <button
            ref="prev"
            :class="$style.arrow"
        >
            <VIcon
                name="triangle"
                size="size-16"
            />
        </button>
    </div>
</template>

<script>
export default {
    name: 'VSliderNavigation',
};
</script>

<script setup>
// Components
import VIcon from '@/components/ui/icon/VIcon.vue';
</script>

<style lang="scss" module>
    .VSliderNavigation {
        display: flex;
        align-items: center;
    }

    .arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 4.8rem;
        height: 4.8rem;
        border-radius: 100rem;
        margin-left: .8rem;
        background-color: $white;
        opacity: .85;
        transition:
            opacity $default-transition,
            background-color $default-transition,
            color $default-transition;
        cursor: pointer;

        &:hover {
            opacity: 1;
        
            &:active {
                background-color: $primary;
                color: $white;
            }
        }

        &._prev {
            margin: 0;
            transform: rotate(180deg);
        }
    }
</style>
