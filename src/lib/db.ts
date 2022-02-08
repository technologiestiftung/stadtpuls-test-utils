import { isCI } from "ci-info";
import { Pool, PoolClient, PoolConfig } from "pg";

let pool: Pool | undefined = undefined;
const clients: PoolClient[] = [];
export async function openPool(
  connectionString: string,
  poolConfigOverrides?: PoolConfig
): Promise<void> {
  if (pool === undefined) {
    pool = new Pool({
      connectionString,
      ...poolConfigOverrides,
    });
  }
}

export async function closePool(): Promise<void> {
  try {
    clients.forEach((client) => {
      client.release();
    });
    if (!pool) return;
    await pool.end();
  } catch (error) {
    console.error("DB error while closing pool", error);
    throw error;
  }
}

export async function getClient(): Promise<PoolClient> {
  if (pool === undefined) {
    throw new Error("Pool not initialized");
  }
  const client = await pool.connect();
  clients.push(client);
  return client;
}
export async function execQuery(
  client: PoolClient,
  query: string,
  values: string[]
): Promise<unknown> {
  try {
    if (!client) throw new Error("DB client not connected");
    const res = await client.query(query, values);
    client.release();
    return res;
  } catch (error) {
    if (!isCI) {
      console.error(
        `DB error while executing query: ${query} with values: ${values}`,
        error
      );
    }
    client.release();
    throw error;
  }
}
