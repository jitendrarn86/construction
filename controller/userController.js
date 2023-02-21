require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Follow = require('../models/Follow');
const Mint = require('../models/Mint');
const { signInToken, tokenForVerify, sendEmail } = require('../config/auth');

const verifyEmailAddress = async (req, res) => {
  const isAdded = await User.findOne({ email: req.body.email });
  if (isAdded) {
    return res.status(403).send({
      message: 'This Email already Added!',
    });
  } else {
    const token = tokenForVerify(req.body);
    const body = {
      from: process.env.EMAIL_USER,
      to: `${req.body.email}`,
      subject: 'Email Activation',
      subject: 'Verify Your Email',
      html: `<h2>Hello ${req.body.email}</h2>
      <p>Verify your email address to complete the signup and login into your <strong>KachaBazar</strong> account.</p>

        <p>This link will expire in <strong> 15 minute</strong>.</p>

        <p style="margin-bottom:20px;">Click this link for active your account</p>

        <a href=${process.env.STORE_URL}/user/email-verification/${token} style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Verify Account</a>

        <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@kachabazar.com</p>

        <p style="margin-bottom:0px;">Thank you</p>
        <strong>Kachabazar Team</strong>
             `,
    };

    const message = 'Please check your email to verify!';
    sendEmail(body, res, message);
  }
};

