-- Adminer 4.8.1 MySQL 8.3.0 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `medical_specialty`;
CREATE TABLE `medical_specialty` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `medical_specialty` (`id`, `value`) VALUES
(1,	'Cardiologia'),
(2,	'Pediatria'),
(3,	'Ortopedia'),
(4,	'Ginecologia'),
(5,	'Dermatologia'),
(6,	'Oftalmologia'),
(7,	'Oncologia'),
(8,	'Urologia'),
(9,	'Psiquiatria'),
(10,	'Neurologia'),
(11,	'Endocrinologia'),
(12,	'Otorrinolaringologia'),
(13,	'Radiologia'),
(14,	'Anestesiologia'),
(15,	'Nutrologia'),
(16,	'Fisioterapia'),
(17,	'Hematologia'),
(18,	'Gastroenterologia'),
(19,	'Neurocirurgia'),
(20,	'Oncologia Pediátrica'),
(21,	'Dermatologia Estética'),
(22,	'Reumatologia'),
(23,	'Cardiologia Intervencionista'),
(24,	'Pneumologia'),
(25,	'Alergologia'),
(26,	'Oncologia Clínica'),
(27,	'Endocrinologia Pediátrica'),
(28,	'Infectologia'),
(29,	'Cardiologia Pediátrica'),
(30,	'Neurologia Pediátrica'),
(31,	'Uroginecologia'),
(32,	'Proctologia'),
(33,	'Cirurgia Bariátrica'),
(34,	'Neonatologia'),
(35,	'Medicina Nuclear'),
(36,	'Medicina do Trabalho'),
(37,	'Patologia Clínica'),
(38,	'Otorrinolaringologia Pediátrica'),
(39,	'Imunologia'),
(40,	'Genética Médica'),
(41,	'Nutrição Parenteral e Enteral'),
(42,	'Psiquiatria Forense'),
(43,	'Cirurgia Oncológica'),
(44,	'Odontologia Legal'),
(45,	'Cirurgia de Cabeça e Pescoço'),
(46,	'Medicina de Família e Comunidade');

-- 2024-02-26 06:26:00
