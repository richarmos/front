<template>
  <el-container :id="page" style="height: 100%;">
    <el-header style="height: 160px;">
      <el-form
        size="mini"
        :inline="true"
        label-width="80px"
        :model="formData"
        class="demo-form-inline">
        <el-row>
          <h1>中转旅客休息区管理</h1>
        </el-row>
        <el-form-item label="姓名">
          <el-input v-model="formData.name" placeholder="旅客姓名"></el-input>
        </el-form-item>
        <el-form-item label="国籍">
          <el-select v-model="formData.country">
            <el-option label="中国" value="CH"></el-option>
            <el-option label="美国" value="EM"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formData.state">
            <el-option label="正常" value="normal"></el-option>
            <el-option label="异常" value="abnormal"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="航班号">
          <el-input v-model="formData.flightNumber" placeholder="航班号"></el-input>
        </el-form-item>
        <el-form-item label="航班性质">
          <el-select v-model="formData.hangbanxingzhi">
            <el-option label="国内" value="DOM"></el-option>
            <el-option label="国外" value="DOM"></el-option>
          </el-select>
        </el-form-item>
        
        
        <el-form-item style="margin-left: 100px;">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="checkIn=true">登记</el-button>
          <el-button type="primary" @click="cancel">核销</el-button>
        </el-form-item>
        <span style="line-height: 40px;float: right;">合计：{{tableData.length}}条数据</span>
      </el-form>
    </el-header>

    <el-table :data="tableData" height="100%" style="width: 100%;">
      <el-table-column prop="id" label="序号" width="80"></el-table-column>
      <el-table-column prop="name" label="姓名" width="80"></el-table-column>
      <el-table-column prop="logintime" label="登记时间" width="180"></el-table-column>
      <el-table-column prop="country" label="国籍" width="80"></el-table-column>
      <el-table-column prop="number" label="人数" width="80"></el-table-column>
      <el-table-column prop="staytime" label="预计停留时间(min)" width="180"></el-table-column>
      <el-table-column prop="remark" label="备注" width="80"></el-table-column>
      <el-table-column prop="Previous_flight_number" label="前段航班号" width="100"></el-table-column>
      <el-table-column prop="After_flight_number" label="后段航班号" width="100"></el-table-column>
      <el-table-column prop="resource" label="来源" width="80"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="deleteRow(scope)" type="danger">删除</el-button>
          <el-button size="mini" @click="update(scope)" type="warning">修改</el-button>
          <el-button size="mini" @click="query(scope)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    

    <!-- 登记的dialog录入 -->
    <el-dialog title="中转休息区旅客人工登记" :visible.sync="checkIn" width="800px" >
      <el-form   :model="addForm" :rules="rules" ref="addForm" label-width="80px" >
        <el-row>
          <el-col :span="8">
           <el-form-item label="姓名" prop="name" style="white-space:nowrap" :label-width="labelwidth">
              <el-input v-model="addForm.name" ></el-input>
           </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="人数" prop="num" style="write-space:nowrap"  :label-width="labelwidth">
              <el-input v-model="addForm.number"  ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
           <el-form-item label="国籍" prop="country" style="write-space:nowrap" :label-width="labelwidth">
             <el-select v-model="addForm.country">
                <el-option label="中国" value="CH"></el-option>
                <el-option label="日本" value="JPN"></el-option>
                <el-option label="韩国" value="KR"></el-option>
                <el-option label="美国" value="USA"></el-option>
                <el-option label="英国" value="UK"></el-option>
                <el-option label="法国" value="FR"></el-option>
                <el-option label="加拿大" value="CAN"></el-option>
                <el-option label="巴西" value="BRA"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row>
          <el-col span="8">
            <el-form-item label="前段交通方式" prop="Front_transportation" style="write-space:nowrap" :label-width="labelwidth">
              <el-select v-model="addForm.Front_transoprtation"> 
                <el-option label="乘车" value="Ride"></el-option>
                <el-option label="班机" value="flight"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col span="8">
            <el-form-item label="乘车信息" prop="Ride_information" style="write-space:nowrap":label-width="labelwidth" >
            <el-input v-model="addForm.Ride_information"></el-input>
          </el-form-item>
          </el-col>

          <el-col span="8">
            <el-form-item label="车程性质" prop="chechengxingzhi" style="write-space:nowrap" :label-width="labelwidth">
              <el-select v-model="addForm.chechengxingzhi">  
                <el-option label="自驾" value="Self_driving"></el-option>
                <el-option label="机场大巴" value="Airport_bus"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="8">
            <el-form-item label="预计停留时间" prop="staytime" style="write-space:nowrap" :label-width="labelwidth" >
              <el-input v-model="addForm.staytime"></el-input>
            </el-form-item>
          </el-col>

          <el-col span="8">
            <el-form-item label="后段航班号" prop="After_flight_number" style="write-space:nowrap" :label-width="labelwidth">
             <el-input v-model="addForm.After_flight_number"></el-input>
            </el-form-item>
          </el-col>

          <el-col span="8">
            <el-form-item label="后段航班性质" prop="After_flight_xingzhi" style="write-space:nowrap" :label-width="labelwidth">
              <el-select v-model="addForm.After_flight_xingzhi" >
                <el-option label="国内" value="domestic"></el-option>
                <el-option label="国外" value="foreign"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
    <el-row>
      <el-col span="4">
         <el-form-item label="附加服务" style="white-space:nowrap" >
          </el-form-item>
      </el-col>

    <el-form-item>
      <el-table
      :data="tableData2"
       border
      style="width: 80%">
        <el-table-column prop="service" label="服务需求名称" width="150">
        </el-table-column>
        <el-table-column prop="need" label="是否需要" width="180">
          <el-radio v-model="radio" label="1">备选项</el-radio>
        <!-- <template >
          
          
          
            
         </template> -->
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
     </el-table>
    </el-form-item>
    </el-row>
    <el-row>
      <el-col :span="20">
           <el-form-item label="备注" prop="beizhu" style="white-space:nowrap" :label-width="labelwidth">
              <el-input  ></el-input>
           </el-form-item>
          </el-col>
    </el-row>
         <el-form-item style="margin-left: 500px;"> 
            <el-button @click=" checkIn=false">关闭</el-button>
            <el-button type="primary" @click="addData">登记</el-button>
          </el-form-item>
       
     </el-form>
    </el-dialog>
  </el-container>
