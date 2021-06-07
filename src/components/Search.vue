<template>
  <div class="view">
    <div class="input">
      <input
        @change="$emit('search', search)"
        v-model="search"
        type="text"
        placeholder="Search  Tweet"
      />
    </div>
    <div class="card">
      <div class="item2">
        <h2 class="title">What's happening</h2>
      </div>
      <div class="item">
        <span class="subtitle">Premier League | Live</span>
        <p class="content">Newcastle United vs Manchester City</p>
        <img
          alt=""
          draggable="true"
          src="https://pbs.twimg.com/semantic_core_img/1306969533857456129/6ee_xbT4?format=jpg&amp;name=240x240"
          class="img"
          width="68 "
          height="68"
        />
      </div>
      <div class="item">
        <span class="subtitle">News | Live</span>
        <p class="content">
          Colombia vive la jornada 17 del paro nacional
        </p>
        <img
          alt=""
          draggable="true"
          src="https://pbs.twimg.com/semantic_core_img/1391110806608125953/dG-1mZAh?format=jpg&name=small"
          class="img"
          width="68 "
          height="68"
        />
      </div>
      <div class="item">
        <span class="subtitle">Covid-19 </span>
        <p class="content">
          Expertos y autoridades de salud explican que barbijos caseros y
          medidas de distanciamiento son efectivos frente a las variantes de
          COVID-19
        </p>
        <img
          alt=""
          draggable="true"
          src="https://pbs.twimg.com/semantic_core_img/1393239376751054848/CYYYum6v?format=jpg&name=240x240"
          class="img2"
          width="68 "
          height="68"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      search: "",
    };
  },
  methods: {},
};
</script>

<style scoped>
.view {
  display: flex;
  flex-grow: 1;
  padding-left: 30px;
  padding-top: 3px;
  flex-direction: column;
}
input {
  padding-left: 15px;
  display: flex;
  width: 345px;
  height: 45px;
  border-radius: 100px;
  font-size: 18px;
  outline: none;
  border-style: none;
  background-color: #ebeef0;
}
.card {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  background-color: #f7f9fa;
  border-radius: 25px;
  width: 360px;
  height: auto;
}
.item {
  display: flex;
  flex-direction: column;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: solid;
  border-color: lightgray;
  border-width: 1px;
  max-height: 160px;
  flex-wrap: wrap;
  justify-content: center;
}
.item2 {
  display: flex;
  flex-direction: column;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 10px;

  border-color: lightgray;
  border-width: 1px;

  flex-wrap: wrap;
  justify-content: center;
}
.title {
  font-size: 20px;
  font-weight: bolder;
  margin-left: 20px;
}
.subtitle {
  font-size: 14px;
  color: #5b7083;
  height: 17px;

  margin-left: 20px;
  width: 70%;
}
.content {
  color: #0f1419;
  font-size: 16px;
  font-weight: bold;
  width: 70%;
  margin-top: 2%;
  margin-left: 20px;
  line-height: 20px;
}
.img {
  display: flex;
  border-radius: 25px;
  align-self: flex-end;
  justify-self: flex-start;
  position: relative;
  bottom: 60px;
}
.img2 {
  display: flex;
  border-radius: 25px;
  align-self: flex-end;
  justify-self: flex-start;
  position: relative;
  bottom: 0px;
}

@media screen and (max-width: 960px) {
  .view {
    display: none;
  }
}
</style>
