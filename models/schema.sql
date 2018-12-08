
DROP DATABASE IF EXISTS photo_db;
CREATE DATABASE photo_db;
USE photo_db;
CREATE TABLE user (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(45) NULL,
  `userName` VARCHAR(45) NULL,
  PRIMARY KEY (`userId`));


  
CREATE TABLE `photo_db`.`user` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(45) NULL,
  `userName` VARCHAR(45) NULL,
  PRIMARY KEY (`userId`));

  
CREATE TABLE `photo_db`.`event` (
  `eventId` INT NOT NULL AUTO_INCREMENT,
  `longitute` DECIMAL(11,8) NOT NULL,
  `latitue` DECIMAL(10,8) NOT NULL,
  `eventName` VARCHAR(45) NULL,
  `eventNameLocation` VARCHAR(45) NULL,
  PRIMARY KEY (`eventId`));

  
  CREATE TABLE `photo_db`.`photo` (
  `photoId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `eventId` INT NOT NULL,
  `photoName` VARCHAR(45) NULL,
  `score` INT(11) ZEROFILL NULL,
  `photoLink` VARCHAR(245) NULL,
  PRIMARY KEY (`photoId`),
  INDEX `userPhoto_idx` (`userId` ASC) VISIBLE,
  INDEX `eventPhoto_idx` (`eventId` ASC) VISIBLE,
  CONSTRAINT `userPhoto`
    FOREIGN KEY (`userId`)
    REFERENCES `photo_db`.`user` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `eventPhoto`
    FOREIGN KEY (`eventId`)
    REFERENCES `photo_db`.`event` (`eventId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

	
CREATE TABLE `photo_db`.`photoarchive` (
  `photoId` INT NOT NULL,
  `userId` INT NULL,
  `eventId` INT NULL,
  `photoName` VARCHAR(45) NULL,
  `score` INT(11) NULL,
  `photoLink` VARCHAR(255) NULL,
  PRIMARY KEY (`photoId`),
  INDEX `userPhoto_idx` (`userId` ASC) VISIBLE,
  INDEX `eventPhoto_idx` (`eventId` ASC) VISIBLE,
  CONSTRAINT `userPhotoArchive`
    FOREIGN KEY (`userId`)
    REFERENCES `photo_db`.`user` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `eventPhotoArchive`
    FOREIGN KEY (`eventId`)
    REFERENCES `photo_db`.`event` (`eventId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

	
	CREATE TABLE `photo_db`.`userevent` (
  `userEventId` INT NOT NULL,
  `userId` INT NULL,
  `eventId` INT NULL,
  PRIMARY KEY (`userEventId`));