</template>
  

<script>
import * as api from "@/api/test";

const page = "index";
 const tableItem = {
  name: "张三李四",
  logintime: "xx年xx月xx日xx:xx",
  country: "中国",
  number:"1",
  staytime:"360",
  remark:"xxx",
  Previous_flight_number:"3UXXX",
  After_flight_number:"CAXXXX",
  resource:"旅客自主登记",
  
};
export default {
  name: page,
  props: [""],
  data() {
    return {
      page: page,
      id: "",
      radio:"1",
      formData: {
      name: "",
      country: "",
      state:"",
      fightNumber:"",
      hangbanxingzhi:"",
      },
      addForm:{
        name: "",
        number:"",
        country:"",
        Front_transportation:"",
        chechengxingzhi:"",
        Previous_flight_number:"",
        Ride_information:"",
        chechengxingzhi:"",
        staytime:"",
        After_flight_number:"",
        After_flight_xingzhi:""
      },
      rules:{},
      tableData:[],
      tableData2: [
        {service:"桌游"},
        {service:"一次性毛巾"},
        {service:"闹钟"},
        {service:"书籍报刊"},
        {service:"中转优惠券"}
      ],
      checkIn: false,
      onSubmit: false,
      cancel: false,
      labelwidth: '100px'
    };
  },
  components: {},
  mounted() {
    for (let i = 1; i < 3; i++) {
      this.tableData.push({ id: i, ...tableItem });
    }
  },
  methods: {
    onSubmit() {
      this.$message("submit!");
    },
  
    cancel() {
      this.$message("cancel!");
    },
    deleteRow(scope) {
      this.tableData.splice(scope.$index, 1);
      this.$message(`删除数据成功，删除数据id为${scope.row.id}`);
    },
    addData(){},
    update() {},
    query(scope) {
      this.$message(`查询数据成功，数据内容为：${JSON.stringify(scope.row)}`);
    }
  }
};
</script>

<style lang='scss' scoped>
/deep/ .el-form-item__label {
  color: #ddd;
}
.dialogstyle{
  color: "#409EFF",
  

}
</style>
