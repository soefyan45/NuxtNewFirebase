<template>
<div class="blog-imageless pt-5">
    <div class="row">
        <div class="col-12">
            <div class="post-card -center -banner -inner-text" v-for="(bHead, index) in blogsHead" :key="index">
                <nuxt-link class="card__cover" :to="{path: '/blogs/'+bHead.slugTitle}">
                    <img :src="bHead.imgBlog.imgUrl" width="80%" alt="bHead.imgBlog.imgAlt" />
                </nuxt-link>
                <div class="card__content">
                    <div class="row">
                        <div v-for="(categorie, index) in bHead.category" :key="index">
                            <h5 class="card__content-category ml-2">{{ categorie.categoryName }}</h5>
                        </div>
                    </div>
                    <nuxt-link class="card__content-title" :to="{path: '/blogs/'+bHead.slugTitle}">{{ bHead.title }}</nuxt-link>
                    <div class="card__content-info">
                        <div class="info__time info__author"><i class="far fa-user"></i>
                            <p>Soefyan syah</p>
                        </div>
                        <div class="info__time"><i class="far fa-clock"></i>
                            <p>{{timestampConvert(bHead.timestamp)}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row justify-content-center">
                <div v-for="(blog, index) in blogs" :key="index" class="col-12 col-lg-6">
                    <div class="post-card -image-less">
                        <div class="category-icon"><img src="@/assets/subuh/images/icons/nuxtVblog.png" alt="Technology" /></div>
                        <div class="card__content">
                            <div class="row">
                                <div v-for="(categorie, index) in blog.category" :key="index">
                                    <h5 class="card__content-category ml-2">{{ categorie.categoryName }}</h5>
                                </div>
                            </div>

                            <nuxt-link class="card__content-title" :to="{path: '/blogs/'+blog.slugTitle}">{{blog.title}}</nuxt-link>
                            <div class="card__content-info">
                                <div class="info__time info__author"><i class="far fa-user"></i>
                                    <p>Soefyan syah</p>
                                </div>
                                <div class="info__time"><i class="far fa-clock"></i>
                                    <p>{{timestampConvert(blog.timestamp)}}</p>
                                </div>
                                <!--
                                    <div class="info__comment"><i class="far fa-comment"></i>
                                    <p>3</p>
                                </div>
                                -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="col-12">
            <div class="center"><a class="btn -normal load-more-btn" href="#">Load more posts</a></div>
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
            blogsHead: state => state.blogHead,
        }),
    },
    head() {
        return {
            title: 'Soefyan Syah',
            meta: [{
                hid: 'Personal Blog Soefyan syah, my log error end personal developers',
                name: 'description',
                content: 'My custom description'
            }]
        }
    },
    created() {
        //console.log('this created')
        this.$store.dispatch('blog/getBlog').then(() => {
            //do someting
            //console.log('sad')
        });
        this.$store.dispatch('blog/getHeadBlog').then(() => {
            //do someting
        });
        //console.log(this.blogs.category)
    },
    mounted: function () {
        //console.log(navigator.userAgent)
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
