<template>
  <div>
    <div>
      <div class="row" style="border : 1px solid #dbdbdb; border-radius : 10px; padding : 50px !important">
        <div class="input-field col s12 l6 offset-l3">
          <input placeholder="Email" type="text" class="validate" v-model="userForm.email">
        </div>
        <div class="input-field col s12 l6 offset-l3">
          <input placeholder="Password" type="password" class="validate" v-model="userForm.password">
        </div>
      </div>
      <div class="row">
        <div class="center">
          <button class="button red white-text" :disabled="disabled" style="border : 0px !important" @click="loginUser">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import cookies from 'vue-cookie';
export default {

  name: 'Login',

  data() {
    return {
      userForm: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      },
      loading: false,
      disabled : false
    };
  },
  methods: {
    loginUser() {
      this.disabled = true
      let user = this.userForm
      this.$store.dispatch('login', { email: user.email, password: user.password })
        .then(() => this.$router.push('/') ,this.disabled = false)
        .catch(err => console.log(err))
    }
  }
};

</script>
<style lang="css" scoped>
</style>
