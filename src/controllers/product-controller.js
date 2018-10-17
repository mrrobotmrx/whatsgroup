'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-reprository');
const azure = require('azure-storage');
const guid = require('guid');
var config = require('../config');
const emailService = require('../services/email-service');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get(req.query.lastid);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getapv = async (req, res, next) => {
    try {
        var data = await repository.getapv(req.query.lastid);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getAlta = async (req, res, next) => {
    try {
        var data = await repository.getAlta();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.plus = async (req, res, next) => {
    try {
        var lastid = req.query.lastid;
        var data = await repository.plus(lastid);
        res.status(200).send(data);
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.plusapv = async (req, res, next) => {
    try {
        var lastid = req.query.lastid;
        var data = await repository.plusapv(lastid);
        res.status(200).send(data);
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getSearch = async (req, res, next) => {
    try {
        var q = req.query.q;
        console.log(q);
        var data = await repository.search(q);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getSearchplus = async (req, res, next) => {
    try {
        var q = req.query.q;
        var lastid = req.query.lastid;
        console.log(q);
        var data = await repository.searchplus(lastid, q);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.catplus = async (req, res, next) => {
    try {
        var lastidcateg = req.query.lastid;
        var id = req.query.id;
        console.log(lastidcateg, id)
        var data = await repository.catplus(lastidcateg, id);
        res.status(200).send(data);
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getByCateg = async (req, res, next) => {
    try {
        var data = await repository.getByCateg(req.query.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 10, 'A descrição deve conter pelo menos 10 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        const blobSvc = azure.createBlobService(config.containerConnectionString);
        
        let filename = guid.raw().toString() + '.jpg';
        let rawdata = req.body.image;
        let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let type = matches[1];
        let buffer = new Buffer(matches[2], 'base64');

        // Salva a imagem
        await blobSvc.createBlockBlobFromText('groups-images', filename, buffer, {
            contentType: type
        }, function (error, result, response) {
            if (error) {
                filename = 'defaut.jpg'
            }
        });

        await repository.create({
            title: req.body.title,
            description: req.body.description,
            active: false,
            convite: req.body.convite,
            idcategory: req.body.idcategory,
            visit: 0,
            email: req.body.email,
            image: 'https://whatsgroup.blob.core.windows.net/groups-images/' + filename
        });
        emailService.send(
            'candidoismail@gmail.com',
            'Um Grupo Espera Por Aprovação.',
            global.EMAIL_TMPL.replace('{0}', req.body.title));

        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'error aqui mano'
        });
    }
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.putapv = async (req, res, next) => {
    try {
        await repository.updateapv(req.params.id, req.body);
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        var id = req.params.id;
        console.log(id)
        await repository.delete(id)
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};