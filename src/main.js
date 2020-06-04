import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase/app";

Vue.config.productionTip = true;

const firebaseConfig = {
    apiKey: "AIzaSyB2Icw2w-kxrVVO6olmQ0KBIEA9GdQal9E",
    authDomain: "uw-league-club.firebaseapp.com",
    databaseURL: "https://uw-league-club.firebaseio.com",
    projectId: "uw-league-club",
    storageBucket: "uw-league-club.appspot.com",
    messagingSenderId: "297511910340",
    appId: "1:297511910340:web:fbdf634b7e3e23254a4291",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
    render: (h) => h(App),
}).$mount("#app");
