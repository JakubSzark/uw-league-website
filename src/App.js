import NavBar from "./components/NavBar.vue";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm.vue";
import Home from "./pages/Home";
import Cookies from 'js-cookie';

import firebase from "firebase/app";
import "firebase/firestore";
import Events from "./pages/Events";
import Highlights from "./pages/Highlights";
import Gallery from "./pages/Gallery";
import Notice from "./components/Notice";
import Social from "./components/Social";

export default {
    name: "App",
    data: function () {
        return {
            currentPage: 0,
            loginFormRequested: false,
            isLogged: false,
            isAdmin: false,
            loginError: "",
            notice: "NOTICE:"
        };
    },
    mounted: async function () {
        const users = firebase.firestore().collection("users");
        const user = Cookies.get('user');

        // Auto login user is signed in previously
        if (user !== undefined) {
            await users.doc(user).get().then(snap => {
                if (snap.exists) {
                    this.isLogged = true;
                    this.isAdmin = snap.data().admin;
                }
            }).catch(err => {
                console.log(err);
            });
        }

        const other = firebase.firestore().collection("other");
        other.doc('notice').get().then(snap => {
            if (snap.exists) {
                console.log('Notice Updated');
                this.notice = snap.data().text;
            }
        }).catch(err => {
            console.log(err);
        });
    },
    components: {
        Social,
        Notice,
        Gallery,
        Highlights,
        Events,
        Notification,
        NavBar,
        LoginForm,
        Home
    },
    methods: {
        /**
         * Called when a page link is pressed in the nav bar
         * @param index the index of the page
         */
        onPageChange: function (index) {
            this.currentPage = index;
        },

        /**
         * Called when nav login button is pressed
         */
        onLoginPressed: function () {
            if (!this.isLogged) {
                this.loginFormRequested = true;
            } else {
                this.isLogged = false;
                this.isAdmin = false;
                this.showNotification("You have logged out!");
                Cookies.remove('user');
            }
        },

        /**
         * Called when login is pressed in the login screen
         * @param fieldData Email and Password field data
         */
        onLoginRequest: function (fieldData) {
            const {email, password} = fieldData;
            const users = firebase.firestore().collection("users");
            const query = users
                .where("email", "==", email)
                .where("password", "==", password);

            query
                .get()
                .then((snap) => {
                    if (snap.empty) {
                        this.loginError =
                            "No user with email and password combination!";
                    } else {
                        this.isLogged = true;
                        this.loginFormRequested = false;
                        this.loginError = "";

                        this.isAdmin = snap.docs[0].data().admin;

                        // Save user to cookies
                        Cookies.set('user', snap.docs[0].id);
                        this.showNotification("Login Success!");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        /**
         * Called when register is pressed in the register screen
         * @param fieldData Email and Password field data
         */
        onRegisterRequest: function (fieldData) {
            const {email, password} = fieldData;
            const users = firebase.firestore().collection("users");
            const query = users.where("email", "==", email);

            query.get().then(snap => {
                if (snap.empty) {
                    users.add({
                        admin: false,
                        email: email,
                        password: password
                    }).then(() => {
                        // Register Success
                        this.showNotification("Register Successful!");
                    }).catch(err => {
                        console.log(err);
                    });
                } else {
                    this.loginError = "A user with that email address already exists!";
                    this.showNotification("Register Failed!");
                }
            }).catch(err => {
                console.log(err);
            });
        },

        /**
         * Displays a notification
         * @param message The notification
         */
        showNotification: function (message) {
            // if (this.notificationActive) return;
            // this.notificationMsg = message;
            // this.notificationActive = true;
            // setTimeout(() => this.notificationActive = false, 2000);
            this.$emit('notify', message);
        }
    },
};