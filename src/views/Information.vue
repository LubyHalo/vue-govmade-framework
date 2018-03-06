<template>
  <div>
    <div class="page-header">
      <blockquote class="h4">
        信息资源测试
      </blockquote>
    </div>
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-col :span="3">
          <el-form-item size="small" label="">
            <el-select v-model="formInline.region" placeholder="搜索项">
              <el-option label="全部" value="all"></el-option>
              <el-option label="日期" value="date"></el-option>
              <el-option label="姓名" value="name"></el-option>
              <el-option label="地址" value="address"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-form-item size="small" label="">
          <el-input v-model="formInline.user" placeholder="搜索字段"></el-input>
        </el-form-item>
        <el-form-item size="small">
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item size="small">
          <el-button type="primary">新增</el-button>
          <el-button type="primary">导入</el-button>
          <el-button type="primary">导出</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData.rows"
        border
        stripe
        fit
        style="width: 100%">
        <el-table-column
          type="index"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="viewRow(scope.$index, scope.row)"><i class="fa fa-info-circle"></i>查看</el-button>
            <el-button size="mini" @click="editRow(scope.$index, scope.row)"><i class="fa fa-pencil"></i>编辑</el-button>
            <el-popover
              ref="popover"
              placement="top"
              width="160"
              v-model="popVisible"
              trigger="click"
              :key="scope.$index">
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="popVisible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="popVisible = false">确定</el-button>
              </div>
            </el-popover>
            <el-button v-popover:popover  size="mini" @click.native.prevent="deleteRow(scope.$index, tableData.rows)" type="danger"><i class="fa fa-trash"></i>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
        class="text-right table-pagination">
      </el-pagination>
    </div>
    <!-- 一级弹框 -->
    <el-dialog
      class="dialog-first-level"
      title="详情弹窗"
      :visible.sync="dialogVisible"
      top="8vh"
      width="70%"
      :close-on-click-modal='false'
      :modal-append-to-body='false'>
      <el-col :span="20" :offset="2">
        <el-form :model="form" ref="form1" status-icon :rules="rules1">
          <el-form-item label="日期：" :label-width="formLabelWidth" prop="date">
            <el-input v-model="form.date" auto-complete="off" placeholder="日期" :disabled='formDisabled'></el-input>
          </el-form-item>
          <el-form-item label="姓名：" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" auto-complete="off" placeholder="姓名" :disabled='formDisabled'></el-input>
          </el-form-item>
          <el-form-item label="地址：" :label-width="formLabelWidth" prop="address">
            <el-input v-model="form.address" auto-complete="off" placeholder="地址" :disabled='formDisabled'></el-input>
          </el-form-item>
          <el-form-item label="活动区域：" :label-width="formLabelWidth">
            <el-select class="full-width" v-model="form.region" placeholder="请选择活动区域" :disabled='formDisabled'>
              <el-option label="上海" value="1"></el-option>
              <el-option label="北京" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table :data="gridData.rows" border>
        <el-table-column property="date" label="日期"></el-table-column>
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="viewRow2(scope.$index, scope.row)"><i class="fa fa-info-circle"></i>查看</el-button>
            <el-button size="mini" @click.native.prevent="deleteRow2(scope.$index, gridData)" type="danger"><i class="fa fa-trash"></i>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer" v-if="!formDisabled">
        <el-button size="small" @click="dialogCancel('form1')">取 消</el-button>
        <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 二级弹框 -->
    <el-dialog
      class="dialog-second-level"
      title="二级详情弹窗"
      :visible.sync="dialogVisible2"
      top="10vh"
      width="50%"
      :close-on-click-modal='false'
      append-to-body
      :modal-append-to-body='false'>
      <el-col :span="20" :offset="2">
        <el-form :model="form2">
          <el-form-item label="活动名称：" :label-width="formLabelWidth">
            <el-input v-model="form2.name" auto-complete="off" :disabled='formDisabled'></el-input>
          </el-form-item>
          <el-form-item label="活动区域：" :label-width="formLabelWidth">
            <el-select class="full-width" v-model="form2.region" placeholder="请选择活动区域" :disabled='formDisabled'>
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <div slot="footer" class="dialog-footer" v-if="formDisabled">
        <el-button size="small" @click="dialogVisible2 = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dialogVisible2 = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/api.js'

export default {
  data () {
    return {
      formDisabled: false,
      popVisible: false,
      tableData: [],
      formInline: {
        region: '',
        user: ''
      },
      gridData: [],
      dialogVisible: false,
      form: {
        date: '',
        name: '',
        address: ''
      },
      currentPage: 1,
      currentPageChange: '1',
      pageSize: 10,
      pageSizeChange: '10',
      apiParams: { pageSize: '10', currentPage: '1' },
      rules1: {
        date: { required: true, message: '请输入日期', trigger: 'blur' },
        name: { required: true, message: '请输入姓名', trigger: 'blur' },
        address: { required: true, message: '请输入地址', trigger: 'blur' }
      },
      formLabelWidth: '120px',
      dialogVisible2: false,
      form2: {
        date: '',
        name: '',
        address: ''
      }
    }
  },
  created () {
    this.setTestApi()
  },
  methods: {
    onSubmit () {
      console.log('submint!')
    },
    viewRow (index, row) {
      this.formDisabled = true
      this.dialogVisible = true
      this.form.date = row.date
      this.form.name = row.name
      this.form.address = row.address
      console.log(row.date + ',' + row.name + ',' + row.address)
      api.infoRow('/test/table2', 'type=top&key=123456').then(res => {
        console.log(res)
        this.gridData = res.gridData
      })
    },
    viewRow2 (index, row) {
      this.dialogVisible2 = true
      console.log(row.date + ',' + row.name + ',' + row.address)
    },
    editRow (index, row) {
      this.formDisabled = false
      this.dialogVisible = true
      this.form.date = row.date
      this.form.name = row.name
      this.form.address = row.address
      console.log(row.date + ',' + row.name + ',' + row.address)
      api.infoRow('/test/table2', 'type=top&key=123456').then(res => {
        console.log(res)
        this.gridData = res.gridData
      })
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    deleteRow2 (index, rows) {
      rows.splice(index, 1)
    },
    handleSizeChange (val) {
      this.pageSizeChange = `${val}`
      this.apiParams = {
        pageSize: this.pageSizeChange,
        currentPage: this.currentPageChange
      }
      console.log(this.apiParams)
      api.infoRow('/test/table1', this.apiParams).then(res => {
        console.log(res)
        this.tableData = res.tableData
      })
    },
    handleCurrentChange (val) {
      this.currentPageChange = `${val}`
      this.apiParams = {
        pageSize: this.pageSizeChange,
        currentPage: this.currentPageChange
      }
      api.infoRow('/test/table1', this.apiParams).then(res => {
        console.log(res)
        this.tableData = res.tableData
      })
    },
    setTestApi: function () {
      api.infoRow('/test/table1', this.apiParams).then(res => {
        console.log(res)
        this.tableData = res.tableData
      })
    },
    dialogCancel: function (formName) {
      this.dialogVisible = false
      this.$refs[formName].resetFields()
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    paginationChange: function (val) {
      console.log(`${val}`)
    },
    indexMethod: function (index) {
      return index
    }
  }
}
</script>
