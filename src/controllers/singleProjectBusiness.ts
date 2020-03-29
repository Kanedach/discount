import {NextFunction, Request, Response} from 'express';
import {
    SingleProjectBusiness,
    SingleProjectBusinessDocument,
    SingleProjectBusinessInterface
} from './../models/SingleProjectBusiness';
import logger from '../util/logger';
import {Error, MongooseDocument} from 'mongoose';
import {WriteError} from 'mongodb';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        export interface Request {
            singleProjectBusiness: SingleProjectBusinessInterface;
        }
    }
}

export const getAllSecure = (req: Request, res: Response, next: NextFunction) => {
    SingleProjectBusiness.find({}, (err, singleProjectBusiness) => {
        if (err) {
            return next(err);
        }
        res.status(200).json(singleProjectBusiness);
        logger.debug('Get all Secure');
    });
};

export const getAllPublic = (req: Request, res: Response, next: NextFunction) => {
    SingleProjectBusiness.find({}, (error, singleProjectBusiness) => {
        if (error) {
            return next(error);
        }
        res.status(200).json(singleProjectBusiness);
        logger.debug('Get all Secure');
    }).select(['name', 'address', 'socketState', 'island', 'processingStatus', 'connectKit', 'enterDate', 'stagesState', 'socketHyperlink', 'comment']);
};

export const searchSecure = (req: Request, res: Response, next: NextFunction) => {
    const searchTerm = req.params.term;
    SingleProjectBusiness.find({
        $text: {
            $search: searchTerm
        }
    }).exec((error: Error, singleProjectBusiness: MongooseDocument, next: NextFunction) => {
        if (error) {
            res.sendStatus(400);
        }
        res.status(200).json(singleProjectBusiness);
    });
};

export const searchPublic = (req: Request, res: Response, next: NextFunction) => {
    const searchTerm = req.params.term;
    SingleProjectBusiness.find({
        $text: {
            $search: searchTerm
        }
    }).select(['name', 'address', 'socketState', 'island', 'processingStatus', 'connectKit', 'enterDate', 'stagesState', 'socketHyperlink', 'comment'])
        .exec((error: Error, singleProjectBusiness: MongooseDocument, next: NextFunction) => {
            if (error) {
                res.sendStatus(400);
            }
            res.status(200).json(singleProjectBusiness);
        });
};

export const createSingleProjectBusiness = (req: Request, res: Response, next: NextFunction) => {

    const singleProjectBusiness = new SingleProjectBusiness({
        name: req.body.name,
        address: {
            street: req.body.address.street,
            streetNumber: req.body.address.streetNumber,
            zip: req.body.address.zip,
            city: req.body.address.city
        },
        socketState: req.body.socketState,
        island: req.body.island,
        processingStatus: req.body.processingStatus,
        contact: {
            supervisor: req.body.contact.supervisor,
            representative: req.body.contact.representative,
            rla: req.body.contact.rla,
        },
        connectKit: req.body.connectKit,
        enterDate: req.body.enterDate,
        stagesState: req.body.stagesState,
        socketHyperlink: req.body.socketHyperlink,
        comment: req.body.comment,
        create: Date.now()
    });
    singleProjectBusiness.save((error) => {
        if (error) {
            res.status(500).send(error);
            return next(error);
        }
        res.status(201).send(singleProjectBusiness);
    });
};


export const updateSingleProjectBusiness = (req: Request, res: Response, next: NextFunction) => {
    const singleProjectBusinessID = req.params.id;
    SingleProjectBusiness.findById(singleProjectBusinessID, (error, singleProjectBusiness: SingleProjectBusinessDocument) => {
        if (error) {
            res.status(404).send(error);
            return next(error);
        }

        singleProjectBusiness.name = req.body.name;
        singleProjectBusiness.address.street = req.body.address.street;
        singleProjectBusiness.address.streetNumber = req.body.address.streetNumber;
        singleProjectBusiness.address.zip = req.body.address.zip;
        singleProjectBusiness.address.city = req.body.address.city;
        singleProjectBusiness.socketState = req.body.socketState;
        singleProjectBusiness.island = req.body.island;
        singleProjectBusiness.processingStatus = req.body.processingStatus;
        singleProjectBusiness.contact.supervisor = req.body.contact.supervisor;
        singleProjectBusiness.contact.representative = req.body.contact.representative;
        singleProjectBusiness.contact.rla = req.body.contact.rla;
        singleProjectBusiness.connectKit = req.body.connectKit;
        singleProjectBusiness.enterDate = req.body.enterDate || '';
        singleProjectBusiness.stagesState = req.body.stagesState;
        singleProjectBusiness.socketHyperlink = req.body.socketHyperlink;
        singleProjectBusiness.comment = req.body.comment;
        singleProjectBusiness.save((error: WriteError) => {
            if (error) {
                res.status(406).send(error);
                return next(error);
            }
            res.status(200).send(singleProjectBusiness);
        });
    });
};

export const getSecure = (req: Request, res: Response, next: NextFunction) => {
    const singleProjectBusinessID = req.params.id;
    SingleProjectBusiness.findById(singleProjectBusinessID, (err, singleProjectBusiness) => {
        if (err) {
            res.status(400).send(err);
            return next(err);
        }
        if(singleProjectBusiness) {
            res.status(200).send(singleProjectBusiness);
        } else {
            res.sendStatus(404);
        }
    });
};

export const deleteSecure = (req: Request, res: Response, next: NextFunction) => {
    const singleProjectBusinessID = req.params.id;
    SingleProjectBusiness.findByIdAndRemove(singleProjectBusinessID, (err, singleProjectBusiness) => {
        if (err) {
            res.status(400).send(err);
            return next(err);
        }
        if(singleProjectBusiness) {
            res.sendStatus(204);
            logger.debug('Delete Secure: '+singleProjectBusinessID);
        } else {
            res.sendStatus(404);
        }

    });
};
