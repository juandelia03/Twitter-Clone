<template>
    <div class="tweet">
        <p class="user">{{user}}</p>
        
        <p class="time">{{time}}</p>
        <p class="text">{{text}}</p>
    </div>
</template>

<script>
export default {
    name:"Tweet",
    props:{
        text:String,
        time:String,
        user:String,
    }
}
</script>

<style scoped>
.tweet{
    display: flex;
    flex-direction:row ;
    border-style: solid;
    border-width: 1px;
    border-color: lightgray;
    max-width: 600px;
    flex-wrap: wrap;
    width: 600px;
} 
.user{
    padding-left:20px ;
    width: 40% ;
}
.time{
    width: 40%;
}
.text{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 20px;
}
</style>