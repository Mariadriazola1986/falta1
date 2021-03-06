-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-11-2020 a las 14:19:05
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
  `ID_ESTABLECIMIENTO` int(11) NOT NULL,
  `TIPO` int(11) NOT NULL,
  `PRECIO` double NOT NULL,
  `ESTADO_CANCHA` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `canchas`
--

INSERT INTO `canchas` (`ID_CANCHA`, `ID_ESTABLECIMIENTO`, `TIPO`, `PRECIO`, `ESTADO_CANCHA`) VALUES
(3, 9, 1, 789, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `establecimientos`
--

CREATE TABLE `establecimientos` (
  `ID_ESTABLECIMIENTO` int(11) NOT NULL,
  `ID_USUARIO` int(11) NOT NULL,
  `DISTRITO` varchar(100) NOT NULL,
  `DIRECCION` varchar(100) NOT NULL,
  `TELEFONO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `establecimientos`
--

INSERT INTO `establecimientos` (`ID_ESTABLECIMIENTO`, `ID_USUARIO`, `DISTRITO`, `DIRECCION`, `TELEFONO`) VALUES
(8, 47, 'esteban echeverria', 'las calandrias 32 (barrio el jaguel)', 42325681),
(9, 47, 'ezeiza', 'no se alguna calle 123', 42326545);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados_reservas`
--

CREATE TABLE `estados_reservas` (
  `ID_ESTADO` int(11) NOT NULL,
  `ESTADO` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estados_reservas`
--

INSERT INTO `estados_reservas` (`ID_ESTADO`, `ESTADO`) VALUES
(1, 'en espera'),
(2, 'aceptada'),
(3, 'rechazada');

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
(0, 'inactiva'),
(1, 'activa'),
(2, 'en moderacion'),
(3, 'suspendida'),
(4, 'de baja');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_solicitudes`
--

CREATE TABLE `estado_solicitudes` (
  `ID_ESTADO` int(11) NOT NULL,
  `ESTADO` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estado_solicitudes`
--

INSERT INTO `estado_solicitudes` (`ID_ESTADO`, `ESTADO`) VALUES
(1, 'Aceptado'),
(2, 'Rechazado'),
(3, 'Cancelado'),
(4, 'En Espera');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotos`
--

CREATE TABLE `fotos` (
  `ID_FOTO` int(11) NOT NULL,
  `RUTA` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos`
--

CREATE TABLE `grupos` (
  `ID_GRUPO` int(11) NOT NULL,
  `ID_USUARIO_CREADOR` int(11) NOT NULL,
  `NOMBRE` varchar(40) NOT NULL,
  `ID_FOTO` int(11) NOT NULL,
  `CANT_MIEMBROS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos_solicitudes`
--

CREATE TABLE `grupos_solicitudes` (
  `ID_SOLICITUD` int(11) NOT NULL,
  `ID_GRUPO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos_usuarios`
--

CREATE TABLE `grupos_usuarios` (
  `ID_GRUPO` int(11) NOT NULL,
  `ID_USUARIO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `ID_IMAGEN` int(11) NOT NULL,
  `ID_CANCHA` int(11) NOT NULL,
  `RUTA` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`ID_IMAGEN`, `ID_CANCHA`, `RUTA`) VALUES
(2, 3, 'Chrysanthemum.jpg'),
(3, 3, 'Desert.jpg'),
(4, 3, 'Hydrangeas.jpg'),
(5, 3, 'Jellyfish.jpg'),
(6, 3, 'Koala.jpg'),
(7, 3, 'Lighthouse.jpg'),
(8, 3, 'Penguins.jpg'),
(9, 3, 'Tulips.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `invitados`
--

CREATE TABLE `invitados` (
  `ID_INVITADO` int(11) NOT NULL,
  `NOMBRE` varchar(70) NOT NULL,
  `APELLIDO` varchar(70) NOT NULL,
  `DNI` int(11) NOT NULL,
  `TELEFONO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partidos`
--

CREATE TABLE `partidos` (
  `ID_PARTIDO` int(11) NOT NULL,
  `ID_USUARIO` int(11) NOT NULL,
  `FECHA` date NOT NULL,
  `HORA` time NOT NULL,
  `HORA_FIN` time NOT NULL,
  `TIPO_DE_FUTBOL` int(11) NOT NULL,
  `CANTIDAD_DE_JUGADORES_ACTUALES` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `partidos`
--

INSERT INTO `partidos` (`ID_PARTIDO`, `ID_USUARIO`, `FECHA`, `HORA`, `HORA_FIN`, `TIPO_DE_FUTBOL`, `CANTIDAD_DE_JUGADORES_ACTUALES`) VALUES
(111, 46, '2020-11-09', '01:03:00', '21:50:00', 4, 8),
(112, 46, '2020-11-08', '17:54:55', '12:00:00', 1, 2),
(114, 46, '2020-11-20', '10:00:00', '12:00:00', 1, 1),
(115, 44, '2020-11-20', '10:00:00', '12:00:00', 1, 1),
(116, 46, '2020-11-21', '23:00:00', '01:00:00', 1, 2),
(117, 46, '2020-11-27', '16:00:00', '17:00:00', 2, 1),
(118, 48, '2020-11-28', '22:00:00', '23:20:00', 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `ID_PERMISO` int(11) NOT NULL,
  `ACCESO` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`ID_PERMISO`, `ACCESO`) VALUES
(1, 'indexDelJugador.php'),
(2, 'indexDelPropietarioCancha.php'),
(3, 'misGrupos.php'),
(4, 'indexDelAdministrador.php'),
(5, 'misGrupos2.php');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `ID_PUBLICACION` int(11) NOT NULL,
  `ID_PARTIDO` int(11) NOT NULL,
  `COMENTARIOS` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`ID_PUBLICACION`, `ID_PARTIDO`, `COMENTARIOS`) VALUES
(11, 111, 'Invitamos a los jugadores que faltan para jugar en el districto Esteban Echeverria en la cancha Los Halcones, direccion Moreno 345, El Jagüel'),
(13, 115, 'los pensamos jugar en el distrito de esteban echeverria en alguna cancha cercana dentro del barrio de la Morita'),
(14, 117, 'Estamos reclutando jugadores para un partido de futbol 5 que se va a desarrollar en el distrito de Esteban Echeverria en el Barrio Monte Chico, y una vez completado los jugadores reservaremos alguna cancha cercana, gracias.'),
(15, 118, 'Nos falta unos par de jugadores XD XD XD !!!!. Queremos jugar un partido en el distrito de Esteban Echeverria en el barrio de Altos de Monte Grande, de completarse los jugadores alquilaremos alguna cancha cercana o a lo sumo uno que este en Monte grande, ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `ID_RESERVA` int(11) NOT NULL,
  `ESTADO_RESERVA` int(11) NOT NULL,
  `ID_PARTIDO` int(11) NOT NULL,
  `ID_CANCHA` int(11) NOT NULL,
  `FECHA` date NOT NULL,
  `HORA_INICIO` time NOT NULL,
  `HORA_FIN` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `ID_TIPO` int(11) NOT NULL,
  `NOMBRE_TIPO` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`ID_TIPO`, `NOMBRE_TIPO`) VALUES
(1, 'Jugador'),
(2, 'Dueño De Las Canchas '),
(3, 'Administrador ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles_permisos`
--

CREATE TABLE `roles_permisos` (
  `ID_TIPO` int(11) NOT NULL,
  `ID_PERMISO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles_permisos`
--

INSERT INTO `roles_permisos` (`ID_TIPO`, `ID_PERMISO`) VALUES
(1, 1),
(1, 3),
(1, 5),
(2, 2),
(3, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes`
--

CREATE TABLE `solicitudes` (
  `ID_SOLICITUD` int(11) NOT NULL,
  `ID_USUARIO` int(11) NOT NULL,
  `ESTADO_SOLICITUD` int(11) NOT NULL
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
(1, 'Futbol 11'),
(2, 'Futbol 5'),
(3, 'Futbol 7'),
(4, 'Futbol 8'),
(5, 'Futbol Playa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_de_futbol`
--

CREATE TABLE `tipos_de_futbol` (
  `ID_TIPO` int(11) NOT NULL,
  `TIPO` varchar(50) NOT NULL,
  `DURACION` time NOT NULL,
  `JUGADORES_MINIMOS_REQUERIDOS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipos_de_futbol`
--

INSERT INTO `tipos_de_futbol` (`ID_TIPO`, `TIPO`, `DURACION`, `JUGADORES_MINIMOS_REQUERIDOS`) VALUES
(1, 'Futbol 11', '02:00:00', 22),
(2, 'Futbol 5', '01:00:00', 10),
(3, 'Futbol 7', '01:20:00', 14),
(4, 'Futbol 8', '01:20:00', 16),
(5, 'Futbol Playa', '00:55:00', 10);

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_juegan_partidos`
--

CREATE TABLE `usuarios_juegan_partidos` (
  `ID_USUARIO` int(11) DEFAULT NULL,
  `ID_PARTIDO` int(11) DEFAULT NULL,
  `ID_INVITADO` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios_juegan_partidos`
--

INSERT INTO `usuarios_juegan_partidos` (`ID_USUARIO`, `ID_PARTIDO`, `ID_INVITADO`) VALUES
(46, 114, NULL),
(44, 115, NULL),
(46, 116, NULL),
(44, 116, NULL),
(46, 117, NULL),
(48, 118, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `canchas`
--
ALTER TABLE `canchas`
  ADD PRIMARY KEY (`ID_CANCHA`),
  ADD KEY `TIPO` (`TIPO`),
  ADD KEY `ESTADO_CANCHA` (`ESTADO_CANCHA`),
  ADD KEY `ID_ESTABLECIMIENTO` (`ID_ESTABLECIMIENTO`);

--
-- Indices de la tabla `establecimientos`
--
ALTER TABLE `establecimientos`
  ADD PRIMARY KEY (`ID_ESTABLECIMIENTO`),
  ADD KEY `ID_USUARIO` (`ID_USUARIO`);

--
-- Indices de la tabla `estados_reservas`
--
ALTER TABLE `estados_reservas`
  ADD PRIMARY KEY (`ID_ESTADO`);

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
-- Indices de la tabla `estado_solicitudes`
--
ALTER TABLE `estado_solicitudes`
  ADD PRIMARY KEY (`ID_ESTADO`);

--
-- Indices de la tabla `fotos`
--
ALTER TABLE `fotos`
  ADD PRIMARY KEY (`ID_FOTO`);

--
-- Indices de la tabla `grupos`
--
ALTER TABLE `grupos`
  ADD PRIMARY KEY (`ID_GRUPO`),
  ADD KEY `ID_FOTO` (`ID_FOTO`),
  ADD KEY `ID_USUARIO_CREADOR` (`ID_USUARIO_CREADOR`);

--
-- Indices de la tabla `grupos_solicitudes`
--
ALTER TABLE `grupos_solicitudes`
  ADD KEY `ID_SOLICITUD` (`ID_SOLICITUD`),
  ADD KEY `ID_GRUPO` (`ID_GRUPO`);

--
-- Indices de la tabla `grupos_usuarios`
--
ALTER TABLE `grupos_usuarios`
  ADD KEY `ID_GRUPO` (`ID_GRUPO`),
  ADD KEY `ID_USUARIO` (`ID_USUARIO`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`ID_IMAGEN`),
  ADD KEY `ID_IMAGEN` (`ID_IMAGEN`),
  ADD KEY `ID_CANCHA` (`ID_CANCHA`);

--
-- Indices de la tabla `invitados`
--
ALTER TABLE `invitados`
  ADD PRIMARY KEY (`ID_INVITADO`);

--
-- Indices de la tabla `partidos`
--
ALTER TABLE `partidos`
  ADD PRIMARY KEY (`ID_PARTIDO`),
  ADD KEY `TIPO_DE_FUTBOL` (`TIPO_DE_FUTBOL`),
  ADD KEY `ID_USUARIO` (`ID_USUARIO`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`ID_PERMISO`);

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`ID_PUBLICACION`),
  ADD KEY `ID_PARTIDO` (`ID_PARTIDO`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`ID_RESERVA`),
  ADD KEY `ESTADO_RESERVA` (`ESTADO_RESERVA`),
  ADD KEY `ID_PUBLICACION` (`ID_PARTIDO`),
  ADD KEY `ID_CANCHA` (`ID_CANCHA`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`ID_TIPO`);

--
-- Indices de la tabla `roles_permisos`
--
ALTER TABLE `roles_permisos`
  ADD KEY `ID_ROL` (`ID_TIPO`),
  ADD KEY `ID_PERMISO` (`ID_PERMISO`);

--
-- Indices de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD PRIMARY KEY (`ID_SOLICITUD`),
  ADD KEY `ID_USUARIO` (`ID_USUARIO`),
  ADD KEY `ESTADO_SOLICITUD` (`ESTADO_SOLICITUD`);

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
  MODIFY `ID_CANCHA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `establecimientos`
--
ALTER TABLE `establecimientos`
  MODIFY `ID_ESTABLECIMIENTO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `estados_reservas`
--
ALTER TABLE `estados_reservas`
  MODIFY `ID_ESTADO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `estados_usuarios`
--
ALTER TABLE `estados_usuarios`
  MODIFY `ID_ESTADO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `estado_canchas`
--
ALTER TABLE `estado_canchas`
  MODIFY `ID_ESTADO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `estado_solicitudes`
--
ALTER TABLE `estado_solicitudes`
  MODIFY `ID_ESTADO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `fotos`
--
ALTER TABLE `fotos`
  MODIFY `ID_FOTO` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `grupos`
--
ALTER TABLE `grupos`
  MODIFY `ID_GRUPO` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `ID_IMAGEN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `invitados`
--
ALTER TABLE `invitados`
  MODIFY `ID_INVITADO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `partidos`
--
ALTER TABLE `partidos`
  MODIFY `ID_PARTIDO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `ID_PERMISO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `ID_PUBLICACION` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `ID_RESERVA` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `ID_TIPO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  MODIFY `ID_SOLICITUD` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipos_de_futbol`
--
ALTER TABLE `tipos_de_futbol`
  MODIFY `ID_TIPO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID_USUARIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `canchas`
--
ALTER TABLE `canchas`
  ADD CONSTRAINT `canchas_ibfk_1` FOREIGN KEY (`TIPO`) REFERENCES `tipos_cancha` (`ID_TIPO`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `canchas_ibfk_2` FOREIGN KEY (`ESTADO_CANCHA`) REFERENCES `estado_canchas` (`ID_ESTADO`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `canchas_ibfk_3` FOREIGN KEY (`ID_ESTABLECIMIENTO`) REFERENCES `establecimientos` (`ID_ESTABLECIMIENTO`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `establecimientos`
--
ALTER TABLE `establecimientos`
  ADD CONSTRAINT `establecimientos_ibfk_2` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuarios` (`ID_USUARIO`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `grupos`
--
ALTER TABLE `grupos`
  ADD CONSTRAINT `grupos_ibfk_1` FOREIGN KEY (`ID_FOTO`) REFERENCES `fotos` (`ID_FOTO`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `grupos_solicitudes`
--
ALTER TABLE `grupos_solicitudes`
  ADD CONSTRAINT `grupos_solicitudes_ibfk_1` FOREIGN KEY (`ID_SOLICITUD`) REFERENCES `solicitudes` (`ID_SOLICITUD`) ON UPDATE CASCADE,
  ADD CONSTRAINT `grupos_solicitudes_ibfk_2` FOREIGN KEY (`ID_GRUPO`) REFERENCES `grupos` (`ID_GRUPO`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `grupos_usuarios`
--
ALTER TABLE `grupos_usuarios`
  ADD CONSTRAINT `grupos_usuarios_ibfk_1` FOREIGN KEY (`ID_GRUPO`) REFERENCES `grupos` (`ID_GRUPO`) ON UPDATE CASCADE,
  ADD CONSTRAINT `grupos_usuarios_ibfk_2` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuarios` (`ID_USUARIO`) ON UPDATE CASCADE;

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
-- Filtros para la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD CONSTRAINT `publicaciones_ibfk_1` FOREIGN KEY (`ID_PARTIDO`) REFERENCES `partidos` (`ID_PARTIDO`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`ESTADO_RESERVA`) REFERENCES `estados_reservas` (`ID_ESTADO`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reservas_ibfk_3` FOREIGN KEY (`ID_CANCHA`) REFERENCES `canchas` (`ID_CANCHA`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reservas_ibfk_4` FOREIGN KEY (`ID_PARTIDO`) REFERENCES `partidos` (`ID_PARTIDO`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `roles_permisos`
--
ALTER TABLE `roles_permisos`
  ADD CONSTRAINT `roles_permisos_ibfk_1` FOREIGN KEY (`ID_PERMISO`) REFERENCES `permisos` (`ID_PERMISO`) ON UPDATE CASCADE,
  ADD CONSTRAINT `roles_permisos_ibfk_2` FOREIGN KEY (`ID_TIPO`) REFERENCES `roles` (`ID_TIPO`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD CONSTRAINT `solicitudes_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuarios` (`ID_USUARIO`) ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitudes_ibfk_2` FOREIGN KEY (`ESTADO_SOLICITUD`) REFERENCES `estado_solicitudes` (`ID_ESTADO`) ON UPDATE CASCADE;

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
