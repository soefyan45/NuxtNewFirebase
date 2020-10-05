<template>
<div class="post">
    <div class="container">
        <div class="post-standard">
            <div class="post-standard__banner">
                <div class="post-standard__banner__image"><img :src="blogSelect.urlImages" alt="Post banner image" /></div>
                <div class="post-standard__banner__content">
                    <div class="post-card -center">
                        <div></div>
                        <div class="card__content">
                            <div class="row" style="justify-content: center;">
                                <div v-for="(categorie, index) in blogSelect.category" :key="index">
                                    <h5 class="card__content-category ml-2">{{ categorie.categoryName }}</h5>
                                </div>
                            </div>
                            <a class="card__content-title" href="post_standard.html">{{blogSelect.title}}</a>
                            <div class="card__content-info">
                                <div class="info__time"><i class="far fa-clock"></i>
                                    <p>Clock Wed {{timestampConvert(blogSelect.timestamp)}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="post-standard__content">
                        <div id="post-share">
                            <h5>Share:</h5>
                            <div class="social-media"><a href="#" style="background-color: #075ec8"><i class="fab fa-facebook-f"></i></a><a href="#" style="background-color: #40c4ff"><i class="fab fa-twitter"></i></a><a href="#" style="background-image: linear-gradient(to top, #f2a937, #d92e73, #9937b7, #4a66d3), linear-gradient(to top, #af00e1, #ff9e35)"><i class="fab fa-instagram"></i></a><a href="#" style="background-color: #ff0000"><i class="fab fa-youtube"></i></a></div>
                        </div>
                        <div v-html="blogSelect.articleBlog"></div>
                        <div class="post-footer">
                            <div class="row post-footer__tags center" style="justify-content: center;">
                                <div class="tags-group" v-for="(categorie, index) in blogSelect.category" :key="index">
                                    <nuxt-link class="tag-btn mr-2" :to="{path: '/categories/'+makeSlug(categorie.categoryName)}">{{ categorie.categoryName }}</nuxt-link>
                                </div>
                            </div>
                            <div class="post-footer__author">
                                <div class="author__avatar"><img src="@/assets/subuh/images/post_detail/author.png" alt="Author avatar" /></div>
                                <div class="author__info">
                                    <h5>Soefyan syah</h5>
                                    <p>Hey there! I hope you find this post useful. If you have anything to say about this post, questions or feedback, send me a tweet or an email.</p>
                                    <div class="social-media"><a href="#"><i class="fab fa-facebook-f"></i></a><a href="#"><i class="fab fa-twitter"></i></a><a href="#"><i class="fab fa-instagram"></i></a><a href="#"><i class="fab fa-dribbble"></i></a></div>
                                </div>
                            </div>
                            <!--
                                <div class="post-footer__related">
                                <div class="post-footer__related__item -prev">
                                    <nuxt-link to="/"> <i class="fas fa-chevron-left"></i>Previous posts</nuxt-link>
                                    <div class="post-footer__related__item__content"><img src="@/assets/subuh/images/posts/2.png" alt="Relate news image" />
                                        <div class="post-card ">
                                            <div></div>
                                            <div class="card__content">
                                                <h5 class="card__content-category">Typography</h5>
                                                <a class="card__content-title" href="post_standard.html">How to name, save and export a finish template</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="post-footer__related__item -next">
                                    <nuxt-link to="/">Next posts<i class="fas fa-chevron-right"></i></nuxt-link>
                                    <div class="post-footer__related__item__content">
                                        <div class="post-card -right">
                                            <div></div>
                                            <div class="card__content">
                                                <h5 class="card__content-category">Graphic</h5>
                                                <a class="card__content-title" href="post_standard.html">I want to create a logo with illustrator hacker</a>
                                            </div>
                                        </div><img src="@/assets/subuh/images/posts/3.png" alt="Relate news image" />
                                    </div>
                                </div>
                            </div>
                            -->
                            
                            <div class="post-footer__comment">
                                <h3 class="comment-title"> <span>Leave a comment</span></h3>
                                <div class="post-footer__comment__form">
                                    <form action="">
                                        <div class="row">
                                            <div class="col-12 col-sm-4">
                                                <input type="text" placeholder="Name" name="name" />
                                            </div>
                                            <div class="col-12 col-sm-4">
                                                <input type="email" placeholder="Email" name="email" />
                                            </div>
                                            <div class="col-12 col-sm-4">
                                                <input type="text" placeholder="Webiste" name="website" />
                                            </div>
                                        </div>
                                        <textarea cols="30" rows="5" placeholder="Messages" name="message"></textarea>
                                    </form>
                                    <div class="center">
                                        <button class="btn -normal">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
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
import {
    auth
} from '@/services/firebase';
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
export default {
    data() {
        return {
            category: [],
        }
    },
    computed: {
        /*todos() {
            return this.$store.state.todos;
        },*/
        ...mapState('blog', {
            blogSelect: state => state.blogSelect,
            blogNext: state => state.blogNext,
            blogPrev: state => state.blogPrev,
        }),
    },
    head() {
        return {
            title: this.blogSelect.title,
            meta: [{
                hid: 'description',
                name: 'description',
                content: 'My custom description'
            }]
        }
    },
    async asyncData({
        app,
        params,
        error
    }) {
        
    },
    async created() {
        //console.log(this.$route.params.slugTitle)
        //prevNextArticle
        this.$store.dispatch('blog/getSelectBlog', this.$route.params.slugTitle).then(() => {
            //do someting
            //this.$store.dispatch('blog/prevNextArticle')
        });
        console.log(this.blogNext)
        //console.log(blogSelect)
        /*const payload = this.$route.params.slugTitle
        try {
            const documentSnapshot = await firebase.firestore().collection('blogs').where('slugTitle', '==', payload).get()
            if (documentSnapshot.empty) {
                //error({ statusCode: 404, message: 'Blog not found' })
                console.log('Blog not found')
                return
            }
            //console.log('find blog')
            const selectBlog = firebase.firestore().collection('blogs').where('slugTitle', '==', payload)
            //const blogImg = firebase.firestore().collection('blogsImages')
            selectBlog.get().then((respone) => {
                //console.log(respone),
                respone.forEach(x => {
                    //console.log(x.data().category)
                    //this.$store.commit('updateTodo', x.data());
                    firebase.firestore().collection('blogsImages').where("blogsid", "==", x.data().id).get().then((Respone) => {
                        Respone.forEach(z => {
                            //console.log(z.data());
                            const dataBlog = {
                                'articleBlog': x.data().articleBlog,
                                'id': x.data().id,
                                'slugTitle': x.data().slugTitle,
                                'statusBlog': x.data().statusBlog,
                                'category': x.data().category,
                                'title': x.data().title,
                                'timestamp': x.data().timestamp,
                                'altImages': z.data().altImages,
                                'captionImages': z.data().captionImages,
                                'urlImages': z.data().urlImages,
                            }
                            //console.log(dataBlog);
                            return new Promise((resolve, reject) => {
                                //commit('ASSIGN_BLOGSELECT', dataBlog);
                            })
                        })
                    })
                })
            });
            const db = firebase.firestore()
            const promise1 = db
                .collection('blogs')
                .where('statusBlog', '==', true)
                .orderBy('timestamp', 'desc')
                .limit(1)
                .get()
            const promise2 = db
                .collection('blogs')
                .where('statusBlog', '==', true)
                .orderBy('timestamp', 'asc')
                .limit(1)
                .get()
            const prevNext = await Promise.all([promise1, promise2])
                .then((querySnapshots) => {
                    //const docs = []
                    for (const querySnapshot of querySnapshots) {
                        if (querySnapshot.empty) {
                            docs.push(null)
                        } else {
                            const doc = querySnapshot.docs[0]
                            console.log(doc)
                            this.docs.push({
                                //id: doc.id,
                                slugTitle: doc.get('slugTitle'),
                                title: doc.get('title')
                            })
                        }
                    }
                    //return docs
                })
            return {
                prev: prevNext[0],
                next: prevNext[1]
            }
        } catch (e) {
            //console.error(e)
            //error({ statusCode: 404, message: 'Blog not found' })
        }*/
    },
    methods: {
        timestampConvert(unix_timestamp) {
            let timestampToDate = new Date(unix_timestamp).toLocaleDateString("en-US")
            return timestampToDate
        },
        makeSlug(text) {
            const convSlug = text.toLowerCase().replace(/[^\w\s]/gi, '').replace(/ /g, '-').replace(/_/g, '-');
            return convSlug
        },
    }

}
</script>

<style>

</style>
