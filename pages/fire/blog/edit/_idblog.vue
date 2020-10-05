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
import formBlog from '@/components/formBlog'
import formUploadImg from '@/components/formUploadImg'
export default {
    layout: 'fire',
    components: {
        'app-formBlog': formBlog,
        'app-formUploadImg': formUploadImg,
    },
}
</script>

<style>

</style>
