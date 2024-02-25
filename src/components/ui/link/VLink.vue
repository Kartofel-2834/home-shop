<template>
    <component
        :is="tag"
        :class="[$style.VLink, 'v-link', classList]"
        v-bind="attributes"
    >
        <slot />
    </component>
</template>

<script>
export default {
    name: 'VLink',
};
</script>

<script setup>
import { computed, useCssModule } from 'vue';

// Props
const $props = defineProps({
    to: {
        type: String,
        default: '/',
    },

    target: {
        type: String,
        default: null,
    },

    type: {
        type: String,
        default: 'default',
        validator: v => [
            'none',
            'default',
        ],
    },

    color: {
        type: String,
        default: 'none',
        validator: v => [
            'none',
            'primary',
        ].includes(v),
    },

    active: Boolean,
    noRouterActive: Boolean,
});

// Styles
const $style = useCssModule();

// Computed
const classList = computed(() => ({
    [$style[`_type-${$props.type}`]]: $props.type,
    [$style[`_${$props.color}`]]: $props.color,
    [$style._active]: $props.active,
    [$style._noRouterActive]: $props.noRouterActive,
}));

const isGlobalLink = computed(() => /^https?:\/\//.test($props.to));

const tag = computed(() => {
    if (!$props.to) {
        return 'div';
    }

    return isGlobalLink.value ? 'a' : 'router-link';
});

const attributes = computed(() => {
    if (!$props.to) {
        return {};
    }

    if (isGlobalLink.value) {
        return {
            href: $props.to,
            target: $props.target || '_target',
        };
    } 

    return {
        to: $props.to,
        target: $props.target || '_self',
    };
});
</script>

<style lang="scss" module>
    .VLink {
        font-weight: 500;
        user-select: none;
        cursor: pointer;

        /* --- Types --- */
        &._type-default {
            position: relative;
            padding: .8rem .4rem;
            font-weight: 600;
            transition: opacity $default-transition;

            &:after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 2px;
                transform: scaleX(0);
                transform-origin: left;
                transition: transform .2s ease;
            }

            &:hover {
                &:after {
                    transform: scaleX(1);
                }
            }

            &:active {
                opacity: .7;
            }
        }

        /* --- Colors --- */
        &._primary {
            &:after {
                background-color: $primary;
            }

            &._active,
            &:not(._noRouterActive):global(.router-link-active) {
                color: $primary;
            }
        }

        /* --- Modificators --- */
        &._active,
        &:not(._noRouterActive):global(.router-link-active) {
            pointer-events: none;

            &:after {
                display: none;
            }
        }
    }
</style>
