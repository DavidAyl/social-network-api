const { Thought, User, Reaction } = require('../models');

module.exports = {
    // Get all Thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((Thoughts) => res.json(Thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get a Thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.ThoughtId })
            .select('-__v')
            .then((Thought) =>
                !Thought
                    ? res.status(404).json({ message: 'No Thought with that ID' })
                    : res.json(Thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a Thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((Thought) => res.json(Thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Delete a Thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.ThoughtId })
            .then((Thought) =>
                !Thought
                    ? res.status(404).json({ message: 'No Thought with that ID' })
                    : User.deleteMany({ _id: { $in: Thought.Users } })
            )
            .then(() => res.json({ message: 'Thought and Users deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // Update a Thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.ThoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((Thought) =>
                !Thought
                    ? res.status(404).json({ message: 'No Thought with this id!' })
                    : res.json(Thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thought found at this id!' });
                    return;
                }

                res.json(dbThoughtsData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts found at this id!' });
                    return;
                }

                res.json(dbThoughtsData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }

};
