/**
 * $ curl -X POST -H 'Content-Type: application/json' -d '{"date":"12.12.2024","EventName":"Concert"}' https://tzrrdsnhw7.execute-api.us-east-1.amazonaws.com/events
 */
import { Table } from "sst/node/table";
import handler from "@wheelworkers/core/handler";
import dynamoDb from "@wheelworkers/core/dynamodb";

export const main = handler(async (event) => {

  let data = {
    date: "",
    EventName: "",
  };

  if (event.body != null) {
    data = JSON.parse(event.body);
  }

  const params = {
    TableName: Table.EventsTable.tableName,
    Item: {
        Date: data.date,
        EventName: data.EventName,
        EventSpace: "1500",
        Location: "MSG",
        StartTime: "10PM",
        EndTime: "12AM",
        TicketPrice: "200",
        Attendance: "50000",
    },
  };

  await dynamoDb.put(params);

  return JSON.stringify(params.Item);

});