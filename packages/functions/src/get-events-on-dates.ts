/** 
apig-test \  --username admin@example.com --password Passw0rd! --user-pool-id us-east-1_ECmcHqqh6  --app-client-id 2juhmsg5vnbg8232m58dgvl69  --cognito-region us-east-1 --identity-pool-id us-east-1:c35fe9b1-1039-4d2a-b30e-693b3a0696e3 --invoke-url https://tzrrdsnhw7.execute-api.us-east-1.amazonaws.com --api-gateway-region us-east-1 --path-template /  --method GET
*/
import { db } from "../../core/src/rds"

export async function main() {
  const localTime = new Date().toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
  });
  const castLocalTime = new Date(localTime);   
  const events = await db
    .selectFrom("events")
    .selectAll()
    .where("date", "=", castLocalTime)
    .execute();

  return {
    statusCode: 200,
    body: JSON.stringify(events),
  };
}
