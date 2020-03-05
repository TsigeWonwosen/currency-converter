const config = require('../../../../config');
const path = require('path');
const logger = require('../../../../helpers/logger');
const response = require('../../../../helpers/response');
const moment = require('moment');
const xml2js = require('xml2js');
const fs =require ('fs');
const _ = require('lodash')

exports.convertCurrency = async (req, res) => {
    try{
        const { amount, src_currency, dest_currency, reference_date } = Object.keys(req.body).length? req.body: req.query;
           console.log("Query Length :>>>" ,Object.keys(req.body).length)
        if (!amount || !src_currency || !dest_currency) {
            throw new Error('Invalid input params')
        }

        if (isNaN (amount)) {
            throw new Error('amount is not a number type')
        }

        if (!moment(reference_date, "YYYY-MM-DD").isValid()) {
            throw new Error('reference_date is not a date type')
        }

        const fileData = fs.readFileSync(config.import_path,  'ascii');
        const parser = new xml2js.Parser();
        let json;
        parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
            json = result;
        });

        const content = json['gesmes:Envelope'].Cube[0].Cube;
        const filtered = content.filter(data => data["$"].time === reference_date);
        const newCube = {
            amount: "",
            currency: "EUR"
        };
        if (filtered) {
            filtered.map(value => {
                logger.info('filtred currency', value.Cube)
                value.Cube.filter(curRate => {
                    if(src_currency === dest_currency){
                        newCube.amount = amount;
                        newCube.currency = dest_currency
                        return newCube
                    }
                    else if (dest_currency === "EUR") {
                        if (curRate['$'].currency === src_currency) {
                            newCube.amount = amount / curRate['$'].rate;
                            return newCube
                        }
                    } else if (src_currency === "EUR" && dest_currency !== 'EUR') {
                        if (curRate['$'].currency === dest_currency) {
                            newCube.amount = amount * curRate['$'].rate
                            newCube.currency = dest_currency
                            return newCube
                        }
                    } else {
                        let srcInEuro = 0;
                        let srcInDes = 0;

                        if (curRate['$'].currency === src_currency) {
                            srcInEuro = amount / curRate['$'].rate;
                            logger.info("Rate : ", curRate['$'].rate, " src_currency :", src_currency, " srcInEuro : ", srcInEuro)
                            value.Cube.filter(curRateDes => {
                                if (curRateDes['$'].currency === dest_currency) {
                                    srcInDes = curRateDes['$'].rate * srcInEuro
                                    logger.info("Rate : ", curRateDes['$'].rate, " dest_currency :", dest_currency, " srcInDes", srcInDes, " srcInEuro ", srcInEuro)
                                    newCube.amount = srcInDes;
                                    newCube.currency = dest_currency;
                                    return newCube
                                }
                            })
                        }
                    }
                })
            });
        }

        return response.json(res, newCube)
    } catch (e) {
        logger.error('Error converting currency', e.message);
        return response.json(res, null, e.message);
    }
};
