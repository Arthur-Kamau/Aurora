### Auth table
```
CREATE TABLE auth (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(255),
    `email` varchar(255),
    `password` varchar(255),
    `reset_key` varchar(255),
    `updated_at` DATETIME ON UPDATE CURRENT_TIMESTAMP,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
);```