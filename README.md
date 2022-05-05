# Self-Soverign Identity(자기신원주권)

## 1. 프로젝트 개요
VC(Verifiable Credential)를 Issuer(발급자)에게 발급 받고 검증자(Verfier)에게 검증 받는 프로세스

## 2. 사전 준비사항
### (1) Von-network
Hyperledger-Indy 기반의 블록체인 네트워크 프레임워크, 원장을 조회할 수 있는 브라우저도 제공한다.

### (2) 하이퍼레저 인디 (Hyperledger Indy)
DID를 인증을 위한 프레임워크(node, sdk) 제공

### (3) 하이퍼레저 애리스 (Hyperledger Aries)
VC를 발급하고 인증하고 검증하고, 블록체인 원장 조회까지 가능하게 하는 Agent역할

## 3. 시스템 설정

### 1. Python 설치 (3.6 버전 권장)
#### 1. `pyenv`, `pyenv-virtualenv` 설치 
python을 버전별로 관리해주고 가상환경을 지원

```bash
$ brew install pyenv pyenv-virtualenv
```
#### 2. 환경변수 설정
```bash
$ vi ~/.zshrc

export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv init -)"
```

#### 3. pyenv 사용하기
```bash

# 설치 가능한 Python 버전
$ pyenv install --list

# 특정한 버전 Python 설치
$ pyenv install 3.9.0

# 특정한 버전 Python 삭제
$ pyenv uninstall 3.9.0

# 설치된 Python list
$ pyenv versions

# 해당 Python 버전을 기본으로 설정
$ pyenv global 3.9.0
```

❗️ 혹시 pyenv로 파이썬을 설치하는 중 다음과 같은 오류가 뜬다면
```bash
BUILD FAILED (OS X 12.3.1 using python-build 1.2.13)

Inspect or clean up the working tree at /var/folders/9c/8xbd1jz52d9g11ky4pvxtb8r0000gn/T/python-build.20220504162000.45360
Results logged to /var/folders/9c/8xbd1jz52d9g11ky4pvxtb8r0000gn/T/python-build.20220504162000.45360.log
```
다음 명령어를 입력
```bash
CFLAGS="
-I$(brew --prefix openssl)/include 
-I$(brew --prefix bzip2)/include 
-I$(brew --prefix readline)/include 
-I$(xcrun --show-sdk-path)/usr/include" 
LDFLAGS="
-L$(brew --prefix openssl)/lib 
-L$(brew --prefix readline)/lib 
-L$(brew --prefix zlib)/lib 
-L$(brew --prefix bzip2)/lib" 
pyenv install --patch <파이썬버전> 
< <(curl -sSL https://github.com/python/cpython/commit/8ea6353.patch\?full_index\=1)
```

#### 4. 가상환경 만들기
```bash
#가상환경 만들기
# pyenv virtualenv [version] [name]
$ pyenv virtualenv 3.6.9 env
```

❗️ 만약 pyenv를 통해 python이 설치가 안된다면 전역에 설정되어 있는 python으로 가상환경 설정(3.6버전)
```bash
# MAC인 경우 python3 명령어로 실행
$ python3 -m venv env
-> 활성화 되고나면 터미널에 앞에 (env)가 붙음

# 가상환경 활성화
$ source env/bin/activate

# 가상환경 비활성화 
$ deactivate
```

### 2. Von-network 구동
#### 1. 라이브러리 설치
```bash
# 설치할 python 모듈을 정의 해놓은 requirements.txt 파일을 이용해 설치
$ pip install -r server/requirements.txt
```