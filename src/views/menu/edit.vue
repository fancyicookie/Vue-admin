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
        <el-form-item prop="categoryName" label="菜品分类">
          <el-select v-model="ruleForm.categoryId" placeholder="请选择菜品分类">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <!-- 菜品价格 -->
        <el-form-item prop="price" label="菜品价格">
          <el-input v-model.number="ruleForm.price" placeholder="请设置菜品价格" />
        </el-form-item>
        <!-- 口味做法配置 -->
        <el-form-item label="口味做法配置">
          <el-button v-if="!ruleForm.flavors.length" @click="show">+ 添加口味</el-button>
          <el-card v-if="ruleForm.flavors.length" class="card-input" shadow="never" style="background-color: rgb(252, 252, 252)">
            <div class="taste">
              <div>口味名（3个字内）口味标签</div>
              <div v-for="(i, index) in ruleForm.flavors" :key="index" class="item">
                <el-select v-model="ruleForm.flavors[index]" value-key="name" placeholder="请选择">
                  <el-option
                    v-for="k in options1"
                    :key="k.name"
                    :label="k.name"
                    :value="k"
                  />
                </el-select>
                <!-- 标签输入框 -->
                <div
                  ref="inputTag"
                  type="text"
                  class="tag-input"
                >
                  <!-- 生成的标签 -->
                  <el-tag
                    v-for="tag in ruleForm.flavors[index].value"
                    :key="tag"
                    closable
                    @close="handleClose(tag)"
                  >
                    {{ tag }}
                  </el-tag>
                </div>
                <span class="tasteDel">删除</span>
              </div>

            </div>
            <el-button type="primary">添加口味</el-button>
          </el-card>
        </el-form-item>
        <!-- 菜品图片 -->
        <el-form-item prop="image" label="菜品图片">
          <el-upload
            action="/"
            list-type="picture-card"
            :show-file-list="false"
            :http-request="uploadImage"
          >
            <img v-if="ruleForm.image" :src="`${env}/common/download?name=${ruleForm.image}`" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item prop="description" label="菜品描述">
          <el-input v-model="ruleForm.description" type="textarea" placeholder="请输入菜品描述，最多200字" />
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
import { addDish, addDishCate, editDish, putDish } from '@/api/menu'
import { uploadImage } from '@/api/common'
const options1 = [
  { name: '甜味', value: ['无糖'] },
  { name: '温度', value: ['热饮 '] },
  { name: '忌口', value: ['不要葱'] },
  { name: '辣度', value: ['不辣 '] }
]
export default {
  name: 'AddDish',
  data() {
    return {
      options1,
      value: '',
      env: process.env.VUE_APP_BASE_API,
      ruleForm: {
        name: '',
        price: '',
        image: '',
        description: '',
        flavors: [],
        categoryId: '',
        status: 1,
        code: ''
      },
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
        categoryName: [
          { required: true, message: '请输入菜品分类', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入菜品价格', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '', trigger: 'blur' }
        ]
      },
      tastes: [],
      currentval: '',
      tagsAll: [],
      dialogVisibleimg: false,
      inputVisible: false,
      inputValue: ''
    }
  },
  created() {
    addDishCate({ type: 1 }).then(res => {
      this.options = res.data
    })
    editDish(this.$route.query.id).then(res => {
      const flavors = res.data.flavors.map(item => {
        return {
          ...item,
          value: JSON.parse(item.value)
        }
      })
      this.ruleForm = { ...res.data, flavors }
    })
  },
  methods: {
    uploadImage(file) {
      const formData = new FormData()
      formData.append('file', file.file)
      uploadImage(formData).then((res) => {
        this.ruleForm.image = res.data
      })
    },
    show() {
      if (!this.ruleForm.flavors.length) {
        this.ruleForm.flavors.push({ name: '甜味', value: ['无糖'] })
      }
    },
    createFilter(queryString) {
      return (taste) => {
        return (taste.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    cancel() {
      this.$router.push({ path: '/menu' })
    },
    onSubmit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // 数据保存至后端即可, 图片保存
          putDish(this.ruleForm).then(() => {
            this.$message.success('添加成功')
            this.$router.push({ path: '/menu' })
          }).catch(error => { console.log(error.response) })
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
    handleLimit(file, fileList) {
      if (fileList.length >= 1) {
        this.eqObj.uploadDisabled = true
        this.$set(this.eqObj, 'uploadDisabled', true)
      } else {
        this.eqObj.uploadDisabled = false
        this.$set(this.eqObj, 'uploadDisabled', false)
      }
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
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }
.avatar {
    width: 146px;
    height: 146px;
    border-radius: 2px;
    display: block;
  }
.card-input {
  width: 700px;
}

.taste .item {
  display: flex;
  justify-content: space-between;
}
.taste .inline-input {
  margin-right: 10px;
}
.taste .tag-input {
  border: solid 1px rgb(207, 205, 205);
  border-radius: 5px;
  background-color: #fff;
  width: 400px;
  margin-right: 10px;
  padding: 1px;
}

.tasteDel {
  cursor: pointer;
}

.disabled .el-upload.el-upload--picture-card {
  display: none !important;
}

.disabled .el-button--success.is-plain {
  display: none !important;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
</style>

