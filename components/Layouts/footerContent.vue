<template>
<div class="footer-content">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-4">
            <div class="footer-col -about">
                <div class="center-line-title">
                    <h5>About us</h5>
                </div>
                <p>
                    Husband, son, father & ordinary people. 😊❤️ PHP,JavaScript and Mikrotik. Proud to be Islam
                </p>
                <div class="contact-method">
                    <p> <i class="fas fa-map-marker-alt"></i>5 South Main Street Los Angeles, ZZ-96110 USA</p>
                    <p> <i class="far fa-mobile-android"></i>125-711-811 | 125-668-886</p>
                    <p> <i class="fas fa-headphones-alt"></i>Support.hosting@gmail.com</p>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
            <div class="footer-col -feature-post">
                <div class="center-line-title">
                    <h5>Feature posts</h5>
                </div>
                <div class="feature-post-block">
                    <div v-for="(footerBlog, index) in blogFooter" :key="index" class="post-card -tiny">
                        <nuxt-link class="card__cover" :to="{path: '/blogs/'+footerBlog.slugTitle}">
                            <img :src="footerBlog.imgBlog.imgUrl" alt="Looking for some feedback for this rejected track" />
                        </nuxt-link>
                        <div class="card__content">
                            <nuxt-link class="card__content-title" :to="{path: '/blogs/'+footerBlog.slugTitle}">{{ footerBlog.title }}</nuxt-link>
                            <div class="card__content-info">
                                <div class="info__time"><i class="far fa-clock"></i>
                                    <p>{{timestampConvert(footerBlog.timestamp)}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-12 col-lg-4">
            <div class="footer-col -util">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-12">
                        <div class="center-line-title">
                            <h5>Tag clouds</h5>
                        </div>
                        <div class="tags-group">
                            <nuxt-link class="tag-btn" v-for="(category, index) in categories" :key="index" :to="{path: '/categories/'+category.categorySlug}">{{ category.categoryName }}</nuxt-link>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-12">
                        <div class="center-line-title">
                            <h5>Follow us</h5>
                        </div>
                        <div class="social-block"><a href="#"><i class="fab fa-facebook-f"></i></a><a href="#"><i class="fab fa-twitter"></i></a><a href="#"><i class="fab fa-instagram"></i></a><a href="#"><i class="fab fa-dribbble"></i></a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    data(){
        return{

        }
    },
    computed: {
        /*todos() {
            return this.$store.state.todos;
        },*/
        ...mapState('blog', {
            categories: state => state.categories,
            blogFooter: state => state.blogFooter,
        }),
    },
    created() {
        //console.log('this created')
        this.$store.dispatch('blog/getCategories').then(() => {
            //do someting
        });
        this.$store.dispatch('blog/getBlogFooter').then(() => {
            //do someting
        });
        //console.log(this.categories)
    },
    methods: {
        timestampConvert(unix_timestamp) {
            let timestampToDate = new Date(unix_timestamp).toLocaleDateString("en-US")
            return timestampToDate
        },
    }
}
</script>

<style>

</style>
