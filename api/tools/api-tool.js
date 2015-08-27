module.exports = {
    getPodcast: function(podcastId) {

    },
    uploadEpisode: function(podcastId, episodeId, episodeData) {
        return new Promise(function(resolve, reject) {
            resolve({
                podcast: podcastId,
                episode: episodeId,
                episodeData: episodeData,
                status: 'success'
            });
        });
    }
};
