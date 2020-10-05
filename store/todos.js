import { auth } from '@/services/firebase';
import * as firebase from 'firebase/app'
import Vue from 'vue'
import 'firebase/firestore'
import 'firebase/auth'
const state = () => (
    {
        todos: [],
    }
)
const mutations = {
    ASSIGN_tempTODOS(state) {
        state.todos= [];
    },
    ASSIGN_TODOS(state,payload) {
        //state.todos= [];
        state.todos.push({
            todo        : payload.todo,
            id          : payload.id,
            uid         : payload.uid,
            timestamp   : payload.timestamp});
    },
    EDIT_TODOS(state,payload){
        console.log(payload.todo)
        Vue.set(state.todos[payload.index], 'todo', payload.todo)
    },
    UNSSIGN_TODOS(state,payload){
        Vue.delete(state.todos, payload)
    }
}
const actions = {
    resetTempTodos({commit}){
        commit('ASSIGN_tempTODOS');
    },
    updateTodos({commit}){
        const query = firebase.firestore().collection('todos').where("uid","==",this.state.users.user.uid)
        query.get().then((respone) => {
            respone.forEach(x => {
                //this.$store.commit('updateTodo', x.data());
                return new Promise((resolve, reject) => {
                    commit('ASSIGN_TODOS', x.data());
                })
                
            })
        });
    },
    addTodo({commit},payload){
        const uid = this.state.users.user.uid;
        //state.todos.push({todo: payload.todo,id: payload.id,timestamp: Date.now()});
        //console.log(uid)
        console.log('add todos')
        const dataTodo = {todo: payload,uid: uid,timestamp: Date.now()};
        firebase.firestore().collection('todos').add({}).then((res) => {
                    firebase.firestore().collection('todos').doc(res.id).set({
                        todo        : dataTodo.todo,
                        id          : res.id,
                        uid         : dataTodo.uid,
                        timestamp   : dataTodo.timestamp
                    }).then(()=>{
                        commit('ASSIGN_TODOS', {'todo':dataTodo.todo,'id':res.id,'uid':dataTodo.uid,'timestamp':dataTodo.timestamp});
                    })
                })
    },
    removeTodo({commit},payload){
        console.log('remove todo')
        firebase.firestore().collection('todos').doc(payload.todo.id).delete().then(() => {
                //console.log('succes dulllasdas a jk');
                commit('UNSSIGN_TODOS', payload.index);
            })
    },
    editTodo({commit},payload){
        //console.log(payload.index)
        const dateNow = Date.now();
        firebase.firestore().collection('todos').doc(payload.id).update({todo: payload.reTodo,timestamp: dateNow}).then(() => {
            //console.log('succes dulllasdas a jk');
            const dataEdit = {'id':payload.id,'todo':payload.reTodo,'index':payload.index}
            commit('EDIT_TODOS', dataEdit);
        })
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
    
}