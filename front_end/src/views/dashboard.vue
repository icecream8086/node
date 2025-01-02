<template>
  <el-container class="layout-container-demo" style="height: 100vh"> <!-- 确保占满全视口高度 -->
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <message />
              </el-icon>预约管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="get_all_add_Psychologicalreservation()">立即预约</el-menu-item>
              <el-menu-item index="1-2" @click="get_all_watch_Psychologicalreservation()">预约纪录</el-menu-item>
              <el-menu-item index="1-2" @click="get_all_update_Psychologicalreservation()">更新预约</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>心理档案
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="get_all_add_PsychologicalRecords()">新建心理档案</el-menu-item>
              <el-menu-item index="2-1" @click="get_all_PsychologicalRecords()">心理档案查看</el-menu-item>
              <el-menu-item index="2-2" @click="get_all_update_update_note()">心理档案编辑</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <setting />
              </el-icon>心理咨询老师
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" @click="get_all_Counselors()">查看所有老师</el-menu-item>
              <el-menu-item index="3-2">查看老师信息</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header @click="click_clear_table()">
        <el-row>
          <el-col :span="10"></el-col>
          <el-col :span="2">
            <SegClock /> <!-- 将之前创建的时钟组件放入中心位置 -->
          </el-col>
          <el-col :span="12">
            <div style="text-align: right; font-size: 12px">
              <div class="toolbar">
                <el-dropdown>
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                  <el-icon size="large" style="margin-right: 15px; margin-top: 1px">
                    <setting />
                  </el-icon>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="navigate_to_personal_info()">个人信息</el-dropdown-item>
                      <el-dropdown-item @click="navigate_to_update_password()">修改密码</el-dropdown-item>
                      <el-dropdown-item @click="exit_login()">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
                <span>Towwwwwwm</span>
              </div>

            </div>
          </el-col>
        </el-row>


      </el-header>

      <el-main>
        <el-scrollbar >
          <welcome v-if="watch_able[0]"></welcome>
          <add_Psychologicalreservation v-if="watch_able[1]"></add_Psychologicalreservation>
          <watch_Psychologicalreservation v-if="watch_able[2]"></watch_Psychologicalreservation>
          <update_Psychologicalreservation v-if="watch_able[3]"></update_Psychologicalreservation>
          <add_PsychologicalRecords v-if="watch_able[4]"></add_PsychologicalRecords>
          <table_get_PsychologicalRecord v-if="watch_able[5]" :record="records"> </table_get_PsychologicalRecord>
          <update_note v-if="watch_able[6]"></update_note>

          <table_get_Counselor :counselor="records" v-if="watch_able[7]"> </table_get_Counselor>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import SegClock from '@/components/seg_clock.vue'
import table_get_PsychologicalRecord from '@/components/table_get_PsychologicalRecord.vue'
import table_get_Counselor from '@/components/table_get_Counselor.vue'
import welcome from '@/components/welcome.vue'
import add_PsychologicalRecords from '@/components/add_PsychologicalRecords.vue'
import add_Psychologicalreservation from '@/components/reservation/add_Psychologicalreservation.vue'
import watch_Psychologicalreservation from '@/components/reservation/watch_Psychologicalreservation.vue'
import update_Psychologicalreservation from '@/components/reservation/update_Psychologicalreservation.vue'
import update_note from '@/components/reservation/update_note.vue'

const username = ref("");
import { useRouter } from 'vue-router'
const router = useRouter(); // 获取路由实例
import { ElNotification, ElMessage } from 'element-plus'
import axios from 'axios'
const watch_able = ref([1, 0, 0, 0, 0, 0, 0, 0,0,0]);
const records = ref([]);
const add_element = () => {
  watch_able.value.push(watch_able.value.length);
}

const setElementAtPosition = (position) => {
  if (position < watch_able.value.length && position >= 0) {
    watch_able.value = watch_able.value.map((_, index) => index === position ? 1 : 0);
  }
}


const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))

