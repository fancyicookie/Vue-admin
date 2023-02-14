<!--
 * @Date: 2023-02-05 22:57:51
 * @Author: Fancyicookie
-->
<template>
  <div id="member-app" class="container">
    <div class="table-container">
      <div class="tableBar">
        <button class="el-button el-button--info">
          <span>+ 新增菜品分类</span>
        </button>
        <button class="el-button el-button--primary">
          <span>+ 新增套餐分类</span>
        </button>
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
          <!-- 需要单独设置 -->
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
      tableList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getCategory({ page: 1, pageSize: 10 }).then(res => {
        // return res
        console.log(res.data.records)
        this.tableList = res.data.records
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
