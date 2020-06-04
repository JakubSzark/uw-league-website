<template>
    <div class="highlight">
        <span class="author">{{ author }}</span>
        <iframe :src="video"
                allow="accelerometer; autoplay; encrypted-media;
                gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
        <span class="caption">{{ caption }}</span>
    </div>
</template>

<script>
    export default {
        name: "Highlight",
        props: ["author", "caption", "video"]
    }
</script>

<style scoped>
    .highlight {
        display: grid;
        grid-template-rows: 0.1fr 1fr 0.1fr;
        align-items: stretch;
        justify-content: stretch;
        border: 1px solid var(--accent-color);
        overflow: hidden;
    }

    iframe {
        width: 100%;
    }

    span {
        padding: 0.5rem;
        background: var(--bg-color);
        text-align: center;
        width: 100%;
    }
</style>