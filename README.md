# Todo App

## 1. 소개

Todo App은 사용자가 할 일을 추가, 수정, 삭제할 수 있는 간단한 일정 관리 애플리케이션입니다. 사용자는 일정(Todo)을 생성, 조회, 수정, 삭제할 수 있으며, 태그를 추가하여 일정들을 분류할 수 있습니다. 또한, 완료 여부 및 아카이브 기능을 지원하여 보다 체계적인 일정 관리가 가능합니다.
React와 TypeScript를 기반으로 개발되었으며, Vite를 이용하여 빠르고 최적화된 개발 환경을 제공합니다.

### 주요 기능

- Todo 추가, 수정, 삭제
- 완료 여부 체크
- Todo에 태그를 등록하여 태그 기반으로 목록에서 검색 조건처럼 활용 가능
- 아카이브 처리를 통해서 아카이브된 Todo는 숨기기 가능

## 2. 빌드 및 실행 방법

### 2.1. 필수 요구사항

- Node.js (최소 16.x 버전 이상)
- npm 또는 yarn

### 2.2. 설치 및 실행

```sh
# 저장소 클론
git clone https://github.com/honggeunLee/todo_frontend
cd [프로젝트 경로] # 실제 경로

# 패키지 설치
npm install   # 또는 yarn install

# 개발 서버 실행
npm run dev   # 또는 yarn dev
```

### 2.3. 빌드

```sh
npm run build   # 또는 yarn build
```

## 3. 주요 컴포넌트 설명

### 3.1. `TodoList.tsx`

**설명:** 할 일 목록을 렌더링하는 컴포넌트입니다.

**사용 이유:**

- 상태를 관리하여 동적으로 리스트를 렌더링할 수 있도록 구현.
- `map` 함수를 활용하여 각 Todo 아이템을 리스트로 출력.

### 3.2. `TodoItem.tsx`

**설명:** 개별 Todo 아이템을 나타내는 컴포넌트입니다.

**사용 이유:**

- 각 할 일의 상태(완료 여부 등)를 개별적으로 관리하기 위해 분리.
- 삭제 및 수정 기능을 포함하여 사용자가 개별적으로 컨트롤할 수 있도록 구성.

### 3.3. `TodoInput.tsx`

**설명:** 새로운 할 일을 입력하는 폼 컴포넌트입니다.

**사용 이유:**

- 사용자의 입력을 받아 `TodoList`에 추가하기 위해 사용.

