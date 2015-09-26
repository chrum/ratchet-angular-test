<?php
date_default_timezone_set('UTC');
ini_set("error_log", "./error.log");
/**
 *  This is...
 * php version 5.4
 */

define('DEBUG', isset($argv[1]) && $argv[1] === 'debug');

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

use chrum\App;

require dirname(__DIR__) . '/server/vendor/autoload.php';

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


