<h1 align="center">**숙명여대 운동 크루 커뮤니티, CREWCREW :running_woman:**</h1>
<div align="center">
  **시스템종합설계 프로젝트** <br>
  숙명여대 학생들을 위한 운동 크루 커뮤니티 
</div>
<br/>
<div align="center" style="display:flex;">
  <img width="345" alt="스크린샷 2019-11-07 오전 2 46 48" src="https://user-images.githubusercontent.com/35549653/71011756-5916c500-2131-11ea-8835-273238fd6268.png">
</div>
&nbsp;
&nbsp;

## Features

 - Nodemailer와 jwt를 이용하여 재학생 인증을 위한 학교 이메일 인증 시스템 구현
 - 재학생만이 가입 및 서비스 사용 가능
 - 운동 카테고리 별로 크루 생성 및 참여
 - (Mobile) 직접 터치하여 생성한 경로를 저장하여 번개 크루 만들기
 - (Mobile) 실시간 채팅 시스템
&nbsp;

## Dependencies
```
"dependencies": {
"aws-sdk": "^2.585.0",
"cookie-parser": "~1.4.4",
"debug": "~2.6.9",
"ejs": "^2.7.1",
"express": "^4.16.4",
"http-errors": "~1.6.3",
"jade": "~1.11.0",
"jsonwebtoken": "^8.5.1",
"morgan": "~1.9.1",
"multer": "^1.4.2",
"multer-s3": "^2.9.0",
"nodemailer": "^6.3.1",
"nodemailer-smtp-transport": "^2.7.4",
"nodemon": "^1.19.4",
"pbkdf2": "^3.0.17",
"promise-mysql": "^4.1.1",
"rand-token": "^0.4.0"
}
```
&nbsp;
##   Architecture

![image](https://user-images.githubusercontent.com/35549653/71014178-db54b880-2134-11ea-91bb-53427cdf772e.png)
 &nbsp;

# Demo

<div style="display:flex" align="center">
<img width="1439" alt="스크린샷 2019-12-15 오전 9 45 14" src="https://user-images.githubusercontent.com/35549653/71016560-ad717300-2138-11ea-8b4b-1fb51388e568.png">
<br>&nbsp;
<img width="1439" alt="스크린샷 2019-12-15 오전 9 45 14" src="https://user-images.githubusercontent.com/35549653/71016410-74390300-2138-11ea-9a6d-dd2dc283065e.png">
<br>&nbsp;

<img width="328" alt="스크린샷 2019-12-10 오전 6 12 15" src="https://user-images.githubusercontent.com/35549653/71017108-751e6480-2139-11ea-9e60-e0ae42cf3386.png">
<br>&nbsp;

<p style="text-align:left">

 - Crypto 모듈을 이용해 사용한 랜덤 Key를 url에 함께 넣어 인증 확인을 받음
 - 메일의 인증 확인 링크를 누를 시 DB의 인증 확인 컬럼(Boolean, default 0)을 1로 바뀌며 성공적으로 회원 가입 및 인증이 완료됨
 - 메일 입력 후 폼의 입력값을 보낼 때, 정규식으로 숙명여대 메일을 확인함
 - 모든 메일 작업은 Nodemailer를 활용함  
 
 </p>
<br>&nbsp;

<img width="250" alt="스크린샷 2019-12-15 오전 9 33 21" src="https://user-images.githubusercontent.com/35549653/71016367-68e5d780-2138-11ea-849f-8f58bbea3c0c.png">
<img width="254" height="373" alt="스크린샷 2019-12-15 오전 9 33 12" src="https://user-images.githubusercontent.com/35549653/71016386-6d11f500-2138-11ea-941d-e91e80a7de9c.png">
<br>&nbsp;
<img width="1440" alt="스크린샷 2019-12-15 오전 9 31 05" src="https://user-images.githubusercontent.com/35549653/71016483-90d53b00-2138-11ea-9642-69ce2c0bd0ad.png">
<br>&nbsp;

<img width="500" alt="스크린샷 2019-12-15 오전 9 31 26" src="https://user-images.githubusercontent.com/35549653/71016524-9fbbed80-2138-11ea-9d78-5369966e3680.png">

<p style="text-align:left">

 - s3-multer를 이용하여 이미지를 업로드 할 시 기존에 생성해두었던 AWS S3 버킷으로 업로드
 
</p> 
<br>
<br>&nbsp;
<img width="1440" alt="스크린샷 2019-12-15 오전 9 32 26" src="https://user-images.githubusercontent.com/35549653/71016493-95015880-2138-11ea-821b-598f794aa79b.png">
<br>
<p style="text-align:left">

 - 각 운동 카테고리에 맞는 리스트로 렌더링 
 - Hover 효과가 있는 카드 리스트
 
 </p>
 <br>&nbsp;
<img width="1438" alt="스크린샷 2019-12-15 오전 9 32 59" src="https://user-images.githubusercontent.com/35549653/71016542-a5b1ce80-2138-11ea-8d4a-b10821ad19e6.png">
<br>
<p style="text-align:left">

 - jwt 토큰을 쿠키에 저장하여 로그인 한 유저 확인
 - 유효한 토큰 값 여부를 미들웨어를 통해 판별한 후 유효할 시에만 크루 가입이 가능

 </p>

</div>

&nbsp;
# About Team
### Server/Client(Web)
 - 이시연 ([siyeons](https://github.com/siyeons)) 
 
 ### Client(Android)
 - 오현주([rophy1310](https://github.com/rophy1310))
