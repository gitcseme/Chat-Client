<template>
  <div id="app">
    <div class="container-fluid con-bg">
      <div class="row">
        <div class="col-12">
          <h2>App vue</h2>
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.con-bg {
  background-color: #2c3e50;
}

</style>
