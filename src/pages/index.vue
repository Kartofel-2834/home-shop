<template>
    <div :class="[$style.IndexPage, 'page']">
        <!-- Hero -->
        <IndexHero />

        <!-- Categories -->
        <IndexCategories />
    </div>
</template>

<script>
export default {
    name: 'IndexPage',
};
</script>

<script setup>
// Components
import IndexHero from '@/components/pages/index/IndexHero.vue';
import IndexCategories from '@/components/pages/index/IndexCategories.vue';
</script>

<style lang="scss" module>
    .IndexPage {
        width: 100%;
    }
</style>
