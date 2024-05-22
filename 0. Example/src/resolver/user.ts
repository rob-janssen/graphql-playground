import { User } from "../model/user";

interface Args {
  id: string;
  username: string;
  email: string;
  password: string;
}

export const UsersResolver = {
  Query: {
    users: async () => {
      try {
        const users = await User.find({});
        if (!users) throw new Error("No users found");
        return {
          success: true,
          total: users.length,
          users,
        };
      } catch (e) {
        throw e;
      }
    },

    user: async (_: any, args: Args) => {
      try {
        if (!args.id) throw new Error("No ID provided.");
        const user = await User.findById(args.id);
        if (!user) throw new Error("No user found!");
        return user;
      } catch (e) {
        throw e;
      }
    },
  },

  Mutation: {
    regUser: async (_: any, args: Args) => {
      try {
        const user = await User.findOne({ email: args.email });
        if (user) throw new Error("User already exists.");

        const newUser = await User.create({
          username: args.username,
          email: args.email,
          password: args.password,
        });
        return newUser;
      } catch (e) {
        throw e;
      }
    },
    loginUser: async (_: any, args: Args) => {
      try {
        const user = await User.findOne({ email: args.email });
        if (!user) throw new Error("User not found!");
        const isValid = await user.isValidPassword(args.password);
        if (!isValid) throw new Error("Invalid password");
        return user;
      } catch (e) {
        throw e;
      }
    },
    updateUser: async(_: any, args: Args) => {
        try {
            const id = args.id;
            if(!id) throw new Error('No ID provided')
            const user = await User.findById(id)
            if(!user) throw new Error('User not found');

            const updateUser = await User.findByIdAndUpdate(id, {...args}, {new: true, runValidators: true})
            return updateUser;
        } catch(e) {
            throw e;
        }
    },
    deleteUser: async(_: any, args: Args) => {
        try {
            const id = args.id;
            if(!id) throw new Error('No ID provided');
            const user = User.findById(id);
            if(!user) throw new Error('No user found');
            const deleteUser = User.findByIdAndDelete(id);
            return {
                success: true,
                message: 'User deleted succesully',
            }
        } catch (e) {
            throw e;
        }
    }
  },
};
