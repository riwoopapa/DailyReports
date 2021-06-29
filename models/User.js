const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


mongoose.set('useCreateIndex', true);

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minlength: 4,
    required: true
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
    required: true
  },
  address: String,
  phone: {
    type: Number,
    trim: true
  },
  token: String,
  tokenExp: {
    type: Number
  },
  role: {
    type: Number,
    default: 0
  },
  agreement: Boolean
});

//비밀번호 암호화 하기
userSchema.pre('save', function(next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) return next(err)
      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) return next(err)
        user.password = hash;
        next(); 
      });
    });
  } else {
    next();
  }
});
//비밀번호 비교하기
userSchema.methods.comparePassword = function(plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return cb(err)
    return cb(null, isMatch)
  });
};
//로그인시, 토큰생성해주기
userSchema.methods.generateToken = function(cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), '01a24b86c');
  user.token = token;
  user.save(function(err, user) {
    if(err) return cb(err)
    return cb(null, user)
  });
};

userSchema.statics.findByToken = function(token, cb) {
  var user = this;
  //token decode
  jwt.verify(token, '01a24b86c', function(err, decoded) {
    //유저 아이디를 이용해서 유저를 찾은 다음에
    //클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인
    user.findOne({ "_id": decoded, "token": token }, function(err, user) {
      if(err) return cb(err)
      return cb(null, user)
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };

// const user = {
//   _id: '1',
//   username: 'Kim'
// } //users 에 저장