import { auth } from "@/firebase.js";
export default {
    namespaced: true,
    state: {
        user: null,
        loginMsg: null,
        isRegister: false
    },
    mutations: {
        mtnUser(state,n){
            state.user = n;
        },
        mtnLoginMsg(state,n){
            state.loginMsg = n;
        },
        mtnIsRegister(state){
            state.isRegister = !state.isRegister;
        },
    },
    actions: {
        setLogin:({commit}, {email, password}) => {
            auth.signInWithEmailAndPassword(email, password)
            .then((result)=>{
                const successfulMsg = 'Bienvenido a tu dash';
                commit("mtnUser", auth.currentUser);
                commit("mtnLoginMsg", successfulMsg);
                console.log(result.user)
            })
            .catch((error) => {
                console.log(error.message);
                commit("mtnLoginMsg", error.message);
            });
        },
        setLogout:({commit}) => {
            auth.signOut().then(()=> {
                commit('mtnUser', null);
            }).catch((error) => {
                console.log(error.message)
                commit("mtnLoginMsg", error.message);
            });
        },
        setRegister:({ commit }, { name, email, password }) => {
            auth.createUserWithEmailAndPassword(email, password)
            .then(()=>{
                commit("mtnUser", auth.currentUser, name);

            })
            .catch((error)=>{
                console.log(error.message)
            });
        },
        setUserState(){
            return new Promise((resolve, reject)=>{
                const unsubscribe = auth.onAuthStateChanged(
                    user => {
                        unsubscribe();
                        resolve(user);
                    },
                    ()=> {
                        reject();
                    }
                )

            })
        },
        setIsRegister:({commit})=>{
          commit('mtnIsRegister')
        }
    },
    getters:{
        getUserEmail(state){
            return state.user ? state.user.email : false;
        },
    }
}