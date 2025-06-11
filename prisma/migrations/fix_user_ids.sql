-- First, backup the existing data
CREATE TABLE IF NOT EXISTS "User_backup" AS SELECT * FROM "User";

-- Update any numeric IDs to string format
UPDATE "User"
SET id = 'user_' || id::text
WHERE id ~ '^[0-9]+$';

-- Update related tables
UPDATE "financials"
SET "userId" = 'user_' || "userId"::text
WHERE "userId" ~ '^[0-9]+$';

UPDATE "debt"
SET "userId" = 'user_' || "userId"::text
WHERE "userId" ~ '^[0-9]+$';

UPDATE "emergencyFund"
SET "userId" = 'user_' || "userId"::text
WHERE "userId" ~ '^[0-9]+$';

UPDATE "LifeGoal"
SET "userId" = 'user_' || "userId"::text
WHERE "userId" ~ '^[0-9]+$'; 