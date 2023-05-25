# Young&Rich

## 팀원 소개

| 이름 | 직책 | 역할 |
| --- | --- | --- |
| 전대현 | 팀장 | Backend, Frontend, 기획 |
| 박하윤 | 팀원 | Backend, Frontend, 기획 |

## 업무 분담

| 기능 | 담당 |
| --- | --- |
| 메인 페이지  | 박하윤, 전대현 |
| 커뮤니티 | 박하윤 |
| 회원 커스터 마이징 | 전대현 |
| 프로필 페이지 | 전대현 |
| 예적금 금리 비교 | 전대현 |
| 환율계산기 | 박하윤 |
| 근처 은행 검색 | 박하윤 |
| UserAuth | 전대현 |

## 프로젝트 개요

- 프로젝트 기간 : 2023.05.17~2023.05.26
- 프로젝트 명 : Young&Rich Project
    - 금융과 친해져서 영앤치리를 이루고자 함.
    - 사이트 명 : SSaver = SSAFY + saver
- 기획배경
    - 사용자들간 정보 공유와 직접 댓글로 의견을 남겨, 공감대를 형성하는 웹 사이트가 많다.
    - 뿐만 아니라 필요한 정보를 여러 번의 검색 없이 한번에 정보를 얻길 바라는 사용자들이 많아지고 있다.
    - 뱅크샐러드, 토스 등은 자신에게 맞는 금융상품을 추천해주고 비교할 수 있게 해주는 사례이다.
    - 하지만 커뮤니티 기능은 존재하지 않아 사용자간 교류가 없다.
    - 커뮤니티를 통해 비슷한 상황 또는 다른 상황에 있는 사용자간 의견을 공유할 수 있다.
- 목표
    - **금융 상품 비교 서비스와 참여형 서비스의 만남**
    - 금융상품통합비교공시 API를 이용한 금융 상품 비교
    - 환율계산기, 근처 은행 검색 등 편의를 위한 서비스 제공
    - 커뮤니티 운영을 통한 참여형 서비스 제공
    - 관심 상품 목록, 내가 가입한 상품을 한눈에 볼 수 있는 프로필 페이지

## 프로젝트 제작 시 사용된 기술

- Back-end : Django
- Front-end : Vue.js, HTML, javascript, CSS

```
<img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white">
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white">
<img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
```

## 개발문서

