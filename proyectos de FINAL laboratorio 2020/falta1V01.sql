-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 21-10-2020 a las 19:06:57
-- Versión del servidor: 5.7.24
-- Versión de PHP: 7.2.11

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
  `ESTADO_USUARIO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Indices de la tabla `tipos_cancha`
--
ALTER TABLE `tipos_cancha`
  ADD PRIMARY KEY (`ID_TIPO`),
  ADD KEY `ID_TIPO` (`ID_TIPO`);

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
  MODIFY `ID_ESTADO` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT de la tabla `tipos_cancha`
--
ALTER TABLE `tipos_cancha`
  MODIFY `ID_TIPO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tipo_usuarios`
--
ALTER TABLE `tipo_usuarios`
  MODIFY `ID_TIPO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID_USUARIO` int(11) NOT NULL AUTO_INCREMENT;

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
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`ESTADO_USUARIO`) REFERENCES `estados_usuarios` (`ID_ESTADO`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`TIPO_USUARIO`) REFERENCES `tipo_usuarios` (`ID_TIPO`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
