<template>
  <el-row>
    <el-col :span="24">
      <div class="login-dial shifted">
        <el-card class="login-page-container">
          <h3> <el-text class="mx-1" size="large">Login</el-text>
          </h3>
          <div class="form-group">
            <el-text class="mx-2" size="large">Username</el-text>
            <el-input type="text" id="username" v-model="username" placeholder="Enter your username" />
          </div>
          <div class="form-group">
            <el-text class="mx-2" size="large">Password</el-text>
            <el-input type="password" id="password" v-model="password" placeholder="Enter your password" />
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


authStore.token = localStorage.getItem('token') || '';
authStore.type = localStorage.getItem('type') || '';
authStore.name = localStorage.getItem('name') || '';

const hashPasswordUsingMD5 = (password) => {
  const hash = md5(password);
  return hash.toUpperCase(); // 转换为大写32位MD5
};

const login = async () => {
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

    const  token  = response.data.token;
    const  type  = radio1.value;
    localStorage.setItem('token',token);
    localStorage.setItem('have_token',true);

    authStore.setToken(token);
    console.log(localStorage.getItem('token'));

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

    const  token  = response.data.token;
    const  type  = radio1.value;
    authStore.setToken(token);
    localStorage.setItem('token',token);
    localStorage.setItem('have_token',true);

    console.log(localStorage.getItem('token'));
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

const get_info = async () => {
  try {
    const response = await axios.post('/api/users/getinfo', {}, {
      headers: {
        'token': localStorage.getItem('token'),
      },
    });
    useAuthStore().setName(response.data.decoded.Name);
  } catch (err) {
    console.log(err);
    if (err.response.status === 401) {
      localStorage.removeItem('token');
    }
  }
};

const checkToken = async () => {
  try {
      let x=localStorage.getItem('have_token');
      if(x){
        router.push("/dashboard");
      }else if(!x){
        router.push("/login");
      }
  } catch (err) {
    console.log(err);
    return false;
  }
};
onMounted(() => {
  document.body.className = "login-page";
  checkToken();
  get_info();
  console.log(authStore.token);
  
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
  width: 55vw;
  /* 宽度占视口宽度的55% */
  height: 65vh;
  /* 高度占视口高度的65% */
  position: relative;
  /* 使用相对定位以便可变换偏移 */
  padding: 0;
  margin: 0;
  opacity: 0.8;
  /* 部分透明 */
}

.shifted {
  transform: translate(20vw, 20vh);
  /* 偏移值可以根据需要调整 */
}

el-input[type="text"],
el-input[type="password"] {
  width: 100%;
  padding: 5px;
  /* border: 1px solid #ccc; */
  border-radius: 4px;
}
</style>