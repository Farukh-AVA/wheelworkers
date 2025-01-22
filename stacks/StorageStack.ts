import { StackContext, Table, Api, RDS } from "sst/constructs";

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

  /** 
  // Create the DynamoDB table
  const table = new Table(stack, "EventsTable", {
    fields: {
      Date: "string",
      EventName: "string",
      EventSpace: "string",
      Location: "string",
      StartTime: "string",
      EndTime: "string",
      TicketPrice: "string",
      Attendance: "string",
    },
    primaryIndex: { partitionKey: "Date", sortKey: "EventName" },
  });

  return {
    table,
  };
 */
}
