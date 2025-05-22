-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 23, 2025 at 01:37 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blood_donation`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `created_at`) VALUES
(1, 'admin', '$2b$10$vLCqAdU8l226m1NB4wLULu3XYYy6vvm5Ww4QcN00ZGZ97YkVQi5xi', '2025-05-22 11:34:56'),
(2, 'Aleqo', '$2b$10$5ycrAlqdfekg3uZ8gyWyfekRPuz9HdXkyTjCA/sr10BUV17Gf2zvy', '2025-05-22 13:33:57');

-- --------------------------------------------------------

--
-- Table structure for table `blood_requests`
--

CREATE TABLE `blood_requests` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `bloodgroup` varchar(5) DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `requested_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blood_requests`
--

INSERT INTO `blood_requests` (`id`, `fullname`, `mobile`, `bloodgroup`, `reason`, `requested_at`) VALUES
(1, 'MORGAN NGAASI', '0704467699', 'A+', 'wr', '2025-05-12 12:03:55'),
(2, 'MORGAN NGAASI', '0704467699', 'A+', 'wr', '2025-05-12 12:08:04'),
(3, 'MORGAN NGAASI', '0704467699', 'A+', 'wr', '2025-05-12 12:08:20'),
(4, 'MORGAN NGAASI', '0704467699', 'A+', 'wr', '2025-05-12 12:09:54'),
(5, 'MORGAN NGAASI', '0704467699', 'B+', 'spread love', '2025-05-14 12:06:31'),
(6, 'MORGAN NGAASI', '0704467699', 'B+', 'fdsd', '2025-05-14 12:26:26'),
(7, 'james kamau', '9798875875', 'O+', 'sickness', '2025-05-22 13:44:29'),
(8, 'james kamau', '9798875875', 'O+', 'sfew', '2025-05-22 13:55:11'),
(9, 'wd', '0700021601', 'A+', 'asa', '2025-05-22 17:00:53');

-- --------------------------------------------------------

--
-- Table structure for table `donors`
--

CREATE TABLE `donors` (
  `id` int(11) NOT NULL,
  `fullName` varchar(100) DEFAULT NULL,
  `bloodGroup` varchar(5) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `Age` int(11) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donors`
--

INSERT INTO `donors` (`id`, `fullName`, `bloodGroup`, `phone`, `email`, `Age`, `city`, `gender`, `status`) VALUES
(1, 'Alexander kamande', 'A+', '0773052507', 'aleqekamaa254@gmail.com', 22, 'Ruiru', 'Male', 'pending'),
(2, 'dennis', 'B+', '0700021601', 'moganhakim@gmail.com', 20, 'Ruiru', 'Male', 'pending'),
(3, 'susan', 'AB+', '07576265484', 'sesan@mail.com', 21, 'kenya', 'Male', 'denied'),
(4, 'susan', 'B+', '07576265484', 'sesan@mail.com', 21, 'kenya', 'Female', 'denied'),
(5, 'susan', 'B+', '07576265484', 'sesan@mail.com', 21, 'kenya', 'Female', 'denied'),
(6, 'susan', 'B+', '07576265484', 'sesan@mail.com', 21, 'kenya', 'Female', 'denied'),
(7, 'susan', 'AB-', '07576265484', 'sesan@mail.com', 21, 'kenya', 'Female', 'pending'),
(8, 'jamesbond', 'A-', '0704656336', 'odalodorsila@gmail.com', 20, 'kenya', 'Male', 'pending'),
(9, 'context ', 'O-', '08629498216', 'context@gmail.com', 24, 'Ruiru', 'Female', NULL),
(10, 'context ', 'A+', '08629498216', 'context@gmail.com', 24, 'Ruiru', 'Male', 'pending'),
(11, 'Ali', 'O+', '07227794790', 'ali@gmail.com', 26, 'nairobi', 'Male', 'pending'),
(12, 'Alexander kamande', 'B+', '0773052507', 'aleqekamaa254@gmail.com', 16, 'Ruiru', 'Male', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'Aleqo', 'alexanderkamande@zetech.ac.ke', '$2b$10$tVt/RxAdqmwMYN7ZdQlpeeziz2Hhss6tANcuBqJmv5iHKha1zQDie', '2025-05-14 03:22:01'),
(2, 'Aleqe', 'odalodorsila@gmail.com', '$2b$10$UZNHKWDJckohFtVzztyyYeK21n401vbh6FEKc63EaJ7Tbv5isnFr.', '2025-05-14 08:48:41'),
(3, 'context', 'context@gmail.com', '$2b$10$hKM4SWh70frYPxuSt.JWxuYyFb9GO4nFX0.5kG.IjqGTFTjGyiUpS', '2025-05-19 11:57:38'),
(4, 'james', 'james@gmail.com', '$2b$10$Sy9EnGrDdKW0nCAWuL1N8eTWorbw83bJHr/s9S0HWLIFQsb4wGvje', '2025-05-22 13:59:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `blood_requests`
--
ALTER TABLE `blood_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `donors`
--
ALTER TABLE `donors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `blood_requests`
--
ALTER TABLE `blood_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `donors`
--
ALTER TABLE `donors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
