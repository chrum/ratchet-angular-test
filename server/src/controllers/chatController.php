<?php
namespace chrum\controllers;

use Ratchet\ConnectionInterface as Conn;
use chrum\App;

class chatController
{
    private static $actionsRegistered = false;

    public function __construct()
    {
        if (!self::$actionsRegistered) {
            // App::instance()->addEventAction('onOpen', 'chat/onOpen');
            App::instance()->addEventAction('onClose', 'chat/onClose');
            self::$actionsRegistered = true;
        }
    }

    /**
     * @param $conn Conn
     * @param $username
     * @return array
     */
    public function actionCheckUsername(Conn $conn, $username)
    {
        $usernames = $this->getUsernames();
        if (in_array($username, $usernames)) {
            return ['available' => false];
        }

        return ['available' => true];
    }

    public function actionRegisterUsername(Conn $conn, $username)
    {
        $clients = App::instance()->clients;
        $client = $clients->offsetGet($conn);
        $client->username = $username;
        $clients->offsetSet($conn, $client);

        $usernames = $this->getUsernames();
        $usernames[] = $username;
        App::instance()->setData('names', $usernames);

        App::instance()->broadcast('chat/usersList', $usernames);
    }

    /**
     * On connection close lets remove username from the list
     * @param $conn
     */
    public function actionOnClose($conn)
    {
        $client = App::instance()->clients->offsetGet($conn);
        $usernames = $this->getUsernames();
        $key = array_search($client->username, $usernames);
        unset($usernames[$key]);

        App::instance()->setData('names', $usernames);
        App::instance()->broadcast('chat/usersList', $usernames);
    }

    private function getUsernames()
    {
        $usernames = App::instance()->getData('names');
        if (!$usernames) {
            return [];

        } else {
            return $usernames;
        }
    }
}