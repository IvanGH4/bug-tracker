import { db } from "@/firebase.js";

export default {
    namespaced: true,
    state: {
        bugs: null
    },
    mutations: {    
        mtnBugs(state, n) {
            state.bugs = n
        }
    },
    actions: {
        addBug:({dispatch}, data)=>{
            db.collection(data[1]).add(
                data[0]
            )
            .then((docRef) =>{
                console.log('Documento creado con exito');
                dispatch('getBugs', docRef.id)
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        },
        // getBugs: ({commit}, n) => {
        //     db.collection('bugs').doc(n).get()
        //     .then((doc) => {
        //         if(doc.exists) {
        //             commit('mtnBugs', doc.data())
        //         }
        //     })
        // },
        deleteBug: (context, ids) => {
            db.collection(ids[0]).doc(ids[1]).delete().then(() => {
                console.log('Deleted Successfuly');
            });
        },
        getBugs: ({commit}, id) => {
            db.collection(id).get()
            .then((query) => {
                // console.log(query.docs);
                const info = [];
                query.docs.map((doc) => {
                    // console.log(doc.id)
                    let allData = {
                        data: doc.data(),
                        id: doc.id
                    }
                    info.push(allData);
                })
                // console.log(info);
                commit('mtnBugs', info);
            })
        }
    }
}