<template>
<div class="card shadow">
    <div class="card-header d-flex flex-row align-items-center justify-content-between">
        <h6 class="m-0 font-weight-bold text-primary" v-if="this.$route.params.idblog">Edit Article</h6>
        <h6 class="m-0 font-weight-bold text-primary" v-else>Add Article</h6>
        <div class="dropdown no-arrow">
            <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                <a class="dropdown-item" v-b-modal.listModalCategory>List Category</a>
                <a class="dropdown-item" v-b-modal.addCategory>Add Category</a>
            </div>
        </div>
    </div>
    <div class="card-body">
        <form @submit.prevent="postArticle">
            <div class="container mb-3">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" v-model.trim="$v.article.titleBlog.$model" class="form-control " :class="{ 'is-invalid': !$v.article.titleBlog.required }">
                    <div class="invalid-feedback" v-if="!$v.article.titleBlog.required">Title is required</div>
                </div>

                <div class="form-group">
                    <label>Category</label>
                    <multiselect v-model.trim="$v.article.valueSelected.$model" :class="{ 'is-invalid': !$v.article.valueSelected.required }" :options="listcategory" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" placeholder="Choose Category" track-by="categoryName" label="categoryName">
                        <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} category selected</span></template>
                    </multiselect>
                    <div class="invalid-feedback" v-if="!$v.article.valueSelected.required">Category is required</div>
                </div>
                <div class="form-group">
                    <label>Article</label>
                    <div class="quill-editor" :content="article.articleBlog" @change="onEditorChange($event)" v-quill:myQuillEditor="editorOption">
                    </div>
                </div>
                <div class="custom-file my-3" v-if="changeImg">
                    <input ref="imageFile" type="file" :class="{ 'is-invalid': !previewImgBlog }" accept="image/png, image/jpeg" @change.prevent="selectImageArticle($event.target.files)" class="custom-file-input" id="customFile">
                    <label class="custom-file-label" for="customFile">{{fileImgBlog}}</label>
                    <div class="invalid-feedback" v-if="!previewImgBlog">Image is required</div>
                </div>
                <div v-if="this.$route.params.idblog" class="form-group center">
                    <button @click.prevent="editChangeImage" class="btn btn-primary">{{textButtonChange}}</button>
                </div>
                <div id="previewAticleImg" class="mb-3">
                    <img v-if="previewImgBlog" class="img-fluid img-thumbnail" :src="previewImgBlog" />
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" :class="{ 'is-invalid': !$v.article.altImgBlog.$model }" v-model.trim="$v.article.altImgBlog.$model" placeholder="alt img">
                    <div class="invalid-feedback" v-if="!$v.article.altImgBlog.$model">alt image is required</div>
                </div>
                <div class="form-group">
                    <textarea placeholder="caption img" :class="{ 'is-invalid': !$v.article.captionImgBlog.$model }" v-model.trim="$v.article.captionImgBlog.$model" class="form-control"></textarea>
                    <div class="invalid-feedback" v-if="!$v.article.captionImgBlog.$model">Caption image is required</div>
                </div>
            </div>
            <button type="submit" class="btn btn-info">Submit</button>
        </form>
    </div>
    <b-modal id="addCategory" ref="addCategory" hide-footer>
        <template v-slot:modal-title>
            Add Category
        </template>
        <form @submit.prevent="postAddCategory">
            <div class="form-group">
                <label>Todo</label>
                <input class="form-control" v-model="categoryAdd">
            </div>
            <button class="btn btn-info float-right">Submit</button>
        </form>
    </b-modal>
    <b-modal id="listModalCategory" ref="listModalCategory" hide-footer>
        <template v-slot:modal-title>
            List Category
        </template>
        <ul class="list-group">
            <li class="list-group-item" v-for="(listCategory, index) in listcategory" :key="index">{{ listCategory.categoryName }}
                <button class="btn btn-outline-danger btn-sm float-right" @click="dellCategory(listCategory.id,listCategory.categoryName,listCategory.countData)">X</button>
                <button class="btn btn-warning btn-sm float-right mr-2" v-b-modal.editModalCategory @click="editCategory(listCategory.id,listCategory.categoryName)">Edit</button>
            </li>
        </ul>
    </b-modal>
    <b-modal id="editModalCategory" ref="editModalCategory" hide-footer>
        <template v-slot:modal-title>
            Edit Category
        </template>
        <p class="alert alert-warning" v-if="categoryEditErr">nothing change</p>
        <div class="form-group">
            <form @submit.prevent="submitEditCategory">
                <label>Category</label>
                <input type="text" v-model="categoryEdit" @change="categoryChangeVal" class="form-control">
                <button class="btn btn-info btn-sm float-right mt-2">Submit</button>
            </form>
        </div>
    </b-modal>
