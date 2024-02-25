<template>
    <component
        :is="tag"
        :class="[$style.VButton, 'v-button', classList]"
        :disabled="disabled"
        v-bind="$attrs"
    >
        <slot name="preicon">
            <VIcon
                v-if="preicon"
                :class="$style.icon"
                :name="preicon"
            />
        </slot>

        <div
            v-if="$slots.default"
            :class="[$style.label, 'v-button-label']"
        >
            <slot></slot>
        </div>

        <slot name="icon">
            <VIcon
                v-if="icon"
                :class="$style.icon"
                :name="icon"
            />
        </slot>

        <transition name="fade">
            <div
                v-if="loading !== null"
                v-show="loading"
                :class="$style.loader"
            >
                <VIcon
                    name="loader"
                    :class="$style.loaderSvg"
                />
            </div>
        </transition>
    </component>
</template>

<script>
export default {
    name: 'VButton',
};
</script>

<script setup>
import { computed, useCssModule } from 'vue';

// Components
import VIcon from '@/components/ui/icon/VIcon.vue';

// Props
const $props = defineProps({
    tag: {
        type: String,
        default: 'button',
    },

    size: {
        type: String,
        default: 'size-36',
        validator: v => [
            'none',
            'size-56',
            'size-48',
            'size-36',
            'size-32',
        ].includes(v),
    },

    color: {
        type: String,
        default: 'primary',
        validator: v => [
            'none',
            'transparent',
            'primary',
        ].includes(v),
    },

    icon: {
        type: String,
        default: '',
    },

    preicon: {
        type: String,
        default: '',
    },

    loading: {
        type: Boolean,
        default: null,
    },

    active: Boolean,
    disabled: Boolean,
});

// Styles
const $style = useCssModule();

// Computed
const classList = computed(() => ({
    [$style[`_${$props.color}`]]: $props.color,
    [$style[`_${$props.size}`]]: $props.size,
    [$style._disabled]: $props.disabled,
    [$style._active]: $props.active,
    [$style._loading]: $props.loading,
}));
</script>

<style lang="scss" module>
    .VButton {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 1.2rem;
        border: 1px solid transparent;
        font-size: 1.4rem;
        font-weight: 500;
        transition: $default-transition;
        cursor: pointer;
        user-select: none;

        .icon,
        .label {
            transition: $default-transition;
        }

        .icon {
            width: 1.6rem;
            height: 1.6rem;
        }

        .label {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
            line-height: unset;
        }

        .loader {
            position: absolute;
            top: 50%;
            left: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: translate(-50%, -50%);
        }

        .loaderSvg {
            width: 1.4rem;
            height: 1.4rem;
            animation: rotate 1.8s linear infinite;
        }

        /* --- Size --- */
        &._size-32 {
            height: 3.2rem;
            padding: 0 1.2rem;
            font-size: 1.2rem;
        }

        &._size-36 {
            height: 3.6rem;
            padding: 0 1.6rem;
        }

        &._size-48 {
            height: 4.8rem;
            padding: 0 2rem;
        }

        &._size-56 {
            height: 5.6rem;
            padding: 0 2.8rem;
            font-size: 1.6rem;
        }

        &._size-48,
        &._size-56 {
            .loaderSvg {
                width: 2rem;
                height: 2rem;
            }
        }

        /* --- Color - Primary --- */
        &._primary {
            border-color: $primary;
            background-color: $primary;

            .icon,
            .label {
                color: $white;
            }

            &:hover {
                border-color: $primary-hover;
                background-color: $primary-hover;

                &:active {
                    border-color: $primary-active;
                    background-color: $primary-active;
                }
            }

            &._disabled {
                border-color: $base-300;
                background-color: $base-300;
            }
        }

        /* --- Color - Transparent --- */
        &._transparent {
            border-color: $base-300;

            .icon {
                color: $primary;
            }

            .label {
                color: $base-600;
            }

            &._disabled {
                border-color: $base-300;

                .icon,
                .label {
                    color: $base-400;
                }
            }

            &:hover {
                border-color: $base-400;

                &:active {
                    border-color: $base-500;
                }
            }
        }

        /* Modificators */
        &._loading {
            .label {
                opacity: 0;
            }
        }

        &._disabled {
            pointer-events: none;
        }
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
</style>
