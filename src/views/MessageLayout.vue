<template>
  <div class="row">
    <div class="col-md-4 col-sm-4">
      <NavigationBar />
    </div>
    <div class="col-auto">
      <VS />
    </div>
    <div class="col-md-7 col-sm-7">
      <MessageContainer />
    </div>
  </div>  
</template>

<script>
import NavigationBar from '../components/NavigationBar.vue';
import MessageContainer from '../components/MessageContainer.vue';
import VS from '../components/VerticalSeparator.vue';

export default {
  name: 'MessageLayout',
  components: {
    NavigationBar,
    MessageContainer,
    VS
  }
}
</script>