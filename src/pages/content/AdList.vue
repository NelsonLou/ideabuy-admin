<template>
<div class="">
  <div class="toolBtn">
    <!-- 添加按钮 -->
    <el-button type="primary" @click="add()" icon="plus" class="adClass_add">添加信息</el-button>
    <!-- 搜索框 -->
    <el-input placeholder="请输入要搜索的名称" :icon="close ? 'close' : ''" :on-icon-click="handleClose" v-model="input2" @keyup.enter.native="handleIconClick" class="adClass_serch">
    </el-input>
    <el-button @click="handleIconClick" type="primary" style="margin-left: 20px;">搜索</el-button>
  </div>
  <el-card class="box-card">
    <!-- 表格 -->
    <el-table v-loading.body="listLoading" :data="adList" @selection-change="selsChange" highlight-current-row border>
      <el-table-column type="selection" width="50">
      </el-table-column>
      <el-table-column prop="ad_id" :width="80" label="ID">
      </el-table-column>
      <el-table-column prop="ad_img" :width="139" label="图片">
        <template scope="scope">
        <img :src="scope.row.ad_img" alt="" class="manageImg">
      </template>
      </el-table-column>
      <el-table-column prop="type_name" :min-width="170" label="名称">
      </el-table-column>
      <el-table-column prop="img_size" :width="130" label="尺寸">
      </el-table-column>
      <el-table-column prop="is_show" :width="95" :formatter="isShow" label="是否显示">
      </el-table-column>
      <el-table-column prop="location_href" :width="130" label="跳转链接">
      </el-table-column>
      <el-table-column prop="created_at" :width="190" label="添加时间">
      </el-table-column>
      <el-table-column prop="updated_at" :width="190" label="最后更新时间">
      </el-table-column>
      <el-table-column label="操作" fixed="right" :width="180">
        <template scope="scope">
          <!-- 编辑按钮 -->
              <el-button
                size="small"
                icon="edit"
                type="primary"
                @click="handleGetManage(scope.row)">编辑</el-button>
        <!-- 删除 -->
        <el-button size="small" type="danger" icon="delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑&添加弹窗 -->
    <el-dialog :title="formType ? '添加信息':'编辑信息'" :visible.sync="dialogFormVisible" class="listPup">
      <el-form :model="formEdit" :key="editFormKey" :rules="rules" ref="ruleForm" class="adListForm">
        <!-- 下拉框 -->
        <el-form-item label="名称:" prop="type_id" :label-width="formLabelWidth">
          <el-select v-model="formEdit.type_id" filterable placeholder="请选择" class="manageSel">
            <el-option v-for="item in selectM" :key="item.type_id" :label="item.type_name" :value="item.type_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转链接:" :label-width="formLabelWidth">
          <el-input auto-complete="off" v-model="formEdit.location_href"></el-input>
        </el-form-item>
        <!-- 图片上传 -->
        <el-form-item label="图片:" :label-width="formLabelWidth" :class={upImg:upImg}>
          <el-upload :action="imgUp" :headers="header" name="pic" :fileList="upImgClean" list-type="picture-card" :on-success="handleUploadSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <!-- 单选 -->
        <el-form-item label="是否显示:" :label-width="formLabelWidth" id="isShow">
          <el-radio class="radio" v-model="formEdit.is_show" label="0">显示</el-radio>
          <el-radio class="radio" v-model="formEdit.is_show" label="1">不显示</el-radio>
        </el-form-item>
        <div class="pupBtn">
          <el-button type="primary" @click="editPost()">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 编辑结束 -->
    <div class="" style="margin-top: 20px;">
      <!-- 批量删除按钮 -->
      <el-button icon="delete" :disabled="this.sels.length === 0" @click="handleDeleteAll" type="danger">批量删除</el-button>
      <!-- 分页按钮 -->
      <div class="block">
        <el-pagination layout="prev, pager, next" :current-page="currentPage" :page-count="adManagePage" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </el-card>
