<template>
    <div class="manage-events fullscreen">
        <button @click="$emit('close')" class="close">X</button>
        <div class="events">
            <div class="event" v-for="(event, i) in events" :key="i">
                <h2>Event #{{ i }}</h2>
                <h3>Type</h3>
                <input type="text" v-model="event.type">
                <h3>Location</h3>
                <input type="text" v-model="event.location">
                <h3>Image</h3>
                <input type="text" v-model="event.image">
                <h3>Date</h3>
                <input type="date" v-model="event.date">
            </div>
        </div>
        <button @click="updateEvents()">Update</button>
    </div>
</template>

<script>
    import firebase from "firebase";

    export default {
        name: "ManageEvents",
        props: ["events"],
        methods: {
            updateEvents: function() {
                console.log(this.events);
                // Retrieve event data
                const collection = firebase.firestore()
                    .collection("events");

                for (let i = 0; i < this.events.length; i++) {
                    let doc = collection.where("id",
                        "==", this.events[i].id);
                    doc.get().then(snap => {
                        collection.doc(snap.docs[0].id).set({
                            date: this.events[i].date,
                            id: this.events[i].id,
                            image: this.events[i].image,
                            type: this.events[i].type,
                            location: this.events[i].location
                        }).then(() => {
                            console.log("Event Updated");
                        }).catch(err => {
                            console.error(err);
                        })
                    }).catch(err => {
                        console.error(err);
                    })

                }
            }
        }
    }
</script>

<style scoped>
    .manage-events {
        display: flex;
        flex-direction: column;
    }

    .close {
        position: absolute;
        right: 1rem;
        top: 1rem;
        background: var(--accent-color);
        padding: 0.5rem;
        cursor: pointer;
    }

    button {
        font-size: 1.2rem;
        background: var(--accent-color);
        padding: 0.5rem 1rem;
        cursor: pointer;
    }

    .events {
        display: flex;
        flex-direction: row;
    }

    .event {
        display: flex;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.2);
        padding: 1rem 2rem;
        margin: 1rem;
    }

    input {
        font-size: 1.2rem;
        background: black;
        padding: 0.5rem;
        margin: 1rem;
    }

    h2 { margin-bottom: 1rem; }
</style>