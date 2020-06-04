<template>
    <div class="social">
        <div class="links">
            <a href="https://www.twitch.tv/loluwt" target="_blank">
                <img src="socials/twitch.jpg"></a>
            <a href="https://www.facebook.com/loluwt/" target="_blank">
                <img src="socials/facebook.png"></a>
            <a href="https://www.instagram.com/loluwt/?hl=en" target="_blank">
                <img src="socials/instagram.png"></a>
            <a href="https://discord.gg/aNjmeFv" target="_blank">
                <img src="socials/discord.png"></a>
        </div>
        <span>&gt;</span>
    </div>
</template>

<script>
    export default {
        name: "Social"
    }
</script>

<style scoped>
    .social {
        position: fixed;
        left: 0;
        top: 25%;
        transform: translate(-60%, -50%);
        padding: 0.5rem;

        border-radius: 0px 10px 10px 0px;

        display: flex;
        flex-direction: row;
        background: var(--bg-color);
        align-items: center;

        border-right: 2px solid var(--accent-color);
        border-top: 2px solid var(--accent-color);
        border-bottom: 2px solid var(--accent-color);

        transition: 0.5s ease 0s;
        box-shadow: 0 5px 16px var(--shadow-color);
        z-index: 500;
    }

    .social:hover {
        transform: translate(0, -50%);
        transition: 0.5s ease 0s;
    }

    .links {
        display: flex;
        flex-direction: column;
    }

    span {
        font-size: 2rem;
        margin-left: 1rem;
    }

    a img {
        width: 2rem;
    }

    @media only screen and (max-width: 768px) {
        .social {
            transform: translate(-80%, -50%);
        }

        .links {
            flex-direction: row;
        }
    }
</style>