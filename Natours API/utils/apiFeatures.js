class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // NORMAL FILTERING
    const queryObj = { ...this.query };

    const excludeFields = ['page', 'sort', 'limit', 'fields'];

    excludeFields.forEach(el => delete queryObj[el]);

    // ADVANCE FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query.find(JSON.stringify(queryStr));

    return this;
  }

  sort() {
    // SORTING

    if (this.queryString.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    //FIELD
    if (this.query.fields) {
      const fields = req.query.fields.split(',').join(' ');

      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    //PAGINATION

    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
  }
}

module.exports = APIFeatures;
