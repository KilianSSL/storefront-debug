const gql = require('graphql-tag');

module.exports = {
  integrations: {
    vendure: {
      location: '@vue-storefront/vendure-api/server',
      configuration: {
        api: {
          uri: process.env.GRAPHQL_API,
          tokenMethod: process.env.TOKEN_METHOD
        },
      },
      extension: (extensions) => [
        ...extensions,
        {
          name: 'oomnium-vendure-extensions',
          extendApiMethods: {
            testApiMethod: async ({ client, config }) => {
              return await client.query({ query: gql`
                  query products {
                    products {
                      items {
                        id
                      }
                    }
                  }
                `, fetchPolicy: 'no-cache' })
            },
            getPageBySlug: async ({ client } , { slug, languageCode }) => {
              console.log(client);
              return await client.query({
                query: gql`query pageBySlug($slug: String!, $languageCode: LanguageCode!) {
                  pageBySlug(slug: $slug, languageCode: $languageCode) {
                    id
                    title
                    text
                    position
                    sections {
                      value
                    }
                  }
                }`,
                variables: {
                  slug,
                  languageCode
                }
              })
            }
          }
        }
      ]
    }
    // oomniumPages: {
    //   location: path.resolve(__dirname, 'integrations/oomniumPages/src/index.server.ts'),
    //   configuration: {
    //     api: {
    //       uri: process.env.GRAPHQL_API,
    //       tokenMethod: process.env.TOKEN_METHOD
    //     },
    //   }
    // }
  }
};
