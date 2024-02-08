// import VueApexCharts from 'vue3-apexcharts';
import VueApexCharts from 'vue3-apexcharts/src/vue3-apexcharts';
import { boot } from 'quasar/wrappers';
export default boot(({ app }) => {
  // app.use(VueApexCharts);
  // app.use(VueApexCharts);
  app.component('apexchart', VueApexCharts)
});
