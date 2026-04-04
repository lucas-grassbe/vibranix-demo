-- Drop global unique on Technology.name so soft-deleted rows no longer block the same name.
DROP INDEX IF EXISTS "Technology_name_key";

-- Unique name only among active (non-deleted) technologies.
CREATE UNIQUE INDEX "Technology_name_active_key" ON "Technology"("name") WHERE "deletedAt" IS NULL;
