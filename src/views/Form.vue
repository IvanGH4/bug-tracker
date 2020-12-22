<template>
  <div class="form-container">
      <h2>Report a Bug <i class="fas fa-bug"></i></h2>
      <form @submit.prevent="createBug">
          <label>Title</label>
          <input type="text" placeholder="Bug title" required v-model="info.title" />
          
          <label>Description</label>
          <textarea cols="30" rows="5" placeholder="Add a description" required v-model="info.desc"></textarea>

          <button class="btn bg-secondary text-white">Save</button>
      </form>
      <div class="image">
          <img src="@/assets/imgs/bug.svg" alt="#" />
      </div>
      <router-link to="/data" class="link-to-bugs">My Bugs <span class="bugsQuantity" v-if="this.myBugs">{{this.myBugs.length}}</span></router-link>
      <button class="btn bg-secondary logoutBtn" @click="logout">Log out</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'Form',
    data() {
        return {
            info: {
                title: '',
                desc: ''
            }
        }
    },  
    mounted(){
        this.$store.dispatch('bugMod/getBugs', this.user.uid);
    },
    methods: {
        logout() {
            this.userLogout;
            this.$route.name === 'Form' ? this.$router.push('/') : false;
        },
        createBug() {
            try {
                this.$store.dispatch('bugMod/addBug', [this.info, this.user.uid]);
            } catch (error) {
                console.log(error);
            }
            finally {
                setTimeout(() => {
                    this.info.title = ''
                    this.info.desc = ''
                }, 500);
            }
        },
    },
    computed: {
        ...mapActions({
            userLogout: "userMod/setLogout"
        }),
        ...mapState('userMod',{
            user: state => state.user,
        }),
        ...mapState('bugMod', {
            myBugs: state => state.bugs
        }),
    }
}
</script>