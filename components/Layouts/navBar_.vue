<template>
<div>
    <nav class="navbar navbar-expand-lg navbarnuxt-light bg-nuxt">
        <nuxt-link class="navbarnuxt-brand navnuxt-fontbrand textnuxt-white nav-link" to="/">NuxtFire</nuxt-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <nuxt-link class="nav-link textnuxt-white linknuxt-color" to="/">Home <span class="sr-only">(current)</span></nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link textnuxt-white linknuxt-color" v-if="!loggedIn" to="/login">Login</nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link textnuxt-white linknuxt-color" to="/about">About</nuxt-link>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            <div class="btn btn-outline-danger btn-sm my-2 mx-2" v-if="loggedIn" @click.prevent="logout">Sing Out</div>
        </div>
    </nav>
</div>
</template>

<script>
import {
    mapState
} from 'vuex'
export default {
    name: 'navBar',
    computed: {
        ...mapState('users',{
            loggedIn: state => state.loggedIn,
        }),
    },
    methods: {
        logout() {
            this.$store.dispatch('users/logout')
        }
    }
}
</script>
<style>

</style>
