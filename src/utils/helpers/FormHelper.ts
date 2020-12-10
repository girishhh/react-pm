const appendReadOnly = (companyUISchema: any) => {
  for (const key in companyUISchema) {
    companyUISchema[key] = { ...companyUISchema[key], "ui:disabled": true };
  }
  return companyUISchema;
};

export { appendReadOnly };
