const router = require('express').Router();
const { create } = require('domain');
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    createFriend,
    deleteFriend
} = require('../../controllers/userController');

// /api/Users
router.route('/').get(getUsers)
    .post(createUser);

// /api/Users/:UserId
router.route('/:UserId').get(getSingleUser).delete(deleteUser);

router.route('/:userId/friends/:friendId')
    .post(createFriend)
    .delete(deleteFriend);

module.exports = router;
