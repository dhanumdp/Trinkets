import express from 'express';
import User from '../models/userModel';
import { getToken, isAuth } from '../util';

const router = express.Router();

router.put('/:id', isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});

router.post('/signin', (req, res) => {
  // const signinUser = await User.findOne({
  //   email: req.body.email,
  //   password: req.body.password,
  // });
  // if (signinUser) {
  //   res.send({
  //     _id: signinUser.id,
  //     name: signinUser.name,
  //     email: signinUser.email,
  //     isAdmin: signinUser.isAdmin,
  //     token: getToken(signinUser),
  //   });
  // } else {
  //   res.send({ message: 'Invalid Email or Password.' });
  // }

  User.findOne({email:req.body.email}).then((user)=>{
    console.log(user)
    if(user.password!=req.body.password)
    {
      res.send({message:'Incorrect Password'})
    } 
    else
    {
      res.send({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: getToken(user),
      });
      console.log("ah")
    }
  }).catch((err)=>{
    res.send({ message: 'User Not Found.' });
  })
}); 

router.post('/register', (req, res) => {
  // const user = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  // });
  
  // if (newUser) {
  //   res.send({
  //     _id: newUser.id,
  //     name: newUser.name,
  //     email: newUser.email,
  //     isAdmin: newUser.isAdmin,
  //     token: getToken(newUser),
  //   });
  // } else {
  //   res.status(401).send({ message: 'Invalid User Data.' });
  // }

  User.findOne({email:req.body.email}).then((user)=>{
    if(user)
    {
      res.send({error :true,message:"This email is Already Registered"})
    }
    else
    {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      newUser.save().then((doc)=>{
        res.send({error : false,message:'User Registered Successfully'})  
      }).catch((err)=>{
        res.send({error : true, message:'Invalid User Data '+err});
      })
    }
  })
});

router.post('/createadmin', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ message: error.message });
  }
});

export default router;
