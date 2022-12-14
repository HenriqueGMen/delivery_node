/*
  Warnings:

  - Added the required column `item_name` to the `deliveries` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_deliveries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_client" TEXT NOT NULL,
    "id_deliveryman" TEXT,
    "item_name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "deliveries_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "deliveries_id_deliveryman_fkey" FOREIGN KEY ("id_deliveryman") REFERENCES "deliveryman" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_deliveries" ("created_at", "end_at", "id", "id_client", "id_deliveryman") SELECT "created_at", "end_at", "id", "id_client", "id_deliveryman" FROM "deliveries";
DROP TABLE "deliveries";
ALTER TABLE "new_deliveries" RENAME TO "deliveries";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
