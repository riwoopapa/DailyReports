const { User } = require("../models/User");

let auth = (req, res, next) => {
  //인증처리하는곳
  //클라이언트 쿠키에서 토큰을 가져옴
  let token = req.cookies.x_auth;
  //토큰을 복호화한후 유저를 찾는다 User.js에서 메소드 생성후 사용
  User.findByToken(token, (err, user) => {
    if(err) throw err;
    if(!user) return res.json({ isAuth: false, error: true })

    req.token = token;
    req.user= user;
    next();
  })
  //유저가 있으면 인증 ok
  //유저가 없으면 인증 no
};

module.exports = { auth };