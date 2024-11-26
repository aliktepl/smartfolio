const Comment = require('../models/commentsModel');

class CommentService {
    static async getCommentsByCoin(coin) {
        return await Comment.getTop(coin);
    }
}

module.exports = CommentService;