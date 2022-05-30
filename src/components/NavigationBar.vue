<template>
  <div class="row">
    <div class="col-md-12 left-bar">
      <div>
        <h3>{{ loggedInUser.nickName }}</h3>
        <p>{{ loggedInUser.email }}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NavigationBar',
  data() {
    return {
      loggedInUser: this.$store.getters.getUser,
    }
  },
  mounted() {
    console.log('user: ', this.loggedInUser);
  }
}
</script>

<style>

</style>