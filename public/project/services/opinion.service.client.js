/**
 * Created by PriyaArun on 6/21/16.
 */

(function () {
    angular
        .module("StockWatch")
        .factory("OpinionService",OpinionService);

    function OpinionService($http) {
        var api = {
            FindAllOpinions : FindAllOpinions,
            CreateOpinion: CreateOpinion,
            DeleteOpinion: DeleteOpinion,
            UpdateOpinion: UpdateOpinion,
            FindOpinionById: FindOpinionById
        };

        return api;

        function FindAllOpinions() {
            var url = "/api/stockwatch/opinion";
            return $http.get(url);
        }

        function FindOpinionById(opinionId) {
            var url = "/api/stockwatch/opinion/"+opinionId;
            return $http.get(url);
        }

        function UpdateOpinion(opinionId, opinion) {
            var url = "/api/stockwatch/opinion/"+opinionId;
            return $http.put(url, opinion);
        }

        function CreateOpinion(userId, opinion) {
            var url = "/api/stockwatch/user/"+userId+"/opinion";
            return $http.post(url, opinion);
        }

        function DeleteOpinion(opinionId) {
            var url = "/api/stockwatch/opinion/" + opinionId;
            return $http.delete(url);
        }
    }
})();
