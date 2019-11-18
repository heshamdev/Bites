<template>
  <div>
    <div v-if="$store.state.status == ''">
      <h3>BitesApp</h3>
      <div>
        <ul>
          <li>You can <b class="red-text">Sign in</b> down there.</li>
        </ul>
      </div>
    </div>
    <div class="" style="padding-top : 20px">
        <login-component v-if="$store.state.status == ''" />
    </div>
    <div v-if = "$store.state.status == 'loading'">
          <div class="preloader-wrapper active">
          <div class="spinner-layer spinner-red-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import LoginComponent from '@/components/Login.vue';
export default {
  name: 'Auth',
  components: {
    LoginComponent,
  },
  data() {
    return {

    };
  },
  methods: {
  },
};

</script>
<style lang="css" scoped>
</style>
