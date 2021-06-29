const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const { User } = require('./models/User');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');
const { Info } = require('./models/Info');

const config = require('./config/key');
//서
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(config.mongoURI, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }, 
  (err) => {
    if(err) return console.log('Err', err);
    return console.log('MongoDB Connected Successfully');
});

app.get('/api/users', (req, res) => {
  User.find(function(err, data) {
    if(err) return res.json({ success: false, userOrigin: false })
    return res.json({ success: true, data })
  });
});
//로그인 기능
app.post('/api/users/login', (req, res) => {
  User.findOne({ email: req.body.email }, function(e, data) {
    if(!data) return res.json({ success: false, message: '해당 email주소를 가진 유저가 없습니다', data })
    data.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) return res.json({ success: false, message: '비밀번호를 확인해주세요'})
      //성공했을 경우,
      data.generateToken((err, user) => {
        if(err) return res.status(400).send(err)
        return res.cookie('x_auth', user.token).status(200).json({ success: true, userId: user._id, name: user.name })
      });
    });
  });
});
//회원가입 기능
app.post('/api/users/signup', (req, res) => {
  const user = new User(req.body);
  user.save(function(err, data) {
    if(err) return res.json({ success: false, createUser: false })
    return res.json({ success: true, name: data.name })
  });
});
//로그인 유지 기능
app.get('/api/users/auth', auth , (req, res) => {
  //여기까지 미들웨어를 통과했다는 얘기는 isAuth가 true라는 말
  return res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role
  });
});
//로그아웃 기능
app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if(err) return res.json({ success: false, err });
    return res.status(200).send({ success: true })
  });
});
//인풋바디에서 입추날짜정보를 위한 해당유저의 기록데이터 받아오기
app.get('/api/infos/initData', auth, (req, res) => {
  Info.findOne({ userId: req.user._id }, (err, user) => {
    if(err) return res.json({ success: false, err })
    if(!user) return res.json({ success: false, message: '해당하는 유저 정보가 없습니다'})
    return res.json({ success: true, isAuth: true, user });
  });
});
//infos에 데이터쓰기
app.post('/api/infos/initData', (req, res) => {
  const info = new Info(req.body);
  info.save(function(err, data) {
    if(err) return res.json({ success: false, insertInfo: false })
    return res.json({ suceess: true, message: '데이터를 성공적으로 추가했습니다' })
  });
});
//infos에 배열데이터 푸쉬 업데이트(메인데이터에 푸쉬, init정보 푸쉬)
app.post('/api/infos/pushData', (req, res) => {
  Info.findOneAndUpdate({ userId: req.body.userId }, { mainData: req.body.mainData }, (err, data) => {
    if(err) return res.json({ success: false, err })
    return res.json({ success: true, message: '데이터를 성공적으로 추가했습니다' })
  });
});
//inputBody 상태관리 -- 점보부분, 입추버튼부분, 숨겨진인풋부분
app.post('/api/infos/hidden', (req, res) => {
  Info.findOneAndUpdate({ userId: req.body.userId }, { hidden: req.body.hidden }, (err, data) => {
    if(err) return res.json({ success: false, err })
    return res.json({ success: true, hiddenFetch: true })
  });
});

app.listen(port, (err) => {
  if(err) return console.log(err)
  return console.log(`Server is Listening on PORT:${port}`)
});