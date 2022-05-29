<template>
  <div class="row">
    <div class="col-md-12 header">
      <button @click="onLogout" class="btn btn-outline-danger">Logout</button>
    </div>
  </div>
</template>

<script>
import AccountService from '../services/AccountService';

export default {
  methods: {
    onLogout() {
      AccountService.logout().then(() => {
        this.$router.push({ name: 'login' });
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
}
</script>

<style>
.header {
  text-align: right;
}
</style>