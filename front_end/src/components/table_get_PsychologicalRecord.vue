<template>
  <el-card>
    <span>Psychological Record</span>
    <p>&nbsp;</p>
    <el-row>
      <el-col :span="2"></el-col>
      <el-col :span="20">
        <div style="border: 2px solid #ebeef5; border-radius: 10px; padding: 10px">
          <el-table :data="record" height="250" style="width: 100%">
            <el-table-column prop="RecordID" label="RecordID" width="180" />
            <el-table-column prop="CreateDate" label="CreateDate" width="180" />
            <el-table-column prop="UpdateDate" label="UpdateDate" />
            <el-table-column prop="PsychologicalStatus" label="PsychologicalStatus" />
          </el-table>
        </div>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { defineProps } from 'vue';

// 定义 props
const props = defineProps({
  record: {
    type: Array,
    required: true,
  }
});
</script>

<!-- 
示例使用 
<MyComponent :record="yourRecordData"/>
你的 record 数据可以从父组件传入
-->
