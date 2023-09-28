CREATE TABLE `account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255),
	CONSTRAINT `account_provider_providerAccountId` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT (now()),
	`image` varchar(255),
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationToken_identifier_token` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`image_url` varchar(256) NOT NULL,
	`category` enum('men','women','kids') NOT NULL DEFAULT 'men',
	`subcategory` varchar(191),
	`price` decimal(10,2) NOT NULL DEFAULT '0',
	`inventory` int NOT NULL DEFAULT 0,
	`rating` int NOT NULL DEFAULT 0,
	`tags` json DEFAULT ('null'),
	`storeId` int NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `profile` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`password` varchar(256) NOT NULL,
	`is_email_verified` boolean DEFAULT false,
	`image` varchar(255) DEFAULT '',
	`phone_number` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `profile_id` PRIMARY KEY(`id`),
	CONSTRAINT `profile_email_unique` UNIQUE(`email`)
);
