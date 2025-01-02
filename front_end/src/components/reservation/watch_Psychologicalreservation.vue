<template>
    <div class="view-appointment">
        <el-card>
            <el-form :model="record" label-width="150px">
                <el-form-item label="Appointment ID">
                    <el-input v-model="record.AppointmentID" disabled />
                </el-form-item>
                <el-form-item label="User ID">
                    <el-input v-model="record.UserID" disabled />
                </el-form-item>
                <el-form-item label="Counselor ID">
                    <el-input v-model="record.CounselorID" disabled />
                </el-form-item>
                <el-form-item label="Appointment Date">
                    <el-date-picker v-model="record.AppointmentDate" type="date" disabled />
                </el-form-item>
                <el-form-item label="Appointment Time">
                    <el-time-picker v-model="record.AppointmentTime" disabled />
                </el-form-item>
                <el-form-item label="Appointment Status">
                    <el-input v-model="record.AppointmentStatus" disabled />
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue'

const record = ref({
    AppointmentID: 5,
    UserID: 1,
    CounselorID: 1,
    AppointmentDate: new Date('2024-01-25T16:00:00.000Z'),
    AppointmentTime: new Date('2024-12-30T07:30:00.000Z'),
    AppointmentStatus: null
})
const get_data = () => {
    const resp = axios.get('/api' + '/reservation/get_latest_Psychologicalreservation', {
        headers: {
            'token': localStorage.getItem('token'),
        }
    })
        .then((response) => {
            console.log(response.data);
            record.value = response.data.record;
        })

}
onMounted(() => {
    get_data();
})
</script>

<style scoped>
.view-appointment {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}
</style>
