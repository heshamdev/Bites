<template>
  <div>
    <div>
      <div class="row" style="border : 1px solid #dbdbdb; border-radius : 10px; padding : 50px !important">
        <div class="input-field col s12 l6 offset-l3">
          <input placeholder="Email" type="text" class="validate" v-model="userForm.email">
          <div  style="font-size : 10px; " class="left red-text" v-if="inputEmail">*{{inputEmail}}</div>
        </div>
        <div class="input-field col s12 l6 offset-l3">
          <input placeholder="Password" type="password" class="validate" v-model="userForm.password">
          <div  style="font-size : 10px; " class="left red-text" v-if="inputPassword">*{{inputPassword}}</div>
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
      disabled : false,
      flag : true
    };
  },
  methods: {
    loginUser() {
     if(this.flag){
       this.disabled = true
      let user = this.userForm
      this.$store.dispatch('login', { email: user.email, password: user.password })
        .then(() => this.$router.push('/') ,this.disabled = false)
        .catch(err => console.log(err))
     }
    }
  },
  computed :{
    inputPassword(){
              if(this.userForm.password == ''){
                this.flag = false
                return 'Password is Required!'
              }
                this.flag = true
                return false
    },
    inputEmail(){
              if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userForm.email)) || this.userForm.email == ''){
                this.flag = false
                return 'Email Formate!'
              }
              this.flag = true
              return false
    }
  }
};

</script>
<style lang="css" scoped>
</style>
