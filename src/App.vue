<template>
  <div id="app">
    <Sidebar />
    <router-view :key="$route.path" />
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar/Sidebar.vue";
export default {
  components: {
    Sidebar,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  text-decoration: none;
}
html {
  height: 100%;
}
body {
  height: 100%;
  background: #dee4e7;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  display: flex;
}
</style>
