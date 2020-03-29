import mongoose from 'mongoose';

export type SingleProjectBusinessDocument = mongoose.Document & {
    name: string;
    address: {
        street: string;
        streetNumber: string;
        zip: number;
        city: string;
    };
    socketState: string;
    island: string;
    processingStatus: string;
    contact: {
        supervisor: string;
        representative: string;
        rla: string;
    };
    connectKit: string;
    enterDate: Date;
    stagesState: string;
    socketHyperlink: string;
    comment: string;
    create: Date;
    update: Date;
}

const SingleProjectBusinessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        trim: true
    },
    address: {
        street: {
            type: String,
            required: true,
            trim: true
        },
        streetNumber: {
            type: String,
            required: true,
            trim: true
        },
        zip: {
            type: Number,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        }
    },
    socketState: {
        type: String,
        enum: ['OTO Ready' , 'Fiber Ready' , 'no state' , 'Unknown'],
        default: 'Unknown',
        required: false,
        trim: true
    },
    island: {
        type: String,
        enum: ['Central', 'West', 'East', 'South'],
        trim: true
    },
    processingStatus: {
        type: String,
        enum: ['Construction', 'Approved', 'Supported'],
        required: false,
        trim: true
    },
    contact: {
        supervisor: {
            type: String,
            required: false,
            trim: true
        },
        representative: {
            type: String,
            required: false,
            trim: true
        },
        rla: {
            type: String,
            required: false,
            trim: true
        }
    },
    connectKit: {
        type: String,
        enum: ['Yes', 'No', 'Unknown'],
        default: 'Unknown',
        required: false,
        trim: true
    },
    enterDate: {
        type: Date,
        required: false,
        trim: true
    },
    stagesState: {
        type: Boolean,
        default: false,
        required: false
    },
    socketHyperlink: {
        type: String,
        required: false,
        trim: true
    },
    comment: {
        type: String,
        required: false,
        trim: true
    },
    create: {
        type: Date,
        required: false
    },
    update: {type: Date, default: Date.now}
});

SingleProjectBusinessSchema.index({'$**': 'text'});

export const SingleProjectBusiness = mongoose.model<SingleProjectBusinessDocument>('SingleProjectBusiness', SingleProjectBusinessSchema);

export interface SingleProjectBusinessInterface {
    name: string;
    address: {
        street: string;
        streetNumber: string;
        zip: number;
        city: string;
    };
    socketState: string;
    island: string;
    processingStatus: string;
    contact: {
        supervisor: string;
        representative: string;
        rla: string;
    };
    connectKit: string;
    enterDate: Date;
    stagesState: string;
    socketHyperlink: string;
    comment: string;
    create: Date;
    update: Date;
};


