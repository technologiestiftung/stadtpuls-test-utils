/* eslint-disable jest/no-export */
/* eslint-disable jest/consistent-test-it */
import { closePool, getClient, openPool } from "./db";

describe("db tools tests", () => {
  test("should create a client", async () => {
    expect.hasAssertions();
    await openPool("postgres://postgres:postgres@localhost:5432/postgres");
    const client = await getClient();
    expect(client).toBeDefined();
    await expect(client.query("SELECT now()")).resolves.toBeDefined();
    await await closePool();
  });
});
