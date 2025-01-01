<template>
    <div class="update-PsychologicalRecords">
        <el-card>
            <el-form :model="localForm" :rules="rules" ref="passwordForm" label-width="100px">
                <el-form-item label="Psychological Status" prop="PsychologicalStatus">
                    <el-input v-model="localForm.PsychologicalStatus" placeholder="Enter psychological status" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">Update Status</el-button>
                    <el-button @click="resetForm">Reset</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import axios from 'axios' // 引入 axios

const router = useRouter(); // 获取路由实例

const localForm = ref({
    PsychologicalStatus: ''
})

const rules = ref({
    PsychologicalStatus: [{ required: true, message: 'Please enter psychological status', trigger: 'blur' }]
})

const submitForm = async () => {
    const form = localForm.value
    try {
        // 使用 axios 发送 POST 请求
        const response = await axios.post('/api/PsychologicalRecords/add_PsychologicalRecords', new URLSearchParams({
            PsychologicalStatus: form.PsychologicalStatus
        }), {
            headers: {
                'token': localStorage.getItem('token'),
            }
        })
        ElMessage.success('Status updated successfully')
        console.log(response);
        
    } catch (error) {
        console.error('Error updating status:', error)
        ElMessage.error('Error updating status')
    }
}

const resetForm = () => {
    localForm.value.PsychologicalStatus = ''
}

const goBack = () => {
    router.back()
}
</script>

<style scoped>
.update-PsychologicalRecords {
    max-width: 480px;
    margin: 0 auto;
    padding-top: 20px;
}
</style>