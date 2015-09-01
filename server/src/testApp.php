<?php
namespace testApp;
use Ratchet\ConnectionInterface as Conn;
use Ratchet\Wamp\WampServerInterface;

class testApp implements WampServerInterface
{
    protected $clients;
    public $names = [];

    public function __construct() {
        $this->clients = new \SplObjectStorage;
    }

    public function onPublish(Conn $conn, $topic, $event, array $exclude = array(), array $eligible = array()) {
        $topic->broadcast($event);
    }

    public function onCall(Conn $conn, $id, $topic, array $params) {
        if (method_exists($this, $topic->getId())) {
            $result = $this->{$topic->getId()}($conn, $params);
            $conn->callResult($id, $result);

        } else {
            $conn->callError($id, $topic, 'There is no RPC like that');
        }
    }

    public function onOpen(Conn $conn) {
        $this->clients->attach($conn, new \stdClass());
    }

    public function onClose(Conn $conn) {
        $client = $this->clients->offsetGet($conn);
        $key = array_search($client->username, $this->names);
        unset($this->names[$key]);
        $this->clients->detach($conn);

    }

    public function onSubscribe(Conn $conn, $topic) {
    }

    public function onUnSubscribe(Conn $conn, $topic) {
    }

    public function onError(Conn $conn, \Exception $e) {
    }

    private function checkUsername($conn, $params)
    {
        if (in_array($params['username'], $this->names)) {
            return ['available' => false];
        }

        $client = $this->clients->offsetGet($conn);
        $client->username = $params['username'];
        $this->clients->offsetSet($conn, $client);
        $this->names[] = $params['username'];
        return ['available' => true];
    }
}