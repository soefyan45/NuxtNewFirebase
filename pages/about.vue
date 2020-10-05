<template>
<div class="pt-5">
    <div class="container">
        <div class="about-us">
            <div class="row align-items-center">
                <div class="col-12 col-sm-8 col-md-6 mx-auto">
                    <div class="about-us__image"><img src="@/assets/subuh/images/pages/about/1.png" alt="About us image" /></div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="about-us__content">
                        <h3>Hello.</h3>
                        <p>
                            soefyan.my.id is my personal blog. I hope can learn more about programming language and network then i can share in my article on my blog
                        </p>
                        <div class="follow">
                            <p>Follow us:</p>
                            <div class="social-block"><a href="#"><i class="fab fa-facebook-f"></i></a><a href="#"><i class="fab fa-twitter"></i></a><a href="#"><i class="fab fa-instagram"></i></a><a href="#"><i class="fab fa-dribbble"></i></a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="subcribe-bar">
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="subcribe-bar__content">
                        <h5>Don’t miss our future updates!</h5>
                        <h3>Get Subscribe today!</h3>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <form class="subcribe-bar__form" action="https://afinda.vn/">
                        <input type="text" placeholder="You email" />
                        <button class="btn -normal">Subcribe </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    layout: 'default',
    head() {
        return {
            title: 'About',
            meta: [{
                hid: 'description',
                name: 'description',
                content: 'My custom description'
            }]
        }
    },
}
</script>

<style>

</style>
