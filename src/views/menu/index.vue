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
        <div class="click-event">
          <div class="batch">
            <span>批量删除 | </span>
            <span style="color: #409EFF">批量启售  </span>|
            <span>批量停售 </span>
          </div>
          <button class="el-button el-button--primary" @click="addDish">
            <span>+ 新建菜品</span>
          </button>
        </div>
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
          <el-table-column prop="price" label="售价" width="90">
            <template slot-scope="scope">
              ￥{{ parseInt(scope.row.price) / 100 }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="售卖状态" width="90">
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
                @click="handleStatus(scope.$index, scope.row)"
              >{{ scope.row.status == 1 ? '停售' : '启售' }}</el-button>
              <el-button
                size="mini"
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
import { deleteDish, getDish } from '@/api/menu'
export default {
  name: 'Employee',
  data() {
    return {
      tableList: [],
      pageData: [],
      pageTotal: 0,
      currentPage: 1,
      pageSize: 10,
      multipleSelection: [],
      imgSrc: '',
      dialogDel: false,
      form: {
        id: '',
        name: '',
        categoryName: '',
        price: '',
        status: '',
        updateTime: ''
      }
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
    handleEdit(index, row) {
      console.log('edit')
      this.$router.push({ path: '/editdish', query: { id: row.id }})
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    addDish() {
      this.$router.push({ path: '/adddish' })
    },
    handleStatus(index, row) {
      if (row.status === 1) {
        row.status = 0
      } else {
        row.status = 1
      }
    },
    handleDelete(index, row) {
      console.log('delete')
      console.log(row)
      this.dialogDel = true
      this.form = row
    },
    onDel() {
      if (this.form.status === 0) {
        deleteDish({ ids: this.form.id }).then(() => {
          this.dialogDel = false
          this.$message.success('删除成功!')
          this.fetchData()
        })
      } else {
        this.$message.error('售卖状态不能删除!')
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
  align-items: center;
  justify-content: space-between;
}
.tableBar .click-event {
  display: flex;
  align-items: center;
}
.tableBar .click-event .batch {
  margin-right: 20px;
  cursor: pointer
}
</style>

