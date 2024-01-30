class APIFeatures {
  constructor(mongoQuery, queryMap) {
    this.query = mongoQuery;
    this.queryString = queryMap;
  }

  filter() {
    const queryObj = { ...this.queryString };
    ['page', 'sort', 'limit', 'fields'].forEach((el) => delete queryObj[el]);
    const queryStr = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    }
    return this;
  }

  paginate() {
    if (this.queryString.page) {
      let page = this.queryString.page * 1 || 1;
      let limit = this.queryString.limit * 1 || 100;
      let skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
    }
    return this;
  }
};

module.exports = APIFeatures;