# Heonstagram Front-end

## 설치해야 할 것
styled-components, react-router, graphql, react-apollo-hooks, apollo-boost, react-helmet, styled-reset, react-toastify  

## 웹페이지에서 색상 긁어오는 도구
크롬스토어에서 colorzilla 다운로드  

## 로그인 기능 관련 (chapter 4)
token의 유무로 판단  
LocalState.js, Router.js, App.js를 보면 된다.  
로그인이 된 상태이면 feed로 가고, 안된 상태이면 auth로 가게 한다.  
로그인 상태 판단은 token의 유무로 하며, localstate.js에서 토큰 생성 가능, app.js에서 적용됨  

## 서버 관련
frontend 서버는 포트넘버 3000번(heonstagram-frontend에서 npm run start)  
backend API 서버는 포트넘버 3002번(heonstagram에서 npm run dev)  

## css 코드 모음
max-width, min-width, max-height, min-width : 최대최소 너비, 높이 지정 / px, cm, vh 등 가능  
vh, vw : 뷰포트를 100으로 뒀을 때 상대적으로 몇 % 인지  
display:flex => 축의 방향으로 배열  
flex-direction:column => 이거 안하면 기본 축은 row방향. 축방향을 세로로 바꿔줌  
align-item:center => 교차축 기준으로 중앙에 배열 (대부분 x축 기준이므로, y축 기준으로 중앙으로 배열)  
justify-item:center => 메인축 기준으로 중앙에 배열 (대부분 x축 기준이므로, x축 기준으로 중앙에 배열)  
text-transform : uppercase  
font-weight => 글자 굵기 설정  
cursor: pointer => 마우스 올렸을 때 손 모양 나오게 함  
padding => 요소 내부에서 상하좌우 공간 만들기  
margin => 요소 외부에 상하좌우 공간 만들기  
:nth-child(n) => n번째 요소 선택  
&:not(:last-child) => 마지막 요소 빼고 나머지에 해당  