<template>
    <header :class="$style.TheHeader">
        <router-link to="/">
            <div :class="$style.logo">
                Shop
            </div>
        </router-link>

        <nav :class="$style.navigation">
            <VLink
                to="https://www.youtube.com/"
                color="primary"
            >
                Товары
            </VLink>
        </nav>

        <div :class="$style.controls">
            <VCircleButton
                size="size-48"
                color="transparent"
            >
                <VIcon
                    name="cart"
                    size="size-24"
                />
            </VCircleButton>
        </div>
    </header>
</template>

<script>
export default {
    name: 'TheHeader',
};
</script>

<script setup>
// UI
import VIcon from '@/components/ui/icon/VIcon.vue';
import VLink from '@/components/ui/link/VLink.vue';
import VCircleButton from '@/components/ui/button/VCircleButton.vue';
</script>

<style lang="scss" module>
    .TheHeader {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: $header-h;
        padding: 0 4rem;
        background-color: $white;
    }

    .logo {
        padding: 1.2rem 2rem;
        border-radius: .8rem;
        text-transform: uppercase;
        background-color: $base-100;
        transition:
            border-radius $default-transition,
            background-color $default-transition,
            opacity $default-transition,
            color $default-transition;

        @include text(h, 5, montserrat);

        &:hover {
            border-radius: 1.6rem;
            background-color: $primary;
            color: $white;
        }

        &:active {
            border-radius: .8rem;
            opacity: .75;
        }
    }
</style>
