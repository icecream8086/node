<template>
  <el-page-header @back="goBack">
  </el-page-header>
  <div>
    <el-card>
      <el-descriptions class="margin-top" title="个人信息" :column="3" :size="size" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <user />
              </el-icon>
              Username
            </div>
          </template>
          {{ user.Name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <iphone />
              </el-icon>
              Telephone
            </div>
          </template>
          {{ user.Phone ? user.Phone : 'Not provided' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <location />
              </el-icon>
              Email
            </div>
          </template>
          {{ user.Email }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <tickets />
              </el-icon>
              Gender
            </div>
          </template>
          {{ user.Gender === '1' ? 'Male' : user.Gender === '2' ? 'Female' : 'Other' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <office-building />
              </el-icon>
              Birthdate
            </div>
          </template>
          {{ user.Birthdate ? user.Birthdate : 'Not provided' }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>

  <div>
    <el-card>
      <el-descriptions class="margin-top" title="更新表单" :column="3" size="large" border>
        <template #extra>
          <el-progress :percentage="100" :indeterminate="true" />
          <el-button type="primary" @click="updateUser()">提交表单</el-button>
        </template>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <user />
              </el-icon>
              Username
            </div>
          </template>
          <el-input v-model="user.Name" style="width: 240px" placeholder="Username" />
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <iphone />
              </el-icon>
              Telephone
            </div>
          </template>
          <el-input v-model="user.Phone" style="width: 240px" placeholder="Telephone" />
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <location />
              </el-icon>
              Email
            </div>
          </template>
          <el-input v-model="user.Email" style="width: 240px" placeholder="Email" />
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <tickets />
              </el-icon>
              Gender
            </div>
          </template>
          <el-input v-model="user.Gender" style="width: 240px" placeholder="Gender" />
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <office-building />
              </el-icon>
              Birthdate
            </div>
          </template>
          <el-input v-model="user.Birthdate" style="width: 240px" placeholder="Birthdate" />
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  Iphone,
  Location,
  OfficeBuilding,
  Tickets,
  User,
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter(); // 获取路由实例
import { ElNotification, ElMessage } from 'element-plus'
import axios from 'axios';
const size = ref('large')

const user = ref({
  UserID: 0,
  Name: '',
  Gender: '1',
  Birthdate: null,
  Phone: null,
  Email: '',
})


const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  }
})
const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  }
})
const updateUser = async () => {
  try {
    // let { name, gender, birthdate, Phone, Email } = req.body;
    const response = await axios.post('/api/users/updateUser', {
      name: user.value.Name || '',
      gender: user.value.Gender || '',
      birthdate: user.value.Birthdate || '',
      Phone: user.value.Phone || '',
      Email: user.value.Email || ''
    }, {
      headers: {
        'token': localStorage.getItem('token') || '',
      }
    });
    console.log('User updated successfully:', response.data);
    ElMessage.success('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    ElMessage.error('Error updating user');
  }
};

const getUserInfo = () => {
  return axios.post('/api' + '/users/getinfos', {}, {
    headers: {
      'token': localStorage.getItem('token'),
    }
  })
    .then(response => {
      const fetchedUser = response.data.user[0];

      user.value.UserID = fetchedUser.UserID;
      user.value.Name = fetchedUser.Name;
      user.value.Gender = fetchedUser.Gender;
      user.value.Birthdate = fetchedUser.Birthdate;
      user.value.Phone = fetchedUser.Phone;
      user.value.Email = fetchedUser.Email;

      console.log('User info retrieved successfully:', user.value.Name);
    })
    .catch(error => {
      console.error('Error fetching user info:', error);
    });
};


const goBack = () => {
  router.back()
}

onMounted(() => {
  ElNotification({
    title: 'Welcome',
    message: 'Welcome to Personal info',
    type: 'success',
  });
  getUserInfo();
})
</script>


<style scoped>
.el-descriptions {
  margin-top: 20px;
}

.cell-item {
  display: flex;
  align-items: center;
}

.margin-top {
  margin-top: 20px;
}
</style>