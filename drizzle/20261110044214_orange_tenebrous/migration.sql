-- Hand-edited: SQLite can't ADD a NOT NULL column without a default, and a table
-- rebuild trips the obligations.category_id FK inside drizzle's migration
-- transaction. So add it with a placeholder default and backfill from id
-- (already unique) before adding the unique index.
ALTER TABLE `obligation_categories` ADD `sort_order` integer NOT NULL DEFAULT 0;--> statement-breakpoint
UPDATE `obligation_categories` SET `sort_order` = `id`;--> statement-breakpoint
CREATE UNIQUE INDEX `idx_obligations_category_sort_order` ON `obligation_categories` (`sort_order`);
