<template>
  <div>
    <div class="comments-header">
      <div class="arrow" @click="$emit('backToFeed')">
        <svg class="arrow-svg" viewBox="0 0 24 24" aria-hidden="true">
          <g>
            <path
              d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"
            ></path>
          </g>
        </svg>
      </div>
      <span class="header-title">Comments</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Commentsheader",
};
</script>

<style scoped>
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
@media screen and (max-width: 544px) {
  .arrow {
    padding-left: 40px;
  }
}
@media screen and (max-width: 450px) {
  .arrow {
    padding-left: 80px;
  }
}
</style>
