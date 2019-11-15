<template>
  <el-container :id="page" style="height: 100%;">
    <el-header style="height: auto;">
      <div style="height:40px;">
        <div class="el-header-searchdiv" v-show="searchdivvisible">
          <el-input class="el-header-div-el-input" size="mini" placeholder="姓名"></el-input>
          <el-button style="margin-left:10px;" size="mini" type="primary" @click="onSearch">搜索</el-button>
          <el-button style="margin-left:10px;" size="mini" type="primary" @click="addNew=true">新增</el-button>
        </div>
        <span class="el-icon-arrow-down-span">
          <i
            class="header-icon el-icon-arrow-down"
            @click="formvisible = !formvisible;searchdivvisible=!searchdivvisible"
          ></i>
          <span class="el-icon-arrow-down-span-span">合计：{{tableData.length}}条数据</span>
        </span>
      </div>
      <el-form
        size="mini"
        :inline="true"
        label-width="80px"
        :model="formData"
        class="demo-form-inline"
        v-show="formvisible"
      >
        <el-form-item label="姓名">
          <el-input v-model="formData.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formData.gender">
            <el-option label="男" value="man"></el-option>
            <el-option label="女" value="woman"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select v-model="formData.IDcard">
            <el-option label="中华人民共和国居民身份证" value="A"></el-option>
            <el-option label="港澳台居民身份证" value="B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input style="width:178px;" v-model="formData.IDcard" placeholder="证件号码"></el-input>
        </el-form-item>
        <el-form-item label="登记日期">
          <el-date-picker
            v-model="formData.registrationDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width:437px;"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="登记人">
          <el-input style="width:178px;" v-model="formData.registerPerson" placeholder="登记人"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="formData.class">
            <el-option label="灰名单" value="greylist"></el-option>
            <el-option label="无关人员" value="unrelatedpersons"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:right;margin-right: 100px;">
          <el-button type="primary" @click="onSearch">搜索</el-button>
          <el-button type="primary" @click="addNew=true">新增</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-table :data="tableData" height="100%" style="width: 100%;">
      <el-table-column prop="id" label="序号" width="60px;" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" width="60px;" align="center"></el-table-column>
      <el-table-column prop="gender" label="性别" width="60px;" align="center"></el-table-column>
      <el-table-column prop="certificateType" label="证件类别" width="200px;" align="center"></el-table-column>
      <el-table-column prop="IDcard" label="证件号码" width="200px;" align="center"></el-table-column>
      <el-table-column prop="blacklistReason" label="黑名单缘由" width="100px;" align="center"></el-table-column>
      <el-table-column prop="registrationDate" label="登记日期" width="150px;" align="center"></el-table-column>
      <el-table-column prop="registerPerson" label="登记人" width="90px;" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200px;" align="center">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="update(scope)" type="warning">修改</el-button> -->
          <el-button size="mini" @click="updateData=true" type="warning">修改</el-button>
          <el-button size="mini" @click="query(scope);queryData = true;">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 多层dialog 
    <el-dialog title="外层 Dialog" :visible.sync="outerVisible">
      <el-dialog width="30%" title="内层 Dialog" :visible.sync="innerVisible" append-to-body>
        <div>这里加入内层外层dialog的内容</div>
      </el-dialog>
      <div>这里加入外层的dialog的内容</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
      </div>
    </el-dialog>
    -->
    <el-dialog width="80%" title="修改数据" :visible.sync="updateData">
      <el-form :model="updateForm" :rules="rules" ref="updateForm" label-width="100px" inline>
        <div>
          <el-form-item label="姓名">
            <el-input v-model="updateForm.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select style="width:220px;" v-model="updateForm.gender">
              <el-option label="男" value="man"></el-option>
              <el-option label="女" value="woman"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select v-model="updateForm.certificateType">
              <el-option label="中华人民共和国居民身份证" value="A"></el-option>
              <el-option label="港澳台居民身份证" value="B"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="证件号码">
            <el-input v-model="updateForm.IDcard" placeholder="证件号码"></el-input>
          </el-form-item>
          <el-form-item label="黑名单时间">
            <el-date-picker v-model="updateForm.blackListTime" type="datetime" placeholder="请选择时间"></el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="黑名单缘由">
            <el-input
              class="el-input-textarea"
              type="textarea"
              :rows="2"
              placeholder
              v-model="updateForm.blackListReason"
              style="width:838px;"
            ></el-input>
          </el-form-item>
        </div>
        <div style="height:102px;">
          <el-form-item label="照片">
            <el-image
              v-model="updateForm.pictures[0]"
              style="width: 100px; height: 100px"
              :src="url1"
              :fit="fit"
            ></el-image>
            <el-image
              v-model="updateForm.pictures[1]"
              style="width: 100px; height: 100px"
              :src="url2"
              :fit="fit"
            ></el-image>
            <el-image
              v-model="updateForm.pictures[2]"
              style="width: 100px; height: 100px"
              :src="url3"
              :fit="fit"
            ></el-image>
            <el-image
              v-model="updateForm.pictures[3]"
              style="width: 100px; height: 100px"
              :src="url4"
              :fit="fit"
            ></el-image>
            <el-image
              v-model="updateForm.pictures[4]"
              style="width: 100px; height: 100px"
              :src="url5"
              :fit="fit"
            ></el-image>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="备注">
            <el-input
              class="el-input-textarea"
              type="textarea"
              :rows="3"
              placeholder
              v-model="updateForm.remarks"
              style="width:838px;"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="登记人">
            <el-input v-model="updateForm.registerPerson" placeholder="登记人"></el-input>
          </el-form-item>
          <el-form-item label="登记日期">
            <el-date-picker
              v-model="updateForm.registrationDate"
              type="datetime"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item>
            <el-button class="el-form-item-el-button" @click="updateData = false">取 消</el-button>
            <el-button type="primary" @click="addData">保 存</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog width="80%" title="添加数据" :visible.sync="addNew">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" inline>
        <div>
          <el-form-item label="姓名">
            <el-input v-model="addForm.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select style="width:220px;" v-model="addForm.gender">
              <el-option label="男" value="man"></el-option>
              <el-option label="女" value="woman"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select v-model="addForm.certificateType">
              <el-option label="中华人民共和国居民身份证" value="A"></el-option>
              <el-option label="港澳台居民身份证" value="B"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="证件号码">
            <el-input v-model="addForm.IDcard" placeholder="证件号码"></el-input>
          </el-form-item>
          <el-form-item label="黑名单时间">
            <el-date-picker v-model="addForm.blackListTime" type="datetime" placeholder="请选择时间"></el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="黑名单缘由">
            <el-input
              class="el-input-textarea"
              type="textarea"
              :rows="2"
              placeholder
              v-model="addForm.blackListReason"
              style="width:838px;"
            ></el-input>
          </el-form-item>
        </div>
        <div style="height:102px;">
          <el-form-item label="照片">
            <el-image
              v-model="addForm.pictures[0]"
              style="width: 100px; height: 100px"
              :src="url1"
              :fit="fit"
            ></el-image>
            <el-image
              v-model="addForm.pictures[1]"
              style="width: 100px; height: 100px"
              :src="url2"
              :fit="fit"
            ></el-image>
            <el-image
              v-model="addForm.pictures[2]"
              style="width: 100px; height: 100px"
              :src="url3"
              :fit="fit"
            ></el-image>
            <el-image
              v-model="addForm.pictures[3]"
              style="width: 100px; height: 100px"
              :src="url4"
              :fit="fit"
            ></el-image>
            <el-image
              v-model="addForm.pictures[4]"
              style="width: 100px; height: 100px"
              :src="url5"
              :fit="fit"
            ></el-image>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="备注">
            <el-input
              class="el-input-textarea"
              type="textarea"
              :rows="3"
              placeholder
              v-model="addForm.remarks"
              style="width:838px;"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="登记人">
            <el-input v-model="addForm.registerPerson" placeholder="登记人"></el-input>
          </el-form-item>
          <el-form-item label="登记日期">
            <el-date-picker v-model="addForm.registrationDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item>
            <el-button class="el-form-item-el-button" @click="addNew = false">取 消</el-button>
            <el-button type="primary" @click="addData">保 存</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog width="80%" title="查看数据" :visible.sync="queryData">
      <el-form :model="queryForm" :rules="rules" ref="queryData" label-width="100px" inline>
        <div>
          <el-form-item label="姓名">
            <el-input disabled="false" v-model="queryForm.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select disabled="false" style="width:220px;" v-model="queryForm.gender">
              <el-option label="男" value="man"></el-option>
              <el-option label="女" value="woman"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select disabled="false" v-model="queryForm.certificateType">
              <el-option label="中华人民共和国居民身份证" value="A"></el-option>
              <el-option label="港澳台居民身份证" value="B"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="证件号码">
            <el-input disabled="false" v-model="queryForm.IDcard" placeholder="证件号码"></el-input>
          </el-form-item>
          <el-form-item label="黑名单时间">
            <el-date-picker
              disabled="false"
              v-model="queryForm.blackListTime"
              type="datetime"
              placeholder="请选择时间"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="黑名单缘由">
            <el-input
              disabled="false"
              class="el-input-textarea"
              type="textarea"
              :rows="2"
              placeholder
              v-model="queryForm.blackListReason"
              style="width:838px;"
            ></el-input>
          </el-form-item>
        </div>
        <div style="height:102px;">
          <el-form-item label="照片">
            <el-image
              v-model="queryForm.pictures[0]"
              style="width: 100px; height: 100px"
              :src="url1"
              :fit="fit"
            ></el-image>
            <el-image
              v-model="queryForm.pictures[1]"
              style="width: 100px; height: 100px"
              :src="url2"
              :fit="fit"
            ></el-image>
            <el-image
              v-model="queryForm.pictures[2]"
              style="width: 100px; height: 100px"
              :src="url3"
              :fit="fit"
            ></el-image>
            <el-image
              v-model="queryForm.pictures[3]"
              style="width: 100px; height: 100px"
              :src="url4"
              :fit="fit"
            ></el-image>
            <el-image
              v-model="queryForm.pictures[4]"
              style="width: 100px; height: 100px"
              :src="url5"
              :fit="fit"
            ></el-image>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="备注">
            <el-input
              disabled="false"
              class="el-input-textarea"
              type="textarea"
              :rows="3"
              placeholder
              v-model="queryForm.remarks"
              style="width:838px;"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="登记人">
            <el-input disabled="false" v-model="queryForm.registerPerson" placeholder="登记人"></el-input>
          </el-form-item>
          <el-form-item label="登记日期">
            <el-date-picker
              disabled="false"
              v-model="queryForm.registrationDate"
              type="datetime"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item>
            <el-button class="el-form-item-el-button" @click="queryData = false">取 消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import * as api from "@/api/test";
