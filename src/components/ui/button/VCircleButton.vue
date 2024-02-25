<template>
    <component
        :is="tag"
        :class="[$style.VCircleButton, 'v-circle-button', classList]"
        v-bind="$attrs"
    >
        <slot />
    </component>
</template>

<script>
export default {
    name: 'VCircleButton',
};
</script>

<script setup>
import { useCssModule, computed } from 'vue';

// Props
const $props = defineProps({
    tag: {
        type: String,
        default: 'button',
    },

    color: {
        type: String,
        default: 'primary',
        validator: v => [
            'none',
            'primary',
            'transparent',
        ].includes(v),
    },

    size: {
        type: String,
        default: 'size-32',
        validator: v => [
            'none',
            'size-32',
            'size-36',
            'size-40',
            'size-48',
            'size-56',
        ].includes(v),
    },

    disabled: Boolean,
    active: Boolean,
});

// Styles
const $style = useCssModule();

// Computed
const classList = computed(() => ({
    [$style[`_${$props.color}`]]: $props.color,
    [$style[`_${$props.size}`]]: $props.size,
    [$style._disabled]: $props.disabled,
    [$style._active]: $props.active,
}));
</script>

<style lang="scss" module>
    .VCircleButton {
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100rem;
        border: 1px solid;
        cursor: pointer;
        transition:
            border-color $default-transition,
            color $default-transition,
            background-color $default-transition;

        /* --- Colors --- */
        &._primary {
            border-color: $primary;
            background-color: $primary;
            color: $white;

            &:hover {
                border-color: $primary-hover;
                background-color: $primary-hover;
            }

            &:active {
                border-color: $primary-active;
                background-color: $primary-active;
            }

            &._disabled {
                border-color: $base-300;
                background-color: $base-300;
            }
        }

        &._transparent {
            border-color: $base-300;
            background-color: $white;
            color: $base-600;

            &:hover {
                border-color: $base-400;
            }

            &._active,
            &:active {
                border-color: $base-500;
            }

            &._disabled {
                border-color: $base-300;
                color: $base-400;
            }
        }

        /* --- Sizes --- */
        &._size-32 {
            width: 3.2rem;
            height: 3.2rem;
            font-size: 1.2rem;
        }

        &._size-36 {
            width: 3.6rem;
            height: 3.6rem;
            font-size: 1.2rem;
        }

        &._size-40 {
            width: 4rem;
            height: 4rem;
            font-size: 1.6rem;
        }

        &._size-48 {
            width: 4.8rem;
            height: 4.8rem;
        }

        &._size-56 {
            width: 5.6rem;
            height: 5.6rem;
        }
    }
</style>
