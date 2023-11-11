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
import { PropType, ref, watchEffect, onUnmounted, onMounted, watch } from 'vue';
import { useBase } from '@/composables/useBase';
import {
  PieChartType,
  ChartMode,
  ChartThemePalete,
  Strokestyle,
  Position,
} from '@/types/chart';
// import { ApexCharts } from 'boot/apexcharts';
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
    default: 1.5,
  },
  gridPaddingTop: {
    type: Number,
    default: 0,
  },
});
const chartSeries = ref(props.series);
const options = ref<any>();
// const chart = ref<any>(null);
const { isDark } = useBase();
watchEffect(() => {
  if (props.series && props.series.length > 0) {
    chartSeries.value = props.series;
    // if (chart.value) {
    //   chart.value.updateOptions({
    //     series: props.series,
    //   });
    // }
  }
});
onUnmounted(() => {
  options.value = undefined;
  chartSeries.value = [];
  // if (chart.value) {
  //   chart.value.destroy();
  //   chart.value = null;
  // }
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
const getCateByIndex = (index: number) =>
  props.categories.length > 0 ? props.categories[index] : '';
const chartSetup = () => {
  if (props.series && props.series.length > 0) {
    options.value = {
      // series: series.value,
      // series: props.series,
      chart: {
        id: props.chartId,
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
          enabled: true,
        },
      },
      theme: {
        mode: props.mode,
        palette: props.palette,
      },
      plotOptions: {},
      colors:
        props.colors && props.colors.length > 0 ? props.colors : undefined,
      stroke: {
        width: props.type == 'bar' ? 0 : props.strokeWidth,
        curve: props.strokestyle,
      },
      fill: {
        opacity: props.type == 'bar' ? 1 : 0.3,
      },
      xaxis: {
        crosshairs: {
          width: 1,
        },
      },
      yaxis: {
        min: 0,
      },
      grid: {
        padding: {
          // left: props.gridPadding,
          // right: props.gridPadding,
          top: props.gridPaddingTop,
          // bottom: props.gridPadding,
        },
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: true,
          formatter: function (value: any, options: any) {
            return getCateByIndex(options.dataPointIndex);
          },
        },
        y: {
          title: {
            formatter: function (seriesName: any) {
              return seriesName;
            },
          },
        },
        marker: {
          show: false,
        },
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