// 18份身份证正则验证
const IDCard18_REGEX =
  "^[1-9](\\d{5})(19|20)(\\d{2})((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)(\\d{3})(\\d|X|x)$";
const page = "index";
const tableItem = {
  // staffCoding: "10001", //人员编码
  name: "李四", //姓名
  gender: "男", //性别
  certificateType: "中华人民共和国居民身份证", //证件类别
  IDcard: "511623199802032222", //证件号码
  blacklistReason: "推销", //黑名单缘由
  registrationDate: "2019/03/08 10:00", //登记日期
  registerPerson: "张三" //登记人
};
export default {
  name: page,
  props: [""],
  data() {
    return {
      page: page,
      id: 50,
      formData: {
        name: "", //姓名
        gender: "", //性别
        certificateType: "", //证件类型
        registrationDate: "", //登记日期
        IDcard: "", //证件号码
        registerPerson: "", //登记人
        class: "" //类别
      },
      addForm: {
        name: "", //姓名
        gender: "", //性别
        certificateType: "", //证件类别
        IDcard: "", //证件号码
        blackListReason: "", //黑名单原因
        blackListTime: "", //黑名单时间
        pictures: ["url1", "url2", "url3", "url4", "url5"], //照片
        remarks: "", //备注
        registrationDate: "", //登记日期
        registerPerson: "" //登记人
      },
      updateForm: {
        name: "", //姓名
        gender: "", //性别
        certificateType: "", //证件类别
        IDcard: "", //证件号码
        blackListReason: "", //黑名单原因
        blackListTime: "", //黑名单时间
        pictures: ["url1", "url2", "url3", "url4", "url5"], //照片
        remarks: "", //备注
        registrationDate: "", //登记日期
        registerPerson: "" //登记人
      },
      queryForm: {
        name: "", //姓名
        gender: "", //性别
        certificateType: "", //证件类别
        IDcard: "", //证件号码
        blackListReason: "", //黑名单原因
        blackListTime: "", //黑名单时间
        pictures: ["url1", "url2", "url3", "url4", "url5"], //照片
        remarks: "", //备注
        registrationDate: "", //登记日期
        registerPerson: "" //登记人
      },
      rules: {
        name: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        age: [
          { required: true, message: "年龄不能为空" },
          {
            type: "number",
            min: 1,
            max: 199,
            required: true,
            message: "年龄必须为数字且在1到199之间",
            trigger: "blur"
          }
        ],
        IDcard: [
          { required: true, message: "身份证号码不能为空", trigger: "blur" },
          { validator: this.IDcardRules, trigger: "blur" }
        ],
        address: [{ required: true, message: "地址不能为空", trigger: "blur" }]
      },
      tableData: [],
      outerVisible: false,
      innerVisible: false,
      addNew: false,
      updateData: false, //todo
      searchdivvisible: true,
      formvisble: false,
      queryData: false
    };
  },
  components: {},
  mounted() {
    for (let i = 1; i < 20; i++) {
      this.tableData.push({ id: i, ...tableItem });
    }
  },
  methods: {
    IDcardRules(rule, idCard, callback) {
      console.log(rule, idCard);
      //15位和18位身份证号码的正则表达式
      var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
      //如果通过该验证，说明身份证格式正确，但准确性还需计算
      if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
          var idCardWi = new Array(
            7,
            9,
            10,
            5,
            8,
            4,
            2,
            1,
            6,
            3,
            7,
            9,
            10,
            5,
            8,
            4,
            2
          ); //将前17位加权因子保存在数组里
          var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
          var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
          for (var i = 0; i < 17; i++) {
            idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
          }
          var idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
          var idCardLast = idCard.substring(17); //得到最后一位身份证号码
          //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
          if (idCardMod == 2) {
            if (idCardLast == "X" || idCardLast == "x") {
              //alert("恭喜通过验证啦！");
              callback();
            } else {
              callback(new Error("身份证号码错误！"));
            }
          } else {
            //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
            if (idCardLast == idCardY[idCardMod]) {
              //alert("恭喜通过验证啦！");
              callback();
            } else {
              return false;
              callback(new Error("身份证号码错误！"));
            }
          }
        }
      } else {
        callback(new Error("身份证格式不正确"));
      }
    },
    onSearch() {
      this.$message("search!");
    },
    addNew() {
      this.$message("addNew!");
    },
    cancel() {
      this.$message("cancel!");
    },
    deleteRow(scope) {
      this.$confirm("此操作将永久该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData.splice(scope.$index, 1);
          this.$message(`删除数据成功，删除数据id为${scope.row.id}`);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addData() {},
    update(scope) {
      updateData: true; //
      api.test().then(res => {
        updateData: true;
        this.updateForm.push({ id: this.id, ...res });
        this.id++;
        this.$message(`添加数据成功`);
      });
    },
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
.el-header {
  padding: 0;
  background-color: #46535a;
}
.el-input-textarea {
  width: 450px;
}
.el-form-item-el-button {
  margin-left: 450px;
}
.el-header-div-el-input {
  width: 300px;
  padding-top: 4px;
}
.el-header-searchdiv {
  float: left;
  margin-left: 350px;
}
.el-icon-arrow-down-span {
  float: right;
  margin-right: 100px;
  margin-top: 8px;
  font-size: 14px;
}
.el-icon-arrow-down-span-span {
  float: right;
  margin-left: 100px;
}
</style>
