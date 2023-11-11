<template>
  <div class="q-qa-sm">
    <!-- <div :id="chartId"></div> -->
    <apexchart
      v-if="options"
      :height="height"
      :type="type"
      :options="options"
      :series="chartSeries"
    ></apexchart>
  </div>
</template>
<script setup lang="ts">
/*
  const seriesColoumn = ref([
    {
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
    {
      name: 'Free Cash Flow',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
  ]);
   <chart-column
          class="q-my-sm"
          chart-id="g-chart-col"
          :colors="['#23D160', '#FF9F43', '#FF3860']"
          :series="seriesColoumn"
          :categories="[
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
          ]"
        >
        </chart-column>
   */
import { PropType, ref, watchEffect, onUnmounted, onMounted, watch } from 'vue';
import {
  PieChartType,
  ChartMode,
  ChartThemePalete,
  Position,
  Strokestyle,
} from '@/types/chart';
// import { ApexCharts } from 'boot/apexcharts';
import { useBase } from '@/composables/useBase';
const props = defineProps({
  modelValue: Object,
  chartId: {
    type: String,
    default: 'chartDiv',
  },
  height: {
    type: String,
    default: 'auto',
  },
  width: {
    type: String,
    default: '100%',
  },
  labelunit: {
    type: String,
    default: '',
  },
  showLegend: {
    type: Boolean,
    default: true,
  },
  legendUseSeriesColors: {
    type: Boolean,
    default: true,
  },
  legendPosition: {
    type: String as PropType<Position>,
    default: 'bottom',
  },
  type: {
    type: String as PropType<PieChartType>,
    default: 'bar', //area , line , bar
  },
  mode: {
    type: String as PropType<ChartMode>,
    default: 'light',
  },
  palette: {
    type: String as PropType<ChartThemePalete>,
    default: 'palette1',
  },
  series: {
    type: Array,
    default: () => [],
  },
  colors: {
    type: Array,
    default: () => [],
  },
  horizontal: {
    type: Boolean,
    default: false,
  },
  dark: {
    type: Boolean,
    default: false,
  },
  stacked: {
    type: Boolean,
    default: false,
  },
  showDataLabels: {
    type: Boolean,
    default: false,
  },
  labelRotate: {
    type: Number,
    default: 0,
  },
  categories: {
    // ['a', 'b', 'c', 'd']
    type: Array,
    default: () => [],
  },
  annotationsYaxis: {
    type: Array,
    default: () => [],
  },
  annotationsXaxis: {
    type: Array,
    default: () => [],
  },
  yaxisShow: {
    type: Boolean,
    default: true,
  },
  yaxisTickamount: {
    type: Number,
    default: 5,
  },
  xaxisTickamount: {
    type: Number,
    default: 0,
  },
  xaxisDecimalsInFloat: {
    type: Number,
    default: 0,
  },
  yaxisDecimalsInFloat: {
    type: Number,
    default: 0,
  },
  strokestyle: {
    type: String as PropType<Strokestyle>,
    default: 'smooth', //smooth, straight, stepline
  },
  strokeWidth: {
    type: Number,
    default: 1,
  },
});
const chartSeries = ref(props.series);
const options = ref<any>();
// const chart = ref<any>(null);
const { isDark } = useBase();

watchEffect(() => {
  if (props.series && props.series.length > 0) {
    // if (chart.value) {
    //   chart.value.updateOptions({
    //     series: props.series,
    //   });
    // }
    chartSeries.value = props.series;
  }
});
onUnmounted(() => {
  // if (chart.value) {
  //   chart.value.destroy();
  //   chart.value = null;
  // }
  options.value = undefined;
  chartSeries.value = [];
});

onMounted(() => {
  if (!process.env.SERVER) {
    chartSetup();
  }
});

const updateTheme = (isDark: boolean) => {
  if (options.value) {
    options.value = {
      theme: {
        mode: isDark ? 'dark' : 'light',
      },
    };
  }
  // if (chart.value) {
  //   chart.value.updateOptions({
  //     theme: {
  //       mode: isDark ? 'dark' : 'light',
  //     },
  //   });
  // }
};
watch(isDark, (state) => {
  updateTheme(state);
});
const chartSetup = () => {
  if (props.series.length > 0) {
    options.value = {
      // series: chartSeries.value,
      // series: props.series,
      chart: {
        id: props.chartId,
        background: 'transparent',
        width: props.width,
        height: props.height,
        type: props.type,
        stacked: props.stacked,
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
          easing: 'easein', // linear, easeout, easein, easeinout, swing, bounce, elastic
          speed: 800,
        },
      },
      theme: {
        mode: props.mode,
        palette: props.palette,
      },
      plotOptions: {
        bar: {
          // borderRadius: 1, //bug Uncaught TypeError: Cannot read properties of undefined (reading '0')
          horizontal: props.horizontal,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      colors:
        props.colors && props.colors.length > 0 ? props.colors : undefined,
      xaxis: {
        labels: {
          rotate: props.labelRotate,
        },
        categories: props.categories,
        decimalsInFloat: props.xaxisDecimalsInFloat,
        tickAmount:
          props.xaxisTickamount > 0 ? props.xaxisTickamount : undefined,
      },
      yaxis: {
        show: props.yaxisShow,
        tickAmount: props.yaxisTickamount,
        decimalsInFloat: props.yaxisDecimalsInFloat,
      },
      fill: {
        opacity: 1,
      },
      stroke: {
        width: props.strokeWidth,
        curve: props.strokestyle,
      },
      legend: {
        show: props.showLegend,
        position: props.legendPosition, // whether to position legends in 1 of 4
        // direction - top, bottom, left, right
        horizontalAlign: 'center', // when position top/bottom, you can
        // specify whether to align legends
        // left, right or center
        verticalAlign: 'middle',
        labels: {
          colors: '#8E8E93',
          useSeriesColors: props.legendUseSeriesColors,
        },
      },
      grid: {
        borderColor: props.dark ? '#282829' : '#f0f0f0', //transparent
        row: {
          colors: [props.dark ? '#282829' : '#f0f0f0', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.2,
        },
      },
      annotations: {
        yaxis: props.annotationsYaxis,
        xaxis: props.annotationsXaxis,
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val;
          },
        },
      },
      dataLabels: {
        enabled: props.showDataLabels,
      },
      responsive: [
        // {
        //   breakpoint: 480,
        //   options: {
        //     chart: {
        //       width: 200,
        //     },
        //     legend: {
        //       position: 'bottom',
        //     },
        //   },
        // },
      ],
    };
    // chart.value = new ApexCharts(
    //   document.querySelector('#' + props.chartId),
    //   options
    // );
    // chart.value.render();
  }
};
</script>
