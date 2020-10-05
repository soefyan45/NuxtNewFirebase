<template>
<div>
  <app-nav/>
  <nuxt/>
</div>
</template>
<script>
import Nav from '@/components/Layouts/navBar.vue'
export default {
    name: 'default',
    components: {
        'app-nav': Nav,
    },
    

}
</script>

<style>

</style>
