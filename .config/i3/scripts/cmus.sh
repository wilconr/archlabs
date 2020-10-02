#!/bin/bash

killall -q cmus
while pgrep -u $UID -x cmus 2>/dev/null; do sleep 1; done
nohup cmus 2>/dev/null & 
disown
sleep 1
cmus-remote --pause
rm -rf nohup.out
