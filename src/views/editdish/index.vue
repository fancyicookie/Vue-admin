<!--
 * @Date: 2023-02-15 17:49:59
 * @Author: Fancyicookie
-->
<template>
  <div id="member-app" class="container">
    <div class="table-container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="200px" class="demo-ruleForm">
        <!-- 菜品名称 -->
        <el-form-item prop="name" label="菜品名称">
          <el-input v-model="ruleForm.name" placeholder="请填写菜品名称" />
        </el-form-item>
        <!-- 菜品分类 -->
        <el-form-item prop="type" label="菜品分类">
          <el-select v-model="value" placeholder="请选择菜品分类">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <!-- 菜品价格 -->
        <el-form-item prop="price" label="菜品价格">
          <el-input v-model="ruleForm.price" placeholder="请设置菜品价格" />
        </el-form-item>
        <!-- 口味做法配置 -->
        <el-form-item label="口味做法配置">
          <el-button v-show="tasteShow" @click="show">+ 添加口味</el-button>
          <el-card v-show="addTaste" class="card-input" shadow="never" style="background-color: rgb(252, 252, 252)">
            <div>口味名（3个字内）口味标签</div>
            <div class="taste">
              <el-autocomplete
                v-model="state"
                class="inline-input"
                :fetch-suggestions="querySearch"
                placeholder="请输入口味"
                @select="handleSelect"
              />
              <!-- 标签输入框 -->
              <el-input
                ref="inputTag"
                v-model="currentval"
                type="text"
                class="tag-input"
                @keyup.enter="addTags"
                @keyup.delete="deleteags"
              />
              <!-- 生成的标签 -->
              <div v-for="(item, index) in TagsAll" :key="index" class="el-tag">{{ item }}</div>
              <span>删除</span>
            </div>
            <el-button type="primary">添加口味</el-button>
          </el-card>
        </el-form-item>
        <!-- 菜品图片 -->
        <el-form-item prop="image" label="菜品图片">
          <el-upload
            action="/file/Upload?module=EQ"
            accept="image/jpeg,image/jpg,image/png"
            :limit="1"
            :on-change="handleLimit"
            list-type="picture-card"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <!-- 预览图片 -->
          <el-dialog :visible.sync="dialogVisibleimg" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item prop="description" label="菜品描述">
          <el-input type="textarea" placeholder="请输入菜品描述，最多200字" />
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
import { addDish, addDishCate } from '@/api/menu'

export default {
  name: 'AddEmployee',
  data() {
    return {
      ruleForm: {
        name: '',
        categoryName: '',
        price: '',
        image: '',
        description: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      options: [{
        name: '',
        id: ''
      }],
      rules: {
        name: [
          { required: true, message: '请输入菜品名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入菜品分类', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入菜品价格', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '', trigger: 'blur' }
        ]
      },
      tasteShow: true,
      addTaste: false,
      state: '',
      tastes: [],
      currentval: '',
      TagsAll: '',
      value: '',
      dialogVisibleimg: false
    }
  },
  created() {
    addDishCate({ type: 1 }).then(res => {
      this.options = res.data
    })
  },
  mounted() {
    this.tastes = this.loadAll()
  },
  methods: {
    show() {
      this.tasteShow = !this.tasteShow
      this.addTaste = !this.addTaste
    },
    querySearch(queryString, cb) {
      var tastes = this.tastes
      var results = queryString ? tastes.filter(this.createFilter(queryString)) : tastes
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (taste) => {
        return (taste.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll() {
      return [
        { 'value': '甜味' },
        { 'value': '温度' },
        { 'value': '忌口' },
        { 'value': '辣度' }
      ]
    },
    handleSelect(item) {
      console.log(item)
    },
    cancel() {
      this.$router.push({ path: '/menu' })
    },
    onSubmit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // 数据保存至后端即可, 图片保存
          addDish(this.ruleForm).then(() => {
            this.$message.success('添加成功')
            this.$router.push({ path: '/menu/index' })
          })
        } else {
          return false
        }
      })
    },
    submitReset() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          addDish(this.ruleForm).then(() => {
            this.$message.success('添加成功')
            this.$refs['ruleForm'].resetFields()
          })
        } else {
          return false
        }
      })
    },
    addTags() {
      console.log('addtags')
    },
    handleLimit(file, fileList) {
      if (fileList.length >= 1) {
        this.eqObj.uploadDisabled = true
        this.$set(this.eqObj, 'uploadDisabled', true)
      } else {
        this.eqObj.uploadDisabled = false
        this.$set(this.eqObj, 'uploadDisabled', false)
      }
      this.$forceUpdate()
    },
    handleSuccess(response, file, fileList) {
      if (response.success) {
        this.eqForm.image = response.filepath
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.eqObj.uploadDisabled = false
      this.$forceUpdate()
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
  width: 500px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
.avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.card-input {
  width: 700px;
}
.taste {
  display: flex;
  margin-bottom: 10px;
}
.taste .inline-input {
  margin-right: 10px;
}
.taste .tag-input {
  width: 400px;
  margin-right: 10px;
}

.disabled .el-upload.el-upload--picture-card {
  display: none !important;
}

.disabled .el-button--success.is-plain {
  display: none !important;
}

</style>

