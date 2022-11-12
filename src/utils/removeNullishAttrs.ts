const removeNullishAttrs = <
  O extends {
    [key: string]: any;
  },
>(
  obj: O,
): O => {
  const processedObj = {};

  Object.entries(obj).map(([propertyName, propertyValue]: [string, any]) => {
    if (typeof propertyValue !== 'undefined' && propertyValue !== null) {
      processedObj[propertyName] = propertyValue;
    }
  });

  return processedObj as O;
};

export default removeNullishAttrs;
