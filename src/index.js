import Images from './modules/api';
import { clearImages, renderImages } from './modules/render';
import Notiflix from 'notiflix';
import LoadMore from './modules/load-more';
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});
const newImages = new Images();
const loadMoreBtn = new LoadMore('.load-more');
loadMoreBtn.hidden();
loadMoreBtn.btn.addEventListener('click', onLoadMoreBtn);

const form = document.querySelector('.search-form');
form.addEventListener('submit', onForm);

function onForm(e) {
  e.preventDefault();
  clearImages();
  loadMoreBtn.hidden();

  const searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  // if (searchQuery === '') {
  //   Notiflix.Notify.info(
  //     'Sorry, there are no images matching your search query. Please try again.',
  //     { position: 'center-center' }
  //   );
  //   return;
  // }

  newImages.searchQuery = searchQuery;
  newImages.resetVar();

  addImages(searchQuery);
}

function onLoadMoreBtn(e) {
  addImages();
}

async function addImages() {
  try {
    newImages.incrementPage();

    const list = await newImages.fethImages();

    if (list.hits.length === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.',
        { position: 'center-center' }
      );
      loadMoreBtn.hidden();
      return;
    }

    if (newImages.page_ === 1) {
      Notiflix.Notify.info(`Hooray! We found ${list.totalHits} images.`, {
        position: 'center-center',
      });
    }

    newImages.updateQuantityImages(list.hits.length);

    renderImages(list.hits);

    lightbox.refresh();

    loadMoreBtn.show();
    if (list.totalHits === newImages.quantityImages) {
      loadMoreBtn.hidden();
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`,
        { position: 'center-center' }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