const registerUser = async (req, res) => {
  const token = req.params.token;
  const { name, email, password } = jwt.decode(token);
  const isAdded = await User.findOne({ email: email });

  if (isAdded) {
    const token = signInToken(isAdded);
    return res.send({
      token,
      name: isAdded.name,
      email: isAdded.email,
      message: 'Email Already Verified!',
    });
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_FOR_VERIFY, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: 'Token Expired, Please try again!',
        });
      } else {
        const newUser = new User({
          name,
          email,
          password: bcrypt.hashSync(password),
        });
        newUser.save();
        const token = signInToken(newUser);
        res.send({
          token,
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          message: 'Email Verified, Please Login Now!',
        });
      }
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
//bcrypt.compareSync(req.body.password, user.password);
    if (
      user &&
      user.password ==req.body.password
    ) {
      const token = signInToken(user);
	 
      res.send({token:token,status:"success",data:{
        token,
        _id: user._id,
       // name: user.name,
        email: user.email,
      //  address: user.address,
      //  phone: user.phone,
       // image: user.image,
      }});
    } else {
		  

      res.status(401).send({
        message: 'Invalid user or password!',
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const forgetPassword = async (req, res) => {
  const isAdded = await User.findOne({ email: req.body.verifyEmail });
  if (!isAdded) {
    return res.status(404).send({
      message: 'User Not found with this email!',
    });
  } else {
    const token = tokenForVerify(isAdded);
    const body = {
      from: process.env.EMAIL_USER,
      to: `${req.body.verifyEmail}`,
      subject: 'Password Reset',
      html: `<h2>Hello ${req.body.verifyEmail}</h2>
      <p>A request has been received to change the password for your <strong>Kachabazar</strong> account </p>

        <p>This link will expire in <strong> 15 minute</strong>.</p>

        <p style="margin-bottom:20px;">Click this link for reset your password</p>

        <a href=${process.env.STORE_URL}/user/forget-password/${token} style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Reset Password</a>

        <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@kachabazar.com</p>

        <p style="margin-bottom:0px;">Thank you</p>
        <strong>Kachabazar Team</strong>
             `,
    };

    const message = 'Please check your email to reset password!';
    sendEmail(body, res, message);
  }
};

const resetPassword = async (req, res) => {
  const token = req.body.token;
  const { email } = jwt.decode(token);
  const user = await User.findOne({ email: email });

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_FOR_VERIFY, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          message: 'Token expired, please try again!',
        });
      } else {
        user.password = bcrypt.hashSync(req.body.newPassword);
        user.save();
        res.send({
          message: 'Your password change successful, you can login now!',
        });
      }
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user.password) {
      return res.send({
        message:
          'For change password,You need to sign in with email & password!',
      });
    } else if (
      user &&
      bcrypt.compareSync(req.body.currentPassword, user.password)
    ) {
      user.password = bcrypt.hashSync(req.body.newPassword);
      await user.save();
      res.send({
        message: 'Your password change successfully!',
      });
    } else {
      res.status(401).send({
        message: 'Invalid email or current password!',
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const signUpWithProvider = async (req, res) => {
  try {
    const isAdded = await User.findOne({ email: req.body.email });
    if (isAdded) {
      const token = signInToken(isAdded);
      res.send({
        token,
        _id: isAdded._id,
        name: isAdded.name,
        email: isAdded.email,
        address: isAdded.address,
        phone: isAdded.phone,
        image: isAdded.image,
      });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        image: req.body.image,
      });

      const user = await newUser.save();
      const token = signInToken(user);
      res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    /*const users = await User.find({}).sort({ _id: -1 });
    res.send(users);*/
	const users = await User.find({}).sort({ _id: -1 });
	let items1=[];
	for(var i=0;i<users.length;i++){
		const followers = await Follow.find({ is_followed: 1,to_user: users[i].userwallet});
        const followed = await Follow.find({ is_followed: 1,from_user: users[i].userwallet});
		const created = await Mint.find({ wallet_address:users[i].userwallet});

      var obj = {};
      if(users[i].name==''){
        
      obj['banner'] =users[i].banner;
      obj['createdAt'] = users[i].createdAt;
      obj['email'] =users[i].email;
      obj['image'] = users[i].image;
      obj['name'] = users[i].name;
      obj['updatedAt'] = users[i].updatedAt;        
      obj['userwallet'] = users[i].userwallet;
      obj['_v'] = users[i]._v;
      obj['_id'] = users[i]._id;      
      obj['followers'] = followers.length;
      obj['followed'] = followed.length;
      obj['created'] = created.length;
      

      items1.push(obj);
 
         
      }else{
         //const myf = await Follow.findOne({ from_user: req.body.from_user ,to_user: users[i].userwallet});
         obj['address']= users[i].address;
         obj['banner']=  users[i].banner;
         obj['createdAt']=   users[i].createdAt;
         obj['description']=  users[i].description;
         obj['email']=  users[i].email;
         obj['first_name']= users[i].first_name;
         obj['gender']=  users[i].gender;
         obj['image']=   users[i].image;
         obj['last_name']=  users[i].last_name;
         obj['name']=   users[i].name;
         obj['phone']=  users[i].phone;
         obj['updatedAt']=  users[i].updatedAt;
         obj['username']=  users[i].username;
         obj['userwallet']=  users[i].userwallet;
         obj['_v']=  users[i]._v;
         obj['_id']=  users[i]._id;
         obj['followers'] = followers.length;
		 obj['followed'] = followed.length;
		 obj['created'] = created.length;
         items1.push(obj);
         //items1.push(obj);
   
      }

   }
    res.send(items1);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllMyUsers = async (req, res) => {
	console.log(req.body);
  try {
    const users = await User.find({}).sort({ _id: -1 });
	
	let items1=[];
	for(var i=0;i<users.length;i++){
	

      var obj = {};
      if(users[i].name==''){
        const myf = await Follow.findOne({ from_user: req.body.from_user ,to_user: users[i].userwallet});
      obj['banner'] =users[i].banner;
      obj['createdAt'] = users[i].createdAt;
      obj['email'] =users[i].email;
      obj['image'] = users[i].image;
      obj['name'] = users[i].name;
      obj['updatedAt'] = users[i].updatedAt;        
      obj['userwallet'] = users[i].userwallet;
      obj['_v'] = users[i]._v;
      obj['_id'] = users[i]._id;
      if(myf){
      obj['is_liked'] = myf.is_liked;
      obj['is_followed'] = myf.is_followed;
      }

      items1.push(obj);
 
         
      }else{
         const myf = await Follow.findOne({ from_user: req.body.from_user ,to_user: users[i].userwallet});
         obj['address']= users[i].address;
         obj['banner']=  users[i].banner;
         obj['createdAt']=   users[i].createdAt;
         obj['description']=  users[i].description;
         obj['email']=  users[i].email;
         obj['first_name']= users[i].first_name;
         obj['gender']=  users[i].gender;
         obj['image']=   users[i].image;
         obj['last_name']=  users[i].last_name;
         obj['name']=   users[i].name;
         obj['phone']=  users[i].phone;
         obj['updatedAt']=  users[i].updatedAt;
         obj['username']=  users[i].username;
         obj['userwallet']=  users[i].userwallet;
         obj['_v']=  users[i]._v;
         obj['_id']=  users[i]._id;
         if(myf){
            obj['is_liked'] = myf.is_liked;
            obj['is_followed'] = myf.is_followed;
            }
         items1.push(obj);
         //items1.push(obj);
   
      }

   }
    res.send(items1);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getUserByWalletAddress = async (req, res) => {
  try {
	 //console.log( req.params.wallet);
    const user = await User.findOne({ userwallet: req.params.wallet });
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const followerCount = async (req, res) => {
  try {
	 //console.log( req.params.wallet);
    const user = await Follow.find({ to_user: req.params.wallet,is_followed:1 });
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const likedCount = async (req, res) => {
  try {
	 //console.log( req.params.wallet);
    const user = await Follow.find({ to_user: req.params.wallet,is_liked:1 });
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const followedCount = async (req, res) => {
  try {
	 //console.log( req.params.wallet);
    const user = await Follow.find({from_user:req.params.wallet,is_followed:1 });
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};




const getIsFollowed = async (req, res) => {
  try {
	 //console.log( req.params.wallet);
    const user = await Follow.findOne({ from_user: req.body.from_user ,to_user: req.body.to_user});
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const followUser = async (req, res) => {
  try {
	 let updatedUser;
	 if(req.body.type=='like'){
		 const has_liked = await Follow.findOne({ from_user: req.body.from_user ,to_user: req.body.to_user,is_liked:1});
		 if(has_liked){
			 //const newFollow = new Follow(req.body);
					has_liked.from_user = req.body.from_user;
					has_liked.to_user = req.body.to_user;
					has_liked.is_liked = 0;
					has_liked.is_followed = has_liked.is_followed;					
					updatedUser = await has_liked.save();
			 
		 }else{
			 const not_liked = await Follow.findOne({ from_user: req.body.from_user ,to_user: req.body.to_user,is_liked:0}); 
			 if(not_liked){
				 //const newFollow = new Follow(req.body);
					not_liked.from_user = req.body.from_user;
					not_liked.to_user = req.body.to_user;
					not_liked.is_liked = 1;
					not_liked.is_followed = not_liked.is_followed;					
					updatedUser = await not_liked.save();
				 
			 }else{
				 const newFollow = new Follow(req.body);
					newFollow.from_user = req.body.from_user;
					newFollow.to_user = req.body.to_user;
					newFollow.is_liked = 1;
					newFollow.is_followed = 0;
					//var myobj = { from_user:req.body.from_user, to_user: req.body.to_user, is_liked:1,is_followed:0};
					updatedUser = await newFollow.save();
			 }
		 }
	 }
	 if(req.body.type=='follow'){
		 const has_liked = await Follow.findOne({ from_user: req.body.from_user ,to_user: req.body.to_user,is_followed:1});
		 if(has_liked){
			 //const newFollow = new Follow(req.body);
					has_liked.from_user = req.body.from_user;
					has_liked.to_user = req.body.to_user;
					has_liked.is_liked = has_liked.is_liked;
					has_liked.is_followed = 0;					
					updatedUser = await has_liked.save();
			 
		 }else{
			 const not_liked = await Follow.findOne({ from_user: req.body.from_user ,to_user: req.body.to_user,is_followed:0}); 
			 if(not_liked){
				 //const newFollow = new Follow(req.body);
					not_liked.from_user = req.body.from_user;
					not_liked.to_user = req.body.to_user;
					not_liked.is_liked = not_liked.is_liked;
					not_liked.is_followed = 1;					
					updatedUser = await not_liked.save();
				 
			 }else{
					const newFollow = new Follow(req.body);
					newFollow.from_user = req.body.from_user;
					newFollow.to_user = req.body.to_user;
					newFollow.is_liked = 0;
					newFollow.is_followed = 1;	
						
					updatedUser = await newFollow.save();
			 }
		 }
	 }
   
    res.send(updatedUser);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const addMyUser = async (req, res) => {
  try {
	  console.log('req.body');
	  console.log(req.body);
	  const newUser = new User(req.body);
    await newUser.save();
	
   /* const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      user.address = req.body.address;
      user.phone = req.body.phone;
      user.image = req.body.image;
      const updatedUser = await user.save();
      const token = signInToken(updatedUser);
      res.send({
        token,
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        address: updatedUser.address,
        phone: updatedUser.phone,
        image: updatedUser.image,
      });
    }*/
	res.send({
       
        success: true,
		message:'User Register Sucessfully'
        
      });
  } catch (err) {
	  console.log(err);
    res.status(404).send({
      message: 'Data not saved!',
    });
  }
};

const updateProfile = async (req, res) => {
  try {
	  console.log('updateProfile');
	  console.log(req.body);
	  const user = await User.findOne({ userwallet: req.body.wallet_address });
	  
		if (user) {
			user.first_name = req.body.f_name;
			user.last_name = req.body.l_name;
			user.name = req.body.f_name+' '+req.body.l_name;
			user.email = req.body.mid;
			user.description = req.body.description;
			user.gender = req.body.g_select;
			user.dob = req.body.dob;
			user.username = req.body.uname;
			user.phone = req.body.phone;
			user.address = req.body.location;
			user.image = req.body.image;
			user.banner = req.body.banner;
      
			const updatedUser = await user.save();
	   }
   /* const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      user.address = req.body.address;
      user.phone = req.body.phone;
      user.image = req.body.image;
      const updatedUser = await user.save();
      const token = signInToken(updatedUser);
      res.send({
        token,
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        address: updatedUser.address,
        phone: updatedUser.phone,
        image: updatedUser.image,
      });
    }*/
	res.send({
       
        success: true,
		message:'Profile updated Sucessfully'
        
      });
  } catch (err) {
    res.status(404).send({
      message: 'Your email is not valid!',
    });
  }
};


const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      user.address = req.body.address;
      user.phone = req.body.phone;
      user.image = req.body.image;
      const updatedUser = await user.save();
      const token = signInToken(updatedUser);
      res.send({
        token,
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        address: updatedUser.address,
        phone: updatedUser.phone,
        image: updatedUser.image,
      });
    }
  } catch (err) {
    res.status(404).send({
      message: 'Your email is not valid!',
    });
  }
};

const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'User Deleted Successfully!',
      });
    }
  });
};

module.exports = {
  loginUser,
  registerUser,
  signUpWithProvider,
  verifyEmailAddress,
  forgetPassword,
  changePassword,
  resetPassword,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addMyUser,
  getUserByWalletAddress,
  updateProfile,
  getIsFollowed,
  followUser,
  getAllMyUsers,
  followerCount,
  likedCount,
  followedCount
};
