<?php
date_default_timezone_set('UTC');
/**
 *  This is...
 * php version 5.4
 */

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

use testApp\testApp;

require dirname(__DIR__) . '/vendor/autoload.php';

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Ratchet\Wamp\WampServer(
                new testApp()
            )
        )
    ),
    8008,
    '0.0.0.0'
);
$server->run();


