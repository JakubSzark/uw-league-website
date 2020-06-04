<template>
    <div id="app">
        <NavBar
                @pageChange="onPageChange"
                @loginPressed="onLoginPressed"
                :isLogged="isLogged"
                :current-page="currentPage"
        />

        <transition name="fade">
            <LoginForm
                    @cancelLogin="loginFormRequested = false"
                    @requestLogin="onLoginRequest"
                    @requestRegister="onRegisterRequest"
                    :loginError="loginError"
                    v-if="loginFormRequested"
            />
        </transition>

        <Notice>{{ notice }}</Notice>

        <Home v-if="currentPage === 0"/>
        <Events v-if="currentPage === 1" :isAdmin="isAdmin"/>
        <Highlights v-if="currentPage === 2"/>
        <Gallery v-if="currentPage === 3" :isLogged="isLogged"/>

        <Social/>
        <Notification />
    </div>
</template>

<script src="./App.js"/>
<style src="./App.css"/>
