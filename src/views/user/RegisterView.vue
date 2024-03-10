<template>
  <div id="register">
    <a-form
      layout="vertical"
      style="margin: 0 auto"
      :model="form"
      :style="{ width: '600px' }"
      @submit="handleSubmit"
    >
      <h2 style="margin-bottom: 16px">用户注册</h2>

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
      <a-form-item
        :rules="{
          required: true,
        }"
        field="checkPassword"
        label="确认密码"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请再次输入密码"
        />
      </a-form-item>
      <a-button class="btn-login" type="primary" html-type="submit"
        >注册
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
  checkPassword: "",
});

const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code === 0) {
    store.state.loginUser = {
      userAccount: form.userAccount,
      userPassword: form.userPassword,
    };
    await router.push({
      path: "/user/login",
      replace: true,
    });
    return;
  } else {
    message.error("注册失败" + res.message);
  }
};
</script>

<style scoped>
#register .btn-login {
  width: 15vh;
  margin: 0 auto;
}
</style>
