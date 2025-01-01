<template>
    <div class="update-PsychologicalRecords">
        <el-card>
            <el-form :model="localForm" :rules="rules" label-width="100px">
                <el-form-item label="Psychological Status" prop="PsychologicalStatus">
                    <el-input v-model="localForm.PsychologicalStatus" placeholder="Enter psychological status" />
                </el-form-item>
                <el-form-item label="Appointment Date" prop="AppointmentDate">
                    <el-date-picker v-model="localForm.AppointmentDate" type="date" placeholder="Select date" />
                </el-form-item>
                <el-form-item label="Appointment Time" prop="AppointmentTime">
                    <el-time-picker v-model="localForm.AppointmentTime" placeholder="Select time" />
                </el-form-item>
                <el-form-item label="Counselor ID" prop="CounselorID">
                    <el-input v-model="localForm.CounselorID" placeholder="Enter counselor ID" />
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
    PsychologicalStatus: '',
    AppointmentDate: '',
    AppointmentTime: '',
    CounselorID: ''
})

const rules = ref({
    PsychologicalStatus: [{ required: true, message: 'Please enter psychological status', trigger: 'blur' }],
    AppointmentDate: [{ required: true, message: 'Please select an appointment date', trigger: 'blur' }],
    AppointmentTime: [{ required: true, message: 'Please select an appointment time', trigger: 'blur' }],
    CounselorID: [{ required: true, message: 'Please enter counselor ID', trigger: 'blur' }]
})

const submitForm = async () => {
    const form = localForm.value
    try {
        // 合并 AppointmentDate 和 AppointmentTime
        const appointmentDate = new Date(form.AppointmentDate);
        const appointmentTime = new Date(form.AppointmentTime);

        const combinedDateTime = new Date(
            appointmentDate.getFullYear(),
            appointmentDate.getMonth(),
            appointmentDate.getDate(),
            appointmentTime.getHours(),
            appointmentTime.getMinutes(),
            appointmentTime.getSeconds()
        );

        const formattedDateTime = combinedDateTime.toISOString().replace('T', ' ').substring(0, 19);
        console.log('combinedDateTime:', combinedDateTime);
        const response = await axios.post('/api/reservation/add_Psychologicalreservation', new URLSearchParams({
            PsychologicalStatus: form.PsychologicalStatus,
            AppointmentDate: formattedDateTime,
            AppointmentTime: formattedDateTime,
            CounselorID: form.CounselorID
        }), {
            headers: {
                'token': localStorage.getItem('token') || '',

            }
        })
        ElMessage.success('Reservation created successfully')
    } catch (error) {
        console.error('Error creating reservation:', error)
        ElMessage.error('Error creating reservation')
    }
}

const resetForm = () => {
    localForm.value.PsychologicalStatus = ''
    localForm.value.AppointmentDate = ''
    localForm.value.AppointmentTime = ''
    localForm.value.CounselorID = ''
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