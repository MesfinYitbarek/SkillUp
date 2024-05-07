import userSchema from "../models/User.js"
export const signup = (req, res) => {
    userSchema.create(req.body)
    .then(User => res.json(User))
    .catch(err => res.json(err))
};
