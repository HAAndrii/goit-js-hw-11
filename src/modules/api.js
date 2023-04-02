const axios = require('axios').default;

export default class Images {
  constructor() {
    this.searchQuery = '';
    this.per_page = 40;
    this.page = 0;
    this.quantityImages = 0;
  }

  async fethImages() {
    try {
      const APIkey = '34956958-607174b7a3dcac6d349ccda16';

      const param = new URLSearchParams({
        key: APIkey,
        //q: 'yellow+key',
        q: this.searchQuery,
        orientation: 'horizontal',
        image_type: 'photo',
        safesearch: 'true',
        per_page: this.per_page,
        page: this.page,
      });

      const responce = await axios.get(`https://pixabay.com/api/?${param}`);

      if (!responce.status === 200) {
        throw new Error(responce.status);
      }

      return await responce.data;
      //return await responce.json();
    } catch (error) {
      console.log(error);
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  updateQuantityImages(q) {
    this.quantityImages += q;
  }

  resetVar() {
    this.quantityImages = 0;
    this.page = 0;
  }

  get QuantityImages() {
    return this.quantityImages;
  }
}
