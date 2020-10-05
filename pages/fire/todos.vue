<template>
<div class="container-sm my-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    List Todos
                    <button class="btn btn-warning btn-sm float-right" @click="renewTodos">Reset State</button>
                </div>
                <div class="card-body">
                    <div v-if="loadingTodos" class="text-center my-4">
                        <div class="spinner-grow text-primary" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div class=""></div>
                    <ul class="list-group">
                        <li class="list-group-item" v-for="(todo, index) in todos" :key="index">{{ todo.todo }}
                            <button class="btn btn-outline-danger btn-sm float-right" @click.prevent="removeTodos(todo, index)">X</button>
                            <button class="btn btn-warning btn-sm float-right mr-2" @click.prevent="editTodos(todo, index)" v-b-modal.editTodo>Edit</button>
                        </li>
                    </ul>
                    <hr>
                    <form @submit.prevent="addTodos">
                        <div class="form-group my-4">
                            <input type="text" placeholder="Add a Todo" class="form-control" v-model="todo">
                        </div>

                        <button class="btn btn-outline-info">Add Todo</button>
                    </form>
                </div>

            </div>
        </div>

    </div>
    <b-modal id="editTodo" ref="editTodo" hide-footer>
        <template v-slot:modal-title>
            Edit todo <code>{{ titleTodoEdit }}</code>
        </template>
        <form @submit.prevent="submitEditTodo">
            <p class="alert alert-warning" v-if="errMsgTodoEdit">nothing change</p>
            <div class="form-group" style="display:none">
                <label>Id Todo</label>
                <input class="form-control" disabled v-model="todoEditId">
            </div>
            <div class="form-group">
                <label>Todo</label>
                <input class="form-control" v-model="todoEdit">
            </div>
            <button class="btn btn-info float-right">Edit</button>
        </form>
    </b-modal>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    layout: 'fire',
    nama: 'todos',
    data() {
        return {
            todo: '',
            todoEdit: '',
            todoOld: '',
            loadingTodos: true,
            title: 'Todos',
            titleTodoEdit: '',
            errMsgTodoEdit: false,
            todoEditId: '',
            todoEditIndex: '',
        }
    },
    head() {
        return {
            title: this.title,
            meta: [{
                hid: 'description',
                name: 'description',
                content: 'My custom description'
            }]
        }
    },
    computed: {
        /*todos() {
            return this.$store.state.todos;
        },*/
        ...mapState('todos', {
            todos: state => state.todos,
        }),
    },
    created() {
        //console.log(Date.now())
        this.resetTempTodos();
        this.updateTodos().then(res => {
            1000,
            this.loadingTodos = false
        });
    },
    methods: {
        ...mapActions('todos', ['addTodo','editTodo', 'removeTodo', 'updateTodos', 'resetTempTodos']),
        renewTodos() {
            this.resetTempTodos();
        },
        addTodos() {
            if (this.todo) {
                //console.log(this.todo)
                this.addTodo(this.todo)
                    .then(() => {
                        this.todo = "";
                    })
            }
        },
        removeTodos(todo, index) {
            //alert(todo.id);
            //this.$delete(this.todos, index);
            //this.$store.commit('removeTodo', index)

            this.removeTodo({
                todo: todo,
                index: index
            });
        },
        editTodos(todo, index) {
            //alert(todo.todo)
            this.todoEdit = todo.todo
            this.todoOld = todo.todo
            this.todoEditId = todo.id
            this.todoEditIndex = index
            this.titleTodoEdit = todo.todo
        },
        submitEditTodo(){
            if (this.todoEdit) {
                if(this.todoEdit === this.todoOld){
                    this.errMsgTodoEdit = true
                    console.log('nothing change')
                }else{
                    this.errMsgTodoEdit = false
                    //console.log(this.todoEdit)
                    //this.$refs['editTodo'].hide()
                    const dataEdit = {'id':this.todoEditId,'reTodo':this.todoEdit,'index':this.todoEditIndex}
                    this.editTodo(dataEdit).then(()=>{
                        this.$refs['editTodo'].hide()
                    });

                }
            }
        }
    }
}
</script>

<style>

</style>
