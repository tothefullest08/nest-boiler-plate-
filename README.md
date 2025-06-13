# NestJS 게시판 프로젝트

## 프로젝트 소개

이 프로젝트는 NestJS 기반의 멀티 모듈 구조, 도메인 중심의 클린 아키텍처를 적용한 게시판(Bounded Context) 예제입니다.  
주요 도메인은 게시글(Post), 댓글(Comment), 키워드 알림(KeywordNotification)이며, 각각이 독립적인 애그리거트 루트로 설계되어 있습니다.

---

## 1. 로컬 환경 설정

### 1) Node.js
- **Node.js 20.x 이상**이 필요합니다.
- [nvm](https://github.com/nvm-sh/nvm) 사용을 권장합니다.
  ```bash
  nvm install 20
  nvm use 20
  ```
  - 또는 `.nvmrc` 파일(`20.9.0`) 참고

### 2) MySQL (Docker)
- `docker/docker-compose.yml`을 사용해 MySQL 8.0 컨테이너를 실행합니다.
- 기본 접속 정보:
  - Host: `localhost`
  - Port: `3309`
  - User/Password/DB: `test`
- 실행 명령어:
  ```bash
  docker compose up -d
  ```

### 3) 의존성 설치
```bash
npm install
```

### 4) DB 마이그레이션
- TypeORM migration을 실행해 테이블 및 샘플 데이터를 생성합니다.
  ```bash
  npm run typeorm:migration:run
  ```

### 5) 로컬 서버 실행
- 1~4번이 모두 정상 완료 되었다면 서버를 실행합니다.
- http://localhost:3000에서 API를 확인할 수 있습니다.
  ```bash
  npm run start
  ```

---

## 2. API SPEC

### Swagger 문서
- 모든 API는 Swagger로 문서화되어 있습니다.
- **접근 경로:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### 주요 엔드포인트

#### 게시글
- `POST   /board/posts` : 게시글 생성
- `GET    /board/posts` : 게시글 목록 조회 (검색/페이징)
- `GET    /board/posts/:id` : 게시글 상세 조회
- `PUT    /board/posts/:id` : 게시글 수정
- `DELETE /board/posts/:id` : 게시글 삭제

#### 댓글
- `POST   /board/posts/:postId/comments` : 댓글 생성
- `GET    /board/posts/:postId/comments` : 댓글 목록 조회 (트리/페이징)
- `PUT    /board/comments/:id` : 댓글 수정
- `DELETE /board/comments/:id` : 댓글 삭제

> 각 API의 파라미터, 응답 스키마, 예시 등은 Swagger UI에서 확인할 수 있습니다.

---

## 3. 프로젝트 구조 및 아키텍처

### 구조 개요

```
src/
├── common/           # 공통 모듈
├── application/      # 유스케이스/서비스/DTO
├── domain/           # 도메인 엔티티/로직/리포지토리 인터페이스
├── infrastructure/   # DB/외부시스템/리포지토리 구현
└── presentation/     # REST/컨트롤러
```

- **멀티 모듈 구조**: 각 도메인/기능별로 폴더 분리
- **Rich Domain Model**: 엔티티 내부에 비즈니스 로직/불변성/상태변경 캡슐화
- **클린 아키텍처**: 의존성 방향이 도메인 중심, 외부(프레젠테이션/인프라)는 도메인에 의존

### 도메인 설명

- **게시판(바운디드 컨텍스트)**: 게시글, 댓글, 키워드 알림로 구성
  - **게시글(Post)**: 게시판의 글, 애그리거트 루트
  - **댓글(Comment)**: 게시글에 달리는 댓글, 트리 구조 지원, 애그리거트 루트
  - **키워드 알림(KeywordNotification)**: 특정 키워드가 포함된 글/댓글 등록 시 알림, 애그리거트 루트

---

## 4. 사용 기술 스택

| 기술            | 버전 예시 (package.json 기준) |
|-----------------|------------------------------|
| Node.js         | >= 20.x                      |
| NestJS          | ^10.0.0                      |
| TypeORM         | ^0.3.24                      |
| MySQL           | 8.0 (docker)                 |
| Swagger         | ^7.4.2 (@nestjs/swagger)      |
| bcrypt          | ^6.0.0                       |
| class-validator | ^0.14.2                      |
| class-transformer | ^0.5.1                     |
| pino (logger)   | ^9.7.0                       |
| Jest            | ^29.5.0 (테스트)             |
| 기타            | 자세한 버전은 package.json 참고|

---

## 5. Out Of Scope (향후 개선/고도화 방향)

- **키워드 알림 조회 로직 개선**
  - 현재는 모든 키워드에 대해 단순 순회 방식(비효율적, 소규모 PoC용)
  - **역색인(검색엔진, 예: ElasticSearch) 기반**으로 개선 필요
  - **메시징 큐**(예: Kafka, RabbitMQ 등)를 활용해 게시글/댓글 생성 시 토픽 발행 → 별도 컨슈머에서 키워드 알림 처리하는 구조로 확장 필요

---