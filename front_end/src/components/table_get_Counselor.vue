<template>
  <el-card>
    <span>Counselor Record</span>
    <p>&nbsp;</p>
    <el-row>
      <el-col :span="2"></el-col>
      <el-col :span="20">
        <div style="border: 2px solid #ebeef5; border-radius: 10px; padding: 10px">
          <el-table :data="counselor" height="250" style="width: 100%">
            <el-table-column prop="CounselorID" label="CounselorID" width="180" />
            <el-table-column prop="Name" label="Name" width="180" />
            <el-table-column prop="Gender" label="Gender" />
            <el-table-column prop="Birthdate" label="Birthdate" />
            <el-table-column prop="ContactInfo" label="ContactInfo" />
            <el-table-column prop="CertificationNumber" label="CertificationNumber" />
            <el-table-column prop="SpecialtyArea" label="SpecialtyArea" />
            <el-table-column prop="Department" label="Department" />
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
  counselor: {
    type: Array,
    required: true,
  }
});
</script>
