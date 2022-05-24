<template>
  <div>
    <div class="title">
      <div>
        <b-icon icon="megaphone" />
      </div>
      <h2>거래량 TOP TEN</h2>
    </div>
    <p class="ml-4">2022년 4월에 거래가 가장 많이 된 지역 10개입니다.</p>
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import http from "@/api/http.js";
import { Bar } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: {
    Bar,
  },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      results: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: "2022년 4월",
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  created() {
    http.get("/housedeal/deal10").then(({ data }) => {
      console.log(data);
      data.forEach((item) => {
        this.chartData.labels.push(
          item.sidoName + " " + item.gugunName + " " + item.dongName
        );
        console.log(this.chartData.datasets);

        this.chartData.datasets[0].data.push(item.count);
      });
    });
  },
};
</script>

<style scoped>
/* 타이틀 */
.title {
  display: flex;
  line-height: 33px;
  margin-bottom: 14px;
}
.title div {
  width: 30px;
  height: 30px;
  background-color: #0ca66d;
  border-radius: 50%;
  margin-right: 10px;
}
.title div .b-icon {
  margin: auto;
  height: 100%;
  display: block;
  font-size: 20px;
  color: #fff;
}
.title h2 {
  color: #555;
  font-size: 24px;
}
</style>
