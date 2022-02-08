/* eslint-disable jest/no-export */
/* eslint-disable jest/consistent-test-it */
import { closePool, getClient, openPool } from "./db";
import { createRecords } from "./records";

describe("db tools tests", () => {
  // eslint-disable-next-line jest/prefer-expect-assertions
  test("should create a client", async () => {
    await openPool("postgres://postgres:postgres@localhost:5432/postgres");
    const client = await getClient();
    await client.query(
      `DROP TABLE IF EXISTS "public"."records";
        CREATE TABLE "public"."records" (
        "id" int4 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "recorded_at" timestamptz NOT NULL,
        "measurements" _float8,
        "sensor_id" int4 NOT NULL);`
    );

    await createRecords({ sensor_id: 1, numberOfRecords: 10, client });
    const actual = await client.query("SELECT count(1) from public.records");
    expect(actual.rows).toStrictEqual([{ count: "10" }]);
    await closePool();
  });
});
