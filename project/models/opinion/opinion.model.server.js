/**
 * Created by PriyaArun on 6/21/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var OpinionSchema = require("./opinion.schema.server.js")();
    var Opinion = mongoose.model("Opinion", OpinionSchema);

    var api = {
        FindAllOpinions: FindAllOpinions,
        CreateOpinion: CreateOpinion,
        DeleteOpinion: DeleteOpinion,
        FindOpinionById : FindOpinionById,
        UpdateOpinion: UpdateOpinion

        
    }
    return api;

    function FindAllOpinions(portfolioId) {
        return Opinion.find();
    }
    function CreateOpinion(opinion) {
        return Opinion.create(opinion);
    }
    function FindOpinionById(opinionId) {
        return Opinion.findById({"_id" : opinionId});
    }
    function UpdateOpinion(opinionId, opinion) {
        delete opinion._id;
        return Opinion.update({"_id": opinionId},
            {
                $set : opinion
            });
    }
    function DeleteOpinion(opinionId) {
        return Opinion.remove({"_id" : opinionId});
    }
}