<script>
    export default {
        data: function () {
            return {
                firstName: 'Foo',
                lastName: 'Bar',
                todos: [
                    { text: 'Learn JavaScript' },
                    { text: 'Learn Vue.js' },
                    { text: 'Learn Something Awesome' }
                ],
                message: 'Hello Vue.js!'
            }
        },
        methods: {
            reverseMessage: function () {
                this.message = this.message.split('').reverse().join('')
            },
            addTodo: function () {
                var text = this.newTodo.trim()
                if (text) {
                    this.todos.push({ text: text })
                    this.newTodo = ''
                }
            },
            removeTodo: function (index) {
                this.todos.splice(index, 1)
            }
        },
        computed: {
            fullName: function () {
                return this.firstName + ' ' + this.lastName
            }
        }
    }
</script>

<template>
    <div>
        <ul>
            <li v-for="todo in todos">
                {{ todo.text }}
            </li>
        </ul>
    </div>

    <div>
        <p>{{ message }}</p>
        <button v-on:click="reverseMessage">Reverse Message</button>
    </div>

    <div>
        <input v-model="newTodo" v-on:keyup.enter="addTodo">
        <ul>
            <li v-for="todo in todos">
                <span>{{ todo.text }}</span>
                <button v-on:click="removeTodo($index)">X</button>
            </li>
        </ul>
    </div>
123
    <div :class="fullName"></div>

    <h1 v-if="Math.random()>0.5">Yes</h1>
    <h1 v-else>No</h1>
</template>