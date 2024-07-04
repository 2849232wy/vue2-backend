<template>
  <div class="content">
    <el-card class="box-card">
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="80px"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <div class="submit">
          <el-button
            type="primary"
            @click="submitForm('form')"
            >登录</el-button
          >
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { login } from "@/api/index";
  import { initDynamicRoutes } from "@/router";
  export default {
    data: () => {
      return {
        dialogTableVisible: true,
        form: {
          username: "",
          password: "",
        },
        rules: {
          username: [
            { required: true, message: "请输入用户名", trigger: "blur" },
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
          ],
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let res = await login(this.form);
            if (res.code === 20000) {
              this.$message({
                type: "success",
                message: "登录成功",
              });
              initDynamicRoutes(res.data.menu);
              this.$router.replace("/home");
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .box-card {
    width: 320px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .submit {
      padding: 20px 0;
      display: flex;
      justify-content: center;
    }
  }
</style>
