const CommentService = require('../services/commentsService');

exports.getCommentsByCoin = async (req, res) => {
    try {
        const comments = await CommentService.getCommentsByCoin(req.params.id);
        // Send the comments data as a JSON response
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving comments' });
    }
};
