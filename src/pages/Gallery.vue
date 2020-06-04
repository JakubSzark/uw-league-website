<template>
    <main>
        <label for="categories">Gallery</label>
        <div class="controls">
            <button @click="addingImage = true" v-if="isLogged">Add Image</button>
            <button @click="updateImages">Refresh</button>
            <select id="categories" v-model="category" @change="updateImages">
                <option v-for="(cat, index) in categories" :value="cat" :key="index">{{ cat }}</option>
            </select>
        </div>

        <div class="images">
            <img @click="inspectImage(img)" v-for="(img, index) in images"
                 :src="img" :key="index" alt="">
        </div>
        <ImageInspect @inspectionClose="inspecting = false"
                      :image="inspectingImage" v-if="inspecting" />
        <AddImageForm @addSuccess="updateImages"
                      @closeRequest="addingImage = false" v-if="addingImage"
                      :categories="categories"
        />
    </main>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    import ImageInspect from "../components/ImageInspect";
    import AddImageForm from "../components/AddImageForm";

    export default {
        name: "Gallery",
        components: {AddImageForm, ImageInspect},
        props: ["isLogged"],
        data: function() {
            return {
                images: [],
                categories: [],
                category: "Artwork",
                inspecting: false,
                inspectingImage: "",
                addingImage: false
            };
        },
        created: function() {
            this.updateImages();
        },
        methods: {
            updateImages: function() {
                this.images.length = 0;
                const collection = firebase.firestore()
                    .collection('gallery');

                this.categories.push("All");
                collection.get().then(snap => {
                    snap.forEach(doc => {
                        const category = doc.data().category;
                        if (!this.categories.includes(category)) {
                            this.categories.push(category);
                        }
                    });
                }).catch(err => {
                    console.error(err);
                });

                if (this.category === "All")
                {
                    collection.get().then(snap => {
                        snap.forEach(doc => {
                            this.images.push(doc.data().image);
                        })
                    }).catch(err => {
                        console.error(err);
                    });

                    return;
                }

                const query = collection
                    .where("category", "==",
                        this.category);

                query.get().then(snap => {
                    snap.forEach(doc => {
                        this.images.push(doc.data().image);
                    });
                }).catch(err => {
                    console.error(err);
                });
            },
            inspectImage: function(image) {
                if (this.inspecting) return;
                this.inspecting = true;
                this.inspectingImage = image;
            }
        }
    }
</script>

<style src="./css/Gallery.css" scoped />