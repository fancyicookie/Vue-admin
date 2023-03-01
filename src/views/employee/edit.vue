<!--
 * @Date: 2023-02-15 17:49:59
 * @Author: Fancyicookie
-->
<template>
  <div id="member-app" class="container">
    <div class="table-container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="200px" class="demo-ruleForm">
        <!-- 账号 -->
        <el-form-item prop="username" label="账号">
          <el-input v-model="ruleForm.username" />
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
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 身份证号 -->
        <el-form-item prop="idNumber" label="身份证号">
          <el-input v-model="ruleForm.idNumber" />
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button @click="cancel">取消</el-button>
          <!-- 跳转页面并显示 -->
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { saveEmployee } from '@/api/employee'
import { edit, editEmployee } from '@/api/employee'

export default {
  name: 'AddEmployee',
  data() {
    return {
      ruleForm: {
        username: '',
        name: '',
        phone: '',
        sex: '',
        idNumber: ''
      },
      rules: {
        username: [
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
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        idNumber: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { min: 18, max: 18, message: '请输入正确身份证号！', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    editEmployee(this.$route.query.id).then(res => {
      this.ruleForm = res.data
    })
  },
  methods: {
    cancel() {
      this.$router.push({ path: '/employee' })
    },
    // 提交保存修改
    onSubmit() {
      console.log('save')
      console.log(this.ruleForm)
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          edit(this.ruleForm).then(() => {
            this.$message.success('修改成功')
            this.$refs['ruleForm'].resetFields()
            this.$router.push({ path: '/employee' })
          })
        } else {
          return false
        }
      })
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
