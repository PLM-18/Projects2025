<template>
  <div id="app">
    <nav>
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/schema" class="nav-link">Schema View</router-link>
      <router-link to="/xml" class="nav-link">XML View</router-link>
    </nav>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

nav {
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.nav-link {
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
  margin-right: 1rem;
}

.router-link-active {
  text-decoration: underline;
  color: #007bff;
}

main {
  padding: 2rem;
}
</style>
