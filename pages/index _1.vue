<template>
<div class="container-sm my-5">
    <section id="gallery">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mb-4" v-for="(blog, index) in blogs" :key="index">
                    <div class="card">
                        <img :src="blog.imgBlog.imgUrl" alt="" class="card-img-top img-fluid img-thumbnail">
                        <div class="card-body">
                            <h5 class="card-title">{{blog.title}}</h5>
                            <p class="card-text" v-html="blog.articleBlog"></p>
                            <nuxt-link :to="{path: '/blogs/'+blog.slugTitle}" class="btn btn-outline-success btn-sm">Read More</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
</template>
<script>
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    data() {
        return {
            articles: '',
        }
    },
    computed: {
        /*todos() {
            return this.$store.state.todos;
        },*/
        ...mapState('blog', {
            blogs: state => state.blogs,
        }),
    },
    head() {
        return {
            title: 'Soefyan Syah',
            meta: [{
                hid: 'description',
                name: 'description',
                content: 'My custom description'
            }]
        }
    },
    created() {
        //console.log('this created')
        this.$store.dispatch('blog/getBlog').then(() => {
            //do someting
        })
    },
}
</script>

<style>

</style>
