SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE `items` (
  `items_id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(21836) DEFAULT NULL,
  `status` int(2) DEFAULT NULL,
  `list_id` int(11) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `mark` int(2) DEFAULT '0',
  PRIMARY KEY (`items_id`)
) ENGINE=InnoDB AUTO_INCREMENT=785 DEFAULT CHARSET=utf8;

CREATE TABLE `lists` (
  `list_id` int(11) NOT NULL AUTO_INCREMENT,
  `list_name` varchar(100) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`list_id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `user_pass` char(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;

