<template>
  <div class="view">
    <div class="header">
      <div @click="$emit('back')" class="svg-radius">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <g>
            <path
              d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"
            ></path>
          </g>
        </svg>
      </div>
      <input
        @click="$emit('addComment', commentText), (commentText = '')"
        class="tweet-btn"
        type="submit"
        value="Responder"
      />
    </div>
    <div class="main">
      <div class="tweet">
        <img
          class="img"
          src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
          alt=""
        />
        <p class="user">{{ user }}</p>
        <p class="arroba">@{{ user }}</p>
        <p class="time">{{ time }}</p>
        <p class="text">{{ text }}</p>
      </div>

      <div class="line"></div>
      <div class="tweet">
        <img
          class="img"
          src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
          alt=""
          style="margin-bottom:15px"
        />
        <!--<input placeholder="Tweet your answer" type="text" />-->
        <textarea
          v-model="commentText"
          placeholder="Tweet your answer"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Answer",
  props: {
    user: String,
    time: String,
    text: String,
  },
  data() {
    return {
      commentText: "",
    };
  },
};
</script>

<style scoped>
.view {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.answerTweet {
  display: flex;
}
.header {
  display: flex;
  height: 60px;
  justify-content: space-between;
  width: 70%;

  border: solid;
  border-width: 1px;
  border-top: none;
  border-color: #c4cfd6;
}
svg {
  height: 22.5px;
  width: 22.5px;
  fill: #1da1f2;
}
.svg-radius {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 40px;
  width: 40px;
  margin-left: 15px;
  margin-top: 10px;
  border-radius: 25px;
}
.svg-radius:hover {
  background-color: #e8f5fe;
}

.tweet-btn {
  display: flex;
  background-color: #1da1f2;
  color: white;
  border: none;
  cursor: pointer;
  outline: inherit;
  border-radius: 25px;
  height: 32px;
  width: 112px;
  justify-content: center;
  font-size: 16px;
  font-weight: bolder;
  align-items: center;
  margin: 15px;
}
.main {
  width: 70%;
  height: 50vh;
  border: solid;
  border-width: 1px;
  border-top: 0px;
  border-color: #c4cfd6;
}
.tweet {
  display: flex;
  flex-direction: row;

  border-color: #ebeef0;
  border-right: 0px;
  border-left: 0px;
  border-top: 0px;
  max-width: 600px;
  flex-wrap: wrap;
  width: 600px;
  margin-bottom: 0px;
  justify-content: flex-start;
  margin-left: 50px;
}
.user {
  padding-top: 10px;
  padding-left: 20px;
  font-weight: bolder;
  font-size: 15px;
}
.time {
  padding-top: 10px;
  padding-left: 10px;
  color: #5b7183;
  width: auto;
}
.text {
  display: flex;
  flex-wrap: wrap;
  padding-left: 78px;
  align-self: center;
  position: relative;
  bottom: 22px;
}
.arroba {
  padding-top: 10px;
  padding-left: 8px;
  font-size: 15px;
  color: #5b7183;
  font-weight: 200px;
  width: auto;
}
.text {
  min-width: 500px;
}
.img {
  width: 48px;
  height: 48px;
  border-radius: 25px;
  margin-left: 10px;
  margin-top: 10px;
}
.line {
  background-color: #c4cfd6;
  min-height: 50px;
  max-width: 3px;
  border-radius: 25px;
  margin-left: 82px;
  position: relative;
  bottom: 10px;
}
textarea {
  height: 100px;
  margin-top: 20px;
  outline: none;
  border-style: none;
  margin-left: 10px;
  font-size: 20px;
  width: 88%;
  resize: none;
}
@media screen and (max-width: 650px) {
  .main {
    width: 100%;
  }
  .header {
    width: 100%;
  }
}
</style>
