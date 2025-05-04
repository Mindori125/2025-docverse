# Docverse

2025년 남서울대 Reverse 팀 Docverse의 작품입니다.

## 기술 스택

- **Next.js 15 (App Router)**
- **TypeScript**
- **MySQL**
- **Tailwind CSS v4**
- **Radix UI + custom components**
- **Django REST**

## 주요 기능

- 회원가입 / 로그인 (JWT)
- 마이페이지 / 그룹페이지
- 기존의 Github처럼 코드/소스파일 업로드 가능, 버전 확인 기능
- VSC의 확장중, LiveShare의 기능처럼 실시간 피드백/수정 기능
- 코드에 피드백 남기면 실시간으로 팀원들에게 알림 전송송
- 그룹장이 그룹원 권한 지정 가능. r, rw etc.
- 실시간 채팅, 멘션 기능

## 로컬 실행

```bash
# 1. 의존성 설치(최초 1회)
npm install

# 2. 환경 변수 설정(최초 1회)
cp .env.example .env

# 3. 개발 서버 실행
npm run dev

## 디렉토리 구조

```
/app            # 페이지 구조
/components.json  # 커스텀 UI 컴포넌트
/lib            # 인증 및 유틸 함수
```

## TODO (배포 시 해야할것)

- 
- 
- 
- 

---

Made by 시연공주와 꿀벌들