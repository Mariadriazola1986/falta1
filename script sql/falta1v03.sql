-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-10-2020 a las 06:13:35
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
-- Estructura de tabla para la tabla `canchas`
--

CREATE TABLE `canchas` (
  `ID_CANCHA` int(11) NOT NULL,
  `DIRECCION` varchar(100) NOT NULL,
  `TIPO` int(11) NOT NULL,
  `PRECIO` double NOT NULL,
  `ESTADO_CANCHA` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `canchas`
--

INSERT INTO `canchas` (`ID_CANCHA`, `DIRECCION`, `TIPO`, `PRECIO`, `ESTADO_CANCHA`) VALUES
(1, 'las calandrias 245', 1, 300, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados_usuarios`
--

CREATE TABLE `estados_usuarios` (
  `ID_ESTADO` int(11) NOT NULL,
  `ESTADO` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estados_usuarios`
--

INSERT INTO `estados_usuarios` (`ID_ESTADO`, `ESTADO`) VALUES
(0, 'inactivo'),
(1, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_canchas`
--

CREATE TABLE `estado_canchas` (
  `ID_ESTADO` int(11) NOT NULL,
  `ESTADO` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estado_canchas`
--

INSERT INTO `estado_canchas` (`ID_ESTADO`, `ESTADO`) VALUES
(1, 'activa'),
(2, 'en moderacion'),
(3, 'suspendida'),
(4, 'de baja');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `ID_IMAGEN` int(11) NOT NULL,
  `ID_CANCHA` int(11) NOT NULL,
  `RUTA` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`ID_IMAGEN`, `ID_CANCHA`, `RUTA`) VALUES
(1, 1, 'imagenes/cancha1-1.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partidos`
--

CREATE TABLE `partidos` (
  `ID_PARTIDO` int(11) NOT NULL,
  `ID_USUARIO` int(11) NOT NULL,
  `FECHA` date NOT NULL,
  `HORA` time NOT NULL,
  `TIPO_DE_FUTBOL` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_cancha`
--

CREATE TABLE `tipos_cancha` (
  `ID_TIPO` int(11) NOT NULL,
  `TIPO` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipos_cancha`
--

INSERT INTO `tipos_cancha` (`ID_TIPO`, `TIPO`) VALUES
(1, 'cancha de 11 de cesped natural'),
(2, 'cancha de 11 de cesped sintetico'),
(5, 'cancha de 5 cesped sintetico'),
(6, 'cancha de 5 cesped sintetico'),
(7, 'cancha de 5 piso de cemento');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_de_futbol`
--

CREATE TABLE `tipos_de_futbol` (
  `ID_TIPO` int(11) NOT NULL,
  `TIPO` varchar(50) NOT NULL,
  `DURACION` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipos_de_futbol`
--

INSERT INTO `tipos_de_futbol` (`ID_TIPO`, `TIPO`, `DURACION`) VALUES
(1, 'Futbol 11', '02:00:00'),
(2, 'Futbol 5', '01:00:00'),
(3, 'Futbol 7', '01:20:00'),
(4, 'Futbol 8', '01:20:00'),
(5, 'Futbol Playa', '00:55:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuarios`
--

CREATE TABLE `tipo_usuarios` (
  `ID_TIPO` int(11) NOT NULL,
  `NOMBRE_TIPO` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo_usuarios`
--

INSERT INTO `tipo_usuarios` (`ID_TIPO`, `NOMBRE_TIPO`) VALUES
(1, 'Jugador'),
(2, 'Dueño De Las Canchas ');

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
(27, 'MTA', '$2y$10$AR9UQVir5b066.hfBlC.iuLCX7Pb7ychWpLlHpGdkJXaPkG3.GXqq', 'mariaadriazola25@gmail.com', 1, 1, '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `canchas`
--
ALTER TABLE `canchas`
  ADD PRIMARY KEY (`ID_CANCHA`),
  ADD KEY `TIPO` (`TIPO`),
  ADD KEY `ID_CANCHA` (`ID_CANCHA`),
  ADD KEY `ESTADO_CANCHA` (`ESTADO_CANCHA`);

--
-- Indices de la tabla `estados_usuarios`
--
ALTER TABLE `estados_usuarios`
  ADD PRIMARY KEY (`ID_ESTADO`),
  ADD KEY `ID_ESTADO` (`ID_ESTADO`);

--
-- Indices de la tabla `estado_canchas`
--
ALTER TABLE `estado_canchas`
  ADD PRIMARY KEY (`ID_ESTADO`),
  ADD KEY `ID_ESTADO` (`ID_ESTADO`),
  ADD KEY `ID_ESTADO_2` (`ID_ESTADO`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`ID_IMAGEN`),
  ADD KEY `ID_IMAGEN` (`ID_IMAGEN`,`ID_CANCHA`),
  ADD KEY `ID_CANCHA` (`ID_CANCHA`);

--
-- Indices de la tabla `partidos`
--
ALTER TABLE `partidos`
  ADD PRIMARY KEY (`ID_PARTIDO`),
  ADD KEY `TIPO_DE_FUTBOL` (`TIPO_DE_FUTBOL`),
  ADD KEY `ID_USUARIO` (`ID_USUARIO`);

--
-- Indices de la tabla `tipos_cancha`
--
ALTER TABLE `tipos_cancha`
  ADD PRIMARY KEY (`ID_TIPO`),
  ADD KEY `ID_TIPO` (`ID_TIPO`);

--
-- Indices de la tabla `tipos_de_futbol`
--
ALTER TABLE `tipos_de_futbol`
  ADD PRIMARY KEY (`ID_TIPO`);

--
-- Indices de la tabla `tipo_usuarios`
--
ALTER TABLE `tipo_usuarios`
  ADD PRIMARY KEY (`ID_TIPO`);

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
-- AUTO_INCREMENT de la tabla `canchas`
--
ALTER TABLE `canchas`
  MODIFY `ID_CANCHA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `estados_usuarios`
--
ALTER TABLE `estados_usuarios`
  MODIFY `ID_ESTADO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `estado_canchas`
--
ALTER TABLE `estado_canchas`
  MODIFY `ID_ESTADO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `ID_IMAGEN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `partidos`
--
ALTER TABLE `partidos`
  MODIFY `ID_PARTIDO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tipos_cancha`
--
ALTER TABLE `tipos_cancha`
  MODIFY `ID_TIPO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tipos_de_futbol`
--
ALTER TABLE `tipos_de_futbol`
  MODIFY `ID_TIPO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tipo_usuarios`
--
ALTER TABLE `tipo_usuarios`
  MODIFY `ID_TIPO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID_USUARIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `canchas`
--
ALTER TABLE `canchas`
  ADD CONSTRAINT `canchas_ibfk_1` FOREIGN KEY (`TIPO`) REFERENCES `tipos_cancha` (`ID_TIPO`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `canchas_ibfk_2` FOREIGN KEY (`ESTADO_CANCHA`) REFERENCES `estado_canchas` (`ID_ESTADO`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`ID_CANCHA`) REFERENCES `canchas` (`ID_CANCHA`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `partidos`
--
ALTER TABLE `partidos`
  ADD CONSTRAINT `partidos_ibfk_1` FOREIGN KEY (`TIPO_DE_FUTBOL`) REFERENCES `tipos_de_futbol` (`ID_TIPO`) ON UPDATE CASCADE,
  ADD CONSTRAINT `partidos_ibfk_2` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuarios` (`ID_USUARIO`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`ESTADO_USUARIO`) REFERENCES `estados_usuarios` (`ID_ESTADO`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`TIPO_USUARIO`) REFERENCES `tipo_usuarios` (`ID_TIPO`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
