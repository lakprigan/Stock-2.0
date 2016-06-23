/**
 * Created by PriyaArun on 6/21/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("EditOpinionController", EditOpinionController);

    function EditOpinionController($location, $routeParams, OpinionService) {
        var ViewModel = this;
        Initialize();

        function Initialize() {
            ViewModel.UserId = $routeParams.id;
            ViewModel.OpinionId = $routeParams.oid;
            ViewModel.UpdateOpinion = UpdateOpinion;
            ViewModel.SubmittedClass = "";
            OpinionService
                .FindOpinionById(ViewModel.OpinionId)
                .then(function (res) {
                    ViewModel.Opinion = res.data;
                })
        }


        function UpdateOpinion(opinion) {
            ViewModel.SubmittedClass = "submitted";
            if(opinion.title){
                OpinionService
                    .UpdateOpinion(ViewModel.OpinionId, opinion)
                    .then(function (res) {
                        $location.url("#/user/"+ViewModel.UserId+"/opinion");
                    },function (err) {
                        ViewModel.Error = "Unable to update the Opinion";
                    });
            }
            else {
                ViewModel.Error = "Please enter the highlighted field"
            }
        }
    }
})();