-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: db_insta
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `image_name` varchar(255) NOT NULL,
  `image_src` varchar(255) NOT NULL,
  `user_id` int DEFAULT NULL,
  `image_desc` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `images_FK` (`user_id`),
  CONSTRAINT `images_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'Dr-Stone','https://www.youtube.com/watch?v=ji0UsBuhguA&list=PLxSscENEp7JiMf-7_IKknXJngJrCesKj2',2,'Một ngày nọ, tất cả nhân loại bị hóa đá bởi một tia sáng chói mắt. Sau vài thiên niên kỷ, thiên tài khoa học Senku thức tỉnh. Anh quyết tâm xây dựng lại nền văn minh bằng sức mạnh của khoa học trong Thời đại Hóa đá này. Từ Stone World đến thế giới hiện đại, Senku và người bạn Taiju đang sử dụng các kỹ năng của mình để bắt kịp lịch sử khoa học 2 triệu năm!'),(2,'Madoka Magica','https://madokamagicausa.com/',1,'upcoming movie');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images_bookmark`
--

DROP TABLE IF EXISTS `images_bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images_bookmark` (
  `bookmark_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `image_id` int NOT NULL,
  `date_created` datetime DEFAULT NULL,
  PRIMARY KEY (`bookmark_id`),
  KEY `images_bookmark_FK` (`image_id`),
  KEY `images_bookmark_FK_1` (`user_id`),
  CONSTRAINT `images_bookmark_FK` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `images_bookmark_FK_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images_bookmark`
--

LOCK TABLES `images_bookmark` WRITE;
/*!40000 ALTER TABLE `images_bookmark` DISABLE KEYS */;
INSERT INTO `images_bookmark` VALUES (1,2,1,'2023-11-01 04:43:17'),(2,2,1,'2023-11-01 04:43:17'),(5,1,2,'2023-11-01 07:16:34'),(6,3,1,'2023-11-07 20:31:01');
/*!40000 ALTER TABLE `images_bookmark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images_comment`
--

DROP TABLE IF EXISTS `images_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images_comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `comment` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `image_id` int DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `images_comment_FK` (`image_id`),
  KEY `images_comment_FK_1` (`user_id`),
  CONSTRAINT `images_comment_FK` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`),
  CONSTRAINT `images_comment_FK_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images_comment`
--

LOCK TABLES `images_comment` WRITE;
/*!40000 ALTER TABLE `images_comment` DISABLE KEYS */;
INSERT INTO `images_comment` VALUES (1,NULL,NULL,NULL,NULL,NULL),(2,NULL,NULL,NULL,NULL,NULL),(3,'This is a good anime',2,1,'2023-11-01 04:12:07','2023-11-01 04:12:07'),(4,'Hello world this is Thomas',3,1,'2023-11-07 20:33:41','2023-11-07 20:33:41');
/*!40000 ALTER TABLE `images_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `insta_app_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Thomas','duc@gmail.com','$2b$10$NUy4kw1cuzWMa4/J5In7z.BBfRwcl30WUY5wKPNbWXcOfg3HPlrEq',''),(2,'OHAYO SEKKAI GOOD MORNING WORLD! ','test@gmail.com','$2b$10$B4aZ2GXOpY8p/JZ51VQMk.pVdmZmSvcRyo0QivMppD1a4lvnRAgIy',''),(3,'thomas','thomas2023@gmail.com','$2b$10$tXxnEFYMCrxa5/TRl9qV1uVaTaWEAdIAcpXBcwuAEYHAkOcuJCmcy','');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'db_insta'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-08  3:46:44
