<!--
 * @Date: 2023-02-05 20:31:41
 * @Author: Fancyicookie
-->
<template>
  <div id="member-app" class="container">
    <div class="table-container">
      <div class="tableBar">
        <div class="el-input el-input--prefix el-input--suffix" style="width:250px">
          <input type="text" placeholder="请输入订单号" class="el-input__inner">
          <span class="el-input__prefix">
            <i class="el-input__icon el-icon-search" />
          </span>
        </div>
        <button class="el-button el-button--primary">
          <span>查询</span>
        </button>
      </div>
      <div class="el-table tableBox">
        <el-table :data="tableList" stripe border style="width: 100%">
          <el-table-column prop="name" label="订单号" width="180" />
          <el-table-column prop="status" label="订单状态" width="180" />
          <el-table-column prop="user" label="用户" width="180" />
          <el-table-column prop="phone" label="手机号" width="180" />
          <el-table-column prop="address" label="地址" width="180" />
          <el-table-column prop="time" label="下单时间" width="180" />
          <el-table-column prop="cost" label="实收金额" width="180" />
          <el-table-column prop="operation" label="操作" width="180" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrder } from '@/api/order'
export default {
  name: 'Order',
  data() {
    return {
      tableList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // 这里参数不可变，之后需要改为 动态改变的写法
      getOrder({ page: 1, pageSize: 10 }).then(res => {
        // return res
        console.log(res.data.records)
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
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
}
</style>

