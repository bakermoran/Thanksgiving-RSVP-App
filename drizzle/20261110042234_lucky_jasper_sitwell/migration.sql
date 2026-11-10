ALTER TABLE `events` RENAME COLUMN `time` TO `startTime`;--> statement-breakpoint
ALTER TABLE `events` ADD `endTime` text DEFAULT CURRENT_TIMESTAMP NOT NULL;