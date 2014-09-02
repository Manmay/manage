delimiter $$

CREATE TABLE `userdetail` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phonenumber` int(11) DEFAULT NULL,
  `imgurl` varchar(45) DEFAULT NULL,
  `designation` varchar(45) DEFAULT NULL,
  `urls` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phonenumber_UNIQUE` (`phonenumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8$$

