-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-11-2020 a las 14:12:45
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `falta1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `ID_USUARIO` int(11) NOT NULL,
  `NOMBRE` varchar(70) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `EMAIL` varchar(40) NOT NULL,
  `TIPO_USUARIO` int(11) NOT NULL,
  `ESTADO_USUARIO` int(11) NOT NULL,
  `COD_ACTIVACION` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`ID_USUARIO`, `NOMBRE`, `PASSWORD`, `EMAIL`, `TIPO_USUARIO`, `ESTADO_USUARIO`, `COD_ACTIVACION`) VALUES
(44, 'nicolas', '$2y$10$FPvfBcVTQlkgm./ZE9Mas.DuQOsR0D8KzJh6.Mn5uZ.vmQEyhgDlm', 'nicolas@gmail.com', 1, 1, '\r\n'),
(46, 'elias', '$2y$10$XO0MNRSDoiLgpdCL/.u40uPeHuwdfRoKQ/AlRwyEAUU2Mkk92fM6W', 'elias@gmail.com', 1, 1, ''),
(47, 'maria', '$2y$10$/vbLphn0fRGQpB/CkKUY..M6YYaNYAlyAelilV.yM9JV/PtJUt5mi', 'maria@gmail.com', 2, 1, ''),
(48, 'federico', '$2y$10$M3ypvQWm.Bse9AvSokEjauLZ.ZjVv6blsNStJDypEv1lqeeO4cMEe', 'federico@gmail.com', 1, 1, ''),
(49, 'jugador_01', '$2y$10$2qbtVb7DY0865CyFNQB2dO5Ueo8ZhsLzVQyYa/EfmRRh3zbU71rQ.', 'jugador_01@falta1.com', 1, 1, ''),
(50, 'vendedor_01', '$2y$10$1/HQKDjvEO7t/AEXpiKCZetQwHtfUXPbCU4sUAUiIwJ2/FBR/xYaC', 'vendedor_01@falta1.com', 2, 1, ''),
(51, 'admin_01', '$2y$10$hD/Rt0sPIA5vRc7pmPrp9.wuZC3yupSTJLV0BUkt4ElxZgrHPjbai', 'admin_01@falta1.com', 3, 1, ''),
(52, 'leandro', '$2y$10$RyTgWXQ0wRf3kGnR9.KW9.OoDA6kjkB9Bj1DdZyRKaxr.6olNWQOu', 'leandro@gmail.com', 1, 1, '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID_USUARIO`),
  ADD KEY `TIPO_USUARIO` (`TIPO_USUARIO`),
  ADD KEY `ESTADO_USUARIO` (`ESTADO_USUARIO`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID_USUARIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`ESTADO_USUARIO`) REFERENCES `estados_usuarios` (`ID_ESTADO`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`TIPO_USUARIO`) REFERENCES `roles` (`ID_TIPO`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
