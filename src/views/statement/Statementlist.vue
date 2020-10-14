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
          year: 2020
        }).then(res => {
          console.log(res);
          if (res.code === 0) {
            let name = res.data.name
            // onedata = res.data.prices
            let myChart = this.$echarts.init(document.getElementById("myChart"))
            let option = {
              title: {
                text: '采购报表'
              },
              tooltip: {},
              xAxis: {
                // data: ["1月", "2月", "3月", "4月", "5月", "6月","7月","8月","9月","10月","11月","12月"]
                data: res.data.months
              },
              yAxis: {},
              series: [{
                // name: '销量',
                name: name,
                type: 'line',
                // data: [5, 20, 36, 10, 10, 20]
                data: res.data.prices,
                showBackground: true,
                backgroundStyle: {
                  color: 'rgba(220, 220, 220, 0.8)'
                }
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
