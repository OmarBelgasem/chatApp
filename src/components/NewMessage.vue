<template>
<div class="new-message">
    <form @submit.prevent="addMessage">
        <label for="new-message"> New Message (enter to add): </label>
        <input type="text" name="new-message" v-model="newMessage" placeholder="type somthing" required="required" :disabled="sendingMessages">
    </form>
</div>
</template>

<script>
export default {
    name: 'newMessage',
    props: ['onSubmit'],
    data() {
        return {
            newMessage: null,
            sendingMessages: false
        }
    },
    methods: {
        addMessage() {
            this.$emit('onSubmit', this.newMessage)
            this.newMessage = null
        }
    }
}
</script>