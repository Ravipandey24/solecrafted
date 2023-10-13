ALTER TABLE `shopping_cart_items` MODIFY COLUMN `product_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `shopping_cart_items` MODIFY COLUMN `cart_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `shopping_carts` MODIFY COLUMN `profile_id` int NOT NULL;