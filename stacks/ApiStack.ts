import { Api, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack }: StackContext) {
  
  const { cluster } = use(StorageStack);

  // Create the API
  const api = new Api(stack, "Api", {
    defaults: {
      authorizer: "iam",
      function: {
        bind: [cluster],
      },
    },
    routes: {
      "POST /": "packages/functions/src/dynamic-events-filter.main",
      "GET /": "packages/functions/src/get-events-on-dates.main",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
    SecretArn: cluster.secretArn,
    ClusterIdentifier: cluster.clusterIdentifier,
  });
  
  // Return the API resource
  return {
    api,
  };
 
}