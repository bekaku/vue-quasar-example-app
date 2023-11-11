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
      data: [76, 85, 101, 98, 10, 105, 91, 114, 94],
    },
    {
      name: 'Free Cash Flow',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
  ]);
  <chart-area
          chart-id="g-chart-area"
          :colors="['#23D160', '#FF9F43', '#FF3860']"
          strokestyle="smooth"
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
        />
  */
import { PropType, ref, watchEffect, onUnmounted, onMounted, watch } from 'vue';
import {
  PieChartType,
  ChartMode,
  ChartThemePalete,
  Strokestyle,
  Position,
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
    default: 'area', //area , line , bar
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
  dark: {
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
  categories: {
    type: Array,
    default: () => [],
  },
  strokestyle: {
    type: String as PropType<Strokestyle>,
    default: 'smooth', //smooth, straight, stepline
  },
  strokeWidth: {
    type: Number,
    default: 1,
  },
  sparkline: {
    type: Boolean,
    default: false,
  },
  annotationsYaxis: {
    type: Array,
    default: () => [],
  },
  annotationsXaxis: {
    type: Array,
    default: () => [],
  },
  minYVal: {
    type: Number,
    default: 0,
  },
  maxYVal: {
    type: Number as PropType<number | undefined>,
    default: undefined,
  },
});
const { isDark } = useBase();
const chartSeries = ref(props.series);
const options = ref<any>();
watchEffect(() => {
  if (props.series && props.series.length > 0) {
    chartSeries.value = props.series;
  }
});
onUnmounted(() => {
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
};
watch(isDark, (state) => {
  updateTheme(state);
});
const chartSetup = () => {
  if (props.series.length > 0) {
    options.value = {
      // series: series.value,
      // series: props.series,
      chart: {
        id: props.chartId,
        background: 'transparent',
        width: props.width,
        height: props.height,
        type: props.type,
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
          easing: 'easein', // linear, easeout, easein, easeinout, swing, bounce, elastic
          speed: 800,
        },
        sparkline: {
          enabled: props.sparkline,
        },
      },
      theme: {
        mode: props.mode,
        palette: props.palette,
      },
      plotOptions: {},
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
        min: props.minYVal,
        // max: props.maxYVal != undefined ? props.maxYVal : undefined
      },
      annotations: {
        yaxis: props.annotationsYaxis,
        xaxis: props.annotationsXaxis,
      },
      stroke: {
        width: props.strokeWidth,
        curve: props.strokestyle,
      },
      fill: {
        opacity: 1,
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
        // row: {
        //   colors: [props.dark ? '#353537' : '#e9ebec', 'transparent'], // takes an array which will be repeated on columns
        //   opacity: 0.2,
        // },
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
    if (props.maxYVal != undefined) {
      options.value.yaxis.max = props.maxYVal;
    }

    // chart.value = new ApexCharts(
    //   document.querySelector('#' + props.chartId),
    //   options
    // );
    // chart.value.render();
  }
};
</script>
