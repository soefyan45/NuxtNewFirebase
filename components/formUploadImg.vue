<template>
<div class="card shadow">
    <div class="card-header d-flex flex-row align-items-center justify-content-between">
        <h6 class="m-0 font-weight-bold text-primary">Upload image</h6>
    </div>
    <div class="card-body">
        <form @submit.prevent="doUploadImg">
            <div class="form-group">
                <input type="text" class="form-control" v-model="renameFile" placeholder="Name File">
            </div>
            <div class="custom-file">
                <input ref="imageFile" type="file" accept="image/png, image/jpeg" @change.prevent="selectImageFile($event.target.files)" class="custom-file-input" id="customFile">
                <label class="custom-file-label" for="customFile">{{fileImage}}</label>
            </div>
            <div id="preview" class="my-2">
                <img v-if="previewFile" class="img-fluid img-thumbnail" :src="previewFile" />
            </div>
            <button type="submit" class="btn btn-info btn-sm my-2 float-right">Upload</button>
        </form>

        <div id="urlSuccessUpload">
            <div class="form-group" v-if="urlSuccessUpload">
                <div class="input-group">
                    <div class="input-group-prepend linknuxt-color">
                        <div class="input-group-text" @click="copyUrlImg" style="background-color:#17a2b8">
                            Click to Copy
                        </div>
                    </div>
                    <input v-model="urlSuccessUpload" class="form-control" id="urlImgUpload" readonly>
                </div>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import {
    get
} from 'js-cookie'
import {
    auth
} from '@/services/firebase';
import * as firebase from 'firebase/app'
import Vue from 'vue'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
export default {
    data() {
        return {
            fileImage: 'choose file image',
            renameFile: '',
            previewFile: '',
            sourceFile: '',
            urlSuccessUpload: '',
        }
    },
    methods: {
        //...mapActions('fire/index', ['postArticles']),
        selectImageFile(files) {
            const file = files[0];
            this.previewFile = URL.createObjectURL(file);
            this.fileImage = file.name.substr(0, 28) + '...'
            this.sourceFile = files
        },
        doUploadImg() {
            if (this.renameFile == '') {
                return console.log('please set file name image')
            }
            if (!this.sourceFile.length) {
                return console.log('please choose the file image')
            }
            const file = this.sourceFile[0]
            const uid = this.$store.state.users.user.uid
            console.log(file.name)
            if (!file.type.match('image.*')) {
                alert('Please upload an image.')
                return
            }
            const metadata = {
                contentType: file.type
            }
            const storage = firebase.storage()
            const imageRef = storage.ref('blogs/' + this.renameFile + '-' + Date.now() + '-' + uid + '.png')
            const uploadTask = imageRef.put(file, metadata).then((snapshot) => {
                // Once the image is uploaded, obtain the download URL, which
                // is the publicly accessible URL of the image.
                return snapshot.ref.getDownloadURL().then((url) => {
                    return url
                })
            }).catch((error) => {
                console.error('Error uploading image', error)
            })
            // When the upload ends, set the value of the blog image URL
            // and signal that uploading is done.
            uploadTask.then((url) => {
                this.fileImage = 'choose file image',
                    this.renameFile = '',
                    this.previewFile = '',
                    this.sourceFile = '',
                    console.log(url)
                this.urlSuccessUpload = url
            })
        },
        copyUrlImg() {
            var copyText = document.getElementById("urlImgUpload");
            /* Select the text field */
            copyText.select();
            copyText.setSelectionRange(0, 99999); /*For mobile devices*/
            /* Copy the text inside the text field */
            document.execCommand("copy");
        }
    }
}
</script>

<style>

</style>
