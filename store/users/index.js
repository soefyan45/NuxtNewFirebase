import { auth } from '@/services/firebase';
import Cookies from 'js-cookie';
export const state = () => (
    {
        user: null,
        loggedIn: false
    }
)
export const mutations = {
    SET_USER: (state,account) => {
        state.user = account;
    },
    SET_USERnull:(state) => {
        state.user = null;
    },
    SET_LOGED: (state,payload) => {
        state.loggedIn = payload;
    }
}
export const actions = {
    async login({commit},account){
        try{
            // Login The User
            await auth.signInWithEmailAndPassword(account.email,account.password)
            // Get JWT From Firebase
            const token = await auth.currentUser.getIdToken();
            const { email, uid } = auth.currentUser;
            // Set JWT to the cookie
            Cookies.set('access_token',token);
            // Set the user locally
            const loggedIn = true
            commit('SET_USER',{
                email, uid ,
            })
            commit('SET_LOGED',true)
            //console.log(email+uid)
            this.$router.push('/fire/profile');
        }catch(error){
            throw error;
        }
    },
    async logout({commit}){
        Cookies.remove('access_token')
        commit('SET_USERnull')
        commit('SET_LOGED',false)
        //console.log(state.user+" ini")
        console.log('log out success')
        this.$router.push('/');
    }
}