<template>
    <div class="register-container">
        <h2>Register</h2>
        <form @submit.prevent="register">
            <div class="register-wrapper">
                <i class="fas fa-bug"></i>
                <label>User Name</label>
                <input type="text" required placeholder="Ex. John Doe" v-model="userData.name" />
                    
                <label>Email</label>
                <input type="text" required placeholder="Ex. john@doe.com" v-model="userData.email" />
                    
                <label>Password</label>
                <input type="password" required min="5" max="20" placeholder="Between 5 and 20 characteres" v-model="userData.password" />
                <small v-if="!matchPasswords">Passwords do not match</small>
                    
                <label>Confirm Password</label>
                <input type="password" required min="5" max="20" placeholder="Between 5 and 20 characteres" v-model="repassword" />
                <small v-if="!matchPasswords">Passwords do not match</small>

                <button class="btn bg-primary text-white" type="submit" :disabled="!matchPasswords">Sign Up</button>
                <router-link to="/"><a href="#">Already have an account?</a></router-link>
            </div>
        </form>
        <img class="register-img" src="@/assets/imgs/signin.svg" alt="#" />
    </div>
</template>

<script>
// import {mapState, mapActions} from 'vuex'

export default {
    name: 'BaseLogin',
    data() {
        return {
            userData: {
                name: '',
                email: '',
                password: '',
            },
            repassword: '',
        }
    },
    methods: {
        async register() {
            try {
                await this.$store.dispatch('userMod/setRegister', {
                    name: this.userData.name,
                    email: this.userData.email, 
                    password: this.userData.password
                });
                this.$store.dispatch('userMod/setIsRegister');
            } catch (error) {
                console.log(error);
            }
            finally {
                this.$router.push('/form');
            }
        }
    },
    computed: {
        matchPasswords() {
            return this.userData.password === this.repassword 
        },
    }
}
</script>