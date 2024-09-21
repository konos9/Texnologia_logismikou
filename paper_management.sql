-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 20, 2024 at 04:44 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `paper_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `conference`
--

CREATE TABLE `conference` (
  `id` int(11) NOT NULL,
  `creation_date` date NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(50) NOT NULL,
  `pc_chair` varchar(11) NOT NULL,
  `paper_id` varchar(11) NOT NULL,
  `pc_member` varchar(11) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `conference`
--

INSERT INTO `conference` (`id`, `creation_date`, `name`, `description`, `pc_chair`, `paper_id`, `pc_member`, `status`) VALUES
(2, '2024-08-04', 'Conference2', '2', '8', '3', '6', 'SUBMISSION'),
(3, '2024-08-04', 'Conference21', '1', '7-4-8', '5', '2-2-6-6', 'SUBMISSION'),
(4, '2024-08-11', 'akvb', 'bvhe', '2-7', '2', '1', 'ASSIGNMENT'),
(6, '2024-08-11', '1234', 'wfefw', '3-5', '5', '4-5', 'SUBMISSION'),
(7, '2024-08-18', 'newtry', 'lvoasva asfbva vb iabvfabvfb hafj ', '8', '3', '5', 'SUBMISSION'),
(8, '2024-08-18', 'newtry', 'lvoasva asfbva vb iabvfabvfb hafj ', '8', '6', '5', 'SUBMISSION'),
(10, '2024-08-23', 'new conf 15', 'new conf15', '4-7', '6-4-5', '5-6', 'DECISION'),
(11, '2024-09-01', 'lalalnw', 'acavasrkvbasvhb', '7', '3', '5', 'REVIEW'),
(12, '2024-09-10', 'lalalnew2', 'afrfasfsr', '7', '3', '5', 'REVIEW'),
(13, '2024-09-02', 'newconffordec', 'ferfj wrnvieh', '7', '6', '5', 'DECISION'),
(14, '2024-09-02', 'newconffordec2', '2ferfj wrnvieh2', '7', '6', '5', 'REVIEW');

-- --------------------------------------------------------

--
-- Table structure for table `papers`
--

CREATE TABLE `papers` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `abstract` text DEFAULT NULL,
  `publication_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `papers`
--

INSERT INTO `papers` (`id`, `title`, `author`, `abstract`, `publication_date`, `created_at`) VALUES
(1, 'Sample Paper', 'John Doe', 'This is a sample abstract.', '2024-07-25', '2024-07-26 05:58:38'),
(2, 'newPaper', 'Manouil', 'This is a new add ', '2024-07-26', '2024-07-26 06:14:42'),
(3, 'new2', 'Manouil', 'erlgjhergnrjgknsrejkg', '2024-07-26', '2024-07-26 08:51:37'),
(5, '2342', 'admin', 'NF WM', '2024-07-01', '2024-07-27 14:49:19'),
(6, 'newPaper', 'admin', 'skhgsdgh uhfghsd hguidfh gjhsdg ds iuhg ', '1999-02-02', '2024-07-30 07:49:37'),
(7, 'rrg', 'arvv', 'avrv', '2024-08-11', '2024-08-11 09:47:33');

-- --------------------------------------------------------

--
-- Table structure for table `paperStatus`
--

CREATE TABLE `paperStatus` (
  `id` int(11) NOT NULL,
  `conference_id` int(11) NOT NULL,
  `pc_member_id` int(11) NOT NULL,
  `paper_id` int(11) NOT NULL,
  `setStatus` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `paperStatus`
--

INSERT INTO `paperStatus` (`id`, `conference_id`, `pc_member_id`, `paper_id`, `setStatus`) VALUES
(1, 13, 5, 6, ''),
(2, 14, 5, 6, ''),
(3, 13, 5, 6, 'Accepted');

-- --------------------------------------------------------

--
-- Table structure for table `reviewPaper`
--

CREATE TABLE `reviewPaper` (
  `id` int(11) NOT NULL,
  `conference_id` int(11) NOT NULL,
  `pc_member_id` int(11) NOT NULL,
  `paper_id` int(11) NOT NULL,
  `review_score` int(11) NOT NULL,
  `review_justification` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviewPaper`
--

INSERT INTO `reviewPaper` (`id`, `conference_id`, `pc_member_id`, `paper_id`, `review_score`, `review_justification`) VALUES
(1, 12, 5, 3, 10, 'ksjvsa hsafvas '),
(2, 11, 5, 3, 11, 'chchgchg'),
(3, 11, 5, 3, 11, '13chchgchg');

-- --------------------------------------------------------

--
-- Table structure for table `rewierAssignment`
--

CREATE TABLE `rewierAssignment` (
  `id` int(11) NOT NULL,
  `conference_id` int(11) NOT NULL,
  `pc_member_id` int(11) NOT NULL,
  `paper_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rewierAssignment`
--

INSERT INTO `rewierAssignment` (`id`, `conference_id`, `pc_member_id`, `paper_id`) VALUES
(1, 3, 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`) VALUES
(1, 'VISITOR'),
(2, 'AUTHOR'),
(3, 'PC-CHAIR'),
(4, 'PC-MEMBER');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role_id`) VALUES
(1, 'admin', '1', 2),
(2, '22', '22', 1),
(3, '33', '33', 1),
(4, 'Manouil', '1', 3),
(5, 'pc_member1', '1', 4),
(6, 'pc_member2', '1', 4),
(7, 'pc_chair1', '1', 3),
(8, 'pc_chair2', '1', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `conference`
--
ALTER TABLE `conference`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `papers`
--
ALTER TABLE `papers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `paperStatus`
--
ALTER TABLE `paperStatus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviewPaper`
--
ALTER TABLE `reviewPaper`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rewierAssignment`
--
ALTER TABLE `rewierAssignment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `conference`
--
ALTER TABLE `conference`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `papers`
--
ALTER TABLE `papers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `paperStatus`
--
ALTER TABLE `paperStatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reviewPaper`
--
ALTER TABLE `reviewPaper`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rewierAssignment`
--
ALTER TABLE `rewierAssignment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
