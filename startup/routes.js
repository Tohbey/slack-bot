const express = require('express');
const { JsonResponse } = require("../lib/apiResponse");


module.exports = function(app){
    app.use(express.json({extended: true}));
    app.use(express.urlencoded({extended: true}));

    app.use((req, res, next) => {
        return JsonResponse(res, 404, "API endpoint not found")
    })
}