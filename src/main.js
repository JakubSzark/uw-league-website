import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase/app";

Vue.config.productionTip = true;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
    render: (h) => h(App),
}).$mount("#app");
