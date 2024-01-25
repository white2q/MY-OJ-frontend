<template>
  <div id="login">
    <a-form
      layout="vertical"
      style="margin: 0 auto"
      :model="form"
      :style="{ width: '600px' }"
      @submit="handleSubmit"
    >
      <h2 style="margin-bottom: 16px">用户登录</h2>

      <a-form-item
        :rules="{
          required: true,
          message: '账号不能为空',
        }"
        field="userAccount"
        label="账号"
      >
        <a-input
          id="inp"
          v-model.trim="form.userAccount"
          placeholder="请输入账号"
        />
      </a-form-item>
      <a-form-item
        :rules="{
          required: true,
          message: '请确保密码不少于8位',
          minLength: 8,
        }"
        field="userPassword"
        label="密码"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-button class="btn-login" type="primary" html-type="submit"
        >登录
      </a-button>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService } from "../../../generated";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import message from "@arco-design/web-vue/es/message";

const router = useRouter();
const store = useStore();

const form = reactive({
  userAccount: "",
  userPassword: "",
});

const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
    return;
  } else {
    message.error("登录失败" + res.message);
  }
};
</script>

<style scoped>
#login .btn-login {
  width: 15vh;
  margin: 0 auto;
}
</style>
