<template>
  <div class="q-qa-sm">
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
import { ChartMode, ChartThemePalete, PieChartType } from '@/types/chart';
// import { ApexCharts } from 'boot/apexcharts';
import { useBase } from '@/composables/useBase';
import { useLang } from '@/composables/useLang';
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
  type: {
    type: String as PropType<PieChartType>,
    default: 'line', //area , line , bar
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
  showAnnotation: {
    type: Boolean,
    default: true,
  },
  showAnnotationText: {
    type: Boolean,
    default: true,
  },
  markersSizes: {
    type: Array,
    default: () => [],
  },
  fillTypes: {
    type: Array,
    default: () => [],
  },
  fillImages: {
    type: Array,
    default: () => [],
  },
  fillImagesWidth: {
    type: Number,
    default: 40,
  },
  minXVal: {
    type: Number,
    default: 0,
  },
  maxXVal: {
    type: Number,
    default: 0,
  },
  minYVal: {
    type: Number,
    default: 0,
  },
  maxYVal: {
    type: Number,
    default: 0,
  },
  xAvg: {
    type: Number,
    default: 2,
  },
  yAvg: {
    type: Number,
    default: 2,
  },
  xaxisTitle: {
    type: String,
    default: 'x',
  },
  yaxisTitle: {
    type: String,
    default: 'l',
  },
  yTooltipPostfix: {
    type: String,
    default: '',
  },
  xTooltipPostfix: {
    type: String,
    default: '',
  },
  pionts: {
    type: Array,
    default: () => [],
  },
});
const { isDark } = useBase();
const { t } = useLang();
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
  options.value = {
    // series: props.series,
    chart: {
      id: props.chartId,
      background: 'transparent',
      // type: 'scatter',
      type: 'line',
      height: props.height,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    theme: {
      mode: props.mode,
      palette: props.palette,
    },
    fill: {
      type: props.fillTypes,
      opacity: 1,
      image: {
        src: props.fillImages,
        width: props.fillImagesWidth,
        height: props.fillImagesWidth,
      },
    },
    markers: {
      size: props.markersSizes,
      strokeWidth: 0,
      hover: {
        sizeOffset: 0,
      },
    },
    colors: props.colors,
    stroke: {
      width: 1,
    },
    grid: {
      show: true,
      position: 'back',
      strokeDashArray: 0,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 30,
        right: 40,
        bottom: 20,
        left: 20,
      },
    },
    tooltip: {
      shared: false,
      intersect: false,
      y: {
        show: false,
        formatter: function (
          value: any,
          {
            /*series, seriesIndex, dataPointIndex, w*/
          },
        ) {
          return `${props.yaxisTitle} : ${value}${props.yTooltipPostfix}`;
        },
      },
      x: {
        show: false,
        formatter: function (
          value: any,
          {
            /*series, seriesIndex, dataPointIndex, w*/
          },
        ) {
          return `${props.xaxisTitle} : ${value}${props.xTooltipPostfix}`;
        },
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: 'numeric',
      min: props.minXVal,
      // max: props.maxXVal + props.maxXVal / 4,
      max: props.maxXVal,
      tickAmount: 5,
      decimalsInFloat: 0,
      title: {
        text: props.xaxisTitle,
        // offsetY: 80,
      },
    },
    yaxis: {
      type: 'numeric',
      min: props.minYVal,
      // max: props.maxYVal + props.maxYVal / 4,
      max: props.maxYVal,
      tickAmount: 5,
      decimalsInFloat: 0,
      title: {
        text: props.yaxisTitle,
        // offsetY: 80,
      },
    },

    annotations: props.showAnnotation
      ? {
          xaxis: [
            {
              x: props.xAvg,
              borderColor: '#00aba9',
              label: {
                // borderColor: '#00aba9',
                borderColor: undefined,
                style: {
                  color: '#00aba9',
                  // color: '#fff',
                  // background: '#00aba9',
                },
                text: props.showAnnotationText
                  ? `${props.xaxisTitle} (${t('base.avg')})`
                  : undefined,
              },
            },
          ],
          yaxis: [
            {
              y: props.yAvg,
              borderColor: '#00aba9',
              label: {
                // borderColor: '#00aba9',
                borderColor: undefined,
                style: {
                  color: '#00aba9',
                  // color: '#fff',
                  // background: '#00aba9',
                },
                text: props.showAnnotationText
                  ? `${props.yaxisTitle} (${t('base.avg')})`
                  : undefined,
              },
            },
          ],
          points: props.pionts,
        }
      : { points: props.pionts },
  };
  // chart.value = new ApexCharts(
  //   document.querySelector('#' + props.chartId),
  //   options
  // );
  // chart.value.render();
};
</script>
