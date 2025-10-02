import { PoolConnection } from "mysql2/promise";
import { db } from "../db";

export function withTransaction<T>(
  callback: (conn: PoolConnection) => Promise<T>
): Promise<T> {
  return new Promise(async (resolve, reject) => {
    let conn;
    try {
      conn = await db.getConnection();
      await conn.beginTransaction();
      const result = await callback(conn);
      await conn.commit();
      resolve(result);
    } catch (error) {
      await conn?.rollback();
      reject(error);
    } finally {
      conn?.release();
    }
  });
}
