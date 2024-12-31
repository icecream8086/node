<template>
  <el-row>
    <el-col :span="24">
      <div class="login-dial">
        <el-card class="login-page-container">
          <el-text class="mx-1" size="large">Login</el-text>
          <div class="form-group">
            <el-text class="mx-2" size="large">Username</el-text>
            <el-input type="text" id="username" v-model="username" placeholder="Enter your username" />
          </div>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <div class="form-group">
            <el-text class="mx-2" size="large">Password</el-text>
            <el-input type="password" id="password" v-model="password" placeholder="Enter your password" />


            <p>&nbsp;</p>
            <p>&nbsp;</p>

            <div>
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="Other">
                  <el-radio-group v-model="radio1" class="ml-4">
                    <el-radio label="1" size="large">Users</el-radio>
                    <el-radio label="2" size="large">Counselors</el-radio>
                  </el-radio-group>
                  <div>
                    <p>token</p>
                  </div>
                  <div>
                    <el-input type="text" id="username" v-model="token" placeholder="Enter token" />
                  </div>
                  <el-collapse-item title="forget passowrd">
                    <span>foget password ?(按钮)</span>
                  </el-collapse-item>
                </el-collapse-item>

              </el-collapse>
            </div>
            <el-button :icon="ArrowRightBold" @click="login" class="form-group-button">登录</el-button>
          </div>
        </el-card>
      </div>
    </el-col>

  </el-row>
</template>

<script setup>
import { ArrowRightBold } from '@element-plus/icons-vue'
import axios from 'axios';
import md5 from 'js-md5';
import { useAuthStore } from '../stores/user';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter(); // 获取路由实例

const authStore = useAuthStore();

const username = ref("");
const password = ref("");
const User_Type = ref("");
const radio1 = ref("1");

const hashPasswordUsingMD5 = (password) => {
  const hash = md5(password);
  return hash.toUpperCase(); // 转换为大写32位MD5
};

const login = async () => {
  console.log(radio1.value);
  if (radio1.value === "1") {
    await user_login();
  } else if (radio1.value === "2") {
    await counselor_login();
  }
};

const user_login = async () => {
  if (username.value === "" || password.value === "") {
    if (authStore.token === "") {
      alert("please input username and password");
      return;
    }
    document.body.className = "";
    router.push("/dashboard");
  }
  password.value = hashPasswordUsingMD5(password.value);

  try {
    const response = await axios.post('/api/users/auth', {
      usernameOrEmail: username.value,
      password: password.value,
    });

    const { token, type } = response.data;

    authStore.setToken(token);

    if (type === "UserID") {
      authStore.setType("UserID");
    } else {
      authStore.setType("CounselorID");
    }

    document.body.className = "";
    router.push("/dashboard");
  } catch (err) {
    console.log(err);
    document.body.className = "";
  }
};

const counselor_login = async () => {
  if (username.value === "" || password.value === "") {
    if (authStore.token === "") {
      alert("please input username and password");
      return;
    }
    document.body.className = "";
    router.push("/dashboard");
  }
  password.value = hashPasswordUsingMD5(password.value);

  try {
    const response = await axios.post('/api/counselor/login', {
      username: username.value,
      password: password.value,
    });

    const { token, type } = response.data;

    authStore.setToken(token);

    if (type === "UserID") {
      authStore.setType("UserID");
    } else {
      authStore.setType("CounselorID");
    }

    document.body.className = "";
    router.push("/dashboard");

  } catch (err) {
    console.log(err.response);
    document.body.className = "";
    // this.$router.push("/host/Error");
  }
};

onMounted(() => {
  document.body.className = "login-page";
});
</script>


<style>
/* :root {
    --bg-color-light: #ccc;
    --bg-color-dark: #333;
  }

  @media (prefers-color-scheme: light) {
    :root {
      --bg-color: var(--bg-color-light);
    }
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --bg-color: var(--bg-color-dark);
    }
  } */

.login-page {
  background-image: url("../assets/background/Logins_HDR.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  margin: 0;
  padding: 0;
}

.login-dial {
  margin: 10vh 0 0 0;
  padding: 0;
  width: 55vw;
  /* 视口宽度的33% */
  height: 65vh;
  /* 视口高度的33% */
}


el-input[type="text"],
el-input[type="password"] {
  width: 100%;
  padding: 5px;
  /* border: 1px solid #ccc; */
  border-radius: 4px;
}
</style>