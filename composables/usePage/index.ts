import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';
import gql from 'graphql-tag';

export const usePage = (id: string) => {
  // Loads context used to call API endpoint
  const context = useVSFContext();
  console.log(context)

  // Shared ref holding the response from the API
  const result = sharedRef(null, `usePage-${id}`);

  // Shared ref indicating whether any method is waiting for the data from the API
  const loading = sharedRef(false, `usePage-loading-${id}`);

  // Shared ref holding errors from the methods
  const error = sharedRef({
    search: null
  }, `usePage-error-${id}`);

  console.log(context.$vendure)

  // Method to call an API endpoint and update `result`, `loading` and `error` properties
  const search = async (params) => {
    Logger.debug(`usePage/${id}/search`, params);

    try {
      loading.value = true;
      result.value = await context.$vendure.client.query(gql`
        query($slug: String!, $languageCode: LanguageCode!) {
          pageBySlug(slug: $slug, languageCode: $languageCode) {
            title
            text
          }
        }`);
      error.value.search = null;
    } catch (err) {
      error.value.search = err;
      Logger.error(`usePage/${id}/search`, err);
    } finally {
      loading.value = false;
    }
  };

  return {
    search,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
