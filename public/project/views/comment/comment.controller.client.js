/**
 * Created by PriyaArun on 6/18/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("CommentController", CommentController);

    function CommentController(CommentService, StockService, $routeParams, $rootScope) {

        var ViewModel = this;

        ViewModel.currentUser = $rootScope.currentUser;
        ViewModel.UserId = $routeParams.id;
        ViewModel.PortfolioId = $routeParams.pid;
        ViewModel.StockId = $routeParams.sid;
        ViewModel.CreateComment = CreateComment;
        Initialize();

        function Initialize() {

            StockService
                .FindStockById(ViewModel.StockId)
                .then(function (res) {
                    ViewModel.Stock = res.data;
                    CommentService
                        .FindCommentsByStockCode(ViewModel.Stock.code)
                        .then(function (response) {
                            ViewModel.Comments = response.data;
                        }, function (err) {
                            ViewModel.Error = "unable to retrieve the user"
                        });
                });


        }

        function CreateComment(comment) {
            comment.username = ViewModel.currentUser.username;
            comment.code = ViewModel.Stock.code;
            CommentService
                .CreateComment(comment)
                .then(function (res) {
                    Initialize();
                },function (err) {
                    ViewModel.Error = "Unable to update the comment"
                })
        }
    }

    

})();
