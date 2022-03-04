# NestJS JWT 템플릿
NestJS에서 JWT를 편하게 사용하려고 만든 템플릿. 데이터베이스 관련된 패키지가 이미 설치되어 있다.

# env 파일 만들기
.env 파일을 만들어 아래와 같이 설정한다.

```dotenv
DB_HOST=localhost
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
JWT_EXP=
```

각 항목을 데이터베이스에 따라 맞게 입력한다. DB_NAME은 데이터베이스의 이름을 입력한다.
