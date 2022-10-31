<template>
  <div id="page">

  </div>
</template>
<script>
import {onSSR, useVSFContext} from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';
import {onMounted} from "@vue/composition-api";

export default {
  name: 'Page',
  transition: 'fade',
  setup(props, context) {
    const { $vendure } = useVSFContext();
    const { slug } = context.root.$route.params;

    onMounted(async () => {
      const testResult = await $vendure.api.testApiMethod();
      console.log(testResult)
    });

    return {
    };
  },
  components: {
    LazyHydrate
  }
};
</script>

<style lang="scss" scoped>
#page {
}
</style>
