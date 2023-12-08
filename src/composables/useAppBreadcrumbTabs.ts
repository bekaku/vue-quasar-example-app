import { Breadcrumb } from '@/types/common';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
export const useAppBreadcrumbTabs = () => {
  const route = useRoute();
  const breadcrumbs = computed(() => route.meta.breadcrumbs as Breadcrumb[]);
  const tabs = computed(() => route.meta.tabs as Breadcrumb[]);
  return {
    breadcrumbs,
    tabs
  }
};
