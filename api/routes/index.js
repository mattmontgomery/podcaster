var express = require('express');
var router = express.Router();
var _ = require('lodash');
var apiTool = require('../tools/api-tool');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var authenticationMiddleware = function(req, res, next) {
    if(_.isObject(req.headers) && req.headers['authentication-token']) {
        var token = req.headers['authentication-token'];
        // check token against db
    }
    next();
};

router.get('/',
    authenticationMiddleware,
    function(req, res) {
        res.json({
            api: 'v1.0.0'
        });
    }
);

router.get('/podcasts',
    authenticationMiddleware,
    function(req, res) {
        res.json({
            podcasts: []
        })
    }
);

router.get('/podcasts/:id',
    authenticationMiddleware,
    function(req, res) {
        res.json({
            podcast: {}
        })
    }
);

router.get('/podcasts/:id/episodes',
    authenticationMiddleware,
    function(req, res) {
        res.json({
            podcast: {},
            episodes: []
        })
    }
);

router.post('/podcasts/:id/episodes/:episodeId/upload',
    authenticationMiddleware,
    upload.single('file'),
    function(req, res) {
        apiTool.uploadEpisode(
            req.params.id,
            req.params.episodeId,
            {
                file: req.file,
            }
        )
        .then(function(data) {
            res.json(data);
        })
    }
);

router.get('/v1/')

module.exports = router;
