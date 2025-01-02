<template>
    <div class="update-appointment">
        <el-card>
            <el-form :model="localForm" :rules="rules" label-width="100px">
                <el-form-item label="Appointment ID" prop="AppointmentID">
                    <el-input v-model="localForm.AppointmentID"  />
                </el-form-item>
                <el-form-item label="Psychological Status" prop="PsychologicalStatus">
                    <el-input v-model="localForm.PsychologicalStatus" placeholder="Enter psychological status" />
                </el-form-item>
                <el-form-item label="Appointment Date" prop="AppointmentDate">
                    <el-date-picker v-model="localForm.AppointmentDate" type="date" placeholder="Select date" />
                </el-form-item>
                <el-form-item label="Appointment Time" prop="AppointmentTime">
                    <el-time-picker v-model="localForm.AppointmentTime" placeholder="Select time" />
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
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios' // 引入 axios

const localForm = ref({
    AppointmentID: '',
    PsychologicalStatus: '',
    AppointmentDate: '',
    AppointmentTime: '',
})

const rules = ref({
    PsychologicalStatus: [{ required: true, message: 'Please enter psychological status', trigger: 'blur' }],
    AppointmentDate: [{ required: true, message: 'Please select an appointment date', trigger: 'blur' }],
    AppointmentTime: [{ required: true, message: 'Please select an appointment time', trigger: 'blur' }],
})

const submitForm = async () => {
    try {
        const form = localForm.value
        const appointmentDate = new Date(form.AppointmentDate)
        const appointmentTime = new Date(form.AppointmentTime)
        const combinedDateTime = new Date(
            appointmentDate.getFullYear(),
            appointmentDate.getMonth(),
            appointmentDate.getDate(),
            appointmentTime.getHours(),
            appointmentTime.getMinutes(),
            appointmentTime.getSeconds()
        )
        const formattedDateTime = combinedDateTime.toISOString().replace('T', ' ').substring(0, 19)

        const response = await axios.post('/api' + '/reservation/update_Psychologicalreservation', new URLSearchParams({
            AppointmentStatus: form.PsychologicalStatus,
            AppointmentDate: formattedDateTime,
            AppointmentTime: formattedDateTime,
            AppointmentID: form.AppointmentID
        }), {
            headers: {
                'token': localStorage.getItem('token'),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        if (response.status === 200) {
            ElMessage.success('Update successful');
        } else {
            ElMessage.error('Update failed');
            console.log(response);
            
        }
    } catch (error) {
        console.error('Error updating appointment:', error)
        ElMessage.error('Error updating appointment')
    }
}

const resetForm = () => {
    localForm.value.PsychologicalStatus = ''
    localForm.value.AppointmentDate = ''
    localForm.value.AppointmentTime = ''
    localForm.value.CounselorID = ''
}
const get_data = () => {
    const resp = axios.get('/api' + '/reservation/get_Psychologicalreservation', {
        headers: {
            'token': localStorage.getItem('token'),
        }
    })
        .then((response) => {
            // console.log(response.data);
            localForm.value.AppointmentID = response.data.record.AppointmentID;
            console.log('AppointmentID ' + localForm.value.AppointmentID);

        })

}
onMounted(() => {
    get_data();

})
</script>

<style scoped>
.update-appointment {
    max-width: 1080px;
    max-height: 700px;
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;
}
</style>
