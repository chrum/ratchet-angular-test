<?php
namespace chrum;

use Ratchet\ConnectionInterface as Conn;
use Ratchet\Wamp\WampServerInterface;
use chrum\controllers;

class App implements WampServerInterface
{
    private static $_instance = null;

    public $clients;

    private $data = null;
    private $onEventActions = null;

    public function __construct() {
        self::$_instance = $this;
        $this->clients = new \SplObjectStorage;
        $this->data = new \stdClass();
        $this->onEventActions = [
            'onOpen'    => [],
            'onClose'   => [],
            'onBeforeCall'    => [],
            'onAfterCall'    => [],
            'onErrorCall'    => [],
        ];
    }

    public static function instance()
    {
        return self::$_instance;
    }

    public function onPublish(Conn $conn, $topic, $event, array $exclude = array(), array $eligible = array()) {
        $topic->broadcast($event);
    }

    public function onCall(Conn $conn, $id, $topic, array $params) {
        $this->fireEvent('onBeforeCall');
        list($error, $data) = $this->executeRoute($topic->getId(), $params, $conn);
        if (!$error) {
            $this->fireEvent('onAfterCall');
            $conn->callResult($id, $data);

        } else {
            $this->fireEvent('onErrorCall');
            $conn->callError($id, $topic, $data);
        }
    }

    public function onOpen(Conn $conn) {
        $this->fireEvent('onOpen');
        $this->clients->attach($conn, new \stdClass());
    }

    public function onClose(Conn $conn) {
        $this->fireEvent('onClose');
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

    private function executeRoute($route, $params, $conn = null)
    {
        list($controller, $action) = explode('/', $route);
        $controller = 'chrum\\controllers\\'.$controller.'Controller';
        $action = 'action'.$action;

        if (class_exists($controller)) {
            if (method_exists($controller, $action)) {
                $controllerInstance = new $controller;
                $parameters = [$conn];

                $ref = new \ReflectionMethod($controller, $action);
                foreach ($ref->getParameters() as $p) {
                    if ($p->name != 'conn' && isset($params[$p->name])) {
                        $parameters[] = $params[$p->name];
                    }

                }
                $result = call_user_func_array(array($controllerInstance, $action), $parameters);
                if ($result === false) {
                    return [true, 'Route '.$route.' found but there was problem with calling it'];

                } else {
                    return [false, $result];
                }


            } else {
                return [true, 'Action '.$action.' cannot be found'];

            }

        } else {
            return [true, 'Controller '.$controller.' does not exist'];
        }
    }

    public function setData($name, $data)
    {
        $this->data->{$name} = $data;
    }

    public function getData($name)
    {
        if (property_exists($this->data, $name)) {
            return $this->data->{$name};
        }

        return null;
    }

    public function addEventAction($event, $route)
    {

    }

    public function removeEventAction($event, $route)
    {

    }

    private function fireEvent($name)
    {
        if (isset($this->onEventActions[$name])) {
            foreach ($this->onEventActions[$name] as $route) {

            }
        }
    }
}