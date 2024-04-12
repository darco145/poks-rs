-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 11, 2024 at 02:30 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `poks`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
CREATE TABLE IF NOT EXISTS `admins` (
  `username` text NOT NULL,
  `password` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`username`, `password`) VALUES
('darko', 'ekonomija19');

-- --------------------------------------------------------

--
-- Table structure for table `anketa`
--

DROP TABLE IF EXISTS `anketa`;
CREATE TABLE IF NOT EXISTS `anketa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pitanje` text NOT NULL,
  `da` int NOT NULL,
  `ne` int NOT NULL,
  `suzdrzan` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `anketa`
--

INSERT INTO `anketa` (`id`, `pitanje`, `da`, `ne`, `suzdrzan`) VALUES
(1, 'Да ли подржавате пoвећање пореза на доходак најбогатијих?', 1, 1, 2),
(2, 'Да ли сматрате да држава треба да финансира јавно здравство?', 2, 1, 1),
(3, 'Да ли верујете да би образовање требало да остане бесплатно за све грађане?', 3, 1, 1),
(4, 'Да ли сте за легализацију марихуане?', 1, 2, 1),
(5, 'Да ли подржавате улазак наше земље у Европску Унију?', 1, 2, 1),
(6, 'Да ли треба пооштрити законе о контроли оружја?', 2, 0, 1),
(7, 'Да ли подржавате увођење минималне зараде која може обезбедити пристојан живот?', 1, 0, 2),
(8, 'Да ли сматрате да држава треба да субвенционише обновљиве изворе енергије?', 2, 0, 1),
(9, 'Да ли сте за смањење јавних расхода како би се смањио дефицит?', 1, 1, 1),
(10, 'Да ли сматрате да би имиграциона политика требало да буде рестриктивнија?', 0, 1, 2),
(11, 'Да ли подржавате иницијативе за једнакост полова на радном месту?', 1, 1, 1),
(12, 'Да ли треба пооштрити регулативе за заштиту животне средине?', 1, 1, 1),
(13, 'Да ли подржавате легализацију истополних бракова?', 1, 1, 1),
(14, 'Да ли верујете да би требало улагати више у јавни превоз?', 1, 1, 1),
(15, 'Да ли сматрате да држава треба да има већу улогу у економији?', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `clanovi`
--

DROP TABLE IF EXISTS `clanovi`;
CREATE TABLE IF NOT EXISTS `clanovi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ime` text NOT NULL,
  `prezime` text NOT NULL,
  `datum_rodjenja` date NOT NULL,
  `mesto_rodj` text NOT NULL,
  `drzava_rodj` text NOT NULL,
  `mesto_stan` text NOT NULL,
  `postanski_broj` text NOT NULL,
  `drzava_stan` text NOT NULL,
  `broj` text NOT NULL,
  `email` text NOT NULL,
  `strucna_sprema` text NOT NULL,
  `naziv_skole` text NOT NULL,
  `zvanje` text NOT NULL,
  `specijalizacija` text NOT NULL,
  `radni_status` text NOT NULL,
  `fakultet` text NOT NULL,
  `komentar` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `clanovi`
--

INSERT INTO `clanovi` (`id`, `ime`, `prezime`, `datum_rodjenja`, `mesto_rodj`, `drzava_rodj`, `mesto_stan`, `postanski_broj`, `drzava_stan`, `broj`, `email`, `strucna_sprema`, `naziv_skole`, `zvanje`, `specijalizacija`, `radni_status`, `fakultet`, `komentar`) VALUES
(19, 'darko', 'gavric', '2002-03-05', '-', '-', '-', '-', '-', '+381601129670', 'darkogavric536@gmail.com', '-', '-', '-', '-', '-', '-', '-'),
(20, 'ivana', 'gavric', '2002-03-08', '-', '-', '-', '-', '-', '+38160112456', 'darkogavric536@gmail.com', '-', '-', '-', '-', '-', '-', '-'),
(21, 'darko', 'gavric', '2002-03-04', '-', '-', '-', '-', '-', '+3816011295', 'darkogavric536@gmail.com', '-', '-', '-', '-', '-', '-', '-'),
(22, 'darko', 'gavric', '2002-03-06', '-', '-', '-', '-', '-', '+381601124375', 'darkogavric536@gmail.com', '-', '-', '-', '-', '-', '-', '-'),
(23, 'darko', 'gavric ', '2001-03-15', '-', '-', '-', '-', '-', '+381601129670', 'darkogavric@gmail.com', '-', '-', '-', '-', '-', '-', '-'),
(24, 'darko', 'gavric', '2001-03-06', '-', '-', '-', '-', '-', '+38160112906', 'darkogavric536@gmail.com', '-', '-', '-', '-', '-', '-', '-'),
(25, 'darko', 'gavric', '2001-03-07', '-', '-', '-', '-', '-', '+381234245355', 'darkogavric536@gmail.com', '-', '-', '-', '-', '-', '-', '-'),
(26, 'darko', 'gavric', '2001-03-06', '-', '-', '-', '-', '-', '+381601129670', 'darkogavric01@gmail.com', '-', '-', '-', '-', '-', '-', '-'),
(27, 'darko', 'gavric', '2002-03-05', '-', '-', '-', '-', '-', '+381601129670', 'daredare@gmail.com', '-', '-', '-', '-', '-', '-', '-'),
(28, 'darko', 'gavric', '2002-03-04', '-', '-', '-', '-', '-', '+38160112745', 'gavricadrko@gmail.com', '-', '-', '-', '-', '-', '-', '-'),
(29, '', '', '2002-03-04', '-', '-', '-', '-', '-', '+381601129670', 'haushifldsa@gmail.com', '-', '-', '-', '-', '-', '-', '-'),
(30, 'darko', 'gavric', '2001-03-04', '-', '-', '-', '-', '-', '+381601129670', 'sdjiuvh@gmail.com', '-', '-', '-', '-', '-', '-', '-'),
(31, 'darko', 'gavric', '2001-03-15', '-', '-', '-', '-', '-', '+381601192621', 'svcjkihsdv@gmail.com', '-', '-', '-', '-', '-', '-', '-'),
(32, 'darko', 'gavric', '2001-03-06', '-', '-', '-', '-', '-', '+381601129670', 'asdfcvfgsv@gmail.com', '-', '-', '-', '-', '-', '-', '-'),
(33, 'darko', 'gavric', '2002-03-05', '-', '-', '-', '-', '-', '+38160129435', 'dfgewregw@gmail.com', '-', '-', '-', '-', '-', '-', '-');

-- --------------------------------------------------------

--
-- Table structure for table `pitanja`
--

DROP TABLE IF EXISTS `pitanja`;
CREATE TABLE IF NOT EXISTS `pitanja` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ime` text NOT NULL,
  `prezime` text NOT NULL,
  `email` text NOT NULL,
  `naslov` text NOT NULL,
  `pitanje` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `pitanja`
--

INSERT INTO `pitanja` (`id`, `ime`, `prezime`, `email`, `naslov`, `pitanje`) VALUES
(1, 'darko', 'gavric', 'darko', 'darkoda', 'darko');

-- --------------------------------------------------------

--
-- Table structure for table `vesti`
--

DROP TABLE IF EXISTS `vesti`;
CREATE TABLE IF NOT EXISTS `vesti` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` text NOT NULL,
  `tittle` text NOT NULL,
  `text` text NOT NULL,
  `author` text NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `vesti`
--

INSERT INTO `vesti` (`id`, `image`, `tittle`, `text`, `author`, `date`) VALUES
(9, '7.jpg', 'Коалиција НАДА неће ићи на консултације код председника', '„Не видимо ефекта разговора са човеком који крши устав на сваком кораку, од примене противуставног немачко-француског споразума, па до кршења овлашћења које председник Србије има. Он урушава све институције. Вучић у исто време позива на разговор, док отима одборнике других странака, прекраја изборну вољу грађана, хапси студенте који протестују, гуши медије за опозицију и чини све да Србију претвори у класичну диктатуру. Његове намере нису искрене, то је показао небројано пута и зато нећемо да му будемо кроз ове разговоре декор који служи за прикривање његове диктатуре“ – додао је Михајловић.', 'darko gavric', '2023-11-13'),
(6, '8.jpg', 'Историчар Немања Девић подржао коалицију НАДА', '„Последице климатских промена у Београду постају реалност. За последицу имали смо то, да је за нама никада топлије лето, да нема више пролећа и јесени већ само оштрог прелаза са лета на зиму.|| Како би живот у овом граду био поново условнији морамо вратити природу тамо где му припада и то вертикалним озелењавањем, враћањем дрвореда, озелењавањем урбаних комуналних џепова, враћање такозваних оаза овом граду.|| Само ако заокружимо број 5 можемо направити да овај град поново буде боље место за живот.“ – изјавио је Филип Благојевић испред коалиције НАДА.', 'darko', '2023-11-12'),
(5, '7.jpg', 'Одбраном КиМ бранимо Рашку област, Републику Српску', '„Нема боље коалиције, нема бољег наслова, нема важније речи од речи НАДА. Дошло је време кад већ имамо круну на својој застави и у свом грбу, да је имамо и на глави. Ово је једина изборна листа која то разуме и жели да отвори питање облика владавине и државног уређења, да грађани дају коначну реч, да ли треба обновити Краљевину Србију и вратити јој њено крштено име. Мој став о томе је више него јасан“ – изјавио је академик Матија Бећковић.', 'darko', '2023-11-15'),
(7, '6.jpg', 'НАДА једина може да обезбеди равномеран развој Србије', '„Потребне су промене система који влада, а не само појединаца на челу државе. Нећемо промене да би смо добили нове Вучиће и сличне, него да на политичку сцену доведемо нове и одговорне људе који ће повести земљу путем промена на боље, који имају визију развоја државе и јасан програм за то“ – изјавио је председник ПОКС и један од лидера коалиције НАДА, Војислав Михаиловић.', 'darko', '2023-11-10'),
(8, '5.jpg', 'Заштитити грађане од напада миграната', '”Становништво пограничних области Војводине, свакодневно страхује за своју безбедност, безбедност своје деце и своје имовине због илегалних миграната. Криминалне групе које се баве илегалним транспортом миграната и трговином људима, као и стални оружани сукоби миграната, озбиљно прете и нарушавају безбедност нашег становништва. Зато ПРОМЕНЕ САД!”- изјавио је др Горан Иванчевић испред коалиције НАДА.', 'darko', '2023-11-10'),
(10, '7.jpg', 'Коалиција НАДА неће ићи на консултације код председника', '„Не видимо ефекта разговора са човеком који крши устав на сваком кораку, од примене противуставног немачко-француског споразума, па до кршења овлашћења које председник Србије има. Он урушава све институције. Вучић у исто време позива на разговор, док отима одборнике других странака, прекраја изборну вољу грађана, хапси студенте који протестују, гуши медије за опозицију и чини све да Србију претвори у класичну диктатуру. Његове намере нису искрене, то је показао небројано пута и зато нећемо да му будемо кроз ове разговоре декор који служи за прикривање његове диктатуре“ – додао је Михајловић.', 'darko darko', '2023-11-13'),
(11, '6.jpg', 'Коалиција НАДА неће ићи на консултације код председника', '„Не видимо ефекта разговора са човеком који крши устав на сваком кораку, од примене противуставног немачко-француског споразума, па до кршења овлашћења које председник Србије има. Он урушава све институције. Вучић у исто време позива на разговор, док отима одборнике других странака, прекраја изборну вољу грађана, хапси студенте који протестују, гуши медије за опозицију и чини све да Србију претвори у класичну диктатуру. Његове намере нису искрене, то је показао небројано пута и зато нећемо да му будемо кроз ове разговоре декор који служи за прикривање његове диктатуре“ – додао је Михајловић.', 'darko', '2023-11-13'),
(12, '6.jpg', 'Коалиција НАДА неће ићи на консултације код председника', '„Не видимо ефекта разговора са човеком који крши устав на сваком кораку, од примене противуставног немачко-француског споразума, па до кршења овлашћења које председник Србије има. Он урушава све институције. ||Вучић у исто време позива на разговор, док отима одборнике других странака, прекраја изборну вољу грађана, хапси студенте који протестују, гуши медије за опозицију и чини све да Србију претвори у класичну диктатуру. Његове намере нису искрене, то је показао небројано пута и зато нећемо да му будемо кроз ове разговоре декор који служи за прикривање његове диктатуре“ – додао је Михајловић.||', 'ivana', '2023-12-14'),
(13, '6.jpg', 'Коалиција НАДА неће ићи на консултације код председника', '„Не видимо ефекта разговора са човеком који крши устав на сваком кораку, од примене противуставног немачко-француског споразума, па до кршења овлашћења које председник Србије има. Он урушава све институције. Вучић у исто време позива на разговор, док отима одборнике других странака, прекраја изборну вољу грађана, хапси студенте који протестују, гуши медије за опозицију и чини све да Србију претвори у класичну диктатуру. Његове намере нису искрене, то је показао небројано пута и зато нећемо да му будемо кроз ове разговоре декор који служи за прикривање његове диктатуре“ – додао је Михајловић.', 'darko', '2023-12-16');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
