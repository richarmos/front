<template>
  <el-container :id="page" style="height: 100%;">
    <el-header style="height: 80px;">
      <el-form
        size="mini"
        :inline="true"
        label-width="80px"
        :model="formData"
        class="demo-form-inline"
      >
        <el-form-item label="国籍">
          <el-select v-model="formData.region">
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
        <el-form-item label="航班性质">
          <el-select v-model="formData.nature">
            <el-option label="国内" value="DOM"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formData.name" placeholder="旅客姓名"></el-input>
        </el-form-item>
        <el-form-item label="航班号">
          <el-input v-model="formData.flightNo" placeholder="航班号"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 100px;">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="checkIn">登记</el-button>
          <el-button type="primary" @click="cancel">核销</el-button>
          <el-button type="primary" @click="outerVisible = true">多层dialog开关</el-button>
          <el-button type="primary" @click="addVsisible = true">自定义添加数据</el-button>
        </el-form-item>
        <span style="line-height: 40px;float: right;">合计：{{tableData.length}}条数据</span>
      </el-form>
    </el-header>

    <el-table :data="tableData" height="100%" style="width: 100%;">
      <el-table-column prop="id" label="id" width="80"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="IDcard" label="身份证号码"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="deleteRow(scope)" type="danger">删除</el-button>
          <el-button size="mini" @click="update(scope)" type="warning">修改</el-button>
          <el-button size="mini" @click="query(scope)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 多层dialog -->
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

    <!-- 添加数据的dialog录入 -->
    <el-dialog title="添加数据" :visible.sync="addVsisible">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" inline>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="日期" required>
          <el-form-item prop="date">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="addForm.date"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input type="" v-model="addForm.age"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="IDcard">
          <el-input v-model="addForm.IDcard"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="addVsisible = false">取 消</el-button>
          <el-button type="primary" @click="addData">确 认</el-button>
        </el-form-item>
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
  date: "2016-05-02",
  name: "王小虎",
  age: "18",
  IDcard: "",
  address: "上海市普陀区金沙江路 1518 弄"
};
export default {
  name: page,
  props: [""],
  data() {
    return {
      page: page,
      id: 50,
      formData: {
        class: "",
        name: "",
        flightNo: "",
        region: "",
        state: "",
        nature: ""
      },
      addForm: {
        date: "2016-05-02",
        name: "王小虎",
        age: 18,
        IDcard: "",
        address: "上海市普陀区金沙江路 1518 弄"
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
      addVsisible: false
    };
  },
  components: {},
  mounted() {
    for (let i = 0; i < 50; i++) {
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
    onSubmit() {
      this.$message("submit!");
    },
    checkIn() {
      this.$message("checkIn!");
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
    addData(){

    },
    update(scope) {
      api.test().then(res => {
        this.tableData.push({ id: this.id, ...res });
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
</style>
