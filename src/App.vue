<template>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
    rel="stylesheet"
  />
  <div class="container">
    <Sidebar />
    <Feed class="feed" />
    <Search class="search" />
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Search from "./components/Search";
export default {
  name: "App",
  components: { Sidebar, Feed, Search },
};
</script>

<style>
* {
  font-family: "Roboto", "sans-serif";
  margin: 0;
}
.container {
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
}
.Feed {
  display: flex;
}
</style>
