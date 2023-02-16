<!--
 * @Date: 2023-02-05 20:31:41
 * @Author: Fancyicookie
-->
<template>
  <div id="member-app" class="container">
    <div class="table-container">
      <div class="tableBar">
        <div class="el-input el-input--prefix el-input--suffix" style="width:250px">
          <input type="text" placeholder="请输入员工姓名" class="el-input__inner">
          <span class="el-input__prefix">
            <i class="el-input__icon el-icon-search" />
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
export default {
  name: 'Employee',
  data() {
    return {
      tableList: [],
      pageData: [],
      pageTotal: 0,
      currentPage: 1,
      pageSize: 10
    }
  },
  created() {
    // console.log('created')
    this.fetchData()
  },
  updated() {
    console.log('updated')
    // 会一直不断地调用
    // this.fetchData()
  },
  mounted() {
    console.log(this.$route.query)
    this.tableList.unshift(this.$route.query)
    this.fetchData()
    console.log('finish')
  },
  methods: {
    // 改变每页大小的回调
    handleSizeChange(val) {
      this.pageSize = val

      this.pageData = this.queryByPage()
    },
    // 改变当前页的回调
    handleCurrentChange(val) {
      this.currentPage = val

      this.pageData = this.queryByPage()
    },
    fetchData() {
      // 这里参数不可变，之后需要改为 动态改变的写法
      getEmployees({ page: this.currentPage, pageSize: this.pageSize }).then(res => {
        // return res
        this.tableList = res.data.records
        console.log(this.tableList)
        this.pageTotal = res.data.total
        this.pageData = this.queryByPage()
      })
    },
    // 实现分页的方法
    queryByPage() {
      // 起始位置 = (当前页 - 1) x 每页的大小
      const start = (this.currentPage - 1) * this.pageSize
      // 结束位置 = 当前页 x 每页的大小
      const end = this.currentPage * this.pageSize
      return this.tableList.slice(start, end)
    },
    // 跳转添加员工界面
    addEmployee() {
      console.log('add')
      this.$router.push({ path: '/addemployee/index' })
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
