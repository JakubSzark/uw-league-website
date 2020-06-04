<template>
    <transition name="slide">
        <div class="notification" v-if="isActive">
            {{ message }}
        </div>
    </transition>
</template>

<script>
    export default {
        name: "Notification",
        data: function() {
            return {
                message: "",
                isActive: false,
            }
        },
        created: function() {
            this.$parent.$on('notify', (message) => {
                this.message = message;
                this.isActive = true;
                setTimeout(() => this.isActive = false, 2000);
            });
        }
    }
</script>

<style scoped>
    .notification {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 200%);
        background: var(--bg-color);
        border: 2px solid var(--accent-color);
        box-shadow: 0 5px 16px var(--shadow-color);
        padding: 1rem;
    }

    .slide-enter-active {
        animation: slideUp 2s;
    }

    .slide-leave-active {
        animation: slideUp 2s reverse;
    }

    @keyframes slideUp {
        0%, 100% {
            transform: translate(-50%, 200%);
        }

        50%, 100% {
            transform: translate(-50%, -100%);
        }
    }
</style>