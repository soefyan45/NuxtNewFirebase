<template>
<div id="wrapper">
    <app-sidebar />
    <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
            <app-header />
            <Nuxt />
        </div>
    </div>
</div>
</template>
<script>
import BootstrapVue from 'bootstrap-vue';
import Header from '@/components/Layouts/fire/fireHeader'
import Sidebar from '@/components/Layouts/fire/fireSideBar'
export default {
    components: {
        'app-header': Header,
        'app-sidebar': Sidebar,
    },
}
</script>

<style>

</style>
