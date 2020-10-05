<template>
<div id="wrapper">
    <app-sidebar />
    <div id="content-wrapper" class="d-flex flex-column">
        <div id="content-fire">
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
    //hrsfrt
    components: {
        'app-header': Header,
        'app-sidebar': Sidebar,
    },
}
</script>
<style>
@import url('assets/vendor/fontawesome-free/css/all.min.css');
@import url('assets/css/sb-admin-2.min.css');
</style>
