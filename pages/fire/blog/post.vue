<template>
<div class="container-sm my-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <!-- component formBlog -->
            <app-formBlog />
        </div>
        <div class="col-md-4">
            <!-- component formUploadImg -->
            <app-formUploadImg />
        </div>
    </div>
</div>
</template>

<script>
import {
    mapState,
} from 'vuex'
import {
    get
} from 'js-cookie'
import {
    auth
} from '@/services/firebase';
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
import formBlog from '@/components/formBlog'
import formUploadImg from '@/components/formUploadImg'
export default {
    layout: 'fire',
    data() {
        return {
            content: '',
        }
    },
    head() {
        return {
            title: 'Add Blog Admin',
            meta: [{
                hid: 'description',
                name: 'description',
                content: 'My custom description'
            }]
        }
    },
    computed: {
        /*categories() {
            return this.$store.state.categoryList;
        },*/
        
        //...mapState('fire', ['categoryList']),
    },
    components:{
        'app-formBlog': formBlog,
        'app-formUploadImg': formUploadImg,
    },
    mounted() {
    },
    
}
</script>

<style>

</style>
