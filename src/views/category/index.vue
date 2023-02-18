<!--
 * @Date: 2023-02-05 22:57:51
 * @Author: Fancyicookie
-->
<template>
  <div id="member-app" class="container">
    <div class="table-container">
      <div class="tableBar">
        <button class="el-button el-button--info" @click="dialogVisible = true">
          <span>+ 新增菜品分类</span>
        </button>
        <el-dialog title="新增菜品分类" :visible.sync="dialogVisible">
          <el-form ref="dishForm" :model="dishForm">
            <el-form-item label="分类名称" :label-width="formLabelWidth">
              <el-input v-model="dishForm.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth">
              <el-input v-model.number="dishForm.sort" autocomplete="off" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onCertain">确 定</el-button>
            <el-button type="info" @click="onSave">保存并继续添加</el-button>
          </div>
        </el-dialog>
        <button class="el-button el-button--primary" @click="dialogSetVisible = true">
          <span>+ 新增套餐分类</span>
        </button>
        <el-dialog title="新增套餐分类" :visible.sync="dialogSetVisible">
          <el-form :model="setForm">
            <el-form-item label="套餐名称" :label-width="formLabelWidth">
              <el-input v-model="setForm.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth">
              <el-input v-model.number="setForm.sort" autocomplete="off" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogSetVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSetCertain">确 定</el-button>
            <el-button type="info" @click="onSetSave">保存并继续添加</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="el-table tableBox">
        <el-table :data="tableList" stripe border style="width: 100%">
          <el-table-column prop="name" label="分类名称" width="180" />
          <el-table-column prop="type" label="分类类型" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.type == 1 ? '菜品分类' : '套餐分类' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="操作时间" width="180" />
          <el-table-column prop="sort" label="排序" width="180" />
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >修改</el-button>
              <el-dialog title="修改分类" :visible.sync="dialogEdit">
                <el-form :model="form">
                  <el-form-item label="分类名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="排序" :label-width="formLabelWidth">
                    <el-input v-model.number="form.sort" autocomplete="off" />
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogEdit = false">取 消</el-button>
                  <el-button type="primary" @click="onEdit">确 定</el-button>
                </div>
              </el-dialog>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
              <el-dialog title="提示" :visible.sync="dialogDel">
                <span>此操作将永久删除该文件，是否继续</span>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogDel = false">取 消</el-button>
                  <el-button type="primary" @click="onDel">确 定</el-button>
                </div>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 12px;text-align: right;"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getCategory, saveCategory, editCategory, delCategory } from '@/api/category'
export default {
  name: 'Employee',
  data() {
    return {
      tableList: [],
      pageData: [],
      pageTotal: 0,
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      dialogSetVisible: false,
      dialogEdit: false,
      dialogDel: false,
      dishForm: {
        name: '',
        sort: '',
        type: 1
      },
      setForm: {
        name: '',
        sort: '',
        type: 2
      },
      form: {
        name: '',
        sort: '',
        type: ''
      },
      formLabelWidth: '90px'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.pageData = this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.pageData = this.fetchData(this.currentPage, this.pageSize)
    },
    fetchData() {
      getCategory({ page: this.currentPage, pageSize: this.pageSize }).then(res => {
        this.tableList = res.data.records
        this.pageTotal = res.data.total
      })
    },
    // 菜品保存
    onCertain() {
      if ((this.dishForm.name.length) && (this.dishForm.sort.length) !== 0) {
        // 数据保存至后端即可 post方法
        saveCategory(this.dishForm).then(() => {
          this.$message.success('分类添加成功')
          this.dialogVisible = false
        })
      } else {
        this.$message.error('请输入分类名称或排序')
      }
    },
    // 菜品保存并继续
    onSave() {
      if ((this.dishForm.name.length) && (this.dishForm.sort.length) !== 0) {
        // 数据保存至后端即可 post方法
        saveCategory(this.dishForm).then(() => {
          this.$message.success('分类添加成功')
          this.$refs['dishForm'].resetFields()
        })
      } else {
        this.$message.error('请输入分类名称或排序')
      }
    },
    // 套餐
    onSetCertain() {
      if ((this.setForm.name.length) && (this.setForm.sort.length) !== 0) {
        // 数据保存至后端即可 post方法
        saveCategory(this.setForm).then(() => {
          this.$message.success('分类添加成功')
          this.dialogSetVisible = false
        })
      } else {
        this.$message.error('请输入分类名称或排序')
      }
    },
    // 套餐保存并继续
    onSetSave() {
      if ((this.setForm.name.length) && (this.setForm.sort.length) !== 0) {
        // 数据保存至后端即可 post方法
        saveCategory(this.setForm).then(() => {
          this.$message.success('分类添加成功')
          this.$refs['setForm'].resetFields()
        })
      } else {
        this.$message.error('请输入分类名称或排序')
      }
    },

    // 修改
    handleEdit(index, row) {
      console.log('修改')
      this.dialogEdit = true
      this.form = row
    },
    onEdit() {
      console.log('保存修改')
      if ((this.form.name.length) && (this.form.sort.length) !== 0) {
        // put
        editCategory(this.form).then(() => {
          this.$message.success('分类修改成功!')
          this.dialogEdit = false
        })
      } else {
        this.$message.error('请输入分类名称或排序')
      }
    },
    // 删除
    handleDelete(index, row) {
      this.dialogDel = true
      this.form = row
    },
    onDel() {
      delCategory({ id: this.form.id }).then(() => {
        this.dialogDel = false
        this.$message.success('删除成功!')
        this.fetchData()
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
.container .tableBar {
  display: inline-block;
  margin-bottom: 20px;
}
</style>
