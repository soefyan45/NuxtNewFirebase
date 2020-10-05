import JWTDecode from 'jwt-decode';
import cookieparser from 'cookieparser';
const actions = {
    async nuxtServerInit({commit},{req}){
        //console.log('soefyan');
        if(process.server && process.static) return;
        if(!req.headers.cookie)return;
        const parsed = cookieparser.parse(req.headers.cookie)
        const accessTokenCookie = parsed.access_token;
        if(!accessTokenCookie)return;
        const decoded = JWTDecode(accessTokenCookie)
        if(decoded){
            //console.log('Run This')
            commit('users/SET_USER',{
                uid: decoded.user_id,
                email: decoded.email
            })
            commit('users/SET_LOGED',true)
        }
    }
}
export default {
    namespaced: true,
    actions,
}