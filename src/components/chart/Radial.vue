<template>
  <div>
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
import {
  PieChartType,
  ChartMode,
  ChartThemePalete,
  Position,
} from '@/types/chart';
// import { ApexCharts } from 'boot/apexcharts';
import { useBase } from '@/osables/useBase';
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
  showLegend: {
    type: Boolean,
    default: true,
  },
  legendUseSeriesColors: {
    type: Boolean,
    default: true,
  },
  legendFloating: {
    type: Boolean,
    default: false,
  },
  legendOffsetX: {
    type: Number,
    default: 0,
  },
  legendOffsetY: {
    type: Number,
    default: 0,
  },
  legendPosition: {
    type: String as PropType<Position>,
    default: 'bottom',
  },
  type: {
    type: String as PropType<PieChartType>,
    default: 'radialBar',
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
    default: true,
  },
  dataLabelsSize: {
    type: String,
    default: '14px',
  },
  dataValueSize: {
    type: String,
    default: '18px',
  },
  showDataLabelsName: {
    type: Boolean,
    default: true,
  },
  showDataLabelsValue: {
    type: Boolean,
    default: true,
  },
  dataLabelsValueOfsetY: {
    type: Number,
    default: 0,
  },
  labelRotate: {
    type: Number,
    default: 0,
  },
  startAngle: {
    type: Number,
    default: 0,
  },
  endAngle: {
    type: Number,
    default: 360,
  },
  stokeLineCap: {
    type: String as PropType<'round' | 'square' | 'butt'>,
    default: 'round', //round, square, butt
  },
  fillType: {
    type: String as PropType<'fill' | 'gradient'>,
    default: 'gradient',
  },
  categories: {
    type: Array,
    default: () => [],
  },
  semi: {
    type: Boolean,
    default: false,
  },
  sparkline: {
    type: Boolean,
    default: false,
  },
  hollowBg: {
    type: Boolean,
    default: true,
  },
  hollowSize: {
    type: String,
    default: '55%',
  },
  valUnit: {
    type: String,
    default: '',
  },
  gridPadding: {
    type: Number,
    default: 0,
  },
  trackBackgroud: {
    type: String,
    default: '#f0f0f0',
  },
});
const chartSeries = ref(props.series);
const options = ref<any>();
const { isDark } = useBase();
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
const updateTheme = (dark: boolean) => {
  if (options.value) {
    options.value = {
      theme: {
        mode: isDark ? 'dark' : 'light',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            background: dark ? 'transparent' : '#fff',
          },
          dataLabels: {
            value: {
              color: dark ? '#fff' : '#000',
            },
          },
        },
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
        // sparkline: {
        //   enabled: props.sparkline || props.semi,
        // },
        // offsetY: props.semi ? -20 : 0,
      },
      theme: {
        mode: props.mode,
        palette: props.palette,
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: props.startAngle,
          endAngle: props.endAngle,
          hollow: {
            margin: 0,
            size: props.hollowSize,
            background:
              props.dark || !props.hollowBg || props.semi
                ? 'transparent'
                : '#fff',
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 3,
              opacity: 0.15,
            },
          },
          track: {
            background: props.trackBackgroud,
            strokeWidth: '100%',
            margin: 2, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: 2,
              left: 0,
              color: '#999',
              opacity: 1,
              blur: 2,
            },
          },

          dataLabels: {
            show: props.showDataLabels,
            name: {
              offsetY: props.semi ? -30 : 0,
              show: props.showDataLabelsName,
              // color: props.dark ? '#fff' : '#000',
              fontSize: props.dataLabelsSize,
              fontWeight: 400,
            },
            value: {
              show: props.showDataLabelsValue,
              offsetY:
                props.dataLabelsValueOfsetY > 0
                  ? props.dataLabelsValueOfsetY
                  : props.semi
                  ? -20
                  : 5,
              formatter: function (val: any) {
                return val + (props.valUnit ? props.valUnit : '');
              },
              // color: props.dark ? '#fff' : '#000',
              fontSize: props.dataValueSize,
            },
          },
        },
      },
      colors:
        props.colors && props.colors.length > 0 ? props.colors : undefined,
      stroke: {
        // lineCap: props.semi ? 'butt' : props.stokeLineCap,
        lineCap: props.stokeLineCap,
      },
      fill: {
        type: props.fillType, //fill, gradient
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.5,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      labels: props.categories,
      legend: {
        show: props.showLegend,
        floating: props.legendFloating,
        fontSize: '16px',
        offsetX: props.legendOffsetX,
        offsetY: props.legendOffsetY,
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
        padding: {
          left: props.gridPadding,
          right: props.gridPadding,
          top: props.gridPadding,
          bottom: props.gridPadding,
        },
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val;
          },
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
