import arcsine from "@stdlib/random/base/arcsine";
import { PoolClient } from "pg";
import format from "pg-format";
import { sub } from "date-fns";

const arcsineRandom = arcsine.factory(-20.0, 20.0);
export async function createRecords({
  sensor_id,
  numberOfRecords,
  client,
  lastDate,
}: {
  client: PoolClient;
  sensor_id: number;
  numberOfRecords: number;
  lastDate?: Date;
}): Promise<void> {
  try {
    let now: Date;
    if (!lastDate) {
      now = new Date();
    } else {
      now = lastDate;
    }
    const records = [];
    for (let i = numberOfRecords; i > 0; i--) {
      records.push([
        sensor_id,
        sub(now, { minutes: i }).toISOString(),

        `{${arcsineRandom()}}`,
      ]);
    }
    const query = format(
      "INSERT INTO records (sensor_id,recorded_at, measurements) VALUES %L",
      records
    );
    await client.query(query, []);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
