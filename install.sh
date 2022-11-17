#!/bin/sh
# Installs all oidc helm charts
## Usage: ./install.sh [kubeconfig]

if [ $# -ge 1 ] ; then
  export KUBECONFIG=$1
fi

read -p "Please provide private key file : " private_key

if [ -z "$private_key" ]; then
  echo "Private key file not provided; EXITING;";
  exit 1;
fi
if [ ! -f "$private_key" ]; then
  echo "Private key not found; EXITING;";
  exit 1;
fi

NS=idp
CHART_VERSION=12.0.2

echo Create $NS namespace
kubectl create ns $NS

echo Istio label
kubectl label ns $NS istio-injection=enabled --overwrite
helm repo add mosip-oidc https://mosip.github.io/oidc-demo-portal
helm repo update

echo "Create secret for oidc-ui-secrets, delete if exists"
cp "$private_key" /tmp/private-key
kubectl -n $NS delete --ignore-not-found=true secrets oidc-ui-secrets
kubectl -n $NS create secret generic oidc-ui-secrets --from-file="/tmp/private-key"


echo Installing OIDC Server
helm -n $NS install idp-oidc-server mosip-oidc/oidc-server --version $CHART_VERSION

echo Installing OIDC UI
helm -n $NS install oidc-ui mosip-oidc/oidc-ui --version $CHART_VERSION

kubectl -n $NS  get deploy -o name |  xargs -n1 -t  kubectl -n $NS rollout status

echo Installed OIDC server & OIDC-UI
