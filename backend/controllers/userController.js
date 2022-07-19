import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = expressAsyncHandler(async(request, response) => {
   const { email, password } = request.body;

   const user = await User.findOne({ email })

   if(user && (await user.matchPassword(password))) {
       response.json({
           _id: user._id,
           name: user.name,
           email: user.email,
           isAdmin: user.isAdmin,
           token: generateToken(user._id)
       })

       console.log(user);
   } else {
       response.status(401)
       throw new Error("Invalid email or password")
   }
})

// @desc    Register a new User
// @route   POST /api/users
// @access  Public

const registerUser = expressAsyncHandler(async(request, response) => {
    const { name, email, password } = request.body;
 
    const userExists = await User.findOne({ email })
 
    if(userExists) {
        response.status(400);
        throw new Error("User already exists")
    }

    const user = await User.create({
        name,
        email, 
        password, 
    })

    if(user) {
        response.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        response.status(400)
        throw new Error("Invalid user data")
    }
 })

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = expressAsyncHandler(async(request, response) => {
    const user = await User.findById(request.user._id);

    if (user) {
        response.json({
            _id: user._id,
           name: user.name,
           email: user.email,
           isAdmin: user.isAdmin,
        })
    } else {
        response.status(404);
        throw new Error("User not found")
    }
    console.log(user);
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private

const updateUserProfile = expressAsyncHandler(async(request, response) => {
    const user = await User.findById(request.user._id);

    if (user) {
        user.name = request.body.name || user.name
        user.email = request.body.email || user.email
        if(request.body.password) {
            user.password = request.body.password
        }

    const updateUser = await user.save();

    response.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser._id)
    })
    } else {
        response.status(404);
        throw new Error("User not found")
    }
    console.log(user);
})


// @desc    GET all users
// @route   GET /api/users
// @access  Private/Admin

const getUsers = expressAsyncHandler(async(request, response) => {
    const users = await User.find({});
    
    response.json(users)
})

// @desc    Delete a user
// @route   Delete /api/users/:id
// @access  Private/Admin

const deleteUser = expressAsyncHandler(async(request, response) => {
    const user = await User.findById(request.params.id);
    
    if(user) {
        await user.remove();
        response.json({ message: "User deleted" });
    } else {
        response.status(401);
        throw new Error("User not found");
    }
})

// @desc    GET user by id
// @route   GET /api/users/:id
// @access  Private/Admin

const getUserById = expressAsyncHandler(async(request, response) => {
    const user = await User.findById(request.params.id).select("-password");
    if(user) {
        response.json(user)
    } else {
        response.status(401);
        throw new Error("User not found");
    }
})


// @desc    Update user 
// @route   PUT /api/users/:id
// @access  Private/Admin

const updateUser = expressAsyncHandler(async(request, response) => {
    const user = await User.findById(request.params.id);

    if (user) {
        user.name = request.body.name || user.name
        user.email = request.body.email || user.email
        user.isAdmin = request.body.isAdmin 

        const updateUser = await user.save();

        response.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        })
    } else {
        response.status(404);
        throw new Error("User not found")
    }
    console.log(user);
})



export { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser }