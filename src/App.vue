<template>
  <div id="app">
    <div id="div-detail" v-if="detail_visible">
      <button @click="hide_detail">返回上级界面</button>
      <div id="table-detail-parent">
        <table id="table-detail" border="1" cellspacing="0">
          <thead>
            <tr>
              <th v-for="col in area_detail" :key="col">{{ `${active_area_table}.${col}` }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in area_heigh" :key="row">
              <td v-for="col in area_detail" :key="col" :class="{
                'blue-cell': area_values[`${active_area_table}.${col}.${row}`]['prcstat'] == 'RUNNING',
                'yellow-cell': area_values[`${active_area_table}.${col}.${row}`]['prcstat'] == 'ATTEND',
                'red-cell': area_values[`${active_area_table}.${col}.${row}`]['prcstat'] == 'FAILED',
                'blue-cell-on': area_values[`${active_area_table}.${col}.${row}`]['prcstat'] == 'os_power_cycle',
                'green-cell': area_values[`${active_area_table}.${col}.${row}`]['prcstat'] == 'PASSED',
              }">
                <div v-if="area_values[`${active_area_table}.${col}.${row}`]['MTSN']">
                  <div>
                    <b><span>{{ area_values[`${active_area_table}.${col}.${row}`]['MTSN'] }}</span></b>
                    <b><span class="span-on-right">{{ area_values[`${active_area_table}.${col}.${row}`]['current_op'] }}</span></b>
                  </div>
                  <div>
                    <b><span>{{ area_values[`${active_area_table}.${col}.${row}`]['FAMILY'] }}</span></b>
                    <b><span class="span-on-right">{{ area_values[`${active_area_table}.${col}.${row}`]['MT'] }}</span></b>
                  </div>
                  <div>
                    <b><span>{{ area_values[`${active_area_table}.${col}.${row}`]['pgmname'] }}</span></b>
                  </div>
                  <div>
                    <b><span>{{ area_values[`${active_area_table}.${col}.${row}`]['MONUMBER'] }}</span></b>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="table-container">

      <div style="text-align: center; font-size: 20px;">  
    <b><span>Total：</span></b>
    <span style="margin-left: 10px;">{{ totalCount }}</span>  
  
    <b><span style="margin-left: 50px;">Running：</span></b>
    <span :style="{ color: runningCount > 0 ? 'blue' : 'inherit' }">{{ runningCount }}</span>  

    <b><span style="margin-left: 50px;">Fail：</span></b>
    <span :style="{ color: failCount > 0 ? 'red' : 'inherit' }">{{ failCount }}</span>  

    <b><span style="margin-left: 50px;">Attend：</span></b>
    <span :style="{ color: attendCount > 0 ? 'yellow' : 'inherit' }">{{ attendCount }}</span>  
