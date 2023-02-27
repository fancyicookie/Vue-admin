<!--
 * @Date: 2023-02-15 17:49:59
 * @Author: Fancyicookie
-->
<template>
  <div id="member-app" class="container">
    <div class="table-container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="200px" class="demo-ruleForm">
        <!-- 套餐名称 -->
        <el-form-item prop="name" label="套餐名称">
          <el-input v-model="ruleForm.name" placeholder="请填写套餐名称" />
        </el-form-item>
        <!-- 套餐分类 -->
        <el-form-item prop="categoryName" label="套餐分类">
          <el-select v-model="ruleForm.categoryName" placeholder="请选择套餐分类" @change="getCategoryId">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <!-- 套餐价格 -->
        <el-form-item prop="price" label="套餐价格">
          <el-input v-model.number="ruleForm.price" placeholder="请设置套餐价格" />
        </el-form-item>
        <!-- 套餐菜品 -->
        <el-form-item label="套餐菜品">
          <el-button v-show="addset" @click="show">+ 添加菜品</el-button>
          <el-dialog title="添加菜品" :visible.sync="dialogAddDish">
            <div class="addsetmeal">
              <div class="dishdata" style="width: 20%">
                <el-table
                  :data="dishData"
                  border
                  :show-header="false"
                  :header-cell-style="{ background: `${headerColor}` }"
                  :cell-style="cellStyle"
                  :cell-class-name="tableCellClassName"
                  @cell-click="cellClick"
                >
                  <el-table-column prop="name" label="菜品" />
                </el-table>
              </div>
              <div class="selectdish" style="width: 40%">
                <div class="checkitems">
                  <div v-if="checkshow">
                    <el-checkbox-group v-model="checkList">
                      <el-checkbox
                        v-for="item in selectDishdata"
                        :key="item.name"
                        border
                        style="width: 200px"
                        :label="item"
                        @change="handleCheck"
                      >
                        <div class="items">
                          <span>{{ item.name }}</span>
                          <span>{{ item.status == 1 ? '在售' : '停售' }}</span>
                          <span style="text-align: right">￥{{ parseInt(item.price) / 100 }}</span>
                        </div>
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <div v-else class="nodish">暂无菜品！</div>
                </div>
              </div>
              <div class="ritCont" style="width: 40%">
                <div>已选菜品({{ selectall.length }})</div>
                <div v-for="item in selectall" :key="item.id" class="items">
                  <span>{{ item.name }}</span>
                  <span>￥{{ parseInt(item.price) / 100 }}</span>
                  <i class="el-icon-circle-close" @click="deleteitem(item)" />
                </div>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogAddDish = false">取 消</el-button>
              <el-button type="primary" @click="onAddDish">确 定</el-button>
            </div>
          </el-dialog>
          <el-card v-show="addshow" class="card-input" shadow="never" style="background-color: rgb(252, 252, 252)">
            <el-button @click="show">+ 添加菜品</el-button>
            <div>
              <el-table :data="selectall" style="width: 100%">
                <el-table-column prop="name" label="名称" width="180" />
                <el-table-column prop="price" label="原价" width="90">
                  <template slot-scope="scope">
                    ￥{{ parseInt(scope.row.price) / 100 }}
                  </template>
                </el-table-column>
                <el-table-column label="份数">
                  <el-input-number v-model="num" :min="1" :max="10" label="描述文字" size="small" @change="handleChange" />
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleDel(scope.$index, scope.row)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-form-item>
        <!-- 套餐图片 -->
        <el-form-item prop="image" label="套餐图片">
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
        <el-form-item prop="description" label="套餐描述">
          <el-input v-model="ruleForm.description" type="textarea" placeholder="请输入套餐描述，最多200字" />
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button @click="cancel">取消</el-button>
          <!-- 跳转页面并显示 -->
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <!-- 不跳转页面，输入框为空 -->
          <el-button type="primary" @click="submitReset">保存并继续添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCateList, addSetmeal, getDishList } from '@/api/setmeal'
import { uploadImage } from '@/api/common'

