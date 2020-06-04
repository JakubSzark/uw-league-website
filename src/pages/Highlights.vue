<template>
    <main>
        <h1>Top Highlights</h1>
        <div class="highlights">
            <Highlight v-for="(h, index) in highlights" :caption="h.caption" :author="h.author" :video="h.video" :key="index" />
        </div>
    </main>
</template>

<script>
    import Highlight from "../components/Highlight";
    import firebase from 'firebase/app';
    import 'firebase/firestore';

    export default {
        name: "Highlights",
        components: {Highlight},
        data: function() {
            return {
                highlights: []
            };
        },
        created: function() {
            const collection = firebase.firestore().collection('highlights');
            collection.get().then(snap => {
                snap.forEach(doc => {
                    this.highlights.push(doc.data());
                });
            }).catch(err => {
               console.error(err);
            });
        }
    }
</script>

<style scoped>
    main {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        padding: 1rem 3rem;
    }

    h1 {
        margin: 1rem;
    }

    .highlights {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1rem;

        min-height: 100vh;
        padding: 1rem;
    }

    .highlights > .highlight {
        grid-column: span 2;
    }
</style>