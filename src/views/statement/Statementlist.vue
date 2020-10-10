<template>
  <div>
    <!-- <h1>报表列表</h1> -->
    <div id="myChart" :style="{width: '800px', height: '500px'}"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        onedata: [],
      }
    },
    methods: {
      getStatementlist() {
        // this.$network.statement.Statementlist.getStatementlist({
        //   year: 12
        // }).then(res => {
        //   if (res.code === 0) {
        //     this.onedata = res.data.prices
        //   } else {
        //     this.$notify({
        //       title: "失败",
        //       message: res.msg,
        //       type: "error"
        //     })
        //   }
        // }).catch(err => {
        //   this.$notify({
        //     title: "失败",
        //     message: err,
        //     type: "error"
        //   })
        // })
      },
      drewLine() {
        // console.log(this.onedata);
        let onedata = []
        this.$network.statement.Statementlist.getStatementlist({
          year: 12
        }).then(res => {
          console.log(res);
          if (res.code === 0) {

            // onedata = res.data.prices
            let myChart = this.$echarts.init(document.getElementById("myChart"))
            let option = {
              title: {
                text: '采购报表'
              },
              tooltip: {},
              xAxis: {
                // data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                data: res.data.prices
              },
              yAxis: {},
              series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
                // data: this.onedata
              }]
            }

            myChart.setOption(option)
          } else {
            this.$notify({
              title: "失败",
              message: res.msg,
              type: "error"
            })
          }
        }).catch(err => {
          this.$notify({
            title: "失败",
            message: err,
            type: "error"
          })
        })
        // console.log(onedata);

      }
    },
    mounted() {
      // this.getStatementlist()
      this.drewLine()
    },
    created() {

    },
  }

</script>
