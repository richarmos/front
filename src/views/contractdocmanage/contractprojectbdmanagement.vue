<template>
  <el-container :id="page" style="height: 100%;">
    <el-header style="height: auto;">
      <div style="height:40px;">
        <span class="el-header-div-spanlabel">合同项目维护</span>
        <span class="el-header-div-spanbutton">
          <el-button
            class="el-header-div-spanbutton-el-button"
            type="primary"
            size="mini"
            @click="insertEvent(-1)"
            >添 加</el-button
          >
          <el-button
            class="el-header-div-spanbutton-el-button"
            type="primary"
            size="mini"
            @click="save()"
            >保 存</el-button
          >
        </span>
      </div>
    </el-header>
    <vxe-table
      border="none"
      height="550"
      resizable
      size="small"
      ref="xTable"
      align="center"
      highlight-hover-row="true"
      highlight-current-row="true"
      row-style="background-color:#2c393f;color:#fff;font-size:14px;"
      header-row-style="background-color:#2c393f;color:#fff;font-size:14px;"
      :data="tableData"
      :edit-config="{ trigger: 'click', mode: 'cell' }"
    >
      <!-- @edit-actived="editActivedEvent" -->
      <!-- @edit-closed="editClosedEvent" -->
      <vxe-table-column
        field="projectname"
        title="项目名称"
        :edit-render="{ name: 'input' }"
      ></vxe-table-column>
      <vxe-table-column
        field="contractname"
        title="合同名称"
        :edit-render="{ name: 'input' }"
      ></vxe-table-column>
      <vxe-table-column
        field="isdelete"
        title="是否删除"
        min-width="100px"
        :edit-render="{ name: 'select', options: typeList }"
      ></vxe-table-column>
    </vxe-table>
  </el-container>
</template>

<script>
import * as api from "@/api/test";
// 18份身份证正则验证
const IDCard18_REGEX =
  "^[1-9](\\d{5})(19|20)(\\d{2})((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)(\\d{3})(\\d|X|x)$";
const page = "index";
const tableItem = {
  projectname: "XX项目1", //姓名
  contractname: "XX合同1", //性别
  isdelete: "是" //证件类别
};

export default {
  name: page,
  props: [""],
  data() {
    return {
      tableData: [],
      typeList: [
        // { value: "choose", label: "请选择" },
        { value: "is", label: "是" },
        { value: "not", label: "否" }
      ]
    };
  },
  components: {},
  mounted() {
    for (let i = 1; i < 20; i++) {
      this.tableData.push({ ...tableItem });
    }
  },
  methods: {
    save() {},
    async insertEvent(row) {
      let record = {
        isdelete: "not"
      };
      let { row: newRow } = await this.$refs.xTable.insertAt(record, row);
      await this.$refs.xTable.setActiveCell(newRow, "isdelete");
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-form-item__label {
  color: #ddd;
}
.el-header-div-spanlabel {
  float: left;
  margin-left: 10px;
  margin-top: 7px;
}
// .el-header-div-spanbutton-vxe-button {
//   font-size: 12px;
//   color: #fff;
//   text-align: center;
//   height: 20px;
//   background-color: #2b91d5;
// }
.el-header-div-spanbutton {
  margin-left: 40px;
}
.el-header-div-spanbutton-el-button {
  margin-top: 4px;
  font-size: 12px;
}
</style>
