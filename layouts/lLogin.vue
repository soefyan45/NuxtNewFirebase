<template>
  <div id="app">
    <Nuxt />
  </div>
</template>
<script>
import BootstrapVue from 'bootstrap-vue';
import Nav from '@/components/Layouts/fire/fireNavBar'
export default {
components: {
        'app-nav': Nav,
    },
}
</script>

<style>
</style>