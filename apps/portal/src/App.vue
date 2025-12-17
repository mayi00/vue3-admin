<template>
  <div id="app">
    <header class="app-header">
      <h1>Vue3 Admin Portal</h1>
    </header>
    <main class="app-main">
      <router-view />
    </main>
    <footer class="app-footer">
      <p>&copy; 2023 Vue3 Admin Portal. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
// App component logic here
</script>

<style lang="less">
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #1890ff;
  color: white;
  padding: 1rem;
  text-align: center;
}

.app-main {
  flex: 1;
  padding: 2rem;
}

.app-footer {
  background-color: #f0f2f5;
  padding: 1rem;
  text-align: center;
  color: #666;
}
</style>
