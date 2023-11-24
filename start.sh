#!/bin/bash
. ~/.nvm/nvm.sh
. ~/.profile
. ~/.bashrc
nvm use 20
ng serve --host 0.0.0.0 --disable-host-check