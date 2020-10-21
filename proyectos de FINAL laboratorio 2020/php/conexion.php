<?php
    function getConnection()
    {
        $servername = 'localhost';
        $dbname = 'falta1';
        $username = 'root';
        $password = '';
        try
        {
            $conn = new PDO('mysql:host=' . $servername . ';dbname=' . $dbname, $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES  \'UTF8\''));
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch(PDOException $e)
        {
            echo 'Error: ' . $e->getMessage();
        }
        return $conn;
    }

    function closeConnection($conn)
    {
        $conn = null;
    }
?>