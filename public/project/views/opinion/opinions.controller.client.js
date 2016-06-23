/**
 * Created by PriyaArun on 6/21/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("OpinionListController", OpinionListController);

    function OpinionListController($routeParams, OpinionService, $rootScope, $sce) {
        var ViewModel = this;
        ViewModel.currentUser = $rootScope.currentUser;
        ViewModel.GetSafeHtml = GetSafeHtml;
        ViewModel.DeleteOpinion = DeleteOpinion;
        Initialize();

        function Initialize() {
            ViewModel.UserId = $routeParams.id;
            OpinionService
                .FindAllOpinions()
                .then(function (response) {
                    ViewModel.Opinions = response.data;
                });
        }

        function DeleteOpinion(opinion) {
            OpinionService
                .DeleteOpinion(opinion._id)
                .then(function (res) {
                    Initialize();
                },function (err) {
                    ViewModel.Error = "could not delete the opinion!"
                })
        }
        function GetSafeHtml(text) {
            return $sce.trustAsHtml(text);
        }
    }
})();