export default {
  name: 'AddEmployee',
  data() {
    return {
      env: process.env.VUE_APP_BASE_API,
      ruleForm: {
        name: '',
        price: '',
        image: '',
        description: '',
        categoryId: '',
        id: '',
        idType: '',
        status: 1,
        code: '',
        setmealDishes: []
      },
      dishData: {
        name: ''
      },
      selectDishdata: [{}],
      dialogVisible: false,
      disabled: false,
      dialogAddDish: false,
      options: [{
        name: '',
        id: ''
      }],
      rules: {
        name: [
          { required: true, message: '请输入套餐名称', trigger: 'blur' }
        ],
        categoryName: [
          { required: true, message: '请输入套餐分类', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入套餐价格', trigger: 'blur' },
          { max: 10000, message: '套餐价格最大不能超过10000', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '', trigger: 'blur' }
        ]
      },
      addset: true,
      addshow: false,
      state: '',
      tastes: [],
      currentval: '',
      TagsAll: '',
      value: '',
      dialogVisibleimg: false,
      headerColor: 'rgb(242,242,242)',
      clickedRow: '',
      clickedColumn: '',
      checkshow: false,
      selectall: [],
      labels: [],
      checkList: [],
      num: 1
    }
  },
  created() {
    getCateList({ type: 1 }).then(res => {
      // 菜品分类的所有结果
      this.dishData = res.data
      // 自动加载第一个菜品的dish，结果显示在弹出的对话框中
      getDishList({ categoryId: res.data[0].id }).then(res => {
        if (res.data.length === 0) {
          this.checkshow = false
        } else {
          this.checkshow = true
          this.selectDishdata = res.data
        }
      })
    })
    getCateList({ type: 2 }).then(res => {
      // 套餐分类的所有结果
      this.options = res.data
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
      this.dialogAddDish = true
      this.addshow = !this.addshow
      this.addset = !this.addset
    },
    onAddDish() {
      console.log(this.selectall)
      this.dialogAddDish = false
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
    handleSelect(item) {
      console.log(item)
    },
    cancel() {
      this.$router.push({ path: '/setmeal' })
    },
    onSubmit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // 数据保存至后端即可, 图片保存
          addSetmeal(this.ruleForm).then(() => {
            this.$message.success('添加成功')
            this.$router.push({ path: '/setmeal' })
          }).catch(error => { console.log(error.response) })
        } else {
          return false
        }
      })
    },
    submitReset() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          addSetmeal(this.ruleForm).then(() => {
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
    getCategoryId(val) {
      var obj = {}
      obj = this.options.find(function(item) {
        return item.id === val
      })
      this.ruleForm.categoryId = obj.id
    },
    tableCellClassName({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex
      column.index = columnIndex
    },
    cellClick(row, column, cell, event) {
      // 点击单元格，找到菜品的id，getDishList
      // console.log(this.dishData[row.index].id)
      getDishList({ categoryId: this.dishData[row.index].id }).then(res => {
        if (res.data.length === 0) {
          this.checkshow = false
        } else {
          this.checkshow = true
          this.selectDishdata = res.data
        }
      })
      this.clickedRow = row.index
      this.clickedColumn = column.index
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (row.index === this.clickedRow && column.index === this.clickedColumn) {
        return 'border:1px solid #409EFF; color: #409EFF'
      } else if (columnIndex === 0) {
        return ''
      } else {
        return ''
      }
    },
    handleCheck(val) {
      // console.log(val)
      // console.log(this.checkList)
      this.selectall = this.checkList
    },
    deleteitem(item) {
      const delitem = this.selectall.indexOf(item)
      this.selectall.splice(delitem, 1)
    },
    handleChange(value) {
      console.log(value)
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

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.addsetmeal {
    display: flex;
}
.el-table__row>td{ border: none; }

.dishdata .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #fff;
    cursor: pointer;
 }
.ritCont {
  margin-left: 20px;
}
.selectdish {
  border: solid 1px #efefef;
}
.selectdish .checkitems {
  padding: 15px 10px 10px 15px;
}
.selectdish .items span{
  margin-right: 10px;
}
.ritCont {
  overflow: hidden;
  border: solid 1px #efefef;
  padding: 10px 15px;
}
.nodish {
  border: solid 1px #efefef;
  padding: 0 15px;
}
.ritCont .items {
  display: flex;
  justify-content: space-between;
  border: solid 1px #efefef;
  padding-left: 10px;
}
.ritCont .items .el-icon-circle-close {
  margin-top: 13px;
  margin-right: 11px;
  cursor: pointer;
}

</style>

