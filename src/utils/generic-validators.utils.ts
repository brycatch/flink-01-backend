const TEXT_FIELD_MAX_LENGTH = 100;
const TEXT_AREA_MAX_LENGTH = 2000;

const form = {
  textField: (name: string, value: string, errors: string[]) => {
    const isInvalid = !textIsValid(value, TEXT_FIELD_MAX_LENGTH);
    validateError(name, isInvalid, errors);
  },
  textArea: (name: string, value: string, errors: string[]) => {
    const isInvalid = (!textIsValid(value, TEXT_AREA_MAX_LENGTH));
    validateError(name, isInvalid, errors);
  },
  number: (name: string, value: any, errors: string[]) => {
    const isInvalid = Number.isNaN(Number.parseInt(value, 10));
    validateError(name, isInvalid, errors);
  },
  array: {
    hasLength: (array: any[], errors: string[]) => {
      const isInvalid = !array.length;
      validateError('Files', isInvalid, errors);
    }
  }
}
const validateError = (name: string, isInvalid: boolean, errors: string[]) => {
  if (isInvalid) {
    errors.push(`${name} no es un valor válido`);
  }
}

const textIsValid = (text: string, maxLength: number) => {
  try {
    const length = text.trim().length;
    return length > 0 && length <= maxLength;
  } catch (error) {
    return false;
  }
}


export default { form };