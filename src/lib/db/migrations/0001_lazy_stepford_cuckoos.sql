ALTER TABLE `products` MODIFY COLUMN `category` varchar(191);--> statement-breakpoint
ALTER TABLE `products` ADD `gender` enum('men','women','kids') DEFAULT 'men' NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `brand` varchar(191);--> statement-breakpoint
ALTER TABLE `products` ADD `slug` varchar(191);--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `subcategory`;