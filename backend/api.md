# Solgik Sever Url

| 기능             | HTTP Methods | Url                                                  | Input Parameter                                              | Response                                                     |
| ---------------- | ------------ | ---------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 회원가입         | post         | /rest-auth/signup/                                   | email, password1, password2, last_name, first_name, gender(0-남자, 1-여자), birth_date(생년월일) | 이메일 중복, 필수값 입력 안했을 시 -> 400 반환<br />성공 -> token |
| 로그인           | post         | /rest-auth/login/                                    | email, password                                              | token                                                        |
| 로그아웃         | post         | /rest-auth/logout/                                   | token                                                        |                                                              |
| 비밀번호 변경    | post         | /rest-auth/password/change/                          | token, new_password1, new_password2, old_password            | 기존 비밀번호 다를 경우-> 400<br />성공 -> detail 메세지     |
| 유저 조회        | get          | /accounts/?kw='수미'&order_by='point'&period="month" | token                                                        |                                                              |
| 유저 상세 조회   | get          | /accounts/<user_id>/                                 | token                                                        | data 없을 경우 -> 404<br />성공 -> data                      |
| 회원정보 수정    | put          | /accounts/<user_id>/                                 | token, 수정할 data                                           | token 안보낼때 -> 401<br />본인 계정이 아닐 때 -> 403<br />성공 -> 수정된 유저 data |
| 회원 탈퇴        | delete       | /accounts/<user_id>/                                 | token                                                        | token 안보낼때 -> 401<br />본인 계정이 아닐 때 -> 403<br />성공 -> 삭제된 유저 data |
| 이메일 찾기 | post | /accounts/find/<product_key>/ |  | 성공 -> data {email}, 해당 유저가 없을 때 404 |
| 비밀번호 찾기    | post         | /rest-auth/password/reset/                           | email                                                        |                                                              |
| 제품키 인증      | get          | /certification/<product_key>/                        |                                                              | data {success ( 성공 시 true, 실패 시 false ), msg}          |
| 제품키 등록      | post         | /registration/<product_key>/                         | token                                                        | 성공 -> 200,  사용 중인 제품 키 -> 400, 해당 제품 키 없을 때 -> 404 |
|                  |              |                                                      |                                                              |                                                              |
| 방 리스트        | get          | /rooms/                                              | token, query : _page, keyword                 | 방 리스트 data                                               |
| 방 생성          | post         | /rooms/                                              | token,name, (password), description                       | 해당 방 정보 data                                          |
| 방 상세 조회     | get          | /rooms/<rooms_id>/                                   | token                                                        | 해당 방 정보 data                                            |
| 방 입장, 퇴장    | post         | /rooms/<rooms_id>/                                   | token                                                        | 해당 방 정보 data                                            |
|                  |              |                                                      |                                                              |                                                              |
| 친구 리스트 조회     | get          | /accounts/friend/                  | token                                                        |                                                              |
| 친구요청 리스트 조회 | get          | /accounts/friend/request/          | token                                                        |                                                              |
| 친구 요청/취소       | post         | /accounts/friend/<user_id>/        | token                                                        |                                                              |
| 친구 삭제 | delete | /accounts/friend/<user_id>/ | token | |
| 친구 요청 수락       | post         | /accounts/friend/<user_id>/accept/ | token                                                        |                                                              |
| 친구요청 거절 | post | /accounts/friend/<user_id>/reject/ | token | |
|  |  |  |  | |
| 작업 시간 생성 | post | /accounts/timesetting/ | token,total_time,work_time,break_time | |
| 작업 시간 삭제 | delete       | /accounts/timesetting/ | token | |
| 작업 시간 수정 | put | /accounts/timesetting/ | token,total_time,work_time,break_time | |