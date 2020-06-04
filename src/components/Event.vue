<template>
    <div class="event">
        <div class="image" :style="{ backgroundImage: 'url(' + image + ')' }"></div>
        <div class="desc">
            <span class="type"><b>Type:</b> {{ type }}</span>
            <span class="location"><b>Location:</b> {{ location }}</span>
            <span class="date"><b>Date:</b> {{ date }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Event",
        props: ["type", "location", "date", "image"]
    }
</script>

<style scoped>
    .event {
        display: grid;
        grid-template-rows: 3fr 1fr;
        box-shadow: 0 5px 16px rgba(0, 0, 0, 0.4);
        border: 1px solid var(--accent-color);
    }

    .desc {
        display: flex;
        flex-direction: column;
    }

    .desc {
        background: var(--text-color);
        padding: 0.5rem;
        border-top: 4px solid var(--accent-color);
    }

    .image {
        background-size: cover;
        background-position: center;
    }

    span {
        color: var(--bg-color);
        padding: 0.5rem;
    }

    b {
        color: var(--bg-color);
        font-weight: 700;
    }

    @media only screen and (max-width: 768px) {
        .image {
            background-size: auto 100%;
        }
    }
</style>