import {ErrorMessageType} from "../exceptions-filters/exceptions";
import {ValidationError} from "@nestjs/common";

export const validationError = (errors: ValidationError[]): ErrorMessageType[] => {
    return errors.map(error => {
        const constraints = error.constraints;
        if (!constraints) return null;

        const firstConstraintKey = Object.keys(constraints)[0];
        return { message: constraints[firstConstraintKey], field: error.property };
    }).filter(Boolean) as ErrorMessageType[];
};