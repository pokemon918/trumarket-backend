import { registerDecorator, ValidationOptions } from 'class-validator';
import { ObjectId } from 'mongodb';

export function IsMongoIdArray(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isMongoIdArray',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value === 'undefined' || value === null) return true;

          return (
            value instanceof Array &&
            value.every(
              (v) =>
                typeof v === 'string' &&
                ObjectId.isValid(v) &&
                new ObjectId(v).toString() === v,
            )
          );
        },
      },
    });
  };
}
