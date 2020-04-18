#!/bin/bash

ROOT=`echo $(dirname $0)/../`

cd $ROOT

PWD=`pwd`

yarn install


for pkg in packages/*; do
  cd $pkg
  yarn build
  cd $PWD
done

