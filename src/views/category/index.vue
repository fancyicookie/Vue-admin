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
          <el-form :model="form">
            <el-form-item label="分类名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth">
              <el-input v-model="form.sort" autocomplete="off" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onCertain">确 定</el-button>
            <el-button type="info" @click="dialogVisible = false">保存并继续添加</el-button>
          </div>
        </el-dialog>
        <button class="el-button el-button--primary" @click="dialogSetVisible = true">
          <span>+ 新增套餐分类</span>
        </button>
        <el-dialog title="新增套餐分类" :visible.sync="dialogSetVisible">
          <el-form :model="form">
            <el-form-item label="套餐名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth">
              <el-input v-model="form.sort" autocomplete="off" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogSetVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogSetVisible = false">确 定</el-button>
            <el-button type="info" @click="dialogSetVisible = false">保存并继续添加</el-button>
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
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
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
import { getCategory } from '@/api/category'
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
      form: {
        name: '',
        sort: ''
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
    onCertain() {
      console.log('11')
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
