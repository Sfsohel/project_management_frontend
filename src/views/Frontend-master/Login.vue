<template>
  <section class="section-container">
    <v-row class="signin">
      <v-col cols="8" class="left">
        <h1>Welcome to Project Management System</h1>
      </v-col>
      <v-col cols="4" class="right">
        <h2>LOGIN</h2>
        <!-- <validation-observer ref="observer"> -->
        <v-form @submit.prevent="submit">
          <!-- <validation-provider v-slot="{ errors }" name="Name" rules="required|email"> -->
          <v-text-field v-model="email" label="Email" required outlined dark filled dense></v-text-field>
          <!-- </validation-provider> -->
          <!-- <validation-provider v-slot="{ errors }" name="email" rules="required"> -->
          <v-text-field v-model="password" label="Password" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPass = !showPass" required outlined dense dark filled
            :type="showPass ? 'text' : 'password'"></v-text-field>
          <!-- </validation-provider> -->
          <div class="text-center">
            <v-btn class="signin-btn" type="submit" rounded color="white" dark>
              Sign In
            </v-btn>
          </div>
          <br><br>
          <div class="text-center">
            <v-btn class="signin-btn" type="button" rounded color="white" dark>
              <router-link to="/sign-up">Sign Up As Company</router-link>
            </v-btn>
          </div>
        </v-form>
        <!-- </validation-observer> -->
      </v-col>
    </v-row>
  </section>
</template>
<script>
// import { required, email } from '@vee-validate/rules'
// import { extend, ValidationProvider, setInteractionMode, ValidationObserver } from 'vee-validate'

// setInteractionMode('eager')

// defineRule('required', required);
// defineRule('email', email);
// defineRule('min', min);
// import "../../assets/login-style.scss";
import axios from 'axios'
export default {
  components: {
    // ValidationProvider,
    // ValidationObserver
  },
  data: () => ({
    email: '',
    password: null,
    showPass: false
  }),
  computed: {
    params() {
      return {
        email: this.email,
        password: this.password
      }
    }
  },
  methods: {
    async submit() {
      // if (this.$refs.loginForm.validate()) {
      let result = await axios.post('login', { email: this.email, password: this.password });
      if (result.status === 200 && result.data.access_token) {
        localStorage.setItem("user-token", result.data.access_token);
        localStorage.setItem("user", JSON.stringify(result.data.user));
        axios.defaults.headers.common = { 'Authorization': `Bearer ${result.data.access_token}` }
        this.$router.push({ name: "home" });
          // this.getRolesAndPermission();
          // if (result.data.user.type == "admin" || result.data.user.type == "manager") {
          //   this.$store.dispatch("allpermission");
          //   this.$router.push({ name: "Income Report" });
          // }
          // else {
          //   this.$store.dispatch("allpermission");
          //   this.$router.push({ name: "Payments" });
          // }
        } else {
          console.log('login invalid');
          // this.credentialError = !this.credentialError;
        }
      // }
    },
    // async submit() {
    // //   const valid = await this.$refs.observer.validate()
    // //   if (valid) {
    // //     this.login(this.params) // action to login
    // //   }
    // },
    clear() {
      // you can use this method to clear login form
    //   this.email = ''
    //   this.password = null
    //   this.$refs.observer.reset()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/login-style.scss";
</style>