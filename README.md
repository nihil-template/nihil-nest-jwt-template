# nest-jwt-training
JWT 토큰 연습용 리포.

# 준비물

## 데이터베이스
보통은 데이터베이스가 필요하다. 데이터베이스 관련 패키지를 설치해주어야한다. 경우에 따라서는 설정 자체를 없애버려도 된다.

## env 파일 만들기
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