</div>

      <div class="row" v-for="(area_category_group, area_category_group_idx) in area_category_arr" :key="area_category_group_idx">
        <span class="row-son"
          :class="{'row-son-left': area_category_idx > 0}"
          v-for="(area_category, area_category_idx) in area_category_group" 
          :key="area_category">
          <table class="table" v-for="(area_table, area_table_idx) in area_strus[area_category]" border="1"
            cellspacing="0" :key="area_table_idx" @click="show_detail(`${area_category}${area_table_idx}`)">
            <thead>
              <tr>
                <th v-for="col in area_table" :key="col">{{ `${area_category}${area_table_idx}.${col}` }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in area_heigh" :key="row">
                <td v-for="col in area_table" :key="col" :class="{
                  'blue-cell': area_values[`${area_category}${area_table_idx}.${col}.${row}`]['prcstat'] == 'RUNNING',
                  'yellow-cell': area_values[`${area_category}${area_table_idx}.${col}.${row}`]['prcstat'] == 'ATTEND',
                  'red-cell': area_values[`${area_category}${area_table_idx}.${col}.${row}`]['prcstat'] == 'FAILED',
                  'blue-cell-on': area_values[`${area_category}${area_table_idx}.${col}.${row}`]['prcstat'] == 'os_power_cycle',
                  'green-cell': area_values[`${area_category}${area_table_idx}.${col}.${row}`]['prcstat'] == 'PASSED',
                }"></td>
              </tr>
            </tbody>
          </table>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      area_strus_guide: {
        'B': {
          '1': 8,
          '2': 7,
          '3': 7,
          '4': 5,
        },
        'C': {
          '1': 8,
          '2': 7,
          '3': 7,
          '4': 5,
        },
        'D': {
          '1': 6,
          '2': 7,
          '3': 8,
          '4': 4,
        },
        'H': {
          '1': 5,
          '2': 5,
          '3': 5,
          '4': 3,
        },
        'I': {
          '1': 8,
          '2': 8,
          '3': 8,
          '4': 6,
        },
        'J': {
          '1': 6,
          '2': 4,
          '3': 6,
          '4': 6,
        },
        'K': {
          '2': 4,
        },
        'E': {
          '1': 7,
          '2': 8,
          '3': 7,
          '4': 5,
        },
        'F': {
          '1': 8,
          '2': 7,
          '3': 8,
          '4': 5,
        }
      },
      area_strus: {},
      area_values: {},
      detail_visible: false,
      active_area_table: 'H1',
      area_detail: {},
      area_category_arr: [['B', 'H'], ['C', 'I'], ['D', 'J'], ['E', 'K'], ['F']],
      area_heigh: ['08', '07', '06', '05', '04', '03', '02', '01'],
      failCount: 0,
      runningCount: 0,
      
    };
  },

  created() {
    this.fillAreaData();
  },
  mounted() {
    this.fetchData();
    this.interval = setInterval(this.fetchData, 10000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    fillAreaData() {
      for (let i in this.area_strus_guide) {
        this.area_strus[i] = {};
        for (let j in this.area_strus_guide[i]) {
          this.area_strus[i][j] = [];
          for (let k = 1; k <= this.area_strus_guide[i][j]; k++) {
            this.area_strus[i][j].push('0' + k);
            for (let l = 8; l > 0; l--) {
              let values_key = `${i}${j}.0${k}.0${l}`;
              this.area_values[values_key] = {};
            }
          }
        }
      }
    },
    fetchData() {
      let newFailCount = 0;
      let newRunningCount = 0;
      let newAttendCount = 0;
      let newTotalCount = 0;
      fetch('https://10.189.224.111/svrvision/lssc_l2_rethinkdb_data/')
        .then(response => response.json())
        .then(data => {
          this.fillAreaData();
          data = data['data'];
          for (let i in data) {
            if (data[i]['FAMILY'] == 'xuanwu15') {
              this.area_values[data[i]['FLOOR_LOCATION']] = data[i];
              newTotalCount++;
              if (data[i]['prcstat'] == 'FAILED') {
                newFailCount++;
                } else if (data[i]['prcstat'] == 'RUNNING' || data[i]['prcstat'] == 'os_power_cycle' ) {
                  newRunningCount++;
                }
                if (data[i]['prcstat'] == 'ATTEND') {  
                        newAttendCount++;  
                        newRunningCount++;
                }
              this.$forceUpdate();
            }
          }
          this.failCount = newFailCount;
          this.runningCount = newRunningCount;
          this.attendCount = newAttendCount;
          this.totalCount = newTotalCount;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    show_detail(area_table_name) {
      this.active_area_table = area_table_name;
      this.area_detail = [ ... this.area_strus[area_table_name[0]][area_table_name[1]]];
      if (area_table_name[0] == 'C' || area_table_name[0] == 'I' || area_table_name[0] == 'E') {
        this.area_detail.reverse();
      }
      this.detail_visible = true;
    },
    hide_detail() {
      this.detail_visible = false;
    }
  }
}
</script>

<style scoped>
#app {
  /* 设置背景颜色为灰色 */
  background-color: #898989;
  /* 确保背景色覆盖整个页面 */
  height: 900px;
  width: 2200px;
  margin: 0;
  padding: 0;
  align-items: center;
  
}

#div-detail {
  position: absolute;
  z-index: 9999;
  height: 900px;
  width: 2200px;
  background: #898989;
}

#table-detail-parent {
  display: flex;
  justify-content: center;
  align-items: center;
}

#table-detail {
  /* width: 1890px; */
  border-collapse: collapse;
}

#table-detail th,
#table-detail td {
  border: 1px solid #ddd;
  height: 90px;
  width: 220px;
  text-align: center;
}

#table-detail th {
  background-color: #f2f2f2;
}

.span-on-right {
  margin-left: 20px;
}

.table-container {
  display: flex;
  flex-direction: column;
  font-size: 5.9px;
}

.row {
  display: flex;
  /* justify-content: space-between; */
}

.row-son {
  display: flex;
  flex-direction: row;
}

.row-son-left {
  margin-left: 70px;
}

.table {
  /* width: 200px; */
  /* 您可以根据需要调整表格的宽度 */
  margin: 10px;
  /* 表格之间的外边距 */
  border-collapse: collapse;
  /* 合并表格边框 */
}

.table th,
.table td {
  border: 1px solid #ddd;
  /* 表格单元格边框 */
  padding: 7.5px;
  /* 单元格内边距 */
  text-align: left;
  /* 文本左对齐 */
}

.table th {
  background-color: #f2f2f2;
  /* 标题行背景色 */
}

.blue-cell {
  background-color: blue;
  color: white;
}

.yellow-cell {
  background-color: yellow;
}

.green-cell {
  background-color: rgb(28, 227, 28);
  color: white;
}

.blue-cell-on {
  background-color: blue;
  color: white;
}


.red-cell {
  background-color: red;
  color: white;
}
</style>