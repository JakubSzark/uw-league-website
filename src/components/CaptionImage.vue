<template>
    <div class="caption-image">
        <img :src="image" alt="">
        <span>{{ caption }}</span>
    </div>
</template>

<script>
    export default {
        name: "CaptionImage",
        props: ["image", "caption"]
    }
</script>

<style scoped>
    .caption-image {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    img, span {
        width: 100%;
        border-radius: 5px 5px 0px 0px;
    }

    span {
        text-align: center;
        background: var(--bg-color);
        border-radius: 0px 0px 5px 5px;
        padding: 0.5rem;
    }
</style>