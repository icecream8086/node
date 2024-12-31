<template>
  <el-container class="layout-container-demo" style="height: 100vh"> <!-- 确保占满全视口高度 -->
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <message />
              </el-icon>Navigator One
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="1-1">Option 1</el-menu-item>
              <el-menu-item index="1-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="1-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>Option 4</template>
              <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>Navigator Two
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="2-1">Option 1</el-menu-item>
              <el-menu-item index="2-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="2-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>Option 4</template>
              <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <setting />
              </el-icon>Navigator Three
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="3-1">Option 1</el-menu-item>
              <el-menu-item index="3-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="3-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="3-4">
              <template #title>Option 4</template>
              <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header>
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
                      <el-dropdown-item>个人信息</el-dropdown-item>
                      <el-dropdown-item>修改密码</el-dropdown-item>
                      <el-dropdown-item>退出登录</el-dropdown-item>
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
        <el-scrollbar>
          <p>template</p>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import SegClock from '@/components/seg_clock.vue'

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))


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
