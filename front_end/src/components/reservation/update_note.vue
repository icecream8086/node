<template>
    <div class="update-psychological-records">
        <el-card>
            <el-form :model="localForm" :rules="rules" label-width="100px">
                <el-form-item label="Record ID" prop="RecordID">
                    <el-input v-model="localForm.RecordID" />
                </el-form-item>
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
import axios from 'axios' // 引入 axios

const localForm = ref({
    RecordID: '',
    PsychologicalStatus: ''
})

const rules = ref({
    RecordID: [{ required: true, message: 'Please enter record ID', trigger: 'blur' }],
    PsychologicalStatus: [{ required: true, message: 'Please enter psychological status', trigger: 'blur' }]
})

const submitForm = async () => {
    try {
        const form = localForm.value

        const response = await axios.post('/api' + 'PsychologicalRecords/update_PsychologicalRecords', new URLSearchParams({
            PsychologicalStatus: form.PsychologicalStatus,
            RecordID: form.RecordID
        }), {
            headers: {
                'token': localStorage.getItem('token'),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            console.log(response.data);
            if (response.status===200) {
                ElMessage.success('Psychological record updated successfully')
            } else {
                ElMessage.error('Failed to update psychological record')
            }
        })

    } catch (error) {
        console.error('Error updating psychological record:', error)
        ElMessage.error('Error updating psychological record')
    }
}

const resetForm = () => {
    localForm.value.PsychologicalStatus = ''
    localForm.value.RecordID = ''
}
</script>

<style scoped>
.update-psychological-records {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}
</style>
