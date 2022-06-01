<template>
  <div class="row">
    <div class="col-md-12 left-bar">
      <div class="row">
        <div class="col-md-12">
          <h3>{{ loggedInUser.nickName }} <small>( {{ loggedInUser.email }} )</small></h3>
        </div>
      </div>
      <HS />
      <br />
      <ul class="user-list" v-if="users.length > 0">
        <li 
          class="user-list-item"
          v-for="(user, index) in users" :key="index"
          @click="sendMessageTo(user, index)"
          :class="{ 'active-item': highlighter[index] }"
        >
          <span>{{ user.nickName }} ( {{ user.email }} )</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AccountService from '../services/AccountService';
import HS from './HorizontalSeparator.vue';

export default {
  name: 'NavigationBar',
  components: {
    HS
  },
  data() {
    return {
      loggedInUser: this.$store.getters.getUser,
      users: [],
      highlighter: [],
    }
  },
  mounted() {
    console.log('user: ', this.loggedInUser);
    this.loadUsers();
  },
  methods: {
    loadUsers() {
      AccountService.getUsers().then(response => {
        this.users = response;
        this.users.unshift({ id: 'All', nickName: 'All', email: 'All' });
        this.prepareHighlighter(0);
      });
    },
    sendMessageTo(user, index) {
      if (user.id === 'All') {
        this.$root.$emit('broadcast');
      } else {
        this.$root.$emit('sendPrivateMessage', user);
      }

      this.prepareHighlighter(index);
    },
    prepareHighlighter(highlightIndex) {
      this.highlighter = [];
      let length = this.users.length;
      for (let i = 0; i < length; i++) {
        if (i === highlightIndex) {
          this.highlighter.push(true);
        } else {
          this.highlighter.push(false);
        }
      }
    },
  }
}
</script>

<style>
  ul.user-list {
    list-style: none;
    padding: 0;
  }

  ul li.user-list-item {
    padding: 10px;
    background-color: gray;
    border-radius: 3px;
    margin: 3px;
  }

  ul li:hover {
    background-color: darkslategrey;
    cursor: pointer;
  }

  .active-item {
    background-color: green !important;
  }

</style>