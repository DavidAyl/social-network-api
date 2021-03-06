const { User, Thought } = require('../models');

module.exports = {
    // Get all Users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get a User
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.UserId })
            .select('-__v')
            .then((User) =>
                !User
                    ? res.status(404).json({ message: 'No User with that ID' })
                    : res.json(User)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a User
    createUser(req, res) {
        User.create(req.body)
            .then((User) => res.json(User))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Delete a User
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.UserId })
            .then((User) =>
                !User
                    ? res.status(404).json({ message: 'No User with that ID' })
                    : Thought.deleteMany({ _id: { $in: User.Thoughts } })
            )
            .then(() => res.json({ message: 'User and Thoughts deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // Update a User
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.UserId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((User) =>
                !User
                    ? res.status(404).json({ message: 'No User with this id!' })
                    : res.json(User)
            )
            .catch((err) => res.status(500).json(err));
    },
    createFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found at this id!' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found at this id!' });
                    return;
                }

                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    }
};
