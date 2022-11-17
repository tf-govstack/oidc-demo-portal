#!/bin/sh
# Restarts the oidc service
## Usage: ./restart.sh [kubeconfig]

if [ $# -ge 1 ] ; then
  export KUBECONFIG=$1
fi

NS=idp
kubectl -n $NS rollout restart deploy idp-oidc-server oidc-ui

# kubectl -n $NS  get deploy -o name |  xargs -n1 -t  kubectl -n $NS rollout status
kubectl -n $NS rollout status

echo Retarted oidc service
