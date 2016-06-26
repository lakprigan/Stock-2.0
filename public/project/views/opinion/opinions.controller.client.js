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
                    var temp = response.data;
                    ViewModel.Opinions = [];
                    angular.forEach(temp, function (value, key) {
                        var include = false;
                        if(value.user.username === ViewModel.currentUser.username)
                            include = true;
                        angular.forEach(ViewModel.currentUser.circle, function (name, index) {
                            if(name === value.user.username)
                                include = true;
                        });
                        if(include)
                            ViewModel.Opinions.push(value);
                    })
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