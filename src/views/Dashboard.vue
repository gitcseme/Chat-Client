<template>
  <div class="row">
    <div class="col-md-12">
      <Header/>
      <HS/>
      <MessageLayout/>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import HS from '../components/HorizontalSeparator.vue';
import MessageLayout from '../views/MessageLayout.vue';

export default {
  name: 'Dashboard',
  components: {
    Header,
    HS,
    MessageLayout
  }
}
</script>

<style>

</style>
