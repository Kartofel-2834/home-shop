<template>
    <div :class="$style.App">
        <TheHeader />

        <main>
            <RouterView />
        </main>
    </div>
</template>

<script>
export default {
    name: 'App',
};
</script>

<script setup>
// Components
import TheHeader from '@/components/layout/TheHeader.vue';
</script>

<style lang="scss" module>
    .App {
        //
    }
</style>
