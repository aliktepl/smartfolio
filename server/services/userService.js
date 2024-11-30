


// services/userService.js
const User = require('../models/userModel');


class UserService {

  static async addUser(profile){
    const id  = profile.id
    const name  = profile.displayName

    const res =  await User.add(id,name)
  }

  // Additional service methods can be added here
}

module.exports = UserService;



