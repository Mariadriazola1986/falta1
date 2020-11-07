-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-11-2020 a las 04:28:41
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
(1, 0, 1, 300, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `establecimientos`
--

CREATE TABLE `establecimientos` (
  `ID_ESTABLECIMIENTO` int(11) NOT NULL,
  `DIRECCION` varchar(100) NOT NULL,
  `TELEFONO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `ID_FOTO` int(11) NOT NULL
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
(1, 1, 'imagenes/cancha1-1.jpg');

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
(2, 'indexDelPropietarioCancha.php');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `ID_PUBLICACION` int(11) NOT NULL,
  `ID_PARTIDO` int(11) NOT NULL,
  `COMENTARIOS` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(2, 'Dueño De Las Canchas ');

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
(2, 2);

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
(44, 'zorro', '$2y$10$FPvfBcVTQlkgm./ZE9Mas.DuQOsR0D8KzJh6.Mn5uZ.vmQEyhgDlm', 'zorro45@gmail.com', 1, 1, '\r\n'),
(46, 'rata', '$2y$10$XO0MNRSDoiLgpdCL/.u40uPeHuwdfRoKQ/AlRwyEAUU2Mkk92fM6W', 'rata25@gmail.com', 1, 1, '');

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
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `canchas`
--
ALTER TABLE `canchas`
  ADD PRIMARY KEY (`ID_CANCHA`),
  ADD KEY `TIPO` (`TIPO`),
  ADD KEY `ID_CANCHA` (`ID_CANCHA`),
  ADD KEY `ESTADO_CANCHA` (`ESTADO_CANCHA`),
  ADD KEY `ID_ESTABELCIMIENTO` (`ID_ESTABLECIMIENTO`);

--
-- Indices de la tabla `establecimientos`
--
ALTER TABLE `establecimientos`
  ADD PRIMARY KEY (`ID_ESTABLECIMIENTO`);

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
  ADD KEY `ID_SOLICITUD` (`ID_SOLICITUD`,`ID_GRUPO`),
  ADD KEY `ID_GRUPO` (`ID_GRUPO`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`ID_IMAGEN`),
  ADD KEY `ID_IMAGEN` (`ID_IMAGEN`,`ID_CANCHA`),
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
  ADD KEY `ID_ROL` (`ID_TIPO`,`ID_PERMISO`),
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
  MODIFY `ID_CANCHA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `establecimientos`
--
ALTER TABLE `establecimientos`
  MODIFY `ID_ESTABLECIMIENTO` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `ID_ESTADO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `ID_IMAGEN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `invitados`
--
ALTER TABLE `invitados`
  MODIFY `ID_INVITADO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `partidos`
--
ALTER TABLE `partidos`
  MODIFY `ID_PARTIDO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `ID_PERMISO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `ID_PUBLICACION` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `ID_RESERVA` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `ID_TIPO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `ID_USUARIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

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
-- Filtros para la tabla `establecimientos`
--
ALTER TABLE `establecimientos`
  ADD CONSTRAINT `establecimientos_ibfk_1` FOREIGN KEY (`ID_ESTABLECIMIENTO`) REFERENCES `canchas` (`ID_ESTABLECIMIENTO`) ON UPDATE CASCADE;

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
