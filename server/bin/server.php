<?php
date_default_timezone_set('UTC');
/**
 *  This is...
 * php version 5.4
 */

use Ratchet\Server\IoServer;
use testApp\testApp;

    require dirname(__DIR__) . '/vendor/autoload.php';

    $server = IoServer::factory(
        new testApp(),
        8080
    );

    $server->run();