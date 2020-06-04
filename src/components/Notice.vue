<template>
    <div class="notice">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Notice"
    }
</script>

<style scoped>
    .notice {
        background: var(--accent-color);
        padding: 0.5rem;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 100%;
        text-align: center;
    }
</style>