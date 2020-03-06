const config = require('../../../../config');
const path = require('path');
const logger = require('../../../../helpers/logger');
const response = require('../../../../helpers/response');
const moment = require('moment');
const xml2js = require('xml2js');
const fs =require ('fs');
const _ = require('lodash')

exports.totalcurrency = async (req, res) => {
    
try{
        const fileData = fs.readFileSync(config.import_path,  'ascii');
        const parser = new xml2js.Parser();
        let json;
        parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
            json = result;
        });
        const content = json['gesmes:Envelope'].Cube[0].Cube;
        
        let NewCube = {
            date: "",
            cube:[]
    }
    let newCOntent;
                       
             newCOntent= content.map(res =>{
                        //    DateNew =  res['$'].time;
                             NewCube.date= res['$'].time;
                             NewCube.cube = res['Cube'].map(dd => dd['$'])
                            
                            return NewCube;
                        })
                            
                        
       
        response.json(res,newCOntent);
    } catch (e) {
        logger.error('Error converting currency', e.message);
        return response.json(res, null, e.message);
    }
};