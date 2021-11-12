-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: 24 юни 2019 в 00:28
-- Версия на сървъра: 5.7.25-28-log
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mypizzag_mypizza`
--

-- --------------------------------------------------------

--
-- Структура на таблица `pizzas`
--

CREATE TABLE `pizzas` (
  `id` int(11) NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `ingredients` varchar(1024) CHARACTER SET utf8 NOT NULL,
  `price` double NOT NULL,
  `image_url` varchar(255) CHARACTER SET utf8 NOT NULL,
  `calories` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Схема на данните от таблица `pizzas`
--

INSERT INTO `pizzas` (`id`, `name`, `ingredients`, `price`, `image_url`, `calories`) VALUES
(1, 'Маргарита', 'доматен сос, моцарела, допълнително моцарела', 9, 'margarita.jpg', 254),
(2, 'Пеперони', 'доматен сос, моцарела, допълнително моцарела, пеперони, допълнително пеперони', 10, 'pepperoni.jpg', 500),
(3, 'Италианска', 'доматен сос, моцарела, песто, пармезан, пресни домати босилек', 12, 'italian.jpg', 482),
(4, 'Хавай', 'доматен сос, моцарела, шунка, ананас', 13, 'hawaii.jpg', 399),
(6, 'Формаджи', 'доматен сос, моцарела, чедър, краве сирене, пармезан', 13, 'formadji.jpg', 541);

-- --------------------------------------------------------

--
-- Структура на таблица `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `last_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 NOT NULL,
  `phone_number` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `role` set('user','admin') CHARACTER SET utf8 NOT NULL DEFAULT 'user',
  `orders` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Схема на данните от таблица `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `phone_number`, `role`, `orders`) VALUES
(1, 'user', 'user', 'user@email.com', '$2y$10$Mx2Ei1oDWJJBHL4o2X9L4.slWK/FNazwq8NBXIc9jLbeubQs2fJg2', NULL, 'user', NULL),
(2, 'Петър', 'Иванов', 'admin@email.com', '$2y$10$BHlmoE76BJ/QfpoDGZ2cbOCzOuhsmE.ws/wMoA21lxZ8WXFz4X8tO', NULL, 'admin', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pizzas`
--
ALTER TABLE `pizzas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQUE` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pizzas`
--
ALTER TABLE `pizzas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
