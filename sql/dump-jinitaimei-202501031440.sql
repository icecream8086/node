-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 20.10.244.191    Database: jinitaimei
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Appointments`
--

DROP TABLE IF EXISTS `Appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Appointments` (
  `AppointmentID` int NOT NULL AUTO_INCREMENT,
  `UserID` bigint DEFAULT NULL,
  `CounselorID` int DEFAULT NULL,
  `AppointmentDate` datetime DEFAULT NULL,
  `AppointmentTime` datetime DEFAULT NULL,
  `AppointmentStatus` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`AppointmentID`),
  KEY `UserID` (`UserID`),
  KEY `CounselorID` (`CounselorID`),
  CONSTRAINT `Appointments_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`),
  CONSTRAINT `Appointments_ibfk_2` FOREIGN KEY (`CounselorID`) REFERENCES `Counselors` (`CounselorID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Appointments`
--

LOCK TABLES `Appointments` WRITE;
/*!40000 ALTER TABLE `Appointments` DISABLE KEYS */;
INSERT INTO `Appointments` VALUES (5,1,1,'2024-01-26 00:00:00','2024-12-30 15:30:00',NULL),(6,1,1,'2024-01-23 00:00:00','2024-12-30 15:30:00','否'),(7,1,1,'2024-01-26 15:30:00','2024-01-26 15:30:00',NULL),(9,1,1,'2024-01-26 00:00:00','2024-01-26 00:10:00','否'),(10,1,1,'2024-01-26 00:00:00','2024-01-26 00:10:00','否'),(11,1,1,'2024-01-26 00:00:00','2024-01-26 00:10:00','否'),(12,1,1,'2024-01-26 00:00:00','2024-01-26 00:10:00','否'),(13,1,1,'2024-01-26 00:00:00','2024-01-26 00:10:00','否'),(14,1,1,'2024-01-26 00:00:00','2024-01-26 00:10:00','否'),(15,1,1,'2025-01-14 08:57:33','2025-01-14 08:57:33','否'),(16,1,1,'2025-01-15 06:15:52','2025-01-15 06:15:52','否'),(17,1,1,'2025-01-14 06:21:27','2025-01-14 06:21:27','否'),(18,1,1,'2025-01-08 06:24:44','2025-01-08 06:24:44','否'),(19,1,1,'2025-01-10 06:32:13','2025-01-10 06:32:13','111111111111');
/*!40000 ALTER TABLE `Appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CounselingRecords`
--

DROP TABLE IF EXISTS `CounselingRecords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CounselingRecords` (
  `RecordID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `AppointmentID` int DEFAULT NULL,
  `StartTime` datetime DEFAULT NULL,
  `EndTime` datetime DEFAULT NULL,
  `Content` text,
  `CounselorFeedback` text,
  PRIMARY KEY (`RecordID`),
  UNIQUE KEY `CounselingRecords_UNIQUE` (`AppointmentID`),
  KEY `AppointmentID` (`AppointmentID`),
  CONSTRAINT `CounselingRecords_ibfk_1` FOREIGN KEY (`AppointmentID`) REFERENCES `Appointments` (`AppointmentID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CounselingRecords`
--

LOCK TABLES `CounselingRecords` WRITE;
/*!40000 ALTER TABLE `CounselingRecords` DISABLE KEYS */;
INSERT INTO `CounselingRecords` VALUES (3,6,'2024-01-20 15:30:00','2024-01-10 15:30:00','123','w');
/*!40000 ALTER TABLE `CounselingRecords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CounselorLogins`
--

DROP TABLE IF EXISTS `CounselorLogins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CounselorLogins` (
  `LoginID` bigint NOT NULL AUTO_INCREMENT,
  `CounselorID` int DEFAULT NULL,
  `Username` varchar(50) DEFAULT NULL,
  `Password` varchar(32) DEFAULT NULL,
  `LastLoginDateTime` datetime DEFAULT NULL,
  `IsAdmin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`LoginID`),
  KEY `CounselorID` (`CounselorID`),
  CONSTRAINT `CounselorLogins_ibfk_1` FOREIGN KEY (`CounselorID`) REFERENCES `Counselors` (`CounselorID`),
  CONSTRAINT `fk_CounselorID` FOREIGN KEY (`CounselorID`) REFERENCES `Counselors` (`CounselorID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CounselorLogins`
--

LOCK TABLES `CounselorLogins` WRITE;
/*!40000 ALTER TABLE `CounselorLogins` DISABLE KEYS */;
INSERT INTO `CounselorLogins` VALUES (2,2,'abss','08A4415E9D594FF960030B921D42B91E',NULL,0);
/*!40000 ALTER TABLE `CounselorLogins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Counselors`
--

DROP TABLE IF EXISTS `Counselors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Counselors` (
  `CounselorID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `Birthdate` date DEFAULT NULL,
  `ContactInfo` varchar(100) DEFAULT NULL,
  `CertificationNumber` varchar(50) DEFAULT NULL,
  `SpecialtyArea` varchar(100) DEFAULT NULL,
  `Department` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`CounselorID`),
  UNIQUE KEY `CounselorID` (`CounselorID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Counselors`
--

LOCK TABLES `Counselors` WRITE;
/*!40000 ALTER TABLE `Counselors` DISABLE KEYS */;
INSERT INTO `Counselors` VALUES (1,'abs',NULL,'2024-12-30','',NULL,'',''),(2,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Counselors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PsychologicalRecords`
--

DROP TABLE IF EXISTS `PsychologicalRecords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PsychologicalRecords` (
  `RecordID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `UserID` bigint DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `PsychologicalStatus` text,
  PRIMARY KEY (`RecordID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `PsychologicalRecords_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PsychologicalRecords`
--

LOCK TABLES `PsychologicalRecords` WRITE;
/*!40000 ALTER TABLE `PsychologicalRecords` DISABLE KEYS */;
INSERT INTO `PsychologicalRecords` VALUES (4,1,NULL,'2025-01-02 12:46:20','牢大也没有能强大到肘开直升机舱门'),(5,1,NULL,'2025-01-02 12:46:46','饮水机是出水机，人才是饮水机'),(6,1,'2024-12-30 16:51:50',NULL,'12345'),(7,1,'2024-12-30 16:51:59',NULL,'12345'),(8,1,'2024-12-30 16:52:16',NULL,'12345'),(9,1,'2024-12-30 16:53:19',NULL,'12345'),(10,1,'2024-12-30 16:53:37',NULL,'12345'),(11,1,'2024-12-31 13:11:05',NULL,'12345'),(12,1,'2024-12-31 21:22:04',NULL,'12345'),(13,1,'2024-12-31 21:22:57',NULL,'12345'),(14,1,'2024-12-31 21:24:02',NULL,'12345'),(15,1,'2024-12-31 21:25:50',NULL,'12345'),(16,1,'2025-01-01 08:11:29',NULL,'12345'),(17,1,'2025-01-01 08:14:58',NULL,NULL),(18,1,'2025-01-01 08:17:24',NULL,'123'),(19,1,'2025-01-01 08:17:44',NULL,'哇达瓦达瓦达瓦'),(20,1,'2025-01-01 08:24:54',NULL,'啊伟大伟大伟大'),(21,1,'2025-01-01 08:34:32',NULL,'1');
/*!40000 ALTER TABLE `PsychologicalRecords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `UserID` bigint NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `Birthdate` date DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Password` varchar(32) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Users_UNIQUE` (`Name`),
  UNIQUE KEY `Users_UNIQUE_1` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'qwerty','1',NULL,NULL,'D8578EDF8458CE06FBC5BB76A58C5CA4','adcc@mail.com'),(2,'abs','',NULL,'','08A4415E9D594FF960030B921D42B91E',NULL);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'jinitaimei'
--

--
-- Dumping routines for database 'jinitaimei'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-03 14:40:50
