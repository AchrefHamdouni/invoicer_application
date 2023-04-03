-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema invoicer
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema invoicer
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `invoicer` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `invoicer` ;

-- -----------------------------------------------------
-- Table `invoicer`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `invoicer`.`category` (
  `id_category` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_category`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `invoicer`.`client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `invoicer`.`client` (
  `id_client` INT NOT NULL AUTO_INCREMENT,
  `name_client` VARCHAR(45) NOT NULL,
  `mf_client` VARCHAR(45) NOT NULL,
  `adress_client` VARCHAR(255) NULL DEFAULT NULL,
  `mobile_client` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_client`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `invoicer`.`invoice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `invoicer`.`invoice` (
  `id_invoice` INT NOT NULL AUTO_INCREMENT,
  `ref_invoice` INT NOT NULL,
  `date_invoice` DATE NOT NULL,
  `id_client` INT NOT NULL,
  `amount_invoice` DECIMAL(10,3) NOT NULL,
  PRIMARY KEY (`id_invoice`),
  INDEX `id_client_idx` (`id_client` ASC) VISIBLE,
  CONSTRAINT `id_client`
    FOREIGN KEY (`id_client`)
    REFERENCES `invoicer`.`client` (`id_client`))
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `invoicer`.`detailinvoice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `invoicer`.`detailinvoice` (
  `id_detail_invoice` INT NOT NULL AUTO_INCREMENT,
  `id_invoice` INT NOT NULL,
  `product_name` VARCHAR(255) NOT NULL,
  `product_unit` VARCHAR(45) NOT NULL,
  `product_qty` INT NOT NULL,
  `product_price` DECIMAL(10,3) NOT NULL,
  `product_amount` DECIMAL(10,3) NOT NULL,
  `product_tva` INT NOT NULL,
  PRIMARY KEY (`id_detail_invoice`),
  INDEX `id_invoice_idx` (`id_invoice` ASC) VISIBLE,
  CONSTRAINT `id_invoice`
    FOREIGN KEY (`id_invoice`)
    REFERENCES `invoicer`.`invoice` (`id_invoice`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `invoicer`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `invoicer`.`product` (
  `id_product` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(45) NOT NULL,
  `product_desc` VARCHAR(255) NOT NULL,
  `product_price` DECIMAL(10,3) NOT NULL,
  `product_unit` VARCHAR(45) NOT NULL,
  `id_category` INT NOT NULL,
  PRIMARY KEY (`id_product`),
  INDEX `id_category_idx` (`id_category` ASC) VISIBLE,
  CONSTRAINT `id_category`
    FOREIGN KEY (`id_category`)
    REFERENCES `invoicer`.`category` (`id_category`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `invoicer`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `invoicer`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`iduser`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
