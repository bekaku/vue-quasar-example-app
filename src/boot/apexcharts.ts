import { boot } from 'quasar/wrappers';
// import ApexCharts from 'apexcharts';
// export default boot(({ app }) => {
//   app.config.globalProperties.$ApexCharts = ApexCharts;
// });
// export { ApexCharts };
import VueApexCharts from 'vue3-apexcharts';

export default boot(({ app }) => {
  app.use(VueApexCharts);
  //app.component('my-component', EmojiPicker)
});
