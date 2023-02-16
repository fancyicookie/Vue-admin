<!--
 * @Date: 2023-02-15 17:49:59
 * @Author: Fancyicookie
-->
<template>
  <div id="member-app" class="container">
    <div class="table-container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="200px" class="demo-ruleForm">
        <!-- 账号 -->
        <el-form-item prop="account" label="账号">
          <el-input v-model="ruleForm.account" />
        </el-form-item>
        <!-- 员工姓名 -->
        <el-form-item prop="name" label="员工姓名">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="ruleForm.phone" />
        </el-form-item>
        <!-- 性别 -->
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="ruleForm.gender">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>
        <!-- 身份证号 -->
        <el-form-item prop="id" label="身份证号">
          <el-input v-model="ruleForm.id" />
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button>取消</el-button>
          <!-- 跳转页面并显示 -->
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <!-- 不跳转页面，输入框为空 -->
          <el-button type="primary" @click="onSubmit">保存并继续添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddEmployee',
  data() {
    return {
      ruleForm: {
        account: '',
        name: '',
        phone: '',
        gender: '',
        id: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 20, message: '账号长度应在3-20', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确手机号！', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        id: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { min: 18, max: 18, message: '请输入正确身份证号！', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      const formObj = {
        account: this.ruleForm.account,
        name: this.ruleForm.name,
        phone: this.ruleForm.phone,
        id: this.ruleForm.id
      }
      this.$router.push({ path: '/employee/index', query: formObj })
    }
  }
}
</script>

<style>
.container {
    padding: 20px;
    background-color: rgb(242, 242, 242);
  }
.container .table-container {
    padding: 25px;
    background-color: #fff;
  }
.container .demo-ruleForm {
  width: 600px;
}
</style>
