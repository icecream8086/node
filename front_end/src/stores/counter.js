
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++;
    },
    clear() {
      this.count = 0; // 清除数据，将 count 设为 0
    },
    updateCount(newCount) {
      this.count = newCount; // 编辑数据，将 count 设为新的值
    },
  },
});

/**
 * The store is defined using defineStore from pinia.

<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">Increment</button>
    <button @click="clear">Clear</button>
    <button @click="editCount(42)">Set Count to 42</button>
  </div>
</template>

<script setup>
import { useCounterStore } from './stores/counter';

const counterStore = useCounterStore();
const { count, increment, clear, updateCount } = counterStore;

// 定义一个函数来调用 updateCount action
const editCount = (newCount) => {
  updateCount(newCount);
};
</script>

 */