<template>
  <div class="clock">{{ currentTime }}</div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'SegClock',
  setup() {
    const currentTime = ref('')

    const updateTime = () => {
      const date = new Date()
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      currentTime.value = `${hours}:${minutes}:${seconds}`
    }

    onMounted(() => {
      updateTime()
      const interval = setInterval(updateTime, 1000)
      onUnmounted(() => {
        clearInterval(interval)
      })
    })

    return {
      currentTime
    }
  }
}
</script>

<style scoped>
@import '../assets/ttf/base_seg.css';
.clock {
  display: inline-block;   /* 缩小范围 */
  font-family: Digital, monospace;
  font-size: 2rem;        /* 设置合理的字体大小 */
  color: blue;            /* 修改字体颜色为蓝色 */
  padding: 0;             /* 最小化内边距 */
  margin: 0;              /* 最小化外边距 */
  vertical-align: middle; /* 与文本居中对齐 */
}
</style>