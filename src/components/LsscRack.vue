<template>
  <div id="app" ref="appContainer">
    <!-- 二级界面（保持不变） -->
    <div id="div-detail" v-if="detail_visible" @click.self="hide_detail">
      <button id="back-button" @click="hide_detail">返回上级界面</button>
      <div id="table-detail-parent">
        <!-- 第一行表格：显示前10列 -->
        <div class="table-row">
          <table id="table-detail-top" border="1" cellspacing="0">
            <thead>
              <tr>
                <th v-for="col in area_detail.slice(0, 10)" :key="col" :name="col">{{ `${active_area_table}.${col}` }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in area_heigh" :key="row">
                <td v-for="col in area_detail.slice(0, 10)" :key="col" :name="col" :class="{
                  'blue-cell': area_values[`${active_area_table}.${col}.${row}`]?.prcstat === 'RUNNING',
                  'yellow-cell': area_values[`${active_area_table}.${col}.${row}`]?.prcstat === 'ATTEND',
                  'red-cell': area_values[`${active_area_table}.${col}.${row}`]?.prcstat === 'FAILED',
                  'blue-cell-on': area_values[`${active_area_table}.${col}.${row}`]?.prcstat === 'os_power_cycle',
                  'green-cell': area_values[`${active_area_table}.${col}.${row}`]?.prcstat === 'PASSED',
                  'timeout-cell': area_values[`${active_area_table}.${col}.${row}`]?.prcstat === 'Timeout',
                }">
                  <div v-if="area_values[`${active_area_table}.${col}.${row}`]?.MTSN">
                    <div>
                      <b><span>{{ area_values[`${active_area_table}.${col}.${row}`]?.MTSN }}</span></b>
                      <b><span class="span-on-right">{{ area_values[`${active_area_table}.${col}.${row}`]?.current_op }}</span></b>
                    </div>
                    <div>
                      <b><span>{{ area_values[`${active_area_table}.${col}.${row}`]?.FAMILY }}</span></b>
                      <b><span class="span-on-right">{{ area_values[`${active_area_table}.${col}.${row}`]?.MT }}</span></b>
                    </div>
                    <div>
                      <b><span>{{ area_values[`${active_area_table}.${col}.${row}`]?.pgmname }}</span></b>
                    </div>
                    <div>
                      <b><span>{{ area_values[`${active_area_table}.${col}.${row}`]?.MONUMBER }}</span></b>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 空白区域 -->
        <div class="spacer"></div>

        <!-- 第二行表格：显示中间10列 -->
        <div class="table-row">
          <table id="table-detail-middle" border="1" cellspacing="0">
            <thead>
              <tr>
                <th v-for="col in area_detail.slice(10, 20)" :key="col" :name="col">{{ `${active_area_table}.${col}` }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in area_heigh" :key="row">
                <td v-for="col in area_detail.slice(10, 20)" :key="col" :name="col" :class="{
                  'blue-cell': area_values[`${active_area_table}.${col}.${row}`]?.prcstat === 'RUNNING',
                  'yellow-cell': area_values[`${active_area_table}.${col}.${row}`]?.prcstat === 'ATTEND',
                  'red-cell': area_values[`${active_area_table}.${col}.${row}`]?.prcstat === 'FAILED',
                  'blue-cell-on': area_values[`${active_area_table}.${col}.${row}`]?.prcstat === 'os_power_cycle',
                  'green-cell': area_values[`${active_area_table}.${col}.${row}`]?.prcstat === 'PASSED',
                  'timeout-cell': area_values[`${active_area_table}.${col}.${row}`]?.prcstat === 'Timeout',
                }">
                  <div v-if="area_values[`${active_area_table}.${col}.${row}`]?.MTSN">
                    <div>
                      <b><span>{{ area_values[`${active_area_table}.${col}.${row}`]?.MTSN }}</span></b>
                      <b><span class="span-on-right">{{ area_values[`${active_area_table}.${col}.${row}`]?.current_op }}</span></b>
                    </div>
                    <div>
                      <b><span>{{ area_values[`${active_area_table}.${col}.${row}`]?.FAMILY }}</span></b>
                      <b><span class="span-on-right">{{ area_values[`${active_area_table}.${col}.${row}`]?.MT }}</span></b>
                    </div>
                    <div>
                      <b><span>{{ area_values[`${active_area_table}.${col}.${row}`]?.pgmname }}</span></b>
                    </div>
                    <div>
                      <b><span>{{ area_values[`${active_area_table}.${col}.${row}`]?.MONUMBER }}</span></b>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 空白区域 -->
        <div class="spacer"></div>

        <!-- 第三行表格：显示最后10列 -->
        <div class="table-row">
          <table id="table-detail-bottom" border="1" cellspacing="0">
            <thead>
              <tr>
                <th v-for="col in area_detail.slice(20)" :key="col" :name="col">{{ `${active_area_table}.${col}` }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in area_heigh" :key="row">
                <td v-for="col in area_detail.slice(20)" :key="col" :name="col" :class="{
                  'blue-cell': area_values[`${active_area_table}.${col}.${row}`]?.prcstat === 'RUNNING',
                  'yellow-cell': area_values[`${active_area_table}.${col}.${row}`]?.prcstat === 'ATTEND',
                  'red-cell': area_values[`${active_area_table}.${col}.${row}`]?.prcstat === 'FAILED',
                  'blue-cell-on': area_values[`${active_area_table}.${col}.${row}`]?.prcstat === 'os_power_cycle',
                  'green-cell': area_values[`${active_area_table}.${col}.${row}`]?.prcstat === 'PASSED',
                  'timeout-cell': area_values[`${active_area_table}.${col}.${row}`]?.prcstat === 'Timeout',
                }">
                  <div v-if="area_values[`${active_area_table}.${col}.${row}`]?.MTSN">
                    <div>
                      <b><span>{{ area_values[`${active_area_table}.${col}.${row}`]?.MTSN }}</span></b>
                      <b><span class="span-on-right">{{ area_values[`${active_area_table}.${col}.${row}`]?.current_op }}</span></b>
                    </div>
                    <div>
                      <b><span>{{ area_values[`${active_area_table}.${col}.${row}`]?.FAMILY }}</span></b>
                      <b><span class="span-on-right">{{ area_values[`${active_area_table}.${col}.${row}`]?.MT }}</span></b>
                    </div>
                    <div>
                      <b><span>{{ area_values[`${active_area_table}.${col}.${row}`]?.pgmname }}</span></b>
                    </div>
                    <div>
                      <b><span>{{ area_values[`${active_area_table}.${col}.${row}`]?.MONUMBER }}</span></b>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 主界面表格：改为每行显示15个区域 -->
    <div class="table-container" v-if="!detail_visible">
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
      <div class="row" v-for="(area_row, area_row_idx) in area_category_arr" :key="area_row_idx">
        <span class="row-son" v-for="(area, area_idx) in area_row.slice(0,15)" :key="area.key" :class="{'row-son-left': area_idx > 0}">
          <table class="table" border="1" cellspacing="0" :key="area.name + area.key" :name="getAreaName(area.key)" @click="show_detail(getAreaName(area.key))">
            <thead>
              <tr>
                <th v-for="col in area_strus[getAreaName(area.key)]" :key="col" :name="col">{{ `${getAreaName(area.key)}.${col}` }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in area_heigh" :key="row">
                <td v-for="col in area_strus[getAreaName(area.key)]" :key="col" :name="col" :class="{
                  'blue-cell': area_values[`${getAreaName(area.key)}.${col}.${row}`]?.prcstat === 'RUNNING',
                  'yellow-cell': area_values[`${getAreaName(area.key)}.${col}.${row}`]?.prcstat === 'ATTEND',
                  'red-cell': area_values[`${getAreaName(area.key)}.${col}.${row}`]?.prcstat === 'FAILED',
                  'blue-cell-on': area_values[`${getAreaName(area.key)}.${col}.${row}`]?.prcstat === 'os_power_cycle',
                  'green-cell': area_values[`${getAreaName(area.key)}.${col}.${row}`]?.prcstat === 'PASSED',
                  'timeout-cell': area_values[`${getAreaName(area.key)}.${col}.${row}`]?.prcstat === 'Timeout',
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
  name: 'LsscRack',
  data() {
    return {
      area_strus_guide: {
        'R1': 30,
        'R2': 30,
        'R3': 30,
        'R4': 30,
        'R5': 30,
        'R6': 30,
        'R7': 30,
        'R8': 30,
        'R9': 30,
        'R10': 30,
      },
      area_strus: {},
      area_values: {},
      detail_visible: false,
      active_area_table: 'R1',
      area_detail: {},
      area_category_arr: [
        [{ key: 1, name: 'R' }, { key: 2, name: 'R' }],
        [{ key: 3, name: 'R' }, { key: 4, name: 'R' }],
        [{ key: 5, name: 'R' }, { key: 6, name: 'R' }],
        [{ key: 7, name: 'R' }, { key: 8, name: 'R' }],
        [{ key: 9, name: 'R' }, { key: 10, name: 'R' }]
      ],
      area_heigh: ['03',  '01'],
    };
  },

  created() {
    this.fillAreaData();
  },
  mounted() {
    this.fetchData();
    this.interval = setInterval(this.fetchData, 10000);
    this.adjustScale();
    window.addEventListener('resize', this.adjustScale);
  },
  beforeDestroy() {
    clearInterval(this.interval);
    window.removeEventListener('resize', this.adjustScale);
  },
  methods: {
    getAreaName(key) {
      switch (key) {
        case 1: return 'R1';
        case 2: return 'R2';
        case 3: return 'R3';
        case 4: return 'R4';
        case 5: return 'R5';
        case 6: return 'R6';
        case 7: return 'R7';
        case 8: return 'R8';
        case 9: return 'R9';
        case 10: return 'R10';
        default: return '';
      }
    },
    fillAreaData() {
      for (let area in this.area_strus_guide) {
        this.area_strus[area] = [];
        for (let col = 1; col <= this.area_strus_guide[area]; col++) {
          let columnName = col.toString().padStart(2, '0'); // 保持两位数格式
          this.area_strus[area].push(columnName);
          for (let row of this.area_heigh) {
            let values_key = `${area}.${columnName}.${row}`;
            this.area_values[values_key] = {}; // 初始化空对象
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
          data = data['data'];
          let currentUnixTime = Math.floor(Date.now() / 1000); // 获取当前时间的 Unix 时间戳
          for (let i in data) {
            if (data[i]['FAMILY'] && typeof data[i]['FAMILY'] === 'string' && /^sudi|qiuyun|chunxiao/.test(data[i]['FAMILY'])) {
              this.area_values[data[i]['FLOOR_LOCATION']] = data[i];
              newTotalCount++;
              let mtimeUnix = parseInt(data[i]['mtime'][0]);
              // 计算当前时间与 mtime 的差异
              let timeDifference = currentUnixTime - mtimeUnix;

              if (data[i]['prcstat'] === 'os_power_cycle' || data[i]['current_op'] === 'runin' || data[i]['prcstat'] === 'FAILED') {  
                // 如果是 os_power_cycle 或 current_op 为 runin，则跳过此条目的失败检查  
                console.log('Skipping failure check for item with prcstat:');  
              } else if (timeDifference > (2 * 60 * 60)) { // 2小时的秒数为 2*60 *60  
                // 如果差异超过两个小时，并且prcstat不是PASSED或ATTEND，则标记为FAILED  
                if (data[i]['prcstat'] !== 'PASSED' && data[i]['prcstat'] !== 'ATTEND') {  
                  data[i]['prcstat'] = 'Timeout';  
                  newFailCount++;  
                }  
              } if (data[i]['prcstat'] == 'FAILED') {
            newFailCount++;
              } if (data[i]['prcstat'] == 'RUNNING' || data[i]['prcstat'] == 'os_power_cycle' ) {
            newRunningCount++;
              } else if (data[i]['prcstat'] == 'ATTEND') {
            newAttendCount++;
            newRunningCount++;
            }

              this.$forceUpdate();
            }
          }
          this.failCount = newFailCount;
          this.attendCount = newAttendCount;
          this.runningCount = newRunningCount;
          this.totalCount = newTotalCount;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    show_detail(area_table_name) {
      this.active_area_table = area_table_name;
      this.area_detail = [ ... this.area_strus[area_table_name]];
      if (area_table_name[0] == 'E') {
        this.area_detail.reverse();
      }
      this.detail_visible = true;
    },
    hide_detail() {
      this.detail_visible = false;
    },
    adjustScale(scaleFactor = 1.25) { // 默认缩放系数为 1
    var appContainer = this.$refs.appContainer;
    var containerWidth = appContainer.offsetWidth;
    var containerHeight = appContainer.offsetHeight;
    var scaleX = (window.innerWidth / containerWidth) * scaleFactor; // 使用缩放系数
    var scaleY = (window.innerHeight / containerHeight) * scaleFactor; // 使用缩放系数
    var scale = Math.min(scaleX, scaleY);
    appContainer.style.webkitTransform = 'scale(' + scale + ')';
    appContainer.style.transform = 'scale(' + scale + ')';
    appContainer.style.webkitTransformOrigin = 'top left';
    appContainer.style.transformOrigin = 'top left';
    appContainer.style.width = containerWidth + 'px';
    appContainer.style.height = containerHeight + 'px';
  },
  }
}
</script>

<style scoped>
html, body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden; /* 防止滚动条出现 */
}

#app {
  background-color: #898989;
  height: 1000px; /* 保持原始高度 */
  width: 2050px; /* 保持原始宽度 */
  position: absolute;
  margin: 0;
  padding: 0;
  position: fixed; /* 使用固定定位 */
  top: 0;
  left: 0;
  overflow: hidden; /* 移除滚动条 */
  display: flex; /* 使用 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

#div-detail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #898989;
  display: flex; /* 使用 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  z-index: 1000; /* 保证在最上层 */
  flex-direction: column; /* 内容垂直排列 */
  padding: 20px; /* 增加内边距，避免内容紧贴边缘 */
  box-sizing: border-box; /* 确保内边距不会影响总尺寸 */
}

#table-detail-parent {
  display: flex;
  flex-direction: column; /* 将表格分为三行 */
  width: 100%; /* 确保父容器占满宽度 */
  position: relative; /* 确保布局正确 */
  background: #898989;
 
}

.table-row {
  display: flex;
  justify-content: center; /* 水平居中 */
}

#table-detail-top,
#table-detail-middle,
#table-detail-bottom {
  border-collapse: collapse;
  width: 100%; /* 表格宽度占满父容器 */
  table-layout: fixed;
}

