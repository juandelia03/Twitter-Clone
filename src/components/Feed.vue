<template>
  <div class="feed">
    <div class="inicio">
      <h2 style="font-weight:900">Inicio</h2>
      <svg style="fill:#1da1f2" height="22px" width="22px" viewBox="0 0 24 24" class="svg">
        <g>
          <path
            d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"
          ></path>
        </g>
      </svg>
    </div>
    <form class="tweet" @submit.prevent="$emit('submited',text)" @submit="clear">
      <div class="top">
      <img class="img" src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" alt="">
        <input v-model="text" type="text" class="input-text" placeholder="What's happening?" />
      </div>
      <div class="bottom">
        <input  class="tweet-btn" type="submit" value="Tweet" />
      </div>
    </form>
    
    </div>
   
   
</template>

<script>

export default {
  name: "Feed",
  data() {
    return {
      img: "../assets/foto.png",
      text:""
      
    };
  },
  methods:{
    clear(){
      this.text=""
    }
  }
  
};
</script>

<style scoped>
.feed {
  display: flex;
  border-style: solid;
  border-top: 0px;
  border-bottom: 0px;
  border-right: 0px;
  border-left: 0px;
  border-width: 1px;
  border-color: #ebeef0;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex-grow: 1;
}
.inicio {
  display: flex;
  width: auto;
  height: 53px;
  border-bottom: solid;
  border-color: #ebeef0;
  border-width: 1px;
  padding: 0% 3% 0% 3%;
  font-size: 14px;
  font-weight: bold;
  align-items: center;
  justify-content: space-between;
  background-color: white;
}
.tweet {
  display: flex;
  justify-content: flex-start;
  border-style: solid;
  border-width: 1px;
  border-color: #ebeef0;
  border-top: none;
  border-right: none;
  border-left: none;
  flex-wrap: wrap;
  height: 120px;
  background-color:white ;
}
.input-text {
  height: 100%;
  border-style: none;
  outline: none;
  font-weight: normal;
  font-size: 20px;
  position: relative;
  bottom: 12px;
  left:5px;
  margin-left: 5px;
  
}
.svg {
  display: flex;
  fill: #1783c5;
}
.profile {
  padding-left: 5px;
}
.tweet-btn {
  display: flex;
  background-color: #1da1f2;
  color: white;
  border: none;
  cursor: pointer;
  outline: inherit;
  border-radius: 25px;
  width: 90px;
  height: 40px;
  justify-content: center;
  font-size: 16px;
  font-weight: bolder;
}
.tweet-btn:hover {
  background-color: #1e92da;
  color: white;
}
.bottom {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 2%;
  padding-bottom: 1.5%;
}
.top {
  padding: 10px;
}
.img{
  width:48px ;
  height: 48px;
  border-radius: 25px;
  padding-left: 1px;
  padding-top: 1px;
}
</style>
