<!--
 * @Date: 2023-02-05 20:31:41
 * @Author: Fancyicookie
-->
<template>
  <div id="member-app" class="container">
    <div class="table-container">
      <div class="tableBar">
        <div class="el-input el-input--prefix el-input--suffix" style="width:250px">
          <input v-model="searchName" type="text" placeholder="请输入员工姓名" class="el-input__inner">
          <span class="el-input__prefix">
            <i class="el-input__icon el-icon-search" style="cursor: pointer;" @click="searchNames" />
          </span>
        </div>
        <button class="el-button el-button--primary" @click="addEmployee">
          <span>+ 添加员工</span>
        </button>
      </div>
      <div class="el-table tableBox">
        <el-table :data="tableList" stripe border style="width: 100%">
          <el-table-column prop="name" label="员工姓名" width="180" />
          <el-table-column prop="username" label="账号" width="180" />
          <el-table-column prop="phone" label="手机号" width="180" />
          <!-- 需要单独设置 -->
          <el-table-column prop="status" label="账号状态" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.status == 1 ? '已启用' : '禁用' }}</span>
            </template>
          </el-table-column>
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
              >{{ scope.row.status == 1 ? '禁用' : '启用' }}</el-button>
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
import { getEmployees } from '@/api/employee'
// import { editEmployee } from '@/api/employee'

export default {
  name: 'Employee',
  data() {
    return {
      // 总体全部数据
      tableList: [],
      // 每页数据
      pageData: [],
      pageTotal: 0,
      currentPage: 1,
      pageSize: 10,
      showList: [],
      searchName: ''
    }
  },
  created() {
    // console.log('created')
    this.fetchData()
  },
  methods: {
    // 改变每页大小的回调
    handleSizeChange(val) {
      this.pageSize = val
      this.pageData = this.fetchData()
    },
    // 改变当前页的回调
    handleCurrentChange(val) {
      this.currentPage = val
      this.pageData = this.fetchData(this.currentPage, this.pageSize)
    },
    fetchData() {
      getEmployees({ page: this.currentPage, pageSize: this.pageSize }).then(res => {
        this.tableList = res.data.records
        this.pageTotal = res.data.total
      })
    },
    // 跳转添加员工界面
    addEmployee() {
      // console.log('add')
      this.$router.push({ path: '/employee/add' })
    },
    queryAllName() {
      this.showList = this.tableList
    },
    searchNames() {
      if (this.searchName.length === 0) {
        this.showList = this.tableList
      } else {
        this.tableList = this.tableList.filter(data => {
          return data.name.indexOf(this.searchName) !== -1
        })
      }
    },
    // 编辑
    handleEdit(index, row) {
      console.log('edit')
      this.$router.push({ path: '/employee/edit', query: { id: row.id }})
    },
    handleDelete(index, row) {
      if (row.status === 1) {
        row.status = 0
      } else {
        row.status = 1
      }
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
