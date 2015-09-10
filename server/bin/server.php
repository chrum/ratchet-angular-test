<?php
date_default_timezone_set('UTC');
ini_set("log_errors", true);
ini_set("error_reporting", E_ALL);
error_reporting(E_ALL);
ini_set("display_errors", 1);
ini_set("error_log", "./error.log");
/**
 *  This is...
 * php version 5.4
 */

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

use chrum\App;

require dirname(__DIR__) . '/vendor/autoload.php';

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Ratchet\Wamp\WampServer(
                new App()
            )
        )
    ),
    8008,
    '0.0.0.0'
);
$server->run();


