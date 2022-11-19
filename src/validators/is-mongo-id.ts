import { registerDecorator, ValidationOptions } from 'class-validator';
import { ObjectId } from 'mongodb';

export function IsMongoId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isMongoId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value === 'undefined' || value === null) return true;

          return (
            typeof value === 'string' &&
            ObjectId.isValid(value) &&
            new ObjectId(value).toString() === value
          );
        },
      },
    });
  };
}
