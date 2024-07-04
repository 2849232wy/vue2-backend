<template>
  <div>
    <div class="u-top">
      <div>
        <el-button
          type="primary"
          @click="(isSubmitForm = !isSubmitForm) && (formType = 1)"
          >新增<i class="el-icon-plus el-icon--right"></i
        ></el-button>
        <el-button
          type="danger"
          @click="batchDeleteUser"
          :disabled="!(ids && ids.length > 0)"
          >批量删除</el-button
        >
      </div>
      <div class="t-right">
        <el-input
          placeholder="名称"
          v-model="name"
          clearable
        >
          <i
            slot="prefix"
            class="el-input__icon el-icon-search"
          ></i>
        </el-input>
        <el-button
          type="primary"
          @click="searchUser"
          >查询</el-button
        >
      </div>
    </div>
    <el-table
      :data="userList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="ID"
        prop="id"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="name"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="性别"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            {{ scope.row.sex ? "男" : "女" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="生日"
        prop="birth"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="年龄"
        prop="age"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="地址"
        prop="addr"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="editUser(scope.$index, scope.row.id)"
            >编辑</el-button
          >
          <el-popconfirm
            title="确定删除吗"
            @confirm="deleteUser(scope.$index, scope.row.id)"
          >
            <el-button
              slot="reference"
              size="mini"
              type="danger"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- form表单 -->
    <el-dialog
      :visible.sync="isSubmitForm"
      :title="formType == 1 ? '新增用户' : '修改用户'"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="用户名"
          prop="name"
        >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          label="年龄"
          prop="age"
        >
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item
          label="出生日期"
          required
        >
          <el-form-item prop="birth">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.birth"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item
          label="性别"
          prop="sex"
        >
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="地址"
          prop="addr"
        >
          <el-input v-model="form.addr"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('form')"
            >确定</el-button
          >

          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="u-bottom">
      <Pagination
        @changeLimit="changeLimit"
        @changePage="changePage"
        :total="total"
        :page="page"
        :limit="limit"
      ></Pagination>
    </div>
  </div>
</template>

<script>
  import {
    getUserList,
    createUser,
    deleteUser,
    updateUser,
    getUser,
    batchDeleteUser,
  } from "@/api/index";
  import { dateFormat, strToDate } from "@/utils/dateUtils";
  import Pagination from "@/components/Pagination";
  export default {
    components: {
      Pagination,
    },
    data: () => {
      return {
        name: "",
        page: 1,
        limit: 10,
        userList: [],
        total: 0,
        formType: 1,
        form: {
          id: null,
          name: "",
          age: null,
          addr: "",
          sex: 1,
          birth: "",
        },
        ids: [],
        isSubmitForm: false,
        rules: {
          name: [
            { required: true, message: "请输入名称", trigger: "blur" },
            {
              min: 3,
              max: 5,
              message: "长度在 3 到 5 个字符",
              trigger: "blur",
            },
          ],
          age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
          birth: [
            {
              type: "date",
              required: true,
              message: "请选择日期",
              trigger: "change",
            },
          ],
          addr: [{ required: true, message: "请输入地址", trigger: "change" }],
        },
      };
    },
    async created() {
      this.getData();
    },
    methods: {
      async getData() {
        let data = Object.assign(
          {},
          { name: this.name, page: this.page, limit: this.limit }
        );
        if (!data.name || data.name.length === 0) {
          delete data.name;
        }
        let res = await getUserList(data);
        this.userList = res.list;
        this.total = res.count;
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let form = Object.assign({}, this.form);
            form.birth =
              form.birth instanceof Date
                ? dateFormat(form.birth, "yyyy-MM-dd")
                : form.birth;
            console.log(form);
            let res = null;
            if (this.formType == 1) {
              delete form.id;
              res = await createUser(form);
            } else {
              res = await updateUser(form);
            }
            if (res.code == 20000) {
              (this.isSubmitForm = false),
                this.$message({
                  message: this.formType === 1 ? "新增成功" : "编辑成功",
                  type: "success",
                });
              this.resetForm(formName);
              this.getData();
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      async deleteUser(index, id) {
        let res = await deleteUser(id);
        if (res.code == 20000) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.getData();
        }
      },
      async editUser(index, id) {
        let res = await getUser(id);
        let { age, sex, addr, birth, name } = res.user;
        (this.form.age = age),
          (this.form.sex = sex),
          (this.form.addr = addr),
          (this.form.birth = strToDate(birth));
        this.form.name = name;
        this.formType = 2;
        this.isSubmitForm = true;
        this.form.id = id;
      },
      searchUser() {
        this.page = 1;
        this.getData();
      },
      handleSelectionChange(users) {
        this.ids = users
          .reduce((pre, next) => {
            pre.push(next.id);
            return pre;
          }, [])
          .join(",");
      },
      async batchDeleteUser() {
        let res = await batchDeleteUser(this.ids);
        if (res.code == 20000) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.getData();
        }
      },
      changeLimit(limit) {
        this.limit = limit;
        this.getData();
      },
      changePage(page) {
        this.page = page;
        this.getData();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .u-top {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    .t-right {
      display: flex;
    }
  }
  .u-bottom {
    display: flex;
    padding: 20px 0;
    justify-content: flex-end;
  }
</style>
