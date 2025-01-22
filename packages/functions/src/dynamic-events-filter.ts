
/**
 * apig-test \  --username admin@example.com --password Passw0rd! --user-pool-id us-east-1_ECmcHqqh6  --app-client-id 2juhmsg5vnbg8232m58dgvl69  --cognito-region us-east-1 --identity-pool-id us-east-1:c35fe9b1-1039-4d2a-b30e-693b3a0696e3 --invoke-url https://tzrrdsnhw7.execute-api.us-east-1.amazonaws.com --api-gateway-region us-east-1 --path-template /  --method POST --body '{\"end_time\": {\"time\":\"09:00:00\", \"operator\":\">=\"}, \"ticket_price\": {\"price\":\"0.00\", \"operator\":\">=\"}, \"date\":\"2025-01-06\"}'    
 */

/** 
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { RDSData } from "@aws-sdk/client-rds-data";
import { RDS } from "sst/node/rds";

import { Database } from "../src/types/events";

const db = new Kysely<Database>({
  dialect: new DataApiDialect({
    mode: "postgres",
    driver: {
      database: RDS.Cluster.defaultDatabaseName,
      secretArn: RDS.Cluster.secretArn,
      resourceArn: RDS.Cluster.clusterArn,
      client: new RDSData({}),
    },
  }),
});
 */
import { sql } from "kysely"; 
import handler from "@wheelworkers/core/handler";
import { db } from "../../core/src/rds"

export const main = handler(async (event) => {
  
    const filters = JSON.parse(event.body);

  let query = db.selectFrom("events").selectAll();

  if (filters.end_time) {
    const { operator, time } = filters.end_time;

    const validOperators = ["=", ">=", "<=", ">", "<"];
    if (!validOperators.includes(operator)) {
      throw new Error("Invalid operator for end_time");
    }
    const timeRegex = /^\d{2}:\d{2}:\d{2}$/;
    if (!timeRegex.test(time)) {
      throw new Error("Invalid time format for end_time");
    }

    query = query.where(
      sql`end_time ${sql.raw(operator)} CAST(${time} AS TIME)`
    );
  }

  if (filters.ticket_price) {
    const { operator, price } = filters.ticket_price;

    const validOperators = ["=", ">=", "<=", ">", "<"];
    if (!validOperators.includes(operator)) {
      throw new Error("Invalid operator for ticket_price");
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      throw new Error("Invalid price format for ticket_price");
    }

    query = query.where("ticket_price", operator, parsedPrice);
  }

  if (filters.date) {
    const date = new Date(filters.date);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }

    query = query.where("date", "=", date);
  }
  
  const result = await query.execute();
  return JSON.stringify(result); 
});

  /** 
  try {
    const result = await query.execute();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("Error executing query:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to execute query", details: error }),
    };
  }
*/


