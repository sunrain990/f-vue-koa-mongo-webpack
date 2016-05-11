<script>
    /* eslint-disable no-new */
    export default {
        data: function () {
            return {
                message: 'Hello Vue.js!'
            }
        }
    }
</script>

<template>
    <div>
        {{ message }}123
    </div>
    <input v-model="message">
</template>


