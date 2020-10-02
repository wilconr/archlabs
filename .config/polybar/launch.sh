#!/usr/bin/env sh

# Terminate already running bar instances
killall -q polybar

# Wait until the processes have been shut down
while pgrep -u $UID -x polybar >/dev/null; do sleep 1; done

# Launch polybar
polybar -r monitor1 -c $HOME/.config/polybar/config &

my_laptop_external_monitor=$(xrandr --query | grep 'VGA1')
if [[ $my_laptop_external_monitor = *connected* ]]; then
    polybar -r monitor2 -c $HOME/.config/polybar/config &
fi
