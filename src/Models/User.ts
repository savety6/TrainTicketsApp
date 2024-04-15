import mongoose, { Schema, Document } from 'mongoose';

interface IField {
    type: string;
    required: boolean;
    unique?: boolean;
    min: number;
    max: number;
}

interface IUser extends Document {
    username: IField;
    email: IField;
    password: IField;
    image: {
        type: string;
        required?: boolean;
        default: string;
    };
    isAdmin: {
        type: boolean;
        required?: boolean;
        default: boolean;
    };
}

const fieldSchema = {
    type: String,
    required: true,
    min: 6,
    max: 255
};

const UserSchema: Schema = new Schema<IUser>({
    username: {
        ...fieldSchema,
        unique: true,
    },
    email: {
        ...fieldSchema,
        unique: true,
    },
    password: {
        ...fieldSchema,
        max: 1024
    },
    image: {
        type: String,
        default: ''
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},{ timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);