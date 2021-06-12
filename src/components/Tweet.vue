<template>
  <div class="tweet">
    <img @click="pic" class="img" :src="url" />
    <div class="flexing">
      <div style="display:flex;">
        <p class="user">{{ user }}</p>
        <p class="arroba">@{{ user }}</p>
      </div>
      <div>
        <p class="time">{{ time }}</p>
      </div>
    </div>

    <p @click="$emit('commentsView')" class="text">{{ text }}</p>

    <div v-if="likesNum >= 0" class="svgs">
      <div @click="$emit('comment')" class="circle1">
        <svg viewBox="0 0 24 24" width="19px" height="19px" aria-hidden="true">
          <g>
            <path
              d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"
            ></path>
          </g>
        </svg>
      </div>
      <span class="num2">{{ commentsNum }}</span>
      <div class="circle2">
        <svg viewBox="0 0 24 24" width="19px" height="19px" aria-hidden="true">
          <g>
            <path
              d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"
            ></path>
          </g>
        </svg>
      </div>
      <div v-if="color == '#607586'" class="circle3" @click="$emit('liked')">
        <svg
          @click="col"
          class="icon3"
          viewBox="0 0 24 24"
          width="19px"
          height="19px"
          aria-hidden="true"
        >
          <g>
            <path
              d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"
            ></path>
          </g>
        </svg>
        <div>
          <span :style="{ color: color }" class="num">{{ likesNum }}</span>
        </div>
      </div>
      <div v-else style="fill:#e0245e" class="circle3" @click="$emit('liked')">
        <svg
          @click="col"
          class="icon3"
          viewBox="0 0 24 24"
          width="19px"
          height="19px"
          aria-hidden="true"
        >
          <g>
            <path
              d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"
            ></path>
          </g>
        </svg>
        <div>
          <span :style="{ color: color }" class="num">{{ likesNum }}</span>
        </div>
      </div>
      <button class="delete" @click="$emit('deltetwt')">
        <svg viewBox="0 0 24 24" aria-hidden="true" width="19px" height="19px">
          <g>
            <path
              d="M20.746 5.236h-3.75V4.25c0-1.24-1.01-2.25-2.25-2.25h-5.5c-1.24 0-2.25 1.01-2.25 2.25v.986h-3.75c-.414 0-.75.336-.75.75s.336.75.75.75h.368l1.583 13.262c.216 1.193 1.31 2.027 2.658 2.027h8.282c1.35 0 2.442-.834 2.664-2.072l1.577-13.217h.368c.414 0 .75-.336.75-.75s-.335-.75-.75-.75zM8.496 4.25c0-.413.337-.75.75-.75h5.5c.413 0 .75.337.75.75v.986h-7V4.25zm8.822 15.48c-.1.55-.664.795-1.18.795H7.854c-.517 0-1.083-.246-1.175-.75L5.126 6.735h13.74L17.32 19.732z"
            ></path>
            <path
              d="M10 17.75c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75zm4 0c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75z"
            ></path>
          </g>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { onMounted } from "@vue/runtime-core";
export default {
  name: "Tweet",
  props: {
    text: String,
    time: String,
    user: String,
    length: Number,
    likes: String,
    likesNum: Number,
    color: String,
    commentsNum: Number,
    watchingComment: Boolean,
  },
  data() {
    return {
      url: "",
    };
  },
  methods: {
    pic() {
      firebase
        .database()
        .ref("/users/" + this.user)
        .once("value", (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            var childData = childSnapshot.val();
            this.url = childData;
          });
        });
    },
  },
  mounted() {
    this.pic();
  },
  updated() {
    this.pic();
  },
};
</script>

<style scoped>
.tweet {
  display: flex;
  flex-direction: row;
  border-style: solid;
  border-width: 1px;
  border-color: #ebeef0;
  border-right: 0px;
  border-left: 0px;
  border-top: 0px;
  max-width: 600px;
  flex-wrap: wrap;
  width: 600px;
  margin-bottom: 0px;
  justify-content: flex-start;
  background-color: white;
}
.tweet:hover {
  background-color: #f7f7f7;
}
.tweet:hover .delete {
  background-color: #f7f7f7;
}
.user {
  padding-top: 10px;
  padding-left: 20px;
  font-weight: bolder;
  font-size: 15px;
}
.time {
  display: flex;
  justify-self: flex-end;
  padding-top: 10px;
  color: #5b7183;
  margin-right: 10px;
}
.text {
  display: flex;
  flex-wrap: wrap;
  padding-left: 78px;
  align-self: center;
  position: relative;
  bottom: 22px;
  min-width: 400px;
  max-width: 401px;
  min-height: 40px;
}
.arroba {
  padding-top: 10px;
  padding-left: 8px;
  font-size: 15px;
  color: #5b7183;
  font-weight: 200px;
}
.img {
  width: 48px;
  height: 48px;
  border-radius: 25px;
  margin-left: 10px;
  margin-top: 10px;
}
.svgs {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  fill: #607586;
  margin-left: 78px;
  margin-bottom: 12px;
}

