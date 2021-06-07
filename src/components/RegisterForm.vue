<template>
  <div class="card">
    <div class="header">
      <svg
        class="svg1"
        width="40px"
        height="40px"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <g>
          <path
            d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"
          ></path>
        </g>
      </svg>
      <h1>Crea tu cuenta</h1>
      <form
        @submit.prevent="
          $emit('register', { user: user, email: email, password: password })
        "
      >
        <!--<input v-model="user" class=input placeholder="Usuario" type="text">-->
        <p class="error">{{ error }}</p>
        <input v-model="email" class="input" placeholder="Email" type="text" />
        <input
          v-model="password"
          placeholder="Password"
          class="input"
          type="text"
        />
        <input type="submit" class="tweet-btn" value="Registrate" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",
  props: {
    error: String,
  },
  data() {
    return {
      registerData: {
        user: "",
        email: "",
        password: "",
        id: "",
      },
    };
  },
};
</script>

<style scoped>
.card {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-left: 183px;
}
.svg1 {
  fill: #1da1f2;
}
.header {
  height: auto;
  margin-top: 20px;
  margin-right: 120px;
}
h1 {
  font-weight: 750;
  font-size: 31px;
  margin-top: 32px;
}
.input {
  width: 80%;
  margin-top: 30px;
  height: 56px;
  border: 1px solid lightgray;
  outline: none;
  border-radius: 5px;
  padding-left: 10px;
  font-weight: 400;
  font-size: 18px;
  transition: 0.5s;
}

.tweet-btn {
  display: flex;
  background-color: #1da1f2;
  color: white;
  border: none;
  cursor: pointer;
  outline: inherit;
  border-radius: 25px;
  width: 80%;
  height: 48px;
  justify-content: center;
  font-size: 16px;
  font-weight: bolder;
  align-items: center;
  margin-top: 32px;
}
.input:focus {
  border: 1px solid #1da1f2;
}
.error {
  color: #e0245e;
  padding-top: 15px;
}
</style>
