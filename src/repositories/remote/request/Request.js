export default class Request {
  params = {}

  addParam(key, value) {
    this.params[key] = value
  }

  addArrayParams(key, paramKey, arrs) {
    if (arrs.length > 0) {
      arrs.forEach((item, index) => {
        this.params[`${paramKey}[${index}]`] = item
      })
    } else {
      this.params[key] = arrs
    }
  }

  addArrayParamsPropertyKeys(key, paramKey, arrs, propertyKeys) {
    if (arrs.length > 0) {
      arrs.forEach((item, index) => {
        propertyKeys.forEach((propKey) => {
          this.params[`${paramKey}[${index}][${propKey}]`] = item[propKey];
        });
      });
    } else {
      this.params[key] = arrs;
    }
  }

  setParam(params) {
    this.params = params
  }

  getParams() {
    return this.params
  }
}
