/**
 * Created by PriyaArun on 6/19/16.
 */
(function () {
    angular
        .module("StockWatch")
        .factory("CommentService",CommentService);

    function CommentService($http) {
        var api = {
            FindCommentsByStockCode : FindCommentsByStockCode,
            CreateComment: CreateComment,
            DeleteCommentById: DeleteCommentById,
           };

        return api;

        function FindCommentsByStockCode(stockCode) {
            var url = "/api/stockwatch/comment/"+stockCode;
            return $http.get(url);
        }

        function CreateComment(comment) {
            var url = "/api/stockwatch/comment/";
            return $http.post(url, comment);
        }

        function DeleteCommentById(commentId) {
            var url = "/api/stockwatch/comment/" + commentId;
            return $http.delete(url);
        }
    }
})();
