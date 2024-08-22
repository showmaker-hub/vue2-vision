<template>
  <div>
  <div id="login-page" v-if="!loggedIn && !autoLoggedInViaUrl">  
    <h2 style="font-size: 35px; text-align: center;">请输入账号和密码以访问页面：</h2>
    <input type="text" placeholder="账号" v-model="username">  
    <input type="password" placeholder="密码" v-model="password">  
    <button @click="login">登录</button>  
    <p v-if="loginError" style="color: red; font-size: 30px;">账号或密码错误，请重新输入</p>
    </div>  
  <div id="app" v-show="loggedshow">
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
                'timeout-cell': area_values[`${active_area_table}.${col}.${row}`]['prcstat'] == 'Timeout',
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
                  'timeout-cell': area_values[`${area_category}${area_table_idx}.${col}.${row}`]['prcstat'] == 'Timeout',
                }"></td>
              </tr>
            </tbody>
          </table>
        </span>
      </div>
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
      username: '',  
      password: '',  
      correctUsername: 'aliadmin', // 请将此处替换为您设置的正确账号  
      correctPassword: '1qazXSW@3edc', // 请将此处替换为您设置的正确密码  
      loggedIn: false,  
      loginError: false,  
      autoLoggedIn: false, // 标识是否通过URL参数自动登录  
      autoLoggedInViaUrl: false,
      loggedshow: false,
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
    this.checkAutoLogin();  
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
    checkAutoLogin() {  
      const queryParams = new URLSearchParams(window.location.search);  
      const autologin = queryParams.get('autologin');  
  
      if (autologin && autologin.toLowerCase() === 'true') {  
        // 通过URL参数实现了免密登录，直接设置loggedIn为true  
        this.loggedIn = true;  
        this.loggedshow = true;
        this.autoLoggedInViaUrl = true; // 标识是通过URL参数登录的  
      }  
    },  
    login() {  
      if (this.username === this.correctUsername && this.password === this.correctPassword) {  
        this.loggedshow = true;
        this.loggedIn = true;  
        this.loginError = false;  
      } else {  
        this.loginError = true;  
      }  
    },  
    loginSuccess() {  
      // 模拟登录成功的逻辑  
      this.loggedIn = true;  
      this.autoLoggedIn = true; // 可能不需要，因为你已经登录了  
      // 这里可以添加其他登录成功后的处理逻辑，比如重定向、加载用户数据等  
    },
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
          let currentUnixTime = Math.floor(Date.now() / 1000); // 获取当前时间的 Unix 时间戳
          for (let i in data) {
        if (data[i]['FAMILY'] && typeof data[i]['FAMILY'] === 'string' && /^xuanwu|sudi|chunxiao/.test(data[i]['FAMILY'])) {
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
#login-page {    
  display: flex;    
  flex-direction: column;    
  justify-content: center;    
  align-items: center;    
  height: 100vh;    
  /* 还可以添加一些背景色或其他样式来改善页面外观 */  
  background-color: #f0f0f0; /* 示例背景色 */  
}    
    
#login-page input {    
  margin-bottom: 20px;    
  padding: 20px; /* 增加内边距以增大输入框大小 */  
  font-size: 24px; /* 调整字体大小 */  
  width: 400px; /* 可以设置具体的宽度，或者保持默认的宽度让输入框根据内容自适应 */  
}    
    
#login-page button {    
  padding: 20px 40px; /* 增加内边距以增大按钮大小 */  
  font-size: 24px; /* 调整字体大小 */  
  cursor: pointer;    
}

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

.timeout-cell {
  background-color: #00FFFF;
  color: white;
}
</style>