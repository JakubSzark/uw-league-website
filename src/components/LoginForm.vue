<template>
    <div class="loginForm">
        <h2>{{ loginMode ? "Login" : "Register" }}</h2>
        <button id="close" @click="$emit('cancelLogin')">X</button>

        <label for="emailField">Email Address</label>
        <input type="email" id="emailField" placeholder="JohnDoe@email.com" />

        <label for="passwordField">Password</label>
        <input type="password" id="passwordField" placeholder="********" />
        <span class="requirement" v-if="!loginMode">Must contain one capital, number, and symbol.</span>

        <span class="error">{{ loginError }}</span>
        <button id="submit" @click="submitForm">{{ loginMode ? "Login" : "Register" }}</button>

        <!-- Mode Switching -->
        <span>{{ loginMode ? "Don't have an account?" : "Already have an account?" }}</span>
        <a href="#" @click="loginMode = !loginMode">{{ loginMode ? "Register" : "Login" }}</a>
    </div>
</template>

<script>
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;

export default {
    name: "LoginForm",
    props: ["loginError"],
    data: function() {
        return {
            loginMode: true
        };
    },
    methods: {
        /**
         * Validates an email and a password
         * @param email
         * @param password
         * @returns {boolean}
         */
        validateEmailAndPassword: function(email, password) {
            if (!emailRegex.test(email)) {
                this.loginError = "Email is not in correct format!";
                return false;
            }

            if (!passRegex.test(password)) {
                this.loginError = "Password is not in correct format!";
                return false;
            }

            return true;
        },

        /**
         * Validates and Submits the Login Form
         */
        submitForm: function() {
            const emailField = document.getElementById('emailField');
            const passwordField = document.getElementById('passwordField');

            if (!this.validateEmailAndPassword(emailField.value, passwordField.value)) {
                return;
            }

            this.$emit(this.loginMode ? 'requestLogin' : 'requestRegister', {
                email: emailField.value,
                password: passwordField.value
            });
        }
    }
};
</script>

<style src="./css/LoginForm.css" scoped />
