<template>
  <div>
    <div class="row" v-if="!loading">
      <table>
        <th>Avatar</th>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Edit</th>
        <th>Delete</th>
        <tr v-for="(customer,index) in target_customers">
          <td><img class="circle" :src="customer.avatar" width="40"></td>
          <td>{{ customer.id }}</td>
          <td>{{ customer.first_name }}</td>
          <td>{{ customer.last_name }}</td>
          <td>{{ customer.email }}</td>
          <td><button class="button is-info" @click="openModel(index)">Edit</button></td>
          <td><button class="button is-danger" @click="deleteCustomer(index)">Delete</button></td>
        </tr>
      </table>
    </div>
    <div class="col s12" v-if="pages != 0">
      <div class="col s6 push-s4">
        <ul class="pagination-list">
          <li>
            <a class="pagination-link" :class="[(current_page == 1) ? activeClass : '']" aria-label="Page 1" aria-current="page" @click="customerPaging(1)">1</a>
          </li>
          <li v-for="(page,index) in pages">
            <a class="pagination-link" :class="[(current_page == index+2) ? activeClass : '']" aria-label="Goto page 2" @click='customerPaging(index+2)'>{{index + 2}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div>
    	 <div v-if = "loading">
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
<transition name="modal" v-if="showModal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <span class="right"><a @click="showModal = false">X</a></span>
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body" v-if="currentUpdating != null">
            	<h5>Update Customer</h5>
             <div class="col s12" style="padding : 40px;">
             	<div class="input-field col s12">
		          <input placeholder="First Name" type="text" class="" v-model="currentUpdating.first_name">
		        </div>
		        <div class="input-field col s12">
		          <input placeholder="Last Name" type="text" class="validate" v-model="currentUpdating.last_name">
		        </div>
		        <div class="input-field col s12">
		          <input placeholder="Email" type="text" class="validate"  v-model="currentUpdating.email">
		        </div>
             </div>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <div class="row">
              	<button class="button is-info right" :disabled="disable" @click="updateCustomer(currentUpdating)">Update</button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import $ from "jquery";
export default {

  name: 'ListCustomers',
  data() {
    return {
     showModal: false,
      target_customers: [],
      activeClass: 'is-current',
      current_page: 1,
      pages: 0,
      modalActiveClass : '',
      currentUpdating : null,
      loading : true,
      disable : false
    };
  },
  created() {
    axios({
      url: 'https://reqres.in/api/users',
      method: 'GET'
    }).then(response => {
      this.pages = response.data.total_pages - 1
      this.target_customers = response.data.data
      this.loading = false
    })
  },
  methods: {
    customerPaging(Page) {
      this.current_page = Page
      axios({
        url: 'https://reqres.in/api/users',
        method: 'GET',
        params: {
          page: Page
        }
      }).then(response => {
        this.target_customers = response.data.data
      })
    },
    deleteCustomer(Index){
    	axios({
         url : `https://reqres.in/api/users/${this.target_customers[Index].id}`,
         method : 'DELETE',
    	}).then(response=>{
           console.log('Customer deleted')
    	})
    	this.target_customers.splice(Index,1)
    },
    openModel(Index){
    	this.showModal = true
    	this.currentUpdating = this.target_customers[Index]
    },
    updateCustomer(obj){
    	this.disable = true
    	axios({
         url : `https://reqres.in/api/users/${obj.id}`,
         method : 'PUT',
         data : { obj }
    	}).then(response=>{
           console.log('Customer Updated')
           console.log(`https://reqres.in/api/users/${obj.id}`)
           this.showModal = false
           this.disable = false
    	})
    },
  },
};

</script>
<style lang="css" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
