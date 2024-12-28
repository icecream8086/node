<template>
  <div class="about">
    <p>__________________________________</p>
    <div>
      <p>{{ uid }}</p>
    </div>
    <div>
      <p>{{ name }}</p>
    </div>
    <el-button @click="test()" type="">WWWWW</el-button>

  </div>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';
const uid = ref('');
const name = ref('');
function test() {
  axios.get('/api' + '/users').then(res => {
    uid.value = res.data[0].UserID;
    name.value = res.data[0].Name;
    console.log(res);

  }).catch(err => {
    console.log(err);
  });
}
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
