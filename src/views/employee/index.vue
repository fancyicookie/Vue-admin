<!--
 * @Date: 2023-02-05 20:31:41
 * @Author: Fancyicookie
-->
<template>
  <div>员工管理</div>
</template>

<script>
import { getEmployees } from '@/api/employee'
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
      // 这里参数不可变，之后需要改为 动态改变的写法
      getEmployees({ page: 1, pageSize: 10 }).then(res => {
        console.log(res)
      })
    }
  }

}
</script>

<style>

</style>
