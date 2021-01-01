<template>
    <main class="home">
        <AppShowcase />
        <AppFeatures />
        <AppFrequentRides />
    </main>
</template>

<script>
import AppShowcase from '@/components/landing/AppShowcase';
import AppFeatures from '@/components/landing/AppFeatures';
import AppFrequentRides from '@/components/landing/AppFrequentRides';
export default {
    name: 'Home',
    components: { AppShowcase, AppFeatures, AppFrequentRides },
};
</script>
