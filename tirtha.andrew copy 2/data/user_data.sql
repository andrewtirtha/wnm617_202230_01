CREATE TABLE IF NOT EXISTS `users` (
`id` INT NULL,
`name` VARCHAR(MAX) NULL,
`username` VARCHAR(MAX) NULL,
`email` VARCHAR(MAX) NULL,
`password` VARCHAR(MAX) NULL,
`img` VARCHAR(MAX) NULL,
`date_create` VARCHAR(MAX) NULL,
`user_handicap` INT NULL
);

INSERT INTO golflog_users VALUES
(1,'Greene Malone','user1','user1@gmail.com',md5('pass'),'https:/via.placeholder.com/400/813/fff/?text=user1','2022-02-13 04:04:53 ',33),
(2,'Kidd Matthews','user2','user2@gmail.com',md5('pass'),'https:/via.placeholder.com/400/928/fff/?text=user2','2022-04-09 10:49:01 ',0),
(3,'Imelda Best','user3','user3@gmail.com',md5('pass'),'https:/via.placeholder.com/400/902/fff/?text=user3','2022-01-25 08:42:27 ',19),
(4,'Whitney Gaines','user4','user4@gmail.com',md5('pass'),'https:/via.placeholder.com/400/715/fff/?text=user4','2022-02-14 09:48:12 ',28),
(5,'Galloway Cortez','user5','user5@gmail.com',md5('pass'),'https:/via.placeholder.com/400/785/fff/?text=user5','2022-03-12 09:29:20 ',27),
(6,'Madeline Romero','user6','user6@gmail.com',md5('pass'),'https:/via.placeholder.com/400/901/fff/?text=user6','2022-04-18 07:23:19 ',35),
(7,'Sampson Fry','user7','user7@gmail.com',md5('pass'),'https:/via.placeholder.com/400/776/fff/?text=user7','2022-01-15 02:14:55 ',6),
(8,'Brenda Rowland','user8','user8@gmail.com',md5('pass'),'https:/via.placeholder.com/400/879/fff/?text=user8','2022-04-15 02:23:00 ',26),
(9,'Bauer Russell','user9','user9@gmail.com',md5('pass'),'https:/via.placeholder.com/400/963/fff/?text=user9','2022-03-30 11:18:49 ',21),
(10,'Reyna Briggs','user10','user10@gmail.com',md5('pass'),'https:/via.placeholder.com/400/974/fff/?text=user10','2022-02-06 03:10:44 ',0);