<template>
  <el-container :id="page" style="height: 100%;">
    <el-header style="height:auto">
      <div style="height:40px;">
        <span
          style="float:left;margin-top:7px;margin-left:2px;"
          @click="chooseTimeSeg"
        >
          <el-radio-group v-model="radio" style="color:#fff;">
            <el-radio style="color:#fff;" :label="3">本日</el-radio>
            <el-radio style="color:#fff;" :label="6">本周</el-radio>
            <el-radio style="color:#fff;" :label="9">本月</el-radio>
            <el-radio style="color:#fff;" :label="11">本年</el-radio>
          </el-radio-group>
        </span>
        <div class="el-header-searchdiv" v-show="searchdivvisible">
          <el-input
            class="el-header-div-el-input"
            size="mini"
            placeholder=""
          ></el-input>
          <el-button
            style="margin-left:10px;"
            size="mini"
            type="primary"
            @click="onSearch"
            >搜索</el-button
          >
          <el-button
            style="margin-left:10px;"
            size="mini"
            type="primary"
            @click="addNew = true"
            >新建</el-button
          >
        </div>
        <span class="el-icon-arrow-down-span">
          <i
            class="header-icon el-icon-arrow-down"
            @click="
              formvisible = !formvisible;
              searchdivvisible = !searchdivvisible;
            "
          ></i>
          <span class="el-icon-arrow-down-span-span"
            >合计：{{ tableData.length }}条数据</span
          >
        </span>
      </div>

      <el-form
        size="mini"
        :inline="true"
        label-width="100px"
        :model="formData"
        class="demo-form-inline"
        v-show="formvisible"
      >
        <div>
          <span style="margin-left:100px;">
            <el-form-item label="风险名称">
              <el-input
                v-model="formData.riskName"
                placeholder="风险名称"
                style="width:175px;"
              ></el-input>
            </el-form-item>
          </span>
          <span>
            <el-form-item label="创建时间从">
              <el-date-picker
                v-model="formData.createDate"
                type="datetimerange"
                range-separator="到"
                start-placeholder="请选择时间"
                end-placeholder="请选择时间"
                style="width:430px;"
              ></el-date-picker>
            </el-form-item>
          </span>
        </div>
        <div>
          <span style="margin-left:100px;">
            <el-form-item label="关联合同类型">
              <el-select v-model="formData.contractType">
                <el-option label="A类" value="A"></el-option>
                <el-option label="B类" value="B"></el-option>
                <el-option label="C类" value="C"></el-option>
                <el-option label="D类" value="D"></el-option>
              </el-select>
            </el-form-item>
          </span>
          <span>
            <el-form-item style="margin-left: 100px;">
              <el-button
                style="margin-left:2px;"
                type="primary"
                @click="onSearch"
                >搜索</el-button
              >
              <el-button
                style="margin-left:45px;"
                type="primary"
                @click="addNew = true"
                >新建</el-button
              >
            </el-form-item>
          </span>
        </div>
      </el-form>
    </el-header>
    <el-table
      :data="tableData"
      height="100%"
      style="width: 100%;"
      @row-click="
        openDetails;
        queryData = true;
      "
    >
      <el-table-column
        prop="id"
        label="序号"
        width="60px;"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="riskName"
        label="风险名称"
        width="200px;"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="contractType"
        label="风险类别"
        width="120px;"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="riskControlRec"
        label="风险控制建议"
        width="300px;"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="createDate"
        label="登记日期"
        width="150px;"
        align="center"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="200px;" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="
              update(scope);
              updateData = true;
            "
            type="warning"
            >修改</el-button
          >
          <el-button
            size="mini"
            @click="
              query(scope);
              queryData = true;
            "
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog width="60%" title="修改数据" :visible.sync="updateData">
      <el-form
        :model="updateForm"
        :rules="rules"
        ref="updateForm"
        label-width="100px"
        inline
      >
        <div>
          <el-form-item label="风险编号">
            <el-input
              style="width:220px;"
              v-model="updateForm.riskCoding"
              placeholder="风险编号"
            ></el-input>
          </el-form-item>
          <el-form-item label="风险名称">
            <el-input
              style="width:220px;"
              v-model="updateForm.riskname"
              placeholder="风险名称"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="关联合同类型">
            <el-select style="width:220px;" v-model="updateForm.contractType">
              <el-option label="A类" value="A"></el-option>
              <el-option label="B类" value="B"></el-option>
              <el-option label="C类" value="C"></el-option>
              <el-option label="D类" value="D"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              style="width:220px;"
              v-model="updateForm.createDate"
              type="datetime"
              placeholder="创建时间"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div>
          <!-- <el-form-item label="风险点"> -->
          <el-form-item label=" ">
            <vxe-table
              border="none"
              height="10"
              size="small"
              ref="xTableUpdate"
              align="left"
              style="width:552px;"
              show-header="false"
              row-style="background-color:#fff;color:black;font-size:14px;"
              :data="riskPointTableDataUpdate"
              :edit-config="{ trigger: 'click', mode: 'cell' }"
            >
              <vxe-table-column
                title="风险点"
                field="riskPoint"
                :edit-render="{ type: 'visible', name: 'input' }"
              ></vxe-table-column>
            </vxe-table>
          </el-form-item>
          <el-button type="primary" @click="insertEventUpdate(-1)"
            >添 加</el-button
          >
        </div>
        <div>
          <el-form-item label="风险控制建议">
            <el-input
              class="el-input-remarks"
              type="textarea"
              :rows="3"
              placeholder
              v-model="updateForm.riskControlAdvice"
              style="width:552px;"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item>
            <el-button
              class="el-form-item-el-button"
              @click="updateData = false"
              >关 闭</el-button
            >
            <el-button type="primary" @click="updateDataSave()"
              >保 存</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog
      width="60%"
      class="el-dialog-adddata"
      title="风险登记"
      :visible.sync="addNew"
    >
      <el-form
        class="el-dialog-adddata-el-form"
        :model="addForm"
        :rules="rules"
        ref="addForm"
        label-width="100px"
        inline
      >
        <div>
          <el-form-item label="风险编号">
            <el-input
              style="width:220px;"
              v-model="addForm.riskCoding"
              placeholder="风险编号"
            ></el-input>
          </el-form-item>
          <el-form-item label="风险名称">
            <el-input
              style="width:220px;"
              v-model="addForm.riskname"
              placeholder="风险名称"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="关联合同类型">
            <el-select style="width:220px;" v-model="addForm.contractType">
              <el-option label="A类" value="A"></el-option>
              <el-option label="B类" value="B"></el-option>
              <el-option label="C类" value="C"></el-option>
              <el-option label="D类" value="D"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              style="width:220px;"
              v-model="addForm.createDate"
              type="datetime"
              placeholder="创建时间"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label=" ">
            <vxe-table
              border="none"
              height="10"
              size="small"
              ref="xTable"
              align="left"
              style="width:552px;"
              show-header="false"
              row-style="background-color:#fff;color:black;font-size:14px;"
              :data="riskPointTableData"
              :edit-config="{ trigger: 'click', mode: 'cell' }"
            >
              <vxe-table-column
                title="风险点"
                field="riskPoint"
                :edit-render="{ type: 'visible', name: 'input' }"
              ></vxe-table-column>
            </vxe-table>
          </el-form-item>
          <el-button type="primary" @click="insertEvent(-1)">添 加</el-button>
        </div>
        <div>
          <el-form-item label="风险控制建议">
            <el-input
              class="el-input-remarks"
              type="textarea"
              :rows="3"
              placeholder
              v-model="addForm.riskControlAdvice"
              style="width:552px;"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item>
            <el-button class="el-form-item-el-button" @click="addNew = false"
              >关 闭</el-button
            >
            <el-button type="primary" @click="addDataSave()">保 存</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog
      width="60%"
      class="el-dialog-adddata"
      title="查看数据"
      :visible.sync="queryData"
    >
      <el-form
        class="el-dialog-adddata-el-form"
        :model="queryForm"
        :rules="rules"
        ref="queryData"
        label-width="100px"
        inline
      >
        <div>
          <el-form-item label="风险编号">
            <el-input
              disabled="true"
              style="width:220px;"
              v-model="queryForm.riskCoding"
              placeholder="风险编号"
            ></el-input>
          </el-form-item>
          <el-form-item label="风险名称">
            <el-input
              disabled="true"
              style="width:220px;"
              v-model="queryForm.riskname"
              placeholder="风险名称"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="关联合同类型">
            <el-select
              disabled="true"
              style="width:220px;"
              v-model="queryForm.contractType"
            >
              <el-option label="A类" value="A"></el-option>
              <el-option label="B类" value="B"></el-option>
              <el-option label="C类" value="C"></el-option>
              <el-option label="D类" value="D"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              disabled="true"
              style="width:220px;"
              v-model="queryForm.createDate"
              type="datetime"
              placeholder="创建时间"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="风险点">
            <el-input
              disabled="true"
              style="width:552px;"
              v-model="queryForm.riskPoint"
              placeholder="风险点"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="风险控制建议">
            <el-input
              disabled="true"
              class="el-input-remarks"
              type="textarea"
              :rows="3"
              placeholder
              v-model="queryForm.riskControlAdvice"
              style="width:552px;"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item>
            <el-button class="el-form-item-el-button" @click="queryData = false"
              >取 消</el-button
            >
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
  riskName: "XX", //风险名称
  contractType: "A类", //关联合同类型
  riskControlRec: "XX", //风险控制建议
  createDate: "2019/01/08 10:00" //创建日期
};
const riskPointTableItem = {
  riskPoint: "" //风险点
};
const riskPointTableUpdateItem = {
  riskPoint: "XXXXXXX" //风险点
};
export default {
  name: page,
  props: [""],
  data() {
    return {
      radio: 3,
      formData: {
        riskName: "", //风险名称
        createDate: "", //创建时间
        contractType: "" //关联合同类别
      },
      updateForm: {
        riskCoding: "", //风险编号
        riskname: "", //风险名称
        contractType: "", //关联合同类型
        createDate: "", //创建时间
        riskPoint: "", //风险点
        riskControlAdvice: "" //风险控制建议
      },
      addForm: {
        riskCoding: "", //风险编号
        riskname: "", //风险名称
        contractType: "", //关联合同类型
        createDate: "", //创建时间
        riskPoint: "", //风险点
        riskControlAdvice: "" //风险控制建议
      },
      queryForm: {
        riskCoding: "", //风险编号
        riskname: "", //风险名称
        contractType: "", //关联合同类型
        createDate: "", //创建时间
        riskPoint: "", //风险点
        riskControlAdvice: "" //风险控制建议
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
      riskPointTableData: [],
      riskPointTableDataUpdate: [],
      addNew: false,
      updateData: false,
      queryData: false,
      addVsisible: false,
      formvisible: false,
      searchdivvisible: true
    };
  },
  components: {},
  mounted() {
    for (let i = 1; i < 20; i++) {
      this.tableData.push({ id: i, ...tableItem });
    }
    this.riskPointTableData.push({ ...riskPointTableItem });
    this.riskPointTableDataUpdate.push({ ...riskPointTableUpdateItem });
  },
  methods: {
    onSearch() {
      this.$message("search!");
    },
    addNew() {
      this.$message("addNew!");
    },
    cancel() {
      this.$message("cancel!");
    },

    addDataSave() {},
    updateDataSave() {},
    update(scope) {
      api.test().then(res => {
        this.tableData.push({ id: this.id, ...res });
        this.id++;
        this.$message(`添加数据成功`);
      });
    },
    query(scope) {
      this.$message(`查询数据成功，数据内容为：${JSON.stringify(scope.row)}`);
    },
    async insertEvent(row) {
      let record = {};
      let { row: newRow } = await this.$refs.xTable.insertAt(record, row);
      await this.$refs.xTable.setActiveCell(newRow);
    },
    async insertEventUpdate(row) {
      // let { row: newRow } = await this.$refs.xTableUpdate.insertAt(row);
      // await this.$refs.xTable.setActiveCell(newRow);
      let record = {};
      let { row: newRow } = await this.$refs.xTableUpdate.insertAt(record, row);
      await this.$refs.xTable.setActiveCell(newRow);
    },
    openDetails(row) {
      // alert("hellp");
      // queryData = true;处理行的数据显示进query页面
    },
    chooseTimeSeg() {
      // alert("hellp");
      //处理点击事件
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-form-item__label {
  color: #ddd;
}

.el-form-item-el-button {
  margin-left: 340px;
}

.el-header {
  padding: 0;
  background-color: #46535a;
}
.el-header-div-el-input {
  width: 300px;
  padding-top: 4px;
}
.el-header-searchdiv {
  float: left;
  margin-left: 50px;
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
