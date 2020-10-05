import { auth } from '@/services/firebase';
import Cookie from 'js-cookie';
export default function({ store, route, redirect }) {
    const user = store.state.users.user;
    const blockedRoute = /\/fire|todos\/*/g;
    //console.log(user)
    console.log("Assalamualaikum")
    if (!user && route.path.match(blockedRoute)) {
      redirect("/login");
    }
  }