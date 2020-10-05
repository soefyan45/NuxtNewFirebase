<template>
<div class="">
    <div class="col-lg-6 mx-auto my-5">
        <div class="card">
            <div class="card-header">
                <h3>Login</h3>
            </div>
            <div class="card-body">
                <form @submit.prevent="login">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="email" class="form-control rounded" placeholder="Email" v-model="account.email">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" name="password" class="form-control" placeholder="password" v-model="account.password">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-info">Submit</button>
                        <nuxt-link to="/">Home</nuxt-link>
                    </div>
                    <div v-if="isError" class="alert alert-danger">
                        <p>{{ errMsg}}</p>
                    </div>
                </form>
                
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    layout: 'default',
    data: () => ({
        account: {
            email: "",
            password: ""
        },
        isError: false,
        errMsg: ''
    }),
    methods: {
        login(e) {
            e.preventDefault();
            //alert(this.account.email)
            this.$store.dispatch('users/login', this.account).catch(error => {
                this.isError = true;
                this.errMsg = error.code;
                setTimeout(() => {
                    this.isError = false
                }, 50000);
            })
            //this.$router.push('/admin/profile');
        }
    }

}
</script>

<style>

</style>
