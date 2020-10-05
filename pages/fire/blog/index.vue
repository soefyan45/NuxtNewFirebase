<template>
<div class="container-sm my-5">
    <div class="row justify-content-center">
        <div class="col-12">
            <div class="card shadow">
                <div class="card-header d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">List Article</h6>

                    <div class="card-header-form">
                        <form>
                            <div class="input-group">
                                <input type="text" class="form-control bg-light border-0 small shadow" placeholder="Search">
                                <div class="input-group-btn">
                                    <button class="btn btn-primary"><i class="fas fa-search"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <tbody>
                                <tr>
                                    <th>No.</th>
                                    <th>Title</th>
                                    <th>Timestamp</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                <tr v-for="(articles, index) in articleBlogs" :key="index">
                                    <td class="text-center text-justify">
                                        {{ index }}
                                    </td>
                                    <td>{{ articles.title }}</td>
                                    <td>{{timestampConvert(articles.timestamp)}}</td>
                                    <td>
                                        <div v-if="articles.statusBlog" class="btn btn-success btn-sm">Publish</div>
                                        <div v-else class="btn btn-danger btn-sm">unPublish</div>
                                    </td>
                                    <td><nuxt-link class="btn btn-primary btn-sm" :to="{path: '/fire/blog/edit/'+articles.id}">Action</nuxt-link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card-footer text-right">
                    <nav class="d-inline-block">
                        <ul class="pagination mb-0">
                            <li class="page-item disabled">
                                <a class="page-link" href="#" tabindex="-1"><i class="fas fa-chevron-left"></i></a>
                            </li>
                            <li class="page-item active"><a class="page-link" href="#">1 <span class="sr-only">(current)</span></a></li>
                            <li class="page-item">
                                <a class="page-link" href="#">2</a>
                            </li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import {
    mapState
} from 'vuex'
import {
    auth,admin
} from '@/services/firebase';
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
export default {
    layout: 'fire',
    data() {
        return {

        }
    },
    computed: {
        ...mapState('fire', {
            articleBlogs: state => state.articleBlogs,
        }),
    },
    mounted() {
        this.$store.dispatch('fire/getArticles',10)
    },
    methods: {
        timestampConvert(unix_timestamp) {
            let timestampToDate = new Date(unix_timestamp).toLocaleDateString("en-US")
            return timestampToDate
        },
        editArticle(idBlog){
            console.log(idBlog)
        }
    }
}
</script>

<style>

</style>