</div>
</template>

<script>
import Vue from 'vue';
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import {
    required,
} from 'vuelidate/lib/validators'
import {
    mapState
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
import Multiselect from 'vue-multiselect'
let toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    [{
        'header': 1
    }, {
        'header': 2
    }], // custom button values
    [{
        'list': 'ordered'
    }, {
        'list': 'bullet'
    }],
    [{
        'script': 'sub'
    }, {
        'script': 'super'
    }], // superscript/subscript
    [{
        'indent': '-1'
    }, {
        'indent': '+1'
    }], // outdent/indent
    [{
        'direction': 'rtl'
    }], // text direction

    [{
        'size': ['small', false, 'large', 'huge']
    }], // custom dropdown
    [{
        'header': [1, 2, 3, 4, 5, 6, false]
    }],

    [{
        'color': []
    }, {
        'background': []
    }], // dropdown with defaults from theme
    [{
        'font': []
    }],
    [{
        'align': []
    }],

    ['clean'], // remove formatting button
    ['link'],
    ['image']
];
export default {
    computed: {
        ...mapState('fire', {
            listcategory: state => state.listcategory,
        }),
        ...mapState('fire', {
            existArticle: state => state.existArticle,
        }),
        ...mapState('fire', {
            successArticle: state => state.successArticle,
        }),
    },
    components: {
        Multiselect
    },
    data() {
        return {
            // select 2
            optionsList: [],
            //
            categoryAdd: null,
            categoryEdit: null,
            categoryEditErr: false,
            categoryOld: null,
            categoryEditKey: null,
            //
            fileImgBlog: '',
            previewImgBlog: '',
            previewEditImgBlog: '',
            article: {
                titleBlog: '',
                articleBlog: '',
                imgBlog: '',
                altImgBlog: '',
                captionImgBlog: '',
                valueSelected: [],
            },
            //edit
            changeImg: true,
            textButtonChange: 'Change Image',
            //textButtonUnchange : 'Use Old Image',
            submitStatus: '',
            content: '',
            editorOption: {
                // some quill options
                modules: {
                    toolbar: {
                        container: toolbarOptions,
                        handlers: {
                            image: this.imageHandler
                        }
                    }
                },
                theme: 'snow'
            }
        }
    },
    validations: {
        article: {
            titleBlog: {
                required
            },
            valueSelected: {
                required
            },
            altImgBlog: {
                required
            },
            captionImgBlog: {
                required
            }
        },
    },
    created() {

    },
    mounted() {
        this.$store.dispatch('fire/getCategory');
        if (this.$route.params.idblog) {
            this.changeImg = false
            this.findEditArticleBlog()
            return
        }
    },
    watch: {
        existArticle() {
            if (this.existArticle == true) {
                console.log(this.existArticle)
                console.log('error inis')
                this.$swal({
                    icon: 'error',
                    title: "Title Has Duplicate Data",
                    text: "Please Change Your Title",
                    showCloseButton: true,
                })
                return
            }
        },
        successArticle() {
            //successArticle
            if (this.successArticle == true) {
                this.$swal({
                    icon: 'success',
                    title: "Article Succcess Posting",
                    text: "Your Article Has Posted",
                    showCloseButton: true,
                })
                return
            }
        }
    },
    methods: {
        async postArticle() {
            if (this.$route.params.idblog) {
                this.editPostArticle()
                //
                return
            }
            //console.log(this.article.articleBlog.length)
            this.$v.$touch()
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
                //return
            } else {
                if (this.article.articleBlog.length == 0) {
                    this.submitStatus = 'ERROR'
                    //return
                } else {
                    this.submitStatus = 'TRUE'
                    //return
                }
                if (!this.article.imgBlog) {
                    this.submitStatus = 'ERROR'
                    //return
                } else {
                    this.submitStatus = 'TRUE'
                    //return
                }
                //this.submitStatus = 'sda'
                //return
            }
            //console.log('data benar')
            if (this.submitStatus == 'ERROR') {
                this.$swal({
                    icon: 'error',
                    title: "Please Check Your Data",
                    text: "Please Check Your Data | Input The Required Data",
                    showCloseButton: true,
                })
                return
            } else {
                //console.log('data benar')
                //return
                await this.$store.dispatch('fire/postArticles', this.article).then(() => {

                })
            }
        },
        onEditorChange({
            editor,
            html,
            text
        }) {
            this.article.articleBlog = html
        },
        async imageHandler() {
            const range = this.myQuillEditor.getSelection();
            const {
                value: urlImg
            } = await this.$swal({
                title: 'Enter your Img url',
                input: 'text',
                showCancelButton: true,
                inputValidator: (urlImg) => {
                    if (!urlImg) {
                        return 'You need to write something!'
                    }
                }
            })
            if (urlImg) {
                this.myQuillEditor.insertEmbed(range.index, 'image', urlImg, this.myQuillEditor.sources);
            }
        },
        selectImageArticle(files) {
            const file = files[0];
            this.previewImgBlog = URL.createObjectURL(file);
            this.fileImgBlog = file.name.substr(0, 28) + '...'
            this.article.imgBlog = files
        },
        postAddCategory() {
            console.log('sini')
            if (this.categoryAdd) {
                this.$store.dispatch('fire/addCategory', this.categoryAdd).then(() => {
                    this.$refs['addCategory'].hide()
                    this.categoryAdd = null
                })
            }
        },
        dellCategory(key, listCategory, countData) {
            //alert(key + " " + listCategory)
            if (countData == 0) {
                this.$store.dispatch('fire/dellCategory', {
                    'id': key,
                    'category': listCategory
                })
                return
            }
            //alert("can't delete this category | Category In Uses")
            this.$swal({
                icon: 'error',
                title: "can't delete this category",
                text: "can't delete this category | Category In Uses",
                showCloseButton: true,
            })
            return

        },
        editCategory(key, listCategory) {
            //console.log(index)
            this.categoryEditKey = key
            this.categoryOld = listCategory,
                this.categoryEdit = listCategory
        },
        submitEditCategory() {
            if (this.categoryEdit && this.categoryEdit != this.categoryOld) {
                //alert('edit '+this.categoryEdit+"--"+this.categoryEditKey);
                const payload = {
                    'editCat': this.categoryEdit,
                    'oldCat': this.categoryOld,
                    'key': this.categoryEditKey
                }
                this.$store.dispatch('fire/editCategory', payload).then(() => {
                    this.$refs['editModalCategory'].hide()
                    this.categoryEditKey = null
                    this.categoryOld = null
                    this.categoryEdit = null
                    this.categoryEditErr = false
                })
            } else {
                return this.categoryEditErr = true
            }
        },
        categoryChangeVal() {
            this.categoryEditErr = false
        },
        async findEditArticleBlog() {
            const payload = this.$route.params.idblog
            //const query = firebase.firestore().collection('blogs')
            this.$store.dispatch('fire/findEditArticleBlog', payload).then((res) => {
                res.forEach(respone => {
                    const catLength = respone.data().category.length
                    //console.log(cat)
                    this.article.titleBlog = respone.data().title
                    this.article.articleBlog = respone.data().articleBlog
                    var i;
                    for (i = 0; i < catLength; i++) {
                        this.article.valueSelected.push({
                            categoryName: respone.data().category[i].categoryName,
                            id: respone.data().category[i].id
                        })
                    }
                })
            }).then(() => {
                firebase.firestore().collection('blogsImages').where('blogsid', '==', this.$route.params.idblog).get().then((rest) => {
                    rest.forEach(imgBlog => {
                        //console.log(imgBlog.data())
                        this.previewImgBlog = imgBlog.data().urlImages
                        this.previewEditImgBlog = imgBlog.data().urlImages
                        this.article.altImgBlog = imgBlog.data().altImages
                        this.article.captionImgBlog = imgBlog.data().captionImages
                    })
                })
            })
        },
        editChangeImage() {
            if (this.changeImg == false) {
                this.textButtonChange = 'Use Old Image'
                this.changeImg = true
                this.previewImgBlog = null
                return
            }
            if (this.changeImg == true) {
                this.textButtonChange = 'Change Image'
                this.changeImg = false
                this.previewImgBlog = this.previewEditImgBlog
                return
            }
            return
        },
        async editPostArticle() {
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
                //return
            } else {
                console.log(this.article.articleBlog.length)
                if (this.article.articleBlog.length == 0) {
                    this.submitStatus = 'ERROR'
                    //return
                } else {
                    this.submitStatus = 'TRUE'
                    //return
                }
                if (this.changeImg == true) {
                    if (!this.article.imgBlog) {
                        this.submitStatus = 'ERROR'
                        //return
                    } else {
                        this.submitStatus = 'TRUE'
                        //return
                    }
                    //return
                }else{
                    this.submitStatus = 'TRUE'
                }
            }
            if (this.submitStatus == 'ERROR') {
                this.$swal({
                    icon: 'error',
                    title: "Please Check Your Data",
                    text: "Please Check Your Data | Input The Required Data",
                    showCloseButton: true,
                })
                return
            } else {
                //editPostArticle
                //this.article
                await this.$store.dispatch('fire/editPostArticle', this.article).then(() => {

                })
                //console.log('sampai proses')
            }
        }
    }
}
</script>

<style>
@import url('https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css');

.ql-editor {
    height: 500px;
}

.invalid-respone {
    width: 100%;
    margin-top: .25rem;
    font-size: 80%;
    color: #dc3545;
}
</style>
