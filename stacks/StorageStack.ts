import { StackContext, RDS } from "sst/constructs";

export function StorageStack({ stack }: StackContext) {
  
  const DATABASE = "EventsTable";

  // Create the Aurora DB cluster
  const cluster = new RDS(stack, "Cluster", {
    engine: "postgresql13.9",
    defaultDatabaseName: DATABASE,
    migrations: "services/migrations",
  });
  
  return {
    cluster,
  };
}
