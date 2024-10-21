import { boot } from 'quasar/wrappers';
import { register } from 'swiper/element/bundle';
export default boot(({ app }) => {
  register();
});
