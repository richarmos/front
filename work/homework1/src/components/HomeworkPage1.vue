<template>
  <div class="div_body">
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="div_left">
            <div class="div_button">
              <div class="div_button_con">
                <el-button>提交</el-button>
              </div>
              <div class="div_button_con">
                <el-button>更新</el-button>
              </div>
              <div class="div_button_con">
                <el-button @click="handleDelete(7, 1)">删除</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content bg-purple-light">
          <div class="div_right">
            <div class="div_search">
              <el-input placeholder class="input-with-select">
                <button>搜索</button>
                <el-button class="el-button-search" slot="append">搜索</el-button>
              </el-input>
            </div>
            <div class="div_table">
              <el-table
                :data="tableData"
                border
                :row-style="tableRowStyle"
                :header-cell-style="tableHeaderColor"
              >
                <el-table-column prop="name" label="姓名" style="width:90px"></el-table-column>
                <el-table-column prop="age" label="年龄" style="width:90px"></el-table-column>
                <el-table-column prop="gender" label="性别" style="width:90px"></el-table-column>
                <el-table-column prop="class" label="班级" style="width:90px"></el-table-column>
                <el-table-column prop="math" label="数学" style="width:90px"></el-table-column>
                <el-table-column prop="chinese" label="语文" style="width:90px"></el-table-column>
                <el-table-column prop="english" label="英语" style="width:90px"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>



<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "王小虎1",
          age: "15",
          gender: "男",
          class: "2",
          math: "60",
          chinese: "60",
          english: "60"
        },
        {
          name: "王小虎2",
          age: "15",
          gender: "男",
          class: "2",
          math: "60",
          chinese: "60",
          english: "60"
        },
        {
          name: "王小虎3",
          age: "15",
          gender: "男",
          class: "2",
          math: "60",
          chinese: "60",
          english: "60"
        },
        {
          name: "王小虎4",
          age: "15",
          gender: "男",
          class: "2",
          math: "60",
          chinese: "60",
          english: "60"
        },
        {
          name: "王小虎5",
          age: "15",
          gender: "男",
          class: "2",
          math: "60",
          chinese: "60",
          english: "60"
        },
        {
          name: "王小虎6",
          age: "15",
          gender: "男",
          class: "2",
          math: "60",
          chinese: "60",
          english: "60"
        },
        {
          name: "王小虎7",
          age: "15",
          gender: "男",
          class: "2",
          math: "60",
          chinese: "60",
          english: "60"
        },
        {
          name: "王小虎8",
          age: "15",
          gender: "男",
          class: "2",
          math: "60",
          chinese: "60",
          english: "60"
        }
      ]
    };
  },
  methods: {
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return "background-color:#72747a;color:#ffffff;";
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color:#72747a;color:#ffffff;";
      }
    },
    handleDelete(index) {
      //删除行数
      this.tableData.splice(index, 1);
    }
  }
};
</script>



<style>
.div_body {
  width: 100%;
  height: 520px;
}

.el-row {
  height: 500px;
  border: 2px black solid;
}
.el-col {
  height: 516px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #0d5bb4;
}
.bg-purple-light {
  background: #72747a;
}
.grid-content {
  height: 496px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.div_table {
  margin-top: 10px;
}

.el-button {
  border: 3px black solid;
  background: none;
  width: 180px;
  font-size: 28px;
  color: white;
}
.div_button_con {
  margin-top: 30px;
  margin-bottom: 30px;
}
.div_button {
}
.div_left {
  padding: 110px 0 110px 0;
}

.div_search {
  background-color: none;
}
.input-with-select {
  background-color: none;
}

.el-table td,
.el-table th.is-leaf,
.el-table--border,
.el-table--group {
  border-color: black;
}
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: black;
}

/* 使表格背景透明 */
.el-table th,
.el-table tr {
  background-color: transparent;
}
input.el-input__inner {
  background-color: #72747a;
  border-color: black;
}
button.el-button el-button-search el-button--default {
  border: 1px red solid;
  background-color: #72747a;
  border-color: black;
}
</style>