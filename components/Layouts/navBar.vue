<template>
<div>
    <header class="theme-default">
        <div id="search-box">
            <div class="container">
                <form action="" method="POST">
                    <input type="text" placeholder="Searching for article" name="search" />
                    <button><i class="fas fa-arrow-right"></i></button>
                </form>
            </div>
        </div>
        <div class="container">
            <div class="header-wrapper"><nuxt-link class="header__logo" to="/"><img src="@/assets/subuh/images/logo.png" alt="Logo" /></nuxt-link>
                <nav>
                    <ul style="margin-bottom: 0rem;">
                        <li class="nav-item"><nuxt-link to="/">Home</nuxt-link></li>
                        <li class="nav-item"><nuxt-link to="/blog">Blog</nuxt-link></li>
                        <li class="nav-item"><nuxt-link to="/about">About</nuxt-link></li>
                    </ul>
                </nav>
                <div class="header__icon-group">
                    <a href="#" id="search" @click="searchArticle"><i class="fas fa-search"></i></a>
                    <div class="social">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-dribbble"></i></a>
                        <a id="mobile-menu-controller" href="#"><i class="fas fa-bars"></i></a></div>
                </div>
            </div>
        </div>
    </header>
</div>
</template>

<script>
import {
    mapState
} from 'vuex'
export default {
    name: 'navBar',
    data (){
        return{
            findArticle : null
        }
    },
    computed: {
        ...mapState('users',{
            loggedIn: state => state.loggedIn,
        }),
    },
    methods: {
        logout() {
            this.$store.dispatch('users/logout')
        },
        searchArticle(){
            /*if(this.findArticle == null){
                this.findArticle = 1
                return
            }
            if(this.findArticle == 1){
                this.findArticle = null
                return
            }*/
            
        }
    }
}
</script>
<style>

</style>
