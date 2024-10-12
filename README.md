# my-vue-website

## Version History 


```
2024-08-22 16:08:14 v0.1.8


更新了一下新的产品支持

这次还有sudi以及9月可能会有的chunxiao 新品

采用正则表达式使用test 方法返回的布尔值去判断筛选，谢谢！

 

/^xuanwu|sudi|chunxiao/.test(data[i]['FAMILY']

2024-08-16 16:08:33 v0.1.7


刚刚发现一个bug，如果UUT返回的family某个date区间存在乱码，就会影响显示

现在过滤阿里的时候加了一个判断，必须是字符串才会返回数据

增强了代码的健壮性

 

if (data[i]['FAMILY'] && typeof data[i]['FAMILY'] === 'string' && data[i]['FAMILY'].startsWith('xuanwu')

 

请帮忙更新一下，谢谢
2024-07-30 18:07:30 v0.1.6

更新了一版，为了区分fail的和各种原因导致超时的，用了新的方框颜色来替代

 

如果机器超时：就会变成这个颜色  -- 

如果机器状态是Fail或者runin压测，就会跳过此判断，维持现状

2024-05-24 17:05:12 v0.1.5

更新了几个功能，如下：

1.	支持列表升级，优化了筛选判断，现在只要是xuanwu前缀，不管是未来新品xuanwu20，还是xuanwu30……，不需要更新代码即可显示全部

2.	更新了网站验证，现在访问网站需要验证账号密码，因为前端实现，所以并非token验证方式校验
账号:aliadmin  密码：1qazXSW@3edc
输入错账号/密码就无法登录看板


2024-05-14 16:05:09  V_0.1.3
更新了一版、增加了新功能：
一、现在会把mtime里Unix 时间戳格式转换成UTC时间，并与现实时间对比，如果mtime时间超过2小时没有更新，就会变成Fail状态，如下图
如果是attend和pass的机器，就会跳过此判断正常输出

二、优化了计数器，原来计数器有bug，在数量小于某一数值时候，数量会异常，现在已修复

```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
