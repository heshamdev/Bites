<template>
  <div class="home">
    <h3>Customers List</h3>
    <div class="row" style="padding-top : 10px;">
      <list-customers />
    </div>
  </div>
</template>
<script>
import ListCustomers from '@/components/ListCustomers.vue';
export default {
  name: 'home',
  components: {
    ListCustomers
  },
};

</script>
