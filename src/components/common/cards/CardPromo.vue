<template>
    <div
        :class="[$style.CardPromo, 'card-promo', classList]"
        :style="currentStyles"
    >
        <slot name="top" />

        <!-- Content -->
        <slot name="content">
            <div :class="[$style.content, 'card-promo-content']">
                <div
                    v-if="title"
                    :class="[$style.title, 'card-promo-title']"
                    v-html="title"
                />

                <div
                    v-if="description"
                    :class="[$style.description, 'card-promo-description']"
                    v-html="description"
                />
            </div>
        </slot>

        <slot />

        <!-- Image -->
        <slot name="image">
            <VImage
                v-if="image"
                :class="[$style.image, 'card-promo-image']"
                :src="image"
            />
        </slot>

        <!-- Bottom -->
        <div
            v-if="withButton || $slots?.bottom"
            :class="[$style.bottom, 'card-promo-bottom']"
        >
            <slot name="bottom">
                <VButton
                    v-if="withButton"
                    size="size-32"
                    :color="buttonColor"
                    :class="[$style.button, 'card-promo-button']"
                >
                    <VIcon
                        name="plus"
                        size="size-16"
                    />
                </VButton>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardPromo',
};
</script>

<script setup>
import { computed, useCssModule } from 'vue';

// UI
import VButton from '@/components/ui/button/VButton.vue';
import VIcon from '@/components/ui/icon/VIcon.vue';
import VImage from '@/components/ui/image/VImage.vue';

// Props
const $props = defineProps({
    title: {
        type: String,
        default: '',
    },

    description: {
        type: String,
        default: '',
    },

    image: {
        type: String,
        default: '',
    },

    withButton: {
        type: Boolean,
        default: true,
    },

    type: {
        type: String,
        default: 'default',
        validator: v => [
            'default',
        ].includes(v),
    },

    backgroundColor: {
        type: String,
        default: '',
    },

    buttonColor: {
        type: String,
        default: 'transparent',
    },

    active: Boolean,
    noInteractive: Boolean,
});

// Styles
const $style = useCssModule();

// Computed
const classList = computed(() => ({
    [$style[`_${$props.type}`]]: $props.type,
    [$style._noInteractive]: $props.noInteractive,
    [$style._active]: $props.active,
}));

const currentStyles = computed(() => ({
    backgroundColor: $props.backgroundColor || null,
}));
</script>

<style lang="scss" module>
    .CardPromo {
        position: relative;
        overflow: hidden;
        padding: 2rem;
        transition:
            opacity $default-transition,
            background-color $default-transition;
        cursor: pointer;

        &:hover:not(:active) {
            opacity: .7;
        }

        /* --- Modificators --- */
        &._active,
        &._noInteractive {
            cursor: default;

            &:hover:not(:active) {
                opacity: 1;
            }
        }

        &._active {
                background-color: $primary;

            .title {
                color: $white;
            }
        }
    }

    .title,
    .description {
        position: relative;
        z-index: 1;
        transition: color $default-transition;
    }

    .title {
        margin-bottom: 1.8rem;
        line-height: 112%;
        color: inherit;

        @include text(h, 5, montserrat);
        @include text-ellipsis(3);
    }

    .description {
        line-height: 124%;
        color: inherit;

        @include text(l, 2);
        @include text-ellipsis(6);
    }

    .image {
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 0;
        max-width: 100%;
        max-height: 100%;
        pointer-events: none;
        user-select: none;
    }

    .bottom {
        position: absolute;
        bottom: 2rem;
        left: 2rem;
        z-index: 1;
    }

    .button {
        width: 4.8rem;
    }
</style>
