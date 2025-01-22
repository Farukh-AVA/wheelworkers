import { Kysely } from "kysely";
import { sql } from 'kysely';

/**
 * @param {Kysely<any>} db
 */
export async function up(db) {
  await db.schema
  .createTable("events")
  .addColumn("id", "serial", (col) => col.primaryKey())
  .addColumn("event_space", "text")
  .addColumn("street_address", "text")
  .addColumn("city", "text")
  .addColumn("state", "text")
  .addColumn("postal_code", "text")
  .addColumn("country", "text")
  .addColumn("date", "date")
  .addColumn("start_time", "time")
  .addColumn("end_time", "time")
  .addColumn("event_name", "text")
  .addColumn("ticket_price", "decimal(10,2)")
  .addColumn("max_attendance", "integer")
  .execute();



await db 
.insertInto("events")
.values([
    { 
        event_space: 'Pier 61 at Chelsea Piers',
        street_address: '61 Chelsea Piers',
        city: 'New York',
        state: 'NY',
        postal_code: '10011',
        country: 'USA',
        date: new Date('2025-01-07'),  // JavaScript Date object is fine for the date field
        start_time: sql`CAST('21:30:00' AS TIME)`,        // Time in the HH:MM:SS format
        end_time: sql`CAST('22:30:00' AS TIME)`,          // Time in the HH:MM:SS format
        event_name: "Lexington Yacht NYC New Year’s Eve Cruise",
        ticket_price: 250.00,
        max_attendance: 150,
    },
    {
        event_space: "Socrates Sculpture Park",
        street_address: "32-01 Vernon Boulevard",
        city: "Long Island City",
        state: "NY",
        postal_code: "11106",
        country: "USA",
        date: new Date('2025-01-06'),
        start_time: sql`CAST('09:00:00' AS TIME)`,
        end_time: sql`CAST('13:00:00' AS TIME)`,
        event_name: "Park Closes Early",
        ticket_price: 0.00,
        max_attendance: 200,
      },
      {
        event_space: "Central Park Conservatory Garden",
        street_address: "East 104th Street & Fifth Avenue",
        city: "New York",
        state: "NY",
        postal_code: "10029",
        country: "USA",
        date: new Date('2025-01-02'),
        start_time: sql`CAST('14:00:00' AS TIME)`,
        end_time: sql`CAST('18:00:00' AS TIME)`,
        event_name: "Winter Jazz Fest",
        ticket_price: 75.00,
        max_attendance: 500,
      },
      {
        event_space: "Brooklyn Museum",
        street_address: "200 Eastern Pkwy",
        city: "Brooklyn",
        state: "NY",
        postal_code: "11238",
        country: "USA",
        date: new Date('2025-01-03'),
        start_time: sql`CAST('10:00:00' AS TIME)`,
        end_time: sql`CAST('17:00:00' AS TIME)`,
        event_name: "Art in Bloom Exhibit",
        ticket_price: 20.00,
        max_attendance: 800,
      },
      {
        event_space: "Apollo Theater",
        street_address: "253 W 125th St",
        city: "New York",
        state: "NY",
        postal_code: "10027",
        country: "USA",
        date: new Date('2025-01-04'),
        start_time: sql`CAST('19:00:00' AS TIME)`,
        end_time: sql`CAST('22:00:00' AS TIME)`,
        event_name: "Motown Magic Live",
        ticket_price: 150.00,
        max_attendance: 600,
      },
      {
        event_space: "Times Square Ball Drop Area",
        street_address: "Broadway & 7th Avenue",
        city: "New York",
        state: "NY",
        postal_code: "10036",
        country: "USA",
        date: new Date('2025-01-05'),
        start_time: sql`CAST('20:00:00' AS TIME)`,
        end_time: sql`CAST('00:30:00' AS TIME)`,
        event_name: "New Year Countdown Extended",
        ticket_price: 0.00,
        max_attendance: 1000,
      },
      {
        event_space: "New York Public Library",
        street_address: "476 5th Ave",
        city: "New York",
        state: "NY",
        postal_code: "10018",
        country: "USA",
        date: new Date('2025-01-06'),
        start_time: sql`CAST('11:00:00' AS TIME)`,
        end_time: sql`CAST('16:00:00' AS TIME)`,
        event_name: "Literature Fest 2025",
        ticket_price: 25.00,
        max_attendance: 300,
      },
  // Add remaining rows here based on the uploaded file 
])
.execute();
}

/**
 * @param {Kysely<any>} db
 */
export async function down(db) {
    await db.schema.dropTable("events").execute();
}