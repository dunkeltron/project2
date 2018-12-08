
DROP DATABASE IF EXISTS photo_db;
CREATE DATABASE photo_db;
USE photo_db;
CREATE TABLE user (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(45) NULL,
  `userName` VARCHAR(45) NULL,
  PRIMARY KEY (`userId`));