<template>
    <div @click="closeRequest" class="inspect fullscreen">
        <img :src="image" alt="inspection">
    </div>
</template>

<script>
    export default {
        name: "ImageInspect",
        props: ["image"],
        methods: {
            closeRequest: function() {
                this.$emit('inspectionClose');
            }
        }
    }
</script>

<style scoped>
    .inspect {
        cursor: zoom-out;
    }

    img {
        width: auto;
        height: 90%;
    }
</style>