#!/bin/bash
CWD=$(pwd)

# Lets ease remote debugging with phpStorm (just start listening for debug connection in IDE)
export XDEBUG_CONFIG="remote_enable=1 remote_mode=req remote_port=9000 remote_host=127.0.0.1 remote_connect_back=0"

# start webpack dev server
(cd app && gulp wds) &
# start websockets server and wait for iot
(php $CWD/server/server.php) &
WSid=$!
#wait for websockets server to finish
wait $WSid

# kill all child processes upon killing this script
#function killAllSubs {
#    echo 'Stopping all jobs'
#    for job in `jobs -p`
#    do
#    echo $job
#        kill $job || let "FAIL+=1"
#    done
#}
#
#trap killAllSubs EXIT