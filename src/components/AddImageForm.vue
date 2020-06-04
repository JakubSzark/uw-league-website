<template>
    <div class="add-image fullscreen">
        <button @click="requestClose" class="close">X</button>
        <label for="url">URL</label>
        <input v-model="url" id="url" type="url" placeholder="Your URL here...">
        <label for="cat">Category</label>
        <select id="cat" v-model="cat">
            <option v-for="(c, index) in categories" :value="c" :key="index">{{ c }}</option>
        </select>
        <button @click="requestAdd" class="add">Add</button>
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/firestore';

    export default {
        name: "AddImageForm",
        props: ["categories"],
        data: function() {
            return {
                url: "",
                cat: "Artwork"
            };
        },
        methods: {
            requestClose: function() {
                this.$emit('closeRequest');
            },
            requestAdd: function() {
                const collection = firebase.firestore().collection('gallery');
                const query = collection.where('image', "==", this.url);

                // Check if URL is an Image
                if (this.url.length === 0) return;
                if (this.url.match(/\.(jpeg|jpg|gif|png)$/) == null) {
                    return;
                }

                // Check if the URL loads
                let image = new Image();
                let isValidURL = true;
                image.onerror = () => isValidURL = false;
                image.src = this.url;
                if (!isValidURL) return;

                query.get().then(snap => {
                   if (snap.empty) {
                       collection.add({
                           image: this.url,
                           category: this.cat
                       }).then(() => {
                           this.requestClose();
                           this.$emit('addSuccess');
                       }).catch(err => {
                           console.error(err);
                       });
                   }
                }).catch(err => {
                    console.error(err);
                });
            }
        }
    }
</script>

<style scoped>
    .add-image {
        flex-direction: column;
    }

    .close {
        position: absolute;
        right: 1rem;
        top: 1rem;
    }

    .add {
        font-size: 1.5rem;
        margin-top: 1rem;
    }

    .close, .add {
        background: var(--accent-color);
        padding: 0.5rem;
    }

    button:hover {
        cursor: pointer;
    }

    label, input, select {
        font-size: 1.5rem;
        margin-bottom: 1rem;

    }

    input, select {
        padding: 0.5rem 2rem;
        background: rgb(8, 8, 8);
    }
</style>