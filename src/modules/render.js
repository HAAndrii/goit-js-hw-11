const clearImages = () => {
  const list = document.querySelector('.gallery');
  list.innerHTML = '';
};

const renderImages = arr => {
  const gallary = document.querySelector('.gallery');

  const html = arr.map(
    ({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`;
    }
  );

  gallary.insertAdjacentHTML('beforeend', html.join(''));
};

export { clearImages, renderImages };
