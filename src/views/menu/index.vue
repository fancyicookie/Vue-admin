<!--
 * @Date: 2023-02-05 22:59:12
 * @Author: Fancyicookie
-->
<template>
  <div id="member-app" class="container">
    <div class="table-container">
      <div class="tableBar">
        <div class="el-input el-input--prefix el-input--suffix" style="width:250px">
          <input type="text" placeholder="请输入菜品姓名" class="el-input__inner">
          <span class="el-input__prefix">
            <i class="el-input__icon el-icon-search" />
          </span>
        </div>
        <button class="el-button el-button--primary">
          <span>+ 新建菜品</span>
        </button>
      </div>
      <div class="el-table tableBox">
        <!-- 多行数据的复选框 -->
        <el-table ref="multipleTable" :data="tableList" stripe border style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="name" label="菜品名称" width="180" />
          <el-table-column prop="image" label="图片" width="90">
            <template slot-scope="scope">
              <img :src="scope.row.image" alt="">
            </template>
          </el-table-column>
          <el-table-column prop="categoryName" label="菜品分类" width="90" />
          <el-table-column prop="price" label="售价" width="90" />
          <el-table-column prop="status" label="售卖状态" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.status == 1 ? '起售' : '停售' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="最后操作时间" width="180" />
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >{{ scope.row.status == 1 ? '停售' : '启售' }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
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
import { getDish } from '@/api/menu'
export default {
  name: 'Employee',
  data() {
    return {
      tableList: [],
      pageData: [],
      pageTotal: 0,
      currentPage: 1,
      pageSize: 10,
      multipleSelection: []
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
      getDish({ page: this.currentPage, pageSize: this.pageSize }).then(res => {
        this.tableList = res.data.records
        this.pageTotal = res.data.total
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
}
</style>

