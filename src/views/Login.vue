<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h3>Login</h3>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <form @submit.prevent="onLogin">
          <div class="form-group">
            <label for="email">Email address</label>
            <input required type="email" class="form-control" id="email" v-model="model.email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input required type="password" class="form-control" id="password" v-model="model.password">
          </div>
          <!-- checkbox for rememberMe -->
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="rememberMe" v-model="model.rememberMe">
            <label class="form-check-label" for="rememberMe">Remember me</label>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AccountService from '../services/AccountService';

export default {
  name: 'Login',
  data() {
    return {
      model: {
        email: '',
        password: '',
        rememberMe: false
      }
    }
  },
  methods: {
    onLogin() {
      AccountService.login(this.model).then((response) => {
        console.log('Login success: ', response);
        // navigate to dashboard
        this.$router.push({ name: 'dashboard' });
      }).catch((error) => {
        console.log('Login failed: ', error);
      });
    }
  }
}
</script>