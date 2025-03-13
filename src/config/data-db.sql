-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2025 at 02:23 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `app_osis`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_siswa`
--

CREATE TABLE `data_siswa` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `kelas` varchar(50) NOT NULL,
  `jurusan` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_siswa`
--

INSERT INTO `data_siswa` (`id`, `nama`, `kelas`, `jurusan`) VALUES
(1, 'Aditya Wisnutama Surya Putra', 'X', 'PPLG'),
(2, 'Alvina Shila Damayanti', 'X', 'PPLG'),
(3, 'Annisa Nafisatus Solikhah', 'X', 'PPLG'),
(4, 'Auxylia Azura Endria', 'X', 'PPLG'),
(5, 'Chaeza Aziz Fadillah', 'X', 'PPLG'),
(6, 'Chotimatis Sangadah', 'X', 'PPLG'),
(7, 'Damar Maulana', 'X', 'PPLG'),
(8, 'Dea Elsafitri', 'X', 'PPLG'),
(9, 'Dyta Ramadhani', 'X', 'PPLG'),
(10, 'Elzania Rahma Nurwida', 'X', 'PPLG'),
(11, 'Erly Dwi Febrianti', 'X', 'PPLG'),
(12, 'Galih Aji Nur Aziz', 'X', 'PPLG'),
(13, 'Galih Razid Witanto', 'X', 'PPLG'),
(14, 'Keyza Amelia', 'X', 'PPLG'),
(15, 'Lilian Anatasya', 'X', 'PPLG'),
(16, 'Muhammad Faris Fitrandanu', 'X', 'PPLG'),
(17, 'Oktana Hari Syafera', 'X', 'PPLG'),
(18, 'Rafi Nur Cayadi', 'X', 'PPLG'),
(19, 'Resmita Junika Dewi', 'X', 'PPLG'),
(20, 'Syifa Aulia Putri', 'X', 'PPLG'),
(21, 'Tri Lestari', 'X', 'PPLG'),
(22, 'Vika Rohmaningrum', 'X', 'PPLG'),
(23, 'Auliya Nuning Cahya', 'X', 'TJKT'),
(24, 'Dela Nofiyanti', 'X', 'TJKT'),
(25, 'Desta Refwanto', 'X', 'TJKT'),
(26, 'Destri Nur Amalia', 'X', 'TJKT'),
(27, 'Elank Adi Pratama', 'X', 'TJKT'),
(28, 'Erlina Dwi Cahyani', 'X', 'TJKT'),
(29, 'Fatkiroh Fitria Rizky', 'X', 'TJKT'),
(30, 'Feby Sri Wahyuni', 'X', 'TJKT'),
(31, 'Fika Ramadhani', 'X', 'TJKT'),
(32, 'Indah Putri Rahayu', 'X', 'TJKT'),
(33, 'Luthfiyah Ulfa', 'X', 'TJKT'),
(34, 'Mastinah', 'X', 'TJKT'),
(35, 'Nurrita', 'X', 'TJKT'),
(36, 'Nurrohma Ayuwita Syahrani', 'X', 'TJKT'),
(37, 'Putri Utami', 'X', 'TJKT'),
(38, 'Regita Marsya Lintang Rachmawan', 'X', 'TJKT'),
(39, 'Risva Ramadhani', 'X', 'TJKT'),
(40, 'Rohmatul Waqidah', 'X', 'TJKT'),
(41, 'Sabella Julia Rahma', 'X', 'TJKT'),
(42, 'Sahhila Azmy Pangestu', 'X', 'TJKT'),
(43, 'Sekar Dwi Munawaroh', 'X', 'TJKT'),
(44, 'Septi Ramadani', 'X', 'TJKT'),
(45, 'Septianingsih', 'X', 'TJKT'),
(46, 'Sukma Melati Ramandani', 'X', 'TJKT'),
(47, 'Upik Prastiti', 'X', 'TJKT'),
(48, 'Zahrotul Khumaeroh', 'X', 'TJKT'),
(49, 'Amanda Novita Sari', 'X', 'MPLB 1'),
(50, 'Anny Wulandhari', 'X', 'MPLB 1'),
(51, 'Auraisa Pasanaila Leilani', 'X', 'MPLB 1'),
(52, 'Bella Nur Indriani', 'X', 'MPLB 1'),
(53, 'Bunga Siti Nur Solekah', 'X', 'MPLB 1'),
(54, 'Cania Fadila Asmarani', 'X', 'MPLB 1'),
(55, 'Cheriana Devi', 'X', 'MPLB 1'),
(56, 'Diyah Ayu Puspita Sari', 'X', 'MPLB 1'),
(57, 'Fania Echa Meilani', 'X', 'MPLB 1'),
(58, 'Fany Maryani', 'X', 'MPLB 1'),
(59, 'Fitri Wulan Dari', 'X', 'MPLB 1'),
(60, 'Kharisa Oktaviani', 'X', 'MPLB 1'),
(61, 'Nadia Putri Rahayu', 'X', 'MPLB 1'),
(62, 'Nasifah Indah Saputri', 'X', 'MPLB 1'),
(63, 'Neysa Sutika Wati', 'X', 'MPLB 1'),
(64, 'Orlin Beryl Callista', 'X', 'MPLB 1'),
(65, 'Puji Rahmawati', 'X', 'MPLB 1'),
(66, 'Rahma Nuraini', 'X', 'MPLB 1'),
(67, 'Sandra Aprilia', 'X', 'MPLB 1'),
(68, 'Valencia Resky Ananda', 'X', 'MPLB 1'),
(69, 'Vina Nafisatul Muna', 'X', 'MPLB 1'),
(70, 'Zunaini Nur Aisyah', 'X', 'MPLB 1'),
(71, 'Anindya Kirana Dewi', 'X', 'MPLB 2'),
(72, 'Arika Yuanita', 'X', 'MPLB 2'),
(73, 'Ayla Az Zahra', 'X', 'MPLB 2'),
(74, 'Dewi Setiyawati', 'X', 'MPLB 2'),
(75, 'Fairuzah Evania Putri Nugraha', 'X', 'MPLB 2'),
(76, 'Feby Az Zahra Putri', 'X', 'MPLB 2'),
(77, 'Ghaliyah Utarida Diniati', 'X', 'MPLB 2'),
(78, 'Jazilatun Nihaya', 'X', 'MPLB 2'),
(79, 'Karimatus Sa\'adah', 'X', 'MPLB 2'),
(80, 'Kiesya Saffa Fagitta', 'X', 'MPLB 2'),
(81, 'Lutviyaningsih', 'X', 'MPLB 2'),
(82, 'Mayla Putri Iriani', 'X', 'MPLB 2'),
(83, 'Melda Saputri', 'X', 'MPLB 2'),
(84, 'Nagita Aurellia', 'X', 'MPLB 2'),
(85, 'Nia Adinda Aprillia', 'X', 'MPLB 2'),
(86, 'Ninda Erlanda Saputri', 'X', 'MPLB 2'),
(87, 'Risa Apriliyanti Devi', 'X', 'MPLB 2'),
(88, 'Ruli Setyowati', 'X', 'MPLB 2'),
(89, 'Triana Sari', 'X', 'MPLB 2'),
(90, 'Yulia Rachmawati', 'X', 'MPLB 2'),
(91, 'Zuvika Layla Alfiani', 'X', 'MPLB 2'),
(92, 'Anisa Listiqomah', 'X', 'MPLB 3'),
(93, 'Asya Nur Wulan', 'X', 'MPLB 3'),
(94, 'Carissa Amanda Putri Damayanti', 'X', 'MPLB 3'),
(95, 'Dinda Vita Hapsari', 'X', 'MPLB 3'),
(96, 'Herna Abellyana', 'X', 'MPLB 3'),
(97, 'Kurnia Aulia Putri', 'X', 'MPLB 3'),
(98, 'Kyona Kameswara', 'X', 'MPLB 3'),
(99, 'Laurent Grace Damaenka', 'X', 'MPLB 3'),
(100, 'Mahira Latifah', 'X', 'MPLB 3'),
(101, 'Meta Fernanda', 'X', 'MPLB 3'),
(102, 'Nendy Arum Setyo Murni', 'X', 'MPLB 3'),
(103, 'Niken Ayu Ningrum', 'X', 'MPLB 3'),
(104, 'Novita Dwi Afriani', 'X', 'MPLB 3'),
(105, 'Quiksa Maulana', 'X', 'MPLB 3'),
(106, 'Riska Destiyani', 'X', 'MPLB 3'),
(107, 'Soraya Hayaku', 'X', 'MPLB 3'),
(108, 'Tia Kariga Agustin', 'X', 'MPLB 3'),
(109, 'Ugonna Setyowati', 'X', 'MPLB 3'),
(110, 'Venita Nur Wahayuning', 'X', 'MPLB 3'),
(111, 'Agustina Permata Sari', 'X', 'AKL'),
(112, 'Arini Dewi Lestari', 'X', 'AKL'),
(113, 'Asilah Najwa Salasabil', 'X', 'AKL'),
(114, 'Assyifa Hidhayati', 'X', 'AKL'),
(115, 'Auliyana', 'X', 'AKL'),
(116, 'Cahya Dewi Pragustin', 'X', 'AKL'),
(117, 'Dewi Rahmatusolehah', 'X', 'AKL'),
(118, 'Diajeng Cahya Ningrum', 'X', 'AKL'),
(119, 'Elysia Imelzahrani', 'X', 'AKL'),
(120, 'Felisha Ardita Rahma', 'X', 'AKL'),
(121, 'Isnaeni Permatasari', 'X', 'AKL'),
(122, 'Maharani Rizquna Safitri', 'X', 'AKL'),
(123, 'Mayla Nurfadillah', 'X', 'AKL'),
(124, 'Muhamad Albar Erlangga', 'X', 'AKL'),
(125, 'Natasya Savitri', 'X', 'AKL'),
(126, 'Putria Prayogi Kuwat Muktiani', 'X', 'AKL'),
(127, 'Reisya Putri Herliana', 'X', 'AKL'),
(128, 'Ria Setiyowati', 'X', 'AKL'),
(129, 'Sherliana Ramadhani', 'X', 'AKL'),
(130, 'Siti Raudatul Nurjannah', 'X', 'AKL'),
(131, 'Siti Soleha', 'X', 'AKL'),
(132, 'Zalsa Febriana Aulia', 'X', 'AKL'),
(133, 'Zevita Aniatul Karomah', 'X', 'AKL'),
(134, 'Aeni Nur Solikhah', 'X', 'PM'),
(135, 'Ayuk Rismawati', 'X', 'PM'),
(136, 'Azka Cinta Pralikha', 'X', 'PM'),
(137, 'Candra Mayasari', 'X', 'PM'),
(138, 'Ceri Arzika', 'X', 'PM'),
(139, 'Desti Dwi Haryanti', 'X', 'PM'),
(140, 'Ema Marwiyah', 'X', 'PM'),
(141, 'Estiana Regina Pratiwi', 'X', 'PM'),
(142, 'Fitri Hanifah', 'X', 'PM'),
(143, 'Galih Wiji Rahayu', 'X', 'PM'),
(144, 'Gevara Ibna Febriama', 'X', 'PM'),
(145, 'Istiqomah', 'X', 'PM'),
(146, 'Lia Choirunisa', 'X', 'PM'),
(147, 'Marfelia Widia Putri', 'X', 'PM'),
(148, 'Mia Alika Putri', 'X', 'PM'),
(149, 'Miftakhul Jannah', 'X', 'PM'),
(150, 'Novita Anggraeni', 'X', 'PM'),
(151, 'Nurraya Retno Wulan Sari', 'X', 'PM'),
(152, 'Qisti Latifatul Istiqomah', 'X', 'PM'),
(153, 'Rasty Salsa Silvaninda', 'X', 'PM'),
(154, 'Rina Septarani', 'X', 'PM'),
(155, 'Rubai\'ah Lintang Atsanayya', 'X', 'PM'),
(156, 'Sherine Alifia Yulian Anggraeni', 'X', 'PM'),
(157, 'Siwi Wening Tyasti', 'X', 'PM'),
(158, 'Zahra Elsa Kayla', 'X', 'PM'),
(159, 'Ahmad Hidayat', 'XI', 'RPL'),
(160, 'Anggi Putri Cahyani', 'XI', 'RPL'),
(161, 'Aprillian Syah Yusuf', 'XI', 'RPL'),
(162, 'Dina Marsha Isnaeni', 'XI', 'RPL'),
(163, 'Lilis Suryaningtyas Trihapsari', 'XI', 'RPL'),
(164, 'Maylaffaiza Gitanjali', 'XI', 'RPL'),
(165, 'Muhammad Adib Muzakki', 'XI', 'RPL'),
(166, 'Muthia Nadya Farhana', 'XI', 'RPL'),
(167, 'Neila Anindya Putri', 'XI', 'RPL'),
(168, 'Prima Mukti', 'XI', 'RPL'),
(169, 'Rendra Bagus Anggoro', 'XI', 'RPL'),
(170, 'Rizki Nuraeni', 'XI', 'RPL'),
(171, 'Selvia Dela Puspita', 'XI', 'RPL'),
(172, 'Wibowo Yunanto Sri Saputro', 'XI', 'RPL'),
(173, 'Winni Lestari', 'XI', 'RPL'),
(174, 'Fito Noverio Fiantono', 'XI', 'RPL'),
(175, 'Alisya Permatasari', 'XI', 'TKJ'),
(176, 'Ardina Rasty', 'XI', 'TKJ'),
(177, 'Atasari', 'XI', 'TKJ'),
(178, 'Ayu Rida Alfa Zahra', 'XI', 'TKJ'),
(179, 'Daniswara Natha Irawan', 'XI', 'TKJ'),
(180, 'Dwi Andintria', 'XI', 'TKJ'),
(181, 'Eka Nurhidayah', 'XI', 'TKJ'),
(182, 'Fatya Andrian Syafira', 'XI', 'TKJ'),
(183, 'Fitri Tuti Rahayu', 'XI', 'TKJ'),
(184, 'Hikmah Nur Wahyuni', 'XI', 'TKJ'),
(185, 'Intan Dianasari', 'XI', 'TKJ'),
(186, 'Istiqomah', 'XI', 'TKJ'),
(187, 'Kurniasari', 'XI', 'TKJ'),
(188, 'Maulani Putri', 'XI', 'TKJ'),
(189, 'Meyzallia Zaskia', 'XI', 'TKJ'),
(190, 'Muhamad Risky Maulana', 'XI', 'TKJ'),
(191, 'Muhammad Yusuf', 'XI', 'TKJ'),
(192, 'Nayla Rizki Salsabila', 'XI', 'TKJ'),
(193, 'Nia Putri Ariyanti', 'XI', 'TKJ'),
(194, 'Nina Muflikha', 'XI', 'TKJ'),
(195, 'Nuringtias Wulan Sari', 'XI', 'TKJ'),
(196, 'Oktaviyani Shelli Saputri', 'XI', 'TKJ'),
(197, 'Pipit Ulfa Asna', 'XI', 'TKJ'),
(198, 'Ratih Y', 'XI', 'TKJ'),
(199, 'Salvia Kalica Azura', 'XI', 'TKJ'),
(200, 'Syafira Fatimah Azzahra', 'XI', 'TKJ'),
(201, 'Wahidun Abduur Rozak', 'XI', 'TKJ'),
(202, 'Wahyu Tri Evasari', 'XI', 'TKJ'),
(203, 'Yatimatus Salamah', 'XI', 'TKJ'),
(204, 'Yeny Kurnia Anggraini', 'XI', 'TKJ'),
(205, 'Yulita Putri Anggraeni', 'XI', 'TKJ'),
(206, 'Ajeng Ayu Risqi Dewi Sukaesih', 'XI', 'BD'),
(207, 'Dewi Untari', 'XI', 'BD'),
(208, 'Dhian Rahma Cahyaningrum', 'XI', 'BD'),
(209, 'Dwi Puji Astuti', 'XI', 'BD'),
(210, 'Eka Agustina Setiawati', 'XI', 'BD'),
(211, 'Iin Anggrainingsih', 'XI', 'BD'),
(212, 'Istikawati', 'XI', 'BD'),
(213, 'Miftahul Janah', 'XI', 'BD'),
(214, 'Nayla Audya Eka Putri', 'XI', 'BD'),
(215, 'Nisa Ardiani', 'XI', 'BD'),
(216, 'Nurul Azizah', 'XI', 'BD'),
(217, 'Restu Ria Pintari', 'XI', 'BD'),
(218, 'Syaffa Nayla Maharani', 'XI', 'BD'),
(219, 'Vernanda Rizky Yuanisa', 'XI', 'BD'),
(220, 'Yasmin Aqila Permata Sany', 'XI', 'BD'),
(221, 'Yusuf Agus Setyawan Rosyid', 'XI', 'BD'),
(222, 'Fajriatul Khusni Khusniyati', 'XI', 'BD'),
(223, 'Anindya Cahya Ramadhani', 'XI', 'MP 1'),
(224, 'Aprilita Rahmasari', 'XI', 'MP 1'),
(225, 'Atha Farah Fadhillah', 'XI', 'MP 1'),
(226, 'Cindy Andhika Pratiwi', 'XI', 'MP 1'),
(227, 'Dela Ragil Maerani Saputri', 'XI', 'MP 1'),
(228, 'Denissya Nirvania', 'XI', 'MP 1'),
(229, 'Desita Nur Sabilla', 'XI', 'MP 1'),
(230, 'Diah Ayu Noverti', 'XI', 'MP 1'),
(231, 'Eka Septi Ningtyas', 'XI', 'MP 1'),
(232, 'Gendhis Ingrid Hadiliana', 'XI', 'MP 1'),
(233, 'Herlina Apriliya', 'XI', 'MP 1'),
(234, 'Kurniya Mamdudah', 'XI', 'MP 1'),
(235, 'Linda Rahmawati', 'XI', 'MP 1'),
(236, 'Membri Asri Purwati', 'XI', 'MP 1'),
(237, 'Nadia Emi Evelyna', 'XI', 'MP 1'),
(238, 'Nur Laela Cahyanti', 'XI', 'MP 1'),
(239, 'Pipinsari', 'XI', 'MP 1'),
(240, 'Restu Lintang Nawang Sari', 'XI', 'MP 1'),
(241, 'Rimas Nurwahiyanti', 'XI', 'MP 1'),
(242, 'Safira Febriyana', 'XI', 'MP 1'),
(243, 'Selvia Linda Dwi Fitria', 'XI', 'MP 1'),
(244, 'Siti Waldaimah', 'XI', 'MP 1'),
(245, 'Syifa Elviana', 'XI', 'MP 1'),
(246, 'Trestania Araminta', 'XI', 'MP 1'),
(247, 'Zumrotun Nafisah', 'XI', 'MP 1'),
(248, 'Aprilia Cahya Ningsih', 'XI', 'MP 2'),
(249, 'Asti Zakiyatunnisa', 'XI', 'MP 2'),
(250, 'Azmi Latifah', 'XI', 'MP 2'),
(251, 'Cindy Ryawan', 'XI', 'MP 2'),
(252, 'Della Noviana Nuraini', 'XI', 'MP 2'),
(253, 'Desi Novianti', 'XI', 'MP 2'),
(254, 'Devi Nur Asyfia', 'XI', 'MP 2'),
(255, 'Dysta Tri Anggrayni Purnomo', 'XI', 'MP 2'),
(256, 'Fitri Nur Azizah', 'XI', 'MP 2'),
(257, 'Gustriyan Sari Dewi', 'XI', 'MP 2'),
(258, 'Itsna Chuliatul Zahro', 'XI', 'MP 2'),
(259, 'Larasati', 'XI', 'MP 2'),
(260, 'Melisa Rahmawati Dwi Susanti', 'XI', 'MP 2'),
(261, 'Nadhella Dian Kharisma', 'XI', 'MP 2'),
(262, 'Navi Ana Sari', 'XI', 'MP 2'),
(263, 'Nurmawati Parsauran Silaen', 'XI', 'MP 2'),
(264, 'Purwita Wulandari', 'XI', 'MP 2'),
(265, 'Revi Cinta Mardiani', 'XI', 'MP 2'),
(266, 'Riski Sangga Pratiwi', 'XI', 'MP 2'),
(267, 'Selvi Mutiva Dewi', 'XI', 'MP 2'),
(268, 'Siti Triana Fajarwati', 'XI', 'MP 2'),
(269, 'Syarifah Muslih', 'XI', 'MP 2'),
(270, 'Sylvia Anindya Putri', 'XI', 'MP 2'),
(271, 'Yuni Rahmawati', 'XI', 'MP 2'),
(272, 'Citra Maharani', 'XI', 'AK 1'),
(273, 'Diva Amelia Tejasvini', 'XI', 'AK 1'),
(274, 'Erlina Juseli', 'XI', 'AK 1'),
(275, 'Fifi Wulandari', 'XI', 'AK 1'),
(276, 'Laura Najwa Ranjani', 'XI', 'AK 1'),
(277, 'Lintang Cahaya Maulidya', 'XI', 'AK 1'),
(278, 'Nimaz Qarinta', 'XI', 'AK 1'),
(279, 'Putri Dwi Permatasari', 'XI', 'AK 1'),
(280, 'Putri Nurlitasari', 'XI', 'AK 1'),
(281, 'Putri Setiyani', 'XI', 'AK 1'),
(282, 'Risma Aulia Khasanah', 'XI', 'AK 1'),
(283, 'Risqita Wahyuning Fitri', 'XI', 'AK 1'),
(284, 'Siti Nur Aulia Destiyanti', 'XI', 'AK 1'),
(285, 'Sukma Widiyaningsih', 'XI', 'AK 1'),
(286, 'Wilda Selvi Listiyana', 'XI', 'AK 1'),
(287, 'Yunita Winda Sari', 'XI', 'AK 1'),
(288, 'Arum Pangestuti', 'XI', 'AK 2'),
(289, 'Aulia Khabibah', 'XI', 'AK 2'),
(290, 'Devi Tri Rahayu', 'XI', 'AK 2'),
(291, 'Dwi Anggita Febriyanti', 'XI', 'AK 2'),
(292, 'Etra Naysila Diyanta', 'XI', 'AK 2'),
(293, 'Fatimatu Zahra', 'XI', 'AK 2'),
(294, 'Kamilatul Munaw Waroh', 'XI', 'AK 2'),
(295, 'Linda Rachmawati', 'XI', 'AK 2'),
(296, 'Liya Marisah', 'XI', 'AK 2'),
(297, 'Nairul Laila Nurdiana', 'XI', 'AK 2'),
(298, 'Nurmayanti', 'XI', 'AK 2'),
(299, 'Rani Robaniah', 'XI', 'AK 2'),
(300, 'Risma Rahmawati', 'XI', 'AK 2'),
(301, 'Shifa Wulan Ramadhani', 'XI', 'AK 2'),
(302, 'Siti Nurjanah', 'XI', 'AK 2'),
(303, 'Talitha Nabilatul Lutfiana', 'XI', 'AK 2'),
(304, 'Triya Okta Viani', 'XI', 'AK 2'),
(305, 'Yuni Astika Riyani', 'XI', 'AK 2'),
(306, 'Zeni Agustin', 'XI', 'AK 2');

-- --------------------------------------------------------

--
-- Table structure for table `laporan`
--

CREATE TABLE `laporan` (
  `id` int(11) NOT NULL,
  `siswa_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `jenis_pelanggaran` enum('ringan','sedang','berat') NOT NULL,
  `tanggal` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_siswa`
--
ALTER TABLE `data_siswa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `laporan`
--
ALTER TABLE `laporan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `siswa_id` (`siswa_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_siswa`
--
ALTER TABLE `data_siswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=307;

--
-- AUTO_INCREMENT for table `laporan`
--
ALTER TABLE `laporan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `laporan`
--
ALTER TABLE `laporan`
  ADD CONSTRAINT `laporan_ibfk_1` FOREIGN KEY (`siswa_id`) REFERENCES `data_siswa` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
