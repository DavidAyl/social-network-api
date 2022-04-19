const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController.js');
const { create } = require('../../models/User.js');

// /api/Thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/Thoughts /: ThoughtId
router
    .route('/:ThoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reactions')
    .post(createReaction)

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)


module.exports = router;