const navigate_to_personal_info = () => {
  ElNotification({
    title: 'Success',
    message: 'Redirecting to personal info page',
    type: 'success',
  })
  setTimeout(() => {
    router.push('/personal_info');
  }, 1000);
}

const navigate_to_update_password = () => {
  ElNotification({
    title: 'Success',
    message: 'navigating to update password page',
    type: 'success',
  })
  setTimeout(() => {
    router.push('/update_password');
  }, 2000);
}

const click_clear_table = () => {
  setElementAtPosition(0);

}
const exit_login = () => {
  localStorage.clear();
  ElNotification({
    title: 'Success',
    message: 'Exiting...',
    type: 'success',
  })
  ElMessage({
    message: 'bye .',
    type: 'success',
  })
  setTimeout(() => {
    router.push('/login');
  }, 2000);

}

const get_all_add_PsychologicalRecords = () => {
  ElNotification({
    title: 'Success',
    message: 'Adding Psychological Records',
    type: 'success',
  })
  setElementAtPosition(4);
}

const get_all_PsychologicalRecords = () => {
  ElNotification({
    title: 'Success',
    message: 'Getting all Psychological Records',
    type: 'success',
  })
  let record = [];
  axios.post('/api/PsychologicalRecords/get_all_PsychologicalRecords', {}, {
    headers: {
      'token': localStorage.getItem('token'),
    },
  }).then((response) => {
    record = response.data.record;
    records.value = record;
    setElementAtPosition(5);
  }).catch((err) => {
    console.log(err);
  });
}
const get_all_Counselors = () => {
  ElNotification({
    title: 'Success',
    message: 'Getting all Counselors',
    type: 'success',
  })
  let record = [];
  axios.post('/api/Counselor/get_all', {}, {
    headers: {
      'token': localStorage.getItem('token'),
    },
  }).then((response) => {
    console.log(response.data);

    record = response.data.counselor;
    records.value = record;
    setElementAtPosition(7);
  }).catch((err) => {
    console.log(err);
  });
}

const get_all_add_Psychologicalreservation = () => {
  ElNotification({
    title: 'Success',
    message: 'Adding Psychological reservation',
    type: 'success',
  })
  setElementAtPosition(1);
}
const get_all_watch_Psychologicalreservation = () => {
  ElNotification({
    title: 'Success',
    message: 'Getting all Psychological reservation',
    type: 'success',
  })
  setElementAtPosition(2);
}
const get_all_update_Psychologicalreservation = () => {
  ElNotification({
    title: 'Success',
    message: 'Updating Psychological reservation',
    type: 'success',
  })
  setElementAtPosition(3);
}


const get_all_update_update_note = () =>{
  ElNotification({
    title: 'Success',
    message: 'Updating Psychological reservation',
    type: 'success',
  })
  setElementAtPosition(6);
}
onMounted(() => {
  ElNotification({
    title: 'Welcome',
    message: 'Welcome to the dashboard',
    type: 'success',
  });

})
</script>

<style scoped>
.layout-container-demo {
  display: flex;
  /* 使用flex布局 */
  height: 100vh;
  overflow: hidden;
  /* 防止溢出 */
}

.layout-container-demo .el-header {
  position: relative;
  height: 60px;
  /* 控制header的高度 */
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
  flex-shrink: 0;
}

.layout-container-demo .el-aside {
  width: 200px;
  /* 设置aside的具体宽度 */
  background: var(--el-color-primary-light-8);
  overflow: auto;
  /* 防止内容溢出但允许滚动 */
}

.layout-container-demo .el-menu {
  border-right: none;
  height: 100%;
  overflow: auto;
  /* 防止内容溢出但允许滚动 */
}

.layout-container-demo .el-main {
  flex: 1;
  /* 主内容区域“撑开”以填满剩余空间 */
  overflow: auto;
  /* 防止内容溢出但允许滚动 */
  padding: 0;
  background: var(--el-color-primary-light-5);
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
  overflow: hidden;
  /* 防止内容溢出 */
  flex-shrink: 0;
  /* 防止自动调整大小造成溢出 */
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* 添加 flex 居中对齐 */
  padding: 0 15px;
}
</style>
