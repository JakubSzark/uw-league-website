<template>
    <header>
        <img class="logo" src="../assets/logo.png" alt="logo"
            @click="changePage(0)" />
        <nav>
            <img class="burger" src="../assets/burger.png" alt="burger" />
            <div class="links">
                <button class="link" @click="changePage(0)">Home</button>
                <button class="link" @click="changePage(1)">Events</button>
                <button class="link" @click="changePage(2)">Highlights</button>
                <button class="link" @click="changePage(3)">Gallery</button>
            </div>
        </nav>
        <a href="#" class="login" @click="$emit('loginPressed')">
            {{ isLogged ? "Logout" : "Login" }}
        </a>
    </header>
</template>

<script>
export default {
    name: "NavBar",
    props: ["isLogged", "currentPage"],
    methods: {
        changePage: function(index) {
            this.$emit("pageChange", index);
        },
        setActiveLink: function(num) {
            let links = document.getElementsByClassName('link');
            for (let i = 0; i < links.length; i++) links[i].disabled = false;
            links[num].disabled = true;
        }
    },
    mounted: function() {
        this.setActiveLink(this.currentPage);
    },
    watch: {
        currentPage: function(newVal) {
            this.setActiveLink(newVal);
        }
    },
};
</script>

<style src="./css/NavBar.css" scoped />