</div>
</template>
<script>
export default {
  data() {
    return {
      header: this.$api.config.headers,
      // 列表加载
      adList: [],
      // 分页
      adManagePage: 0,
      // 加载
      listLoading: false,
      // 输入框/搜索框
      input2: '',
      // 添加图片标签的显示不显示
      upImg: false,
      visible2: false,
      // 表单弹窗的关闭开启
      dialogFormVisible: false,
      // 表单类型
      formType: true,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      // 搜索框关闭按钮
      close: false,
      // 图片接口
      imgUp: this.$api.config.url + this.$api.content.baseImage,
      formLabelWidth: '120px',
      // 表单数据获取
      formEdit: {},
      // 下拉框数据
      selectM: [],
      // 批量选中列表
      sels: [],
      selectInp: '',
      // 返回获取图片的地址
      backImg: [],
      // 分页数
      currentPage: 1,
      // 每页条数
      pageL: this.$api.config.limit,
      // 单选
      radio: '1',
      // 图片放大显示
      dialogImageUrl: '',
      dialogVisible: false,
      upImgClean: [],
      // fileList2: [],
      formData: {
        title: '',
        type: '',
        photo: '',
        addTime: '',
        endAddTime: ''
      },
      // 添加清空数据
      upload: {
        response: null,
        file: null,
        fileList: null
      },
      // 表单验证重置
      editFormKey: 1,
      // 编辑表单验证
      rules: {
        type_id: [{
          required: true,
          message: '请选择名称',
          trigger: 'change',
          type: 'integer'
        }]
      }
    }
  },
  // 分页
  created() {
    this.handleAdManage()
    this.handleManageSelect()
  },
  watch: {
    input2: function(newQuestion) {
      if (newQuestion !== '') {
        this.close = true
      } else {
        this.close = false
      }
    }
  },
  methods: {
    // 性别显示转换
    isShow: row => {
      return row.is_show === 0 ? '显示' : row.is_show === 1 ? '不显示' : '未知'
    },
    // 页面加载获取表格数据
    handleAdManage(para) {
      this.listLoading = true
      this.axios.get(this.$api.content.AdManage, para).then(res => {
        // console.log('111111', res)
        // console.log(this.pageL)
        const {
          code,
          msg,
          data
        } = res.data
        if (code === 1) {
          this.listLoading = false
          let total = data.total
          let classP = Math.ceil(total / this.pageL)
          this.adManagePage = classP
          this.adList = data.ad_list
        } else {
          this.$message.error(msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 图片上传成功返回的钩子
    handleUploadSuccess(response, file, fileList) {
      this.upImgClean = fileList
      if (this.upImgClean.length === 1) {
        // console.log('图片上传成功返回的钩子', file.response.data)
        this.upload.file = file.response.data.pic
        this.upImg = true
        this.formEdit.ad_img = this.upload.file
      }
    },
    // 页面加载时加载下拉框数据
    handleManageSelect() {
      // console.log('handleManageSelect')
      this.axios.get(this.$api.content.spiManage).then(res => {
        // console.log(res.data.data)
        const {
          code,
          msg,
          data
        } = res.data
        if (code === 1) {
          this.selectM = data.type_list
        } else {
          this.$message.error(msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 点击编辑获取本行详情
    handleGetManage(row) {
      this.listLoading = true
      this.fileList = 1
      if (this.fileList === 1) {
        this.upImg = true
      }
      // console.log(this.fileList)
      this.formType = false
      const manageId = {
        params: {
          ad_id: row.ad_id
        }
      }
      this.axios.get(this.$api.content.deManage, manageId).then(res => {
        // console.log(res, '11111111')
        // console.log(this.fileList)
        const {
          code,
          msg,
          data
        } = res.data
        if (code === 1) {
          this.listLoading = false
          this.dialogFormVisible = true
          this.upImgClean = [{
            url: data.ad_detail.ad_img
          }]
          // console.log(data.ad_img)
          this.formEdit = {
            ad_id: data.ad_detail.ad_id,
            type_id: data.ad_detail.type_id,
            location_href: data.ad_detail.location_href,
            ad_img: data.ad_detail.ad_img,
            is_show: '' + data.ad_detail.is_show
          }
        } else {
          this.$message.error(msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 添加信息
    add() {
      this.listLoading = true
      this.formType = true
      this.upImgClean = []
      this.editFormKey = Date.parse(new Date()) / 1000
      if (this.upImgClean.length === 0) {
        this.listLoading = false
        this.dialogFormVisible = true
        this.upImg = false
      }
      this.formEdit = {
        ad_id: null,
        type_id: null,
        location_href: '',
        ad_img: '',
        is_show: ''
      }
      // console.log(this.formEdit)
    },
    // 编辑完成和添加完成提交方法
    editPost() {
      if (this.formType) {
        //  添加后提交
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            let para = {
              type_id: this.formEdit.type_id,
              location_href: this.formEdit.location_href,
              ad_img: this.formEdit.ad_img,
              is_show: this.formEdit.is_show * 1
            }
            // console.log('111111', para)
            this.listLoading = true
            this.axios.post(this.$api.content.tjManage, para).then(res => {
              // console.log('11111', res)
              const {
                code,
                msg
              } = res.data
              if (code === 1) {
                this.listLoading = false
                this.$message.success(msg)
                this.$refs['ruleForm'].resetFields()
                this.handleAdManage()
              } else {
                this.$message.error(msg)
              }
            }).catch(error => {
              console.log(error)
            })
            this.dialogFormVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        // 修改后提交
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.listLoading = true
            let para = this.formEdit
            this.axios.post(this.$api.content.edManage, para).then(res => {
              // console.log('handleEditPost', res)
              const {
                code,
                msg
              } = res.data
              if (code === 1) {
                this.listLoading = true
                this.$message.success(msg)
                let para = {
                  params: {
                    page: this.currentPage,
                    limit: this.pageL
                  }
                }
                this.handleAdManage(para)
              } else {
                this.$message.error(msg)
              }
            }).catch(error => {
              console.log(error)
            })
            this.dialogFormVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    //  搜索点击图标方法
    handleIconClick() {
      let para = {
        params: {
          page: this.currentPage,
          limit: this.pageL,
          keyword: this.input2
        }
      }
      this.handleAdManage(para)
    },
    //  删除方法
    handleDelete(row) {
      // console.log('handleDelete', index)
      this.$confirm('是否删除此条信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        // ArticleList.splice(index, 1)
        const data = {
          ad_id: row.ad_id
        }
        //  删除行
        this.axios.post(this.$api.content.delManage, data).then(res => {
          // console.log(res)
          const {
            code,
            msg
          } = res.data
          if (code === 1) {
            this.listLoading = false
            let para = {
              params: {
                page: this.currentPage,
                limit: this.pageL
              }
            }
            this.handleAdManage(para)
            this.$message.success(msg)
          } else {
            this.$message.error(msg)
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 批量选中列表
    selsChange(sels) {
      this.sels = sels
    },
    // 批量删除列表
    handleDeleteAll() {
      // 已选列表id
      const ids = this.sels.map(item => item.ad_id).toString()
      // console.log(ids, '111111')
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        const para = {
          ad_id: ids
        }
        this.axios.post(this.$api.content.delManageAll, para).then(res => {
          this.listLoading = false
          const {
            code,
            msg
          } = res.data
          if (code === 1) {
            let para = {
              params: {
                page: this.currentPage,
                limit: this.pageL
              }
            }
            this.handleAdManage(para)
            this.$message.success(msg)
          } else {
            this.$message.error(msg)
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {})
    },
    // 删除上传的图片返回的钩子
    handleRemove(file, fileList) {
      // console.log(file.url)
      // console.log(fileList)
      if (fileList.length === 0) {
        this.upImg = false
      }
      // let para = {
      //   img_url: file.url
      // }
      // this.axios.post(this.$api.content.delImage, para).then(res => {
      //   const {
      //     code,
      //     msg
      //   } = res.data
      //   if (code === 1) {
      //     this.$message.success(msg)
      //   } else {
      //     this.$message.error(msg)
      //   }
      // })
    },
    // 搜索
    handleClose() {
      this.input2 = ''
      this.handleAdManage()
    },
    // 放大图片显示的方法
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 翻页方法
    handleCurrentChange(page) {
      // console.log('翻页', page)
      this.currentPage = page
      let para = {
        params: {
          page: this.currentPage,
          limit: this.pageL
        }
      }
      this.handleAdManage(para)
    }
  }
}
</script>

<style lang="scss" scoped>
.adClass_add {
    float: right;
}
.block {
    float: right;
}
.adClass_serch {
    width: 320px;
    float: left;
}
.manageSel {
    width: 320px;
}
.manageImg {
    width: 100%;
    height: 80px;
    display: block;
    margin: 10px 0;
}
.el-upload--picture-card {
    display: none;
}
.adListForm {
    width: 500px;
    #isShow {
        margin-bottom: 0;
    }
}
.toolBtn {
    overflow: hidden;
    border-bottom: 1px solid #f8f8f8;
    padding: 16px 20px;
    background: #fff;
}
.pupBtn {
    width: 320px;
    margin-left: 120px;
    margin-top: 10px;
    overflow: hidden;
    .el-button--primary {
        float: left;
        margin: 0;
    }
}
</style>
<style lang="scss">
.upImg .el-upload {
    display: none;
}
</style>
