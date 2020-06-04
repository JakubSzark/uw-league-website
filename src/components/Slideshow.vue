<template>
    <div class="slideshow" :style="{ backgroundImage: 'url(' + Object.keys(slides)[slideIndex] + ')' }">
        <span>{{ Object.values(slides)[slideIndex] }}</span>
        <button @click="advanceSlide(-1)" class="back">&lt;</button>
        <button @click="advanceSlide(1)" class="next">&gt;</button>
        <div class="slide-index">
            <button v-for="(slide, url, i) in slides" @click="setSlide(i)"
                :key="i" :disabled="i === slideIndex"></button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Slideshow",
        props: ["slides", "speed"],
        data: function() {
            return {
                slideIndex: 0,
                slideTimeout: null,
            };
        },
        mounted: function() {
            this.advanceSlide(0);
        },
        methods: {
            setSlide: function(index) {
                const keys = Object.keys(this.slides);

                // Keep slideIndex within array
                if (index >= keys.length) {
                    this.slideIndex = 0;
                }
                else if (index < 0) {
                    this.slideIndex = keys.length - 1;
                }
                else {
                    this.slideIndex = index;
                }

                clearTimeout(this.slideTimeout);
                this.slideTimeout = setTimeout(() =>
                    this.advanceSlide(1), this.speed);
            },
            advanceSlide: function(delta) {
                this.setSlide(this.slideIndex + delta);
            }
        }
    }
</script>

<style scoped>
    .slideshow {
        position: relative;
        overflow: hidden;

        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    span {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2rem;
    }

    span, button {
        position: absolute;
        background: var(--bg-color);
        border: 2px solid var(--accent-color);
        padding: 0.5rem 1rem;
        border-radius: 3px;
    }

    .back {
        top: 50%;
        left: 1rem;
        transform: translate(0, -50%);
    }

    .next {
        top: 50%;
        right: 1rem;
        transform: translate(0, -50%);
    }

    button {
        font-size: 1.5rem;
    }

    button:hover {
        background: rgb(35, 35, 35);
        cursor: pointer;
    }

    .slide-index {
        position: absolute;
        left: 0;
        bottom: 1rem;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .slide-index button {
        position: relative;
        margin: 1rem;
        border-radius: 50%;
        padding: 0.5rem;
    }

    .slide-index button:disabled {
        background: whitesmoke;
    }
</style>