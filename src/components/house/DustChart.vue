<template>
  <div>
    <p>
      서울시 내 25개 구 중 {{ gu }}의 순위는
      <strong>{{ dustRank }}등</strong> 입니다.
    </p>
    <LineChartGenerator
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
    <div style="display: none">
      {{ air }}
    </div>
  </div>
</template>

<script>
import { Line as LineChartGenerator } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default {
  name: "LineChart",
  components: {
    LineChartGenerator,
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
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
      default: 200,
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
      chartData: {
        labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
        datasets: [
          {
            label: "미세먼지",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      options: {
        responsive: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
      dustRank: [],
      gu: "",
    };
  },
  created() {},
  computed: {
    air() {
      this.getDust();
      return 0;
    },
  },
  methods: {
    getDust() {
      //미세먼지
      const arr = this.$store.state.dustList;
      this.chartData.datasets[0].data = arr;

      this.dustRank = this.$store.state.dustRank + 1;
      this.gu = this.$store.state.dustGuName;
    },
  },
};
</script>
