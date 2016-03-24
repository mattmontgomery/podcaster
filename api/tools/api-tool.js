var s3 = require('s3');
var slug = require('slug');
var Promise = require('bluebird');
var client = s3.createClient({
    maxAsyncS3: 20, // this is the default
    s3RetryCount: 3, // this is the default
    s3RetryDelay: 1000, // this is the default
    multipartUploadThreshold: 20971520, // this is the default (20 MB)
    multipartUploadSize: 15728640, // this is the default (15 MB)
    s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        // any other options are passed to new AWS.S3()
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
    },
});
module.exports = {
    getPodcast: function(podcastId) {

    },
    addEpisode: function(podcastId, episodeId, episodeData) {
        return new Promise(function(resolve, reject) {
            this.uploadFile(episodeData.file)
                .then(function(uploadData) {
                    console.log('Uploader: finished upload');
                    return resolve({
                        podcast: podcastId,
                        episode: episodeId,
                        episodeData: episodeData,
                        uploadData: uploadData,
                        status: 'success'
                    });
                })
                .error(function(error) {
                    console.log(error);
                    reject(error);
                });
        }.bind(this));
    },
    uploadFile: function(file) {
        return new Promise(function(resolve, reject) {
            var filename = file.originalname;
            var params = {
                localFile: file.path,

                s3Params: {
                    Bucket: "mmontgomery",
                    Key: filename,
                    // other options supported by putObject, except Body and ContentLength.
                    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
                },
            };
            var uploader = client.uploadFile(params);
            uploader.on('fileOpened', function() {
                console.log('Uploader: File opened', params.localFile)
            });
            uploader.on('fileClosed', function() {
                console.log('Uploader: File closed', params.localFile)
            });
            uploader.on('error', function(err) {
                console.log(err);
                reject(err);
            });
            uploader.on('progress', function() {
                console.log("progress", uploader.progressMd5Amount, uploader.progressAmount, uploader.progressTotal, ((uploader.progressAmount / uploader.progressTotal) * 100) + '%');
            });
            uploader.on('end', function(data) {
                console.log('Uploader: Ended', filename);
                resolve({
                    s3Data: data,
                    filename: filename
                });
            });
        });

    }
};
