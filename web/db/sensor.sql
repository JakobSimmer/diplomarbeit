-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: diplomarbeit_db:3306
-- Generation Time: Feb 25, 2024 at 05:27 PM
-- Server version: 11.2.2-MariaDB-1:11.2.2+maria~ubu2204
-- PHP Version: 8.2.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sensor`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_measurement`
--

CREATE TABLE `tbl_measurement` (
  `id` int(10) UNSIGNED NOT NULL,
  `sensor_id_fk` int(10) UNSIGNED NOT NULL,
  `value` double NOT NULL,
  `measurement_type_id_fk` int(10) UNSIGNED NOT NULL,
  `timestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_measurement`
--

INSERT INTO `tbl_measurement` (`id`, `sensor_id_fk`, `value`, `measurement_type_id_fk`, `timestamp`) VALUES
(2, 2, 1, 2, '2024-02-25 16:49:34'),
(3, 1, 5.3, 1, '2024-02-25 16:49:34'),
(4, 2, 1, 2, '2024-02-25 16:49:34'),
(5, 1, 10.3, 1, '2024-02-25 16:49:34'),
(6, 2, 1, 2, '2024-02-25 16:49:34'),
(7, 1, 20.3, 1, '2024-02-25 16:49:34'),
(8, 2, 1, 2, '2024-02-25 16:49:34'),
(9, 1, 30.3, 1, '2024-02-25 16:49:34'),
(10, 2, 1, 2, '2024-02-25 16:49:34'),
(11, 1, 40.3, 1, '2024-02-25 16:49:34'),
(12, 2, 3, 2, '2024-02-25 16:49:34'),
(13, 1, 45.3, 1, '2024-02-25 16:49:34'),
(14, 2, 1, 2, '2024-02-25 16:49:34'),
(15, 1, 35.3, 1, '2024-02-25 16:49:34'),
(16, 2, 1, 2, '2024-02-25 16:49:34'),
(17, 1, 15.3, 1, '2024-02-25 16:49:34'),
(18, 2, 1, 2, '2024-02-25 16:49:34'),
(19, 1, 80.3, 1, '2024-02-25 16:49:34'),
(20, 2, 1, 2, '2024-02-25 16:49:34'),
(21, 1, 76.3, 1, '2024-02-25 16:49:34'),
(22, 2, 1, 2, '2024-02-25 16:49:34'),
(23, 1, 40.3, 1, '2024-02-25 16:49:34'),
(24, 3, 5.3, 3, '2024-02-25 16:49:34'),
(25, 3, 10.3, 3, '2024-02-25 16:49:34'),
(26, 3, 20.3, 3, '2024-02-25 16:49:34'),
(27, 3, 30.3, 3, '2024-02-25 16:49:34'),
(28, 3, 40.3, 3, '2024-02-25 16:49:34'),
(29, 3, 45.3, 3, '2024-02-25 16:49:34'),
(30, 3, 35.3, 3, '2024-02-25 16:49:34'),
(31, 3, 15.3, 3, '2024-02-25 16:49:34'),
(32, 3, 80.3, 3, '2024-02-25 16:49:34'),
(33, 3, 76.3, 3, '2024-02-25 16:49:34'),
(34, 3, 40.3, 3, '2024-02-25 16:49:34'),
(35, 4, 5.3, 4, '2024-02-25 16:49:34'),
(36, 4, 10.3, 4, '2024-02-25 16:49:34'),
(37, 4, 20.3, 4, '2024-02-25 16:49:34'),
(38, 4, 30.3, 4, '2024-02-25 16:49:34'),
(39, 4, 40.3, 4, '2024-02-25 16:49:34'),
(40, 4, 45.3, 4, '2024-02-25 16:49:34'),
(41, 4, 35.3, 4, '2024-02-25 16:49:34'),
(42, 4, 15.3, 4, '2024-02-25 16:49:34'),
(43, 4, 80.3, 4, '2024-02-25 16:49:34'),
(44, 4, 76.3, 4, '2024-02-25 16:49:34'),
(45, 4, 40.3, 4, '2024-02-25 16:49:34');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_measurement_type`
--

CREATE TABLE `tbl_measurement_type` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `unit_short` varchar(255) NOT NULL,
  `unit` varchar(255) NOT NULL,
  `cost_per_unit` double UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_measurement_type`
--

INSERT INTO `tbl_measurement_type` (`id`, `name`, `unit_short`, `unit`, `cost_per_unit`) VALUES
(1, 'strom', 'kWh', 'Kilowattstunde', 0),
(2, 'wasserdampf', 'WDE', 'Wasserdampfeinheit', 0),
(3, 'vakuum', 'VE', 'Vakuumeinheit', 0),
(4, 'druckluft', 'DLE', 'Drucklufteinheit', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sensor`
--

CREATE TABLE `tbl_sensor` (
  `id` int(10) UNSIGNED NOT NULL,
  `min_value` double NOT NULL,
  `max_value` double NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_sensor`
--

INSERT INTO `tbl_sensor` (`id`, `min_value`, `max_value`, `name`) VALUES
(1, 0, 100, 'Stromsensor'),
(2, 0, 100, 'Wasserdampfsensor'),
(3, 0, 100, 'Vakuumsensor'),
(4, 0, 100, 'Druckluftsensor');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_measurement`
--
ALTER TABLE `tbl_measurement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `measurement_type_id_fk` (`measurement_type_id_fk`),
  ADD KEY `sensor_id_fk` (`sensor_id_fk`);

--
-- Indexes for table `tbl_measurement_type`
--
ALTER TABLE `tbl_measurement_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_sensor`
--
ALTER TABLE `tbl_sensor`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_measurement`
--
ALTER TABLE `tbl_measurement`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_measurement`
--
ALTER TABLE `tbl_measurement`
  ADD CONSTRAINT `tbl_measurement_ibfk_1` FOREIGN KEY (`measurement_type_id_fk`) REFERENCES `tbl_measurement_type` (`id`),
  ADD CONSTRAINT `tbl_measurement_ibfk_2` FOREIGN KEY (`sensor_id_fk`) REFERENCES `tbl_measurement_type` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
