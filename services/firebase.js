import firebase from "firebase/app";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyD7ONLSsxqGN4f_d6Xk8ypFRT39zrS5pEM",
    authDomain: "nuxtauth-kia.firebaseapp.com",
    databaseURL: "https://nuxtauth-kia.firebaseio.com",
    projectId: "nuxtauth-kia",
    storageBucket: "nuxtauth-kia.appspot.com",
    messagingSenderId: "557710359098",
    appId: "1:557710359098:web:ffcdf4cce3c8c28a6ad303",
    measurementId: "G-WHFS76VPYH"
}

!firebase.apps.length ? firebase.initializeApp(config) : '';
export const auth = firebase.auth();