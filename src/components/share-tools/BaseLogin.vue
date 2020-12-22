<template>
  <div class="login-container">
      <h1 class="text-white">Bug Tracker</h1>
      <h2>Log In</h2>
      <!-- Aca pongo form de login -->
      <form @submit.prevent="login">
        <i class="fas fa-bug"></i>
          <label>Email</label>
          <input type="email" placeholder="Ex. john@gmail.com" required v-model="mail" />
          
          <label>Password</label>
          <input type="password" placeholder="Your password" required v-model="pass" />

          <button class="btn btn-login" type="submit">Log in</button>
      </form>
      <router-link to="/register" class="btn"><a href="#">Don't have an account? Register</a></router-link>
      <span v-if="isShow">Loading...</span>
      <img class="login-img" src="@/assets/imgs/login.svg" alt="#" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'BaseLogin',
    data() {
        return {
            mail: '',
            pass: '',
            isShow: false,
        }
    },
    methods: {
        async login() {
            try {
                this.isShow = true;
                await this.$store.dispatch("userMod/setLogin", {
                email: this.mail,
                password: this.pass,
                });
            } catch (error) {
                console.error(error.message);
            } finally {
                setTimeout(() => {
                    this.$router.push('/form');
                    this.isShow = false
                }, 1000);
            }
    },
    },
    computed: {
        ...mapState('userMod', {
            user: state => state.user
        })
    }
}
</script>