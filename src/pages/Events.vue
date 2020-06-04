<template>
    <main>
        <h1>Upcoming Events</h1>
        <button @click="managerShown = true" v-if="isAdmin">Manage Events</button>
        <ManageEvents @close="managerShown = false" v-if="managerShown" :events="events" />
        <div class="events">
            <Event v-for="(event, index) in events" :image="event.image" :type="event.type"
                :location="event.location" :date="event.date" :key="index" />
        </div>
    </main>
</template>

<script>
    import Event from "../components/Event";
    import firebase from "firebase/app";
    import "firebase/firestore";
    import ManageEvents from "../components/ManageEvents";

    export default {
        name: "Events",
        components: {ManageEvents, Event},
        props: ["isAdmin"],
        data: function() {
            return {
                events: [],
                managerShown: false
            };
        },
        mounted: function() {
            this.reloadEvents();
        },
        methods: {
            reloadEvents: function() {
                document.querySelector(".events").innerHTML = "";
                // Retrieve event data
                const collection = firebase.firestore()
                    .collection("events");
                collection.get().then((snap) => {
                    snap.forEach(doc => {
                        this.events.push(doc.data());
                    });
                }).catch(err => {
                    console.error(err);
                });
            }
        }
    }
</script>

<style scoped>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1rem 3rem;
    }

    .events {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1rem;
        width: 100%;
        margin: 1rem;
    }

    h1 {
        margin: 1rem;
    }

    .event {
        width: 100%;
        height: 100%;
    }

    button {
        background: rgb(8, 8, 8);
        font-size: 1rem;
        padding: 0.5rem;
        margin: 0.25rem;
    }

    button:hover {
        cursor: pointer;
        background: rgb(64, 64, 64);
    }

    @media only screen and (max-width: 768px) {
        .events {
            grid-template-columns: 1fr;
        }
    }
</style>