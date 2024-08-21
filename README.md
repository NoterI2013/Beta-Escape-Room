# 2024載物書院 28載營 密室逃脫 解碼模擬器

## Installation
1. install nvm
```
sudo apt-get update
sudo apt-get install build-essential libssl-dev
```
Taking v0.40.0 for example
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```
Check whether nvm is installed
```
nvm --version
```
2. install Node.js
```
nvm install --lts
```
Check whether Node.js is install
```
nvm list
```
Use the LTS Node.js version
```
nvm use --lts
```
Check current Node.js version
```
nvm current
node --version
npm --version
```
3. install git
```
sudo apt-get install git
```
## Deployment
1. clone this repository (You may need to ask the owner for access token)
```
git clone https://github.com/NoterI2013/Beta-Escape-Room.git
```
2. install essential packages
```
cd <repo>
npm install
```
3. launch the server
```
node server.js
```
4. connect to the website by `<ip>:<port>`