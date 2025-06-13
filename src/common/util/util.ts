import { ClassTransformOptions, plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

export function plainToClassWithValidation<T extends object>(
  classType: new (...args: any[]) => T,
  plainObject: Record<string, any>,
  options?: ClassTransformOptions,
): T {
  const classObject = plainToClass(classType, plainObject, options);
  const errors = validateSync(classObject);
  if (errors.length > 0) {
    let errorMessage = 'Validation errors:\n';
    errors.forEach((error) => {
      for (const constraint in error.constraints) {
        errorMessage += `Property [ ${error.property} ] has failed the following constraint: ${error.constraints[constraint]}\n`;
      }
    });
    throw new Error(errorMessage);
  }
  return classObject;
}
