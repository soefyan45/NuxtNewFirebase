import { auth } from '@/services/firebase';
import * as firebase from 'firebase/app'
import Vue from 'vue'
import 'firebase/firestore'
import 'firebase/auth'
import { error } from 'jquery';
const state = () => (
    {
        urlUpload: '',
        listcategory: [],
        existArticle:'',
        successArticle:'',
        articleBlogs: [],
    }
)
const mutations = {
    ASSIGN_CATEGORIES(state,payload) {
        //state.todos= [];
        state.listcategory.push(payload);
        //state.listcategory = [{name:'jaka'}]
    },
    ASSIGN_ARTICLEBLOGS(state,payload) {
        //state.todos= [];
        state.articleBlogs.push(payload);
        //state.listcategory = [{name:'jaka'}]
    },
    ASSIGN_RESETARTICLEBLOGS(state) {
        state.articleBlogs = [];
    },  
    ASSIGN_ERRORPOST(state,payload) {
        //state.todos= [];
        state.existArticle = payload;
        //state.listcategory = [{name:'jaka'}]
    },
    ASSIGN_SUCCESSPOST(state,payload) {
        //state.todos= [];
        state.successArticle = payload;
        //state.listcategory = [{name:'jaka'}]
    },
    EDIT_CATEGORIES(state,payload){
        Vue.set(state.listcategory, state.listcategory.findIndex(f => f.id === payload.index), {id:payload.index,categoryName: payload.category})
    },
    UNSIGN_CATEGORIES(state,payload){
        Vue.delete(state.listcategory, state.listcategory.findIndex(f => f.id === payload))
    },
    ASSIGN_RESETCATEGORIES(state) {
        state.listcategory = [];
    },    
}
const actions = {
    getCategory({commit},state){
        //console.log('jalan kan !!!')
        //return
        //reset dulu datanya
        commit('ASSIGN_RESETCATEGORIES');
        const query = firebase.firestore().collection('categories')
        query.get().then((respone) => {
            respone.forEach(y => {
                query.doc(y.data().id).collection('blogList').get().then(snap => {
                    //console.log({length: snap.size});
                    commit('ASSIGN_CATEGORIES', 
                        {'categoryName':y.data().categoryName,'id':y.data().id,'countData':snap.size}
                    );
                });
            })
        })
            
    },
    addCategory({commit,state},payload){
        const slugCategory = payload.toLowerCase().replace(/[^\w\s]/gi, '').replace(/ /g,'-').replace(/_/g,'-');
        firebase.firestore().collection('categories').add({}).then((res) => {
            firebase.firestore().collection('categories').doc(res.id).set({
                categoryName            : payload,
                categorySlug            : slugCategory,
                categoryStatus          : true,
                id                      : res.id
            }).then(() => {
                //console.log(addCat);
                commit('ASSIGN_CATEGORIES', {'categoryName':payload,'id':res.id});
            })
        });
    },
    editCategory({commit},payload){
        console.log(payload);
        const slugCategory = payload.editCat.toLowerCase().replace(/[^\w\s]/gi, '').replace(/ /g,'-').replace(/_/g,'-');
        firebase.firestore().collection('categories').doc(payload.key).update({
            categoryName            : payload.editCat,
            categorySlug            : slugCategory,
        }).then(() => {
            const categoryEdit = {'category':payload.editCat,'index':payload.key}
            //console.log(categoryEdit);
            commit('EDIT_CATEGORIES', categoryEdit);
        })
    },
    dellCategory({commit},payload){
        firebase.firestore().collection('categories').doc(payload.id).delete().then(() => {
            commit('UNSIGN_CATEGORIES', payload.id);
        })
    },
    //poting blog
    postArticles({commit,state},payload){
        console.log(payload.valueSelected)
        //return
        commit('ASSIGN_ERRORPOST', false);
        commit('ASSIGN_SUCCESSPOST', '');
        const uid = this.state.users.user.uid;
        const file = payload.imgBlog[0];
        const slug = payload.titleBlog.toLowerCase().replace(/[^\w\s]/gi, '').replace(/ /g,'-').replace(/_/g,'-');
        console.log(slug)
        console.log('Add Blogs')
        const timestamp = Date.now();
        const checkSlug = firebase.firestore().collection('blogs').where('slugTitle','==',slug)
        checkSlug.get()
            .then(snapshot => {
                if (!snapshot.empty) {
                    commit('ASSIGN_ERRORPOST', true);
                    return 
                }
                else{
                    //disini
                    try{
                        const metadata = {
                            contentType: file.type
                        }
                        const storage = firebase.storage()
                        const imageRef = storage.ref('blogs/' + slug + '-' + timestamp + '-' + uid + '.png')
                        const uploadTask = imageRef.put(file, metadata).then((snapshot) => {
                            // Once the image is uploaded, obtain the download URL, which
                            // is the publicly accessible URL of the image.
                            return snapshot.ref.getDownloadURL().then((url) => {
                                return url
                                //return this.urlImgUploaded = url;
                            })
                        })
                        uploadTask.then((url) => {
                            //const ulrImg = url;
                            //console.log(url)
                            this.state.urlUpload = url
                        }).then(() => {
                            firebase.firestore().collection('blogs').add({}).then((res) => {
                                firebase.firestore().collection('blogs').doc(res.id).set({
                                    articleBlog         : payload.articleBlog,
                                    slugTitle           : slug,
                                    statusBlog          : true,
                                    title               : payload.titleBlog,
                                    uid                 : uid,
                                    id                  : res.id,
                                    timestamp           : timestamp,
                                    category            : payload.valueSelected,
                                }).then(()=>{
                                    //commit('ASSIGN_TODOS', {'todo':dataTodo.todo,'id':res.id,'uid':dataTodo.uid,'timestamp':dataTodo.timestamp});
                                    firebase.firestore().collection('blogsImages').doc(res.id).set({
                                        altImages        : payload.altImgBlog,
                                        blogsid          : res.id,
                                        captionImages    : payload.captionImgBlog,
                                        uid              : uid,
                                        urlImages        : this.state.urlUpload,
                                    })
                                }).then(() => {
                                    payload.valueSelected.forEach(cat => {
                                        firebase.firestore().collection('categories').doc(cat.id).collection('blogList').doc(res.id).set({
                                            slugTitle : slug
                                        })
                                    })
                                })
                            })
                            console.log('Transaction success');
                            commit('ASSIGN_SUCCESSPOST', true);
                        })
                    }catch(e){
                        console.log(e)
                    }
                    return;
                }
                //console.log('ada data')
                //state.errorPostArticle = true;
            })
            .catch(err => {
                console.log('Error getting documents', err);
        });
    },
    //GET ARTICLE
    getArticles({commit,state},payload){
        //RESET FIRST DATA
        const countArticle = 0; 
        commit('ASSIGN_RESETARTICLEBLOGS');
        //REQUEST DATA TO FIREBASE
        const query = firebase.firestore().collection('blogs')
        query.get().then(snap => {
            //console.log(snap.size)
            this.countArticle = snap.size/payload
            console.log(this.countArticle)
        })
        query.get().then((respone) => {
            respone.forEach(y => {
                commit('ASSIGN_ARTICLEBLOGS',y.data());
            })
        })
    },
    findEditArticleBlog({commit,state,store},payload){
        const query = firebase.firestore().collection('blogs')
        return query.where('id','==',payload).get()
    },
    editPostArticle({commit},payload){
        console.log(payload)
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations,
}