.wrap {
  display: flex;
  flex-wrap: wrap;
}

.circle1 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 120px;
  border-radius: 25px;
  height: 30px;
  width: 30px;
}
.circle1:hover {
  background-color: #e1eff6;
  fill: #82c7f4;
  cursor: pointer;
}
.circle1:hover + .num2 {
  color: #82c7f4;
}
.circle2 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 120px;
  border-radius: 25px;
  height: 30px;
  width: 30px;
}
.circle2:hover {
  background-color: #e1f1e8;
  fill: #6dd094;
  cursor: pointer;
}
.circle3 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 120px;
  border-radius: 25px;
  height: 30px;
  width: 30px;
}
.circle3:hover {
  background-color: #f4d2dc;
  fill: #e75d8b;
  cursor: pointer;
}
.circle3:hover .num {
  color: blue;
}
.circle4 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 120px;
  border-radius: 25px;
  height: 30px;
  width: 30px;
}
.circle4:hover {
  background-color: #e1eff6;
  fill: #82c7f4;
  cursor: pointer;
}
.deletediv {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 41px;
  position: relative;
  bottom: 30px;
}
.delete {
  border-style: none;
  background-color: white;
}
.delete:hover {
  fill: #e96190;
  cursor: pointer;
}
.num {
  color: #607586;
  position: relative;
  left: 20px;
  bottom: 0px;
  font-size: 14px;
}

.num2 {
  color: #607586;
  position: relative;
  top: 8px;
  right: 110px;
  font-size: 13px;
}
.icon3 {
  position: relative;
  left: 4px;
}
.comments {
  margin-left: 84px;
  margin-bottom: 12px;
  color: #2398e0;
}
.arrow-svg {
  width: 23px;
  height: 23px;
  fill: #1da1f2;
}
.arrow {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
}
.arrow:hover {
  background-color: #e8f5fe;
}

.comments-header {
  display: flex;
  align-items: center;
  padding-left: 16px;
  background-color: white;
  border-bottom: solid;
  border-width: 1px;
  border-color: #ebeef0;
  min-height: 53px;
}
.header-title {
  padding-left: 20px;
  font-weight: bolder;
  color: #0f1419;
  font-size: 20px;
}
.flexing {
  display: flex;
  width: 540px;
  justify-content: space-between;
}
@media screen and (max-width: 850px) {
  .tweet {
    display: flex;
    flex-direction: row;
    border-style: solid;
    border-width: 1px;
    border-color: #ebeef0;
    border-right: 0px;
    border-left: 0px;
    border-top: 0px;
    flex-wrap: wrap;
    margin-bottom: 0px;
    justify-content: flex-start;
    background-color: white;
    width: 100%;
    max-width: 1000px;
  }
}
@media screen and (max-width: 599px) {
  .time {
    display: none;
  }
  .flexing {
    display: flex;
    width: auto;
    justify-content: space-between;
  }
}
@media screen and (max-width: 544px) {
  .text {
    display: flex;
    flex-wrap: wrap;
    padding-left: 128px;
    align-self: center;
    position: relative;
    bottom: 22px;
    min-width: 400px;
    max-width: 401px;
    min-height: 40px;
  }
  .user {
    padding-top: 10px;

    font-weight: bolder;
    font-size: 15px;
  }
  .arroba {
    padding-top: 10px;

    font-size: 15px;
    color: #5b7183;
    font-weight: 20px;
    min-width: 150px;
  }
  .img {
    width: 48px;
    height: 48px;
    border-radius: 25px;
    margin-left: 60px;
    margin-top: 10px;
  }
}
@media screen and (max-width: 452px) {
  .text {
    display: flex;
    flex-wrap: wrap;
    padding-left: 168px;
    align-self: center;
    position: relative;
    bottom: 22px;
    min-width: 400px;
    max-width: 401px;
    min-height: 40px;
  }
  .user {
    padding-top: 10px;

    font-weight: bolder;
    font-size: 15px;
  }
  .arroba {
    padding-top: 10px;

    font-size: 15px;
    color: #5b7183;
    font-weight: 20px;
  }
  .img {
    width: 48px;
    height: 48px;
    border-radius: 25px;
    margin-left: 100px;
    margin-top: 10px;
  }
  .circle2 {
    display: none;
  }
  .delete {
    margin-left: 30px;
  }
  .circle1 {
    margin-left: 30px;
  }
  .circle3 {
    margin-left: 30px;
  }
}
</style>
