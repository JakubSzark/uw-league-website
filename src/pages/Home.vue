<template>
    <main>
        <Slideshow :slides="slides" speed="5000" />
        <div class="officers">
            <h1>Club Officers</h1>
            <CaptionImage :image="vpImg" :caption="vpName + ' (Vice President)'" />
            <CaptionImage :image="presidentImg" :caption="presidentName + ' (President)'" />
            <CaptionImage :image="treasurerImg" :caption="treasurerName + ' (Treasurer)'" />
        </div>
        <div class="mission">
            <h1>Our Mission</h1>
            <p>
                We are the League of Legends Club and the focus of our club is to provide an environment for
                fellow students who enjoy playing the popular fast pace Multiplayer Online Battle Arena (MOBA) game,
                League of Legends. Our aim is to encourage communication and team-building skills,
                foster tough competition through strategic thinking and risk-taking, and emphasize good
                attitude and conduct. All are welcome to come and play together, to learn and improve and
                most importantly to have fun. See you on the Rift!
            </p>
        </div>
    </main>
</template>

<script>
    import Slideshow from "../components/Slideshow";
    import CaptionImage from "../components/CaptionImage";
    import firebase from "firebase";
    export default {
        name: "Home",
        components: {CaptionImage, Slideshow},
        data: function() {
            return {
                presidentImg: "stock/student2.jpg",
                presidentName: "Cyp",
                vpImg: "stock/student1.jpg",
                vpName: "Kevin",
                treasurerImg: "stock/student3.jpg",
                treasurerName: "Alec",
                slides: {
                    "game/characters.png": "Play with your friends.",
                    "game/kpop_dude.png": "Train your skills and improve.",
                    "game/sexy_talon.jpg": "Main any champion you want."
                },
            };
        },
        mounted() {
            const collection = firebase.firestore().collection('home');
            collection.get().then(snap => {
                snap.forEach(doc => {
                    const data = doc.data();
                    if (data.for === "slideshow") {
                        this.slides[data.url] = data.caption;
                    } else if(data.for === "president") {
                        this.presidentImg = data.url;
                        if (data.name !== undefined) {
                            this.presidentName = data.name;
                        }
                    } else if(data.for === "vp") {
                        this.vpImg = data.url;
                        if (data.name !== undefined) {
                            this.vpName = data.name;
                        }
                    } else if(data.for === "treasurer") {
                        this.treasurerImg = data.url;
                        if (data.name !== undefined) {
                            this.treasurerName = data.name;
                        }
                    }
                });
            }).catch(err => {
                console.error(err);
            });
        }
    }
</script>

<style src="./css/Home.css" scoped />