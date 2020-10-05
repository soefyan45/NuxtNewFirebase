import { auth } from '@/services/firebase';
import Cookie from 'js-cookie';
import 'firebase/auth'
import {
    getUserFromCookie,
    getUserFromSession
} from '@/helpers'
export default function(req, res, next) {
    console.log('im middleware')
    
}