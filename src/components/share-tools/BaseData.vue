<template>
<div class="generic-card">
    <button class="btn bg-primary text-white logout-icon" @click="logout"><i class="fas fa-sign-out-alt"></i></button>
    <div v-if="this.myBugs" class="generic-card">
        <h2>The bugs that you report will appear here!</h2>
        
        <div class="show-data" v-for="(doc, idx) in this.myBugs" :key="idx">
            <h4><i class="fas fa-exclamation-circle text-red"></i>{{doc.data.title}}</h4>
            <hr>
            <p><i class="fas fa-info-circle text-warning"></i>{{doc.data.desc}}</p>
            <!-- <span>ID: {{doc.id}}</span> -->
            <button class="btn bg-red text-white" @click="deleteBug(doc.id)">Delete</button>
            <div class="link-box">
                <router-link to="/form">Report another bug</router-link>
            </div>
        </div>
        <router-link to="/form" class="text-white">No bugs yet? Start reporting</router-link>
    </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'BaseData', 
    methods: {
        async deleteBug(id) {
            // console.log(e.target);
            console.log(id);
            await this.$store.dispatch('bugMod/deleteBug', [this.user.uid, id]);
            await this.$store.dispatch('bugMod/getBugs', this.user.uid);
        },
        logout() {
            this.userLogout();
            this.$route.name === 'Data' ? this.$router.push('/') : false;
        },
        ...mapActions({
            userLogout: "userMod/setLogout"
        }),
    },
    computed: {
        ...mapState('bugMod', {
            myBugs: state => state.bugs
        }),
        ...mapState('userMod', {
            user: state => state.user
        })
    }
}
</script>