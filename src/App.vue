<template>
  <div id="app">
    <div id="nav">
      <nav>
        <div class="nav-wrapper red">
          <a href="#!" class="left" style="padding-left : 20px; font-size : 30px;">Bites</a>
          <ul class="right">
            <li>
              <router-link to="/" v-if="$store.state.token != ''">Home</router-link>
            </li>
            <li>
              <router-link to="/about">About</router-link>
            </li>
            <li><a @click="logOut()" v-if="$store.state.token != ''">Logout</a></li>
          </ul>
        </div>
      </nav>
    </div>
    <main class="flex-main">

      <body class="fixed-footer">
        <main class="flex-main">
          <div class="container" style="padding-top : 20px;" v-if="$store.state.token != ''">
            <router-view />
          </div>
          <div class="container" style="padding-top : 80px;" v-if="$store.state.token == ''">
            <div class="row">
              <h5 class="center">
                <auth-page />
              </h5>
            </div>
          </div>
        </main>
      </body>
    </main>
    <div id="footer">
      <footer class="page-footer red">
        <div class="container">
          <div class="row">
            <div class="col l6 s12">
              <h5 class="white-text left">Bites</h5>
              <p class="grey-text text-lighten-4">My Footer is Here!.</p>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          <div class="container">
            Bites © 2019 Copyright - Hesham Ahmed
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import AuthPage from '@/views/Auth.vue';
export default {
  components: {
    AuthPage
  },
  methods: {
    logOut() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
    }
  },
  created() {
    if (localStorage.token) {
      this.$store.commit('SET_AUTH_TOKEN', localStorage.token)
    }
  }

}

</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: black;
}

.fixed-footer {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.flex-main {
  flex: 1 0 auto;
}

input:not([type]):focus:not([readonly]),
input[type=text]:not(.browser-default):focus:not([readonly]),
input[type=password]:not(.browser-default):focus:not([readonly]),
input[type=email]:not(.browser-default):focus:not([readonly]),
input[type=url]:not(.browser-default):focus:not([readonly]),
input[type=time]:not(.browser-default):focus:not([readonly]),
input[type=date]:not(.browser-default):focus:not([readonly]),
input[type=datetime]:not(.browser-default):focus:not([readonly]),
input[type=datetime-local]:not(.browser-default):focus:not([readonly]),
input[type=tel]:not(.browser-default):focus:not([readonly]),
input[type=number]:not(.browser-default):focus:not([readonly]),
input[type=search]:not(.browser-default):focus:not([readonly]),
textarea.materialize-textarea:focus:not([readonly]) {
  border-bottom: 1px solid red !important;
  -webkit-box-shadow: 0 1px 0 0 red !important;
  box-shadow: 0 1px 0 0 red !important;
}

</style>
