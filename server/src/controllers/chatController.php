<?php
namespace chrum\controllers;

use chrum\App;

class chatController
{

    public function actionCheckUsername($conn, $username)
    {
        $usernames = $this->getUsernames();
        $clients = App::instance()->clients;
        if (in_array($username, $usernames)) {
            return ['available' => false];
        }

        $client = $clients->offsetGet($conn);
        $client->username = $username;
        $usernames[] = $username;

        $clients->offsetSet($conn, $client);
        App::instance()->setData('names', $usernames);

        return ['available' => true];
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