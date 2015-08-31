<?php
namespace testApp;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface as Conn;
use Ratchet\Wamp\WampServerInterface;
use Ratchet\ConnectionInterface;

class testApp implements WampServerInterface
{
    public function onPublish(Conn $conn, $topic, $event, array $exclude = array(), array $eligible = array()) {
        $topic->broadcast($event);
    }

    public function onCall(Conn $conn, $id, $topic, array $params) {
        $conn->callResult($id, ['available' => true]);
    }

    public function onOpen(Conn $conn) {
    }

    public function onClose(Conn $conn) {
    }

    public function onSubscribe(Conn $conn, $topic) {
    }

    public function onUnSubscribe(Conn $conn, $topic) {
    }

    public function onError(Conn $conn, \Exception $e) {
    }
}