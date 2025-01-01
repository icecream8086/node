<template>
    <el-page-header @back="goBack">
    </el-page-header>
    <div class="update-password">
        <el-card>
            <el-form :model="passwordForm" :rules="rules" ref="passwordForm" label-width="100px">
                <el-form-item label="Old Password" prop="oldPassword">
                    <el-input v-model="passwordForm.oldPassword" type="password" placeholder="Enter old password" />
                </el-form-item>
                <el-form-item label="New Password" prop="newPassword">
                    <el-input v-model="passwordForm.newPassword" type="password" placeholder="Enter new password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitPasswordForm">Update Password</el-button>
                    <el-button @click="resetPasswordForm">Reset</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter(); // 获取路由实例

const passwordForm = ref({
    oldPassword: '',
    newPassword: ''
})

const rules = ref({
    oldPassword: [
        { required: true, message: 'Please enter old password', trigger: 'blur' }
    ],
    newPassword: [
        { required: true, message: 'Please enter new password', trigger: 'blur' },
        { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
    ]
})

const submitPasswordForm = () => {
    const form = passwordForm.value
    // Here you can handle the form submission, e.g., send data to an API
    console.log('Old Password:', form.oldPassword)
    console.log('New Password:', form.newPassword)
    ElMessage.success('Password updated successfully')
}

const resetPasswordForm = () => {
    for (let key in passwordForm.value) {
        passwordForm.value[key] = ''
    }
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.update-password {
    max-width: 400px;
    margin: 0 auto;
    padding-top: 20px;
}
</style>