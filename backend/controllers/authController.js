import User from "../models/User.js"
export const signup = async (req, res) => {
    const {username, email, password } = req.body;
    const newUser = new User({username, email, password})
   try{
    await newUser.save()
    res.status(201).json("User created successfull")

   }catch(error) {
    res.status(500).json(error.message)
   }
        
};