[https://docs.google.com/spreadsheets/d/1hah26dYyuk8Y9sUoSdCa1p2HzKZPZQIABc24F8gIm18/edit?usp=sharing](https://docs.google.com/spreadsheets/d/1hah26dYyuk8Y9sUoSdCa1p2HzKZPZQIABc24F8gIm18/edit?usp=sharing)

## Git Rule

**branch**

<aside>
💡 main → BE/feature/{기능이름} or FE/feature/{기능이름}

</aside>

**merge**

```jsx
Merge Pull requests 보내서 확인 후 Merge.
Merge 후 git pull 잊지 않기.
```

## ERD

!

[ERD.pdf](README%200881585098f149b4b3ab664f04e2d7c5/ERD%201.pdf)

## 주요기능

![주요기능1](./assets/primary1.png)

![주요기능2](./assets/primary2.png)

![주요기능3](./assets/primary3.png)

![주요기능4](./assets/primary4.png)

## 페이지 설명

### 1. SiteMap SSaver 웹 페이지의 전체 사이트맵

![사이트맵](README%200881585098f149b4b3ab664f04e2d7c5/sitemap.jpg)

### 2. Main 페이지 : 주요 기능 요약과 각 기능 페이지로 이동 가능한 페이지

![슬라이드1.JPG](README%200881585098f149b4b3ab664f04e2d7c5/%25EC%258A%25AC%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C1.jpg)

| 구분 | 항목 | 내용 |
| --- | --- | --- |
| 1 | 캐러셀 | 각 슬라이드 클릭시 페이지 이동 |
| 2 | MAIN 버튼 | 메인 페이지로 이동 |
| 3 | COMPARE 버튼 | 예적금 금리 비교 페이지로 이동 |
| 4 | SEARCH BANK 버튼 | 가까운 은행 찾기 페이지로 이동 |
| 5 | EXCHANGE 버튼 | 환율계산기 페이지로 이동 |
| 6 | BOARD 버튼 | 게시판 페이지로 이동 |
| 7 | CREATE 버튼 | 게시글 작성 페이지로 이동 |
| 8 | ACCOUNT 버튼 | 로그인 또는 회원가입 페이지로 이동 |

### 3. 로그인 페이지 : 로그인 서비스를 제공하는 페이지

![슬라이드2.JPG](README%200881585098f149b4b3ab664f04e2d7c5/%25EC%258A%25AC%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C2.jpg)

| 구분 | 항목 | 내용 |
| --- | --- | --- |
| 1 | 로그인 버튼 | 입력한 정보로 로그인 요청 |

### 4. 회원가입 페이지

![슬라이드3.JPG](README%200881585098f149b4b3ab664f04e2d7c5/%25EC%258A%25AC%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C3.jpg)

| 구분 | 항목 | 내용 |
| --- | --- | --- |
| 1 | 이름 입력칸 | 이름 입력 |
| 2 | 이메일 입력칸 | 이메일 입력 |
| 3 | 비밀번호 입력칸 | 비밀번호 입력 |
| 4 | 비밀번호 확인칸 | 비밀번호 일치하는지 확인 |
| 5 | 나이 선택 버튼 | 본인의 나이 선택 |
| 6 | 자산 선택 버튼 | 본인의 자산 선택 |
| 7 | 월급 선택 버튼 | 본인의 월급 선택 |
| 8 | SIGN UP 버튼 | 입력한 정보로 SSaver 회원으로의 가입을 요청 |

### 5. Compare 페이지 : 예적금 금리를 한 눈에 볼 수 있는 페이지

**예적금 상품 목록**

![슬라이드4.JPG](README%200881585098f149b4b3ab664f04e2d7c5/%25EC%258A%25AC%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C4.jpg)

![슬라이드5.JPG](README%200881585098f149b4b3ab664f04e2d7c5/%25EC%258A%25AC%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C5.jpg)

| 구분 | 항목 | 내용 |
| --- | --- | --- |
| 1 | 정기 예금 버튼 | 모든 은행의 정기 예금 정보를 제공 |
| 2 | 정기 적금 버튼 | 모든 은행의 정기 적금 정보를 제공 |
| 3 | 은행별 선택 버튼 | 원하는 은행으로 조건 변경 |
| 4 | 금리 선택 버튼 | 금리 높은 순, 낮은 순 선택 가능 |
| 5 | 기간 선택 버튼 | 원하는 기간으로 조건 변경 |
| 6 | 이자 지급 방식 선택 버튼 | 단리, 복리 선택 가능 |

**예적금 상품 상세 페이지**

![슬라이드6.JPG](README%200881585098f149b4b3ab664f04e2d7c5/%25EC%258A%25AC%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C6.jpg)

| 구분 | 항목 | 내용 |
| --- | --- | --- |
| 1 | 정기 예금 버튼 | 모든 은행의 정기 예금 정보를 제공 |
| 2 | 정기 적금 버튼 | 모든 은행의 정기 적금 정보를 제공 |
| 3 | 은행별 선택 버튼 | 원하는 은행으로 조건 변경 |
| 4 | 금리 선택 버튼 | 금리 높은 순, 낮은 순 선택 가능 |
| 5 | 기간 선택 버튼 | 원하는 기간으로 조건 변경 |
| 6 | 이자 지급 방식 선택 버튼 | 단리, 복리 선택 가능 |

### 6. Search Bank 페이지

![슬라이드7.JPG](README%200881585098f149b4b3ab664f04e2d7c5/%25EC%258A%25AC%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C7.jpg)

| 구분 | 항목 | 내용 |
| --- | --- | --- |
| 1 | 지도 | 주변 은행 표시 |
| 2 | 키워드 검색 창 | 은행 키워드 검색시 해당 은행 표시 |

### 7. Exchange 페이지

![슬라이드8.JPG](README%200881585098f149b4b3ab664f04e2d7c5/%25EC%258A%25AC%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C8%201.jpg)

| 구분 | 항목 | 내용 |
| --- | --- | --- |
| 1 | 외화 선택 버튼 | API사이트에서 제공하는 모든 외화 선택 가능 |
| 2 | 환전 금액 입력 | 원하는 만큼의 환전 금액 입력 |
| 3 | 원화 계산 | 입력한 환전 금액 원화로 변환 |
| 4 | swap 버튼 | 외화와 원화 변경 |
| 5 | 업데이트 | 최근 외화 환전율 업데이트 |

### 8. Board 페이지

**게시글 목록**

![슬라이드9.JPG](README%200881585098f149b4b3ab664f04e2d7c5/%25EC%258A%25AC%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C9%201.jpg)

| 구분 | 항목 | 내용 |
| --- | --- | --- |
| 1 | CREATE 버튼 | 게시글을 작성할 수 있는 CREATE페이지로 이동 |
| 2 | Article List | 게시글 전체 조회 |
| 3 | DETAIL 버튼 | 각 게시글 상세 조회 |

**게시글 상세**

![슬라이드10.JPG](README%200881585098f149b4b3ab664f04e2d7c5/%25EC%258A%25AC%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C10%201.jpg)

| 구분 | 항목 | 내용 |
| --- | --- | --- |
| 1 | 제목 | 제목 표시 |
| 2 | 내용 | 내용 표시 |
| 3 | 작성시간 | 작성시간 표시 |
| 4 | 수정 버튼 | 해당 게시글을 수정할 수 있는 페이지로 이동 |
| 5 | 삭제 버튼 | 해당 게시글을 삭제 |
| 6 | 좋아요 버튼 | 해당 게시글을 좋아요 할 수 있음 |
| 7 | 댓글 입력 창 | 댓글 입력 후 엔터 또는 작성 클릭시 댓글 생성 |
| 8 | 댓글 수정 버튼 | 해당 댓글을 수정 |
| 9 | 댓글 삭제 버튼 | 해당 댓글을 삭제 |

게시글, 댓글 수정

![슬라이드11.JPG](README%200881585098f149b4b3ab664f04e2d7c5/%25EC%258A%25AC%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C11%201.jpg)

| 구분 | 항목 | 내용 |
| --- | --- | --- |
| 1 | 게시글 수정 버튼 | 수정한 게시글을 게시 |
| 2 | 댓글 수정 취소 버튼 | 댓글 수정을 취소 |
| 3 | 댓글 수정 확인 버튼 | 댓글을 수정 |

### 9. Create 페이지

![슬라이드12.JPG](README%200881585098f149b4b3ab664f04e2d7c5/%25EC%258A%25AC%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C12.jpg)

| 구분 | 항목 | 내용 |
| --- | --- | --- |
| 1 | 게시글 제목 입력칸 | 제목 입력 |
| 2 | 게시글 내용 입력칸 | 내용 입력 |
| 3 | 게시글 작성 | 게시글을 작성 |

### 10. Profile 페이지

**프로필페이지**

![슬라이드13.JPG](README%200881585098f149b4b3ab664f04e2d7c5/%25EC%258A%25AC%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C13.jpg)

| 구분 | 항목 | 내용 |
| --- | --- | --- |
| 1 | 수정 버튼 | 프로필 수정 페이지로 이동 |

**프로필 수정**

![슬라이드14.JPG](README%200881585098f149b4b3ab664f04e2d7c5/%25EC%258A%25AC%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C14.jpg)

| 구분 | 항목 | 내용 |
| --- | --- | --- |
| 1 | 나이 선택 버튼 | 나이 수정 가능 |
| 2 | 자산 선택 버튼  | 자산 수정 가능 |
| 3 | 월급 선택 버튼  | 월급 수정 가능 |
| 4 | 저장 버튼 | 수정된 프로필 저장 |

**관심 상품 목록**

![슬라이드15.JPG](README%200881585098f149b4b3ab664f04e2d7c5/%25EC%258A%25AC%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C15.jpg)

| 구분 | 항목 | 내용 |
| --- | --- | --- |
| 1 | 예금 | 관심 상품 등록한 예금 상품 목록  |
| 2 | 적금 | 관심 상품 등록한 적금 상품 목록 |

**한 눈에 보는 내 상품**

![슬라이드16.JPG](README%200881585098f149b4b3ab664f04e2d7c5/%25EC%258A%25AC%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C16.jpg)

| 구분 | 항목 | 내용 |
| --- | --- | --- |
| 1 | 통계보기 버튼 | 예적금 금리별 그래프로 표시 |
| 2 | 예금 | 관심 등록한 예금 상품 금리 그래프로 표시 |
| 3 | 적금 | 관심등록한 적금 상품 금리 그래프로 표시 |

## Build Process

### 5/16

<aside>
💡 기본 환경 세팅 완료, Django-Vue.js 연동 완료, 기능 분담 완료

</aside>

---

### 5/17

<aside>
💡 Django → KaKaoMap 구현, 환율 계산기 구현,예/적금 데이터 DRF
Vue.js → 예/적금 데이터 수신받아 Vue+Vuetify로 구현

</aside>

---

### 5/18

<aside>
💡

</aside>

---

### 5/19

<aside>
💡

</aside>

---

### 5/20

<aside>
💡

</aside>

---

### 5/21

<aside>
💡

</aside>

---

### 5/22

<aside>
💡

</aside>

---

### 5/23

<aside>
💡

</aside>

---

### 5/24

<aside>
💡

</aside>

---

### 5/25

<aside>
💡

</aside>

---
