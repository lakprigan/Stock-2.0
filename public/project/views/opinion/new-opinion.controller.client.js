/**
 * Created by PriyaArun on 6/21/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("NewOpinionController", NewOpinionController);

    function NewOpinionController($location, $routeParams, OpinionService, UserService, $rootScope) {
        var ViewModel = this;
        ViewModel.SubmittedClass = "";
        Initialize();
        function Initialize() {
            ViewModel.UserId = $rootScope.currentUser._id;;
            ViewModel.SubmittedClass = "";
            ViewModel.CreateOpinion = CreateOpinion;
            UserService.FindUserById(ViewModel.UserId)
                .then(function (res) {
                    ViewModel.User = res.data;
                },function (err) {
                    ViewModel.Error = "Could not retrieve the user"
                });
        }

        function CreateOpinion(opinion) {
            opinion.user = ViewModel.User;
            opinion.adviceDate = Date.now();
            ViewModel.SubmittedClass = "submitted";
            if(opinion.title){
                OpinionService
                    .CreateOpinion(ViewModel.UserId, opinion)
                    .then(function (res) {
                        $location.url("/user/"+ViewModel.UserId+"/opinion");
                    },function (err) {
                        ViewModel.Error = "Unable to create a new opinion";
                    });
            }
            else{
                ViewModel.Error="Please enter the highlighted fields"
            }}
    }
})();