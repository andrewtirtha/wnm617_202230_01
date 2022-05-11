CREATE TABLE IF NOT EXISTS `doglog_users` (
`id` INT NULL,
`name` VARCHAR(MAX) NULL,
`username` VARCHAR(MAX) NULL,
`email` VARCHAR(MAX) NULL,
`favorite` VARCHAR(MAX) NULL,
`password` VARCHAR(MAX) NULL,
`img` VARCHAR(MAX) NULL,
`date_create` VARCHAR(MAX) NULL
);

INSERT INTO doglog_users VALUES
(1,'Norris Garner','user1','user1@gmail.com','Husky',md5('pass'),'https://via.placeholder.com/400/865/fff/?text=user1','2022-03-23 04:50:23'),
(2,'Desiree Strickland','user2','user2@gmail.com','Poodle',md5('pass'),'https://via.placeholder.com/400/737/fff/?text=user2','2022-02-20 09:06:57'),
(3,'Wendi Bennett','user3','user3@gmail.com','Retriever',md5('pass'),'https://via.placeholder.com/400/908/fff/?text=user3','2022-01-19 05:12:54'),
(4,'Greta Charles','user4','user4@gmail.com','Retriever',md5('pass'),'https://via.placeholder.com/400/767/fff/?text=user4','2022-03-07 06:51:41'),
(5,'Little Harmon','user5','user5@gmail.com','Poodle',md5('pass'),'https://via.placeholder.com/400/906/fff/?text=user5','2022-01-11 08:57:09'),
(6,'Annmarie Maynard','user6','user6@gmail.com','Retriever',md5('pass'),'https://via.placeholder.com/400/944/fff/?text=user6','2022-05-03 05:26:35'),
(7,'Phillips Webster','user7','user7@gmail.com','Bulldog',md5('pass'),'https://via.placeholder.com/400/925/fff/?text=user7','2022-05-07 03:10:24'),
(8,'Wilson Richardson','user8','user8@gmail.com','Bulldog',md5('pass'),'https://via.placeholder.com/400/993/fff/?text=user8','2022-01-29 03:10:21'),
(9,'Allen Bolton','user9','user9@gmail.com','Retriever',md5('pass'),'https://via.placeholder.com/400/995/fff/?text=user9','2022-01-27 01:29:24'),
(10,'Rivera Carey','user10','user10@gmail.com','Pug',md5('pass'),'https://via.placeholder.com/400/713/fff/?text=user10','2022-04-11 04:22:45');