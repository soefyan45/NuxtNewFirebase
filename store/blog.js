import { auth } from '@/services/firebase';
import * as firebase from 'firebase/app'
import Vue from 'vue'
import 'firebase/firestore'
import 'firebase/auth'
const state = () => (
    {
        blogs: [],
        blogHead: [],
        blogSelect: '',
        blogFooter: [],
        blogByCategory: [],
        blogNext: [],
        blogPrev: [],
        //listcategory: [],
        categories:[],
        catRandom:[],
        sama: 1,
    }
)
const mutations = {
    ASSIGN_BLOGS(state,payload) {
        //state.blogs= [];
        state.blogs.push({
            articleBlog         : payload.articleBlog,
            id                  : payload.id,
            slugTitle           : payload.slugTitle,
            statusBlog          : payload.statusBlog,
            category          : payload.category,
            title               : payload.title,
            timestamp           : payload.timestamp,
            imgBlog : {
                imgUrl      : payload.urlImages,
                imgCaptio   : payload.captionImages,
                imgAlt      : payload.altImages,
            }
        })
    },
    ASSIGN_NEXT(state,payload) {
        //state.blogs= [];
        //state.blogNext.push(payload)
        state.blogNext = payload
    },
    ASSIGN_PREV(state,payload) {
        //state.blogs= [];
        //state.blogPrev.push(payload)
        state.blogPrev = payload
    },
    ASSIGN_BLOGFOOTERS(state,payload) {
        //state.blogs= [];
        state.blogFooter.push({
            articleBlog         : payload.articleBlog,
            id                  : payload.id,
            slugTitle           : payload.slugTitle,
            statusBlog          : payload.statusBlog,
            category          : payload.category,
            title               : payload.title,
            timestamp           : payload.timestamp,
            imgBlog : {
                imgUrl      : payload.urlImages,
                imgCaptio   : payload.captionImages,
                imgAlt      : payload.altImages,
            }
        })
    },
    ASSIGN_BLOGBYCATEGORY(state,payload) {
        state.blogByCategory.push({
            articleBlog         : payload.articleBlog,
            id                  : payload.id,
            slugTitle           : payload.slugTitle,
            statusBlog          : payload.statusBlog,
            category          : payload.category,
            title               : payload.title,
            timestamp           : payload.timestamp,
            imgBlog : {
                imgUrl      : payload.urlImages,
                imgCaptio   : payload.captionImages,
                imgAlt      : payload.altImages,
            }
        })
    },
    ASSIGN_BLOGHEAD(state,payload) {
        //state.blogs= [];
        state.blogHead.push({
            articleBlog         : payload.articleBlog,
            id                  : payload.id,
            slugTitle           : payload.slugTitle,
            statusBlog          : payload.statusBlog,
            category          : payload.category,
            title               : payload.title,
            timestamp           : payload.timestamp,
            imgBlog : {
                imgUrl      : payload.urlImages,
                imgCaptio   : payload.captionImages,
                imgAlt      : payload.altImages,
            }
        })
    },
    ASSIGN_BLOGSELECT(state,payload) {
        state.blogSelect = payload
    },
    ASSIGN_RANDCAT(state,payload) {
        state.catRandom.push(payload)
    },
    ASSIGN_CATEGORIES(state,payload) {
        //state.categories.push({payload})
        state.categories.push({
            'categoryName':payload.categoryName,
            'categorySlug':payload.categorySlug,
            'id':payload.id,
        })
    },
    RESET_BLOGS(state){
        state.blogs = [];
    },
    RESET_BLOGHEAD(state){
        state.blogHead= [];
    },
    RESET_CATEGORIES(state){
        state.categories= [];
    },
    RESET_BLOGFOOTER(state){
        state.blogFooter= [];
    },
    RESET_BLOGCATEGORY(state){
        state.blogByCategory= [];
    },
    RESET_NEXT(state){
        state.blogNext= [];
    },
    RESET_PREV(state){
        state.blogPrev= [];
    },
    
}
const actions = {
    getBlog({commit}){
        commit('RESET_BLOGS');
        //console.log('getBlog')
        const blog = firebase.firestore().collection('blogs').orderBy('timestamp','desc')
        //const blogImg = firebase.firestore().collection('blogsImages')
        blog.get().then((respone) => {
            //console.log(respone),
            respone.forEach(x => {
                //console.log(x.data().category)
                //this.$store.commit('updateTodo', x.data());
                firebase.firestore().collection('blogsImages').where("blogsid","==",x.data().id).get().then((Respone) => {
                    Respone.forEach(z =>{
                        //console.log(z.data());
                        const dataBlog = {
                            'articleBlog':x.data().articleBlog,
                            'id':x.data().id,
                            'slugTitle':x.data().slugTitle,
                            'statusBlog':x.data().statusBlog,
                            'category':x.data().category,
                            'title':x.data().title,
                            'timestamp':x.data().timestamp,
                            'altImages':z.data().altImages,
                            'captionImages':z.data().captionImages,
                            'urlImages':z.data().urlImages,
                        }
                        //console.log(dataBlog);
                        return new Promise((resolve, reject) => {
                            commit('ASSIGN_BLOGS', dataBlog);
                        })
                    })
                })
                
            })
        });
    },
    getHeadBlog({commit}){
        //console.log('getBlog')
        commit('RESET_BLOGHEAD');
        const blog = firebase.firestore().collection('blogs').orderBy('timestamp','desc').limit(1)
        blog.get().then((respone) => {
            //console.log(respone),
            respone.forEach(x => {
                //console.log(x.data().category)
                //this.$store.commit('updateTodo', x.data());
                firebase.firestore().collection('blogsImages').where("blogsid","==",x.data().id).get().then((Respone) => {
                    Respone.forEach(z =>{
                        //console.log(z.data());
                        const dataBlog = {
                            'articleBlog':x.data().articleBlog,
                            'id':x.data().id,
                            'slugTitle':x.data().slugTitle,
                            'statusBlog':x.data().statusBlog,
                            'category':x.data().category,
                            'title':x.data().title,
                            'timestamp':x.data().timestamp,
                            'altImages':z.data().altImages,
                            'captionImages':z.data().captionImages,
                            'urlImages':z.data().urlImages,
                        }
                        //console.log(dataBlog);
                        return new Promise((resolve, reject) => {
                            commit('ASSIGN_BLOGHEAD', dataBlog);
                        })
                    })
                })
            })
        });
    },
    async getSelectBlog({commit,state},payload){
        try{
            const documentSnapshot  = await firebase.firestore().collection('blogs').where('slugTitle','==',payload).get()
            if (documentSnapshot.empty) {
                //error({ statusCode: 404, message: 'Blog not found' })
                console.log('Blog not found')
                return
            }
            //console.log('find blog')
            const selectBlog = firebase.firestore().collection('blogs').where('slugTitle','==',payload)
            //const blogImg = firebase.firestore().collection('blogsImages')
            selectBlog.get().then((respone) => {
                //console.log(respone),
                respone.forEach(x => {
                    //console.log(x.data().category)
                    //this.$store.commit('updateTodo', x.data());
                    firebase.firestore().collection('blogsImages').where("blogsid","==",x.data().id).get().then((Respone) => {
                        Respone.forEach(z =>{
                            //console.log(z.data());
                            const dataBlog = {
                                'articleBlog':x.data().articleBlog,
                                'id':x.data().id,
                                'slugTitle':x.data().slugTitle,
                                'statusBlog':x.data().statusBlog,
                                'category':x.data().category,
                                'title':x.data().title,
                                'timestamp':x.data().timestamp,
                                'altImages':z.data().altImages,
                                'captionImages':z.data().captionImages,
                                'urlImages':z.data().urlImages,
                            }
                            //console.log(dataBlog);
                            return new Promise((resolve, reject) => {
                                commit('ASSIGN_BLOGSELECT', dataBlog);
                            })
                        })
                    }).then(() =>{
                        //console.log(x.data().category)
                        /*const categoryLength = x.data().category.length
                        var i;
                            for (i = 0; i < categoryLength; i++) {
                            //text += cars[i] + "<br>";
                            const cat = {
                                category : x.data().category[i].categoryName
                            }
                            //console.log(cat);
                            commit('ASSIGN_RANDCAT',cat)
                        }*/
                    })
                })
            });
        }catch(e){
            console.error(e)
            //error({ statusCode: 404, message: 'Blog not found' })
        }
    },
    getCategories({commit}){
        //commit('RESET_CATEGORIES');
        const Categories = firebase.firestore().collection('categories').where('categoryStatus','==',true)
        //const blogImg = firebase.firestore().collection('blogsImages')
        Categories.get().then((respone) => {
            //console.log(respone)
            respone.forEach(ca => {
                //console.log(ca.data())
                const category = {
                    'categoryName':ca.data().categoryName,
                    'categorySlug':ca.data().categorySlug,
                    'id':ca.data().id,
                }
                return new Promise((resolve, reject) => {
                    commit('ASSIGN_CATEGORIES', category);
                })
            })
        })
    },
    getBlogFooter({commit}){
        commit('RESET_BLOGFOOTER');
        //console.log('getBlog')
        const blog = firebase.firestore().collection('blogs').limit(3)
        //const blogImg = firebase.firestore().collection('blogsImages')
        blog.get().then((respone) => {
            //console.log(respone),
            respone.forEach(x => {
                //console.log(x.data().category)
                //this.$store.commit('updateTodo', x.data());
                firebase.firestore().collection('blogsImages').where("blogsid","==",x.data().id).get().then((Respone) => {
                    Respone.forEach(z =>{
                        //console.log(z.data());
                        const dataBlog = {
                            'articleBlog':x.data().articleBlog,
                            'id':x.data().id,
                            'slugTitle':x.data().slugTitle,
                            'statusBlog':x.data().statusBlog,
                            'category':x.data().category,
                            'title':x.data().title,
                            'timestamp':x.data().timestamp,
                            'altImages':z.data().altImages,
                            'captionImages':z.data().captionImages,
                            'urlImages':z.data().urlImages,
                        }
                        //console.log(dataBlog);
                        return new Promise((resolve, reject) => {
                            commit('ASSIGN_BLOGFOOTERS', dataBlog);
                        })
                    })
                })
            })
        });
    },
    getBlogCategory({commit},payload){
        commit('RESET_BLOGCATEGORY');
        const Categories = firebase.firestore().collection('categories').where('categorySlug','==',payload)
        
        Categories.get().then((respone) => {
            respone.forEach(blogCat => {
                //this.$nuxt.error({ statusCode: 404, message: err.message })
                //console.log(blogCat.data())
                const blogInCategory = firebase.firestore().collection('categories').doc(blogCat.data().id).collection('blogList')
                blogInCategory.get().then((proses) => {
                    proses.forEach(result =>{
                        //console.log(result.data())
                        const blog = firebase.firestore().collection('blogs').where('slugTitle','==',result.data().slugTitle)
                        //const blogImg = firebase.firestore().collection('blogsImages')
                        blog.get().then((respone) => {
                            //console.log(respone),
                            respone.forEach(x => {
                                //console.log(x.data().category)
                                //this.$store.commit('updateTodo', x.data());
                                firebase.firestore().collection('blogsImages').where("blogsid","==",x.data().id).get().then((Respone) => {
                                Respone.forEach(z =>{
                                    //console.log(z.data());
                                    const dataBlog = {
                                        'articleBlog':x.data().articleBlog,
                                        'id':x.data().id,
                                        'slugTitle':x.data().slugTitle,
                                        'statusBlog':x.data().statusBlog,
                                        'category':x.data().category,
                                        'title':x.data().title,
                                        'timestamp':x.data().timestamp,
                                        'altImages':z.data().altImages,
                                        'captionImages':z.data().captionImages,
                                        'urlImages':z.data().urlImages,
                                    }
                                    //console.log(dataBlog);
                                    return new Promise((resolve, reject) => {
                                        commit('ASSIGN_BLOGBYCATEGORY', dataBlog);
                                        })
                                    })
                                })
                            })
                        });

                    })
                })
            })
        })
    },
    async prevNextArticle({commit,state}){
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
        await Promise.all([promise1, promise2])
        .then((querySnapshots) => {
          const docs = []
          for (const querySnapshot of querySnapshots) {
            if (querySnapshot.empty) {
              //docs.push(null)
              console.log('kosong')
            } else {
              const doc = querySnapshot.docs[0]
              /*firebase.firestore().collection('blogsImages').where("blogsid","==",doc.id).get().then((snaps) => {
                  snaps.forEach(snap => {
                      //console.log(snap.data())
                    const dataBlog = {
                        'articleBlog':doc.get('articleBlog'),
                        'id':doc.id,
                        'slugTitle':doc.get('slugTitle'),
                        'statusBlog':doc.get("statusBlog"),
                        'category':doc.get("category"),
                        'title':doc.get('title'),
                        'timestamp':doc.get('timestamp'),
                        'altImages':snap.data().altImages,
                        'captionImages':snap.data().captionImages,
                        'urlImages':snap.data().urlImages,
                    }
                    //console.log(dataBlog);
                    return new Promise((resolve, reject) => {
                        commit('ASSIGN_PREVNEXT', dataBlog);
                    })
                    //docs.push(dataBlog)
                  })
              })*/
              //console.log(docs[0]);
              //console.log(doc)
              docs.push({
                id: doc.id,
                title: doc.get('title'),
                titleSlug: doc.get('slugTitle')
              })
              console.log(docs[1])
              commit('ASSIGN_NEXT', docs[1]);
              commit('ASSIGN_PREV', docs[0]);
              
              
            }
          }
          //console.log(docs[1])
          //console.log(dataBlog[0])
        })

    }
}
export default{
    namespaced: true,
    state,
    mutations,
    actions
}