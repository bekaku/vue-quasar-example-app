import { boot } from 'quasar/wrappers';
import { plugin as Slicksort } from 'vue-slicksort';
export default boot(({ app }) => {
  app.use(Slicksort);
});