#table-detail-top th,
#table-detail-top td,
#table-detail-middle th,
#table-detail-middle td,
#table-detail-bottom th,
#table-detail-bottom td {
  height: 80px; /* 减少单元格高度 */
  width: 150px; /* 单元格宽度 */
  border: 1px solid #ddd;
  text-align: center;
  padding: 10px; /* 增加单元格内边距 */
  box-sizing: border-box; /* 确保内边距不会影响单元格尺寸 */
  white-space: nowrap; /* 禁止内容换行 */
}

#table-detail-top th,
#table-detail-middle th,
#table-detail-bottom th {
  background-color: #f2f2f2;
}

/* 空白区域样式 */
.spacer {
  height: 20px; /* 设置空白区域的高度 */
}

#table-detail {
  border-collapse: collapse;
  width: 100%; /* 表格宽度占满父容器 */
  table-layout: fixed;
}
 
#table-detail th,
#table-detail td {
  height: 80px; /* 减少单元格高度 */
  width: 150px; /* 单元格宽度 */
  border: 1px solid #ddd;
  text-align: center;
  padding: 10px; /* 增加单元格内边距 */
  box-sizing: border-box; /* 确保内边距不会影响单元格尺寸 */
  white-space: nowrap; /* 禁止内容换行 */
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
  font-size: 6px;
  background-color: #898989;
  margin-left: 40px; /* 将表格整体向右移动 100px */
  width: calc(100% - 60px); /* 调整宽度，避免溢出 */
}

#back-button {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  font-size: 20px; /* 增大字体大小 */
  padding: 10px 20px; /* 增加内边距，使按钮更大 */
  background-color: #007BFF; /* 背景颜色 */
  color: white; /* 文字颜色 */
  border: none; /* 移除边框 */
  border-radius: 5px; /* 圆角 */
  cursor: pointer; /* 鼠标悬停时的指针样式 */
  transition: background-color 0.3s ease; /* 平滑过渡效果 */
}

#back-button:hover {
  background-color: #0056b3; /* 鼠标悬停时的背景颜色 */
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

.timeout-cell {
  background-color: #00FFFF;
  color: white;
}
</style>