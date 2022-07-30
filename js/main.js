import { createShowAlert } from './util.js';
import { renderGallery } from './picture.js';
import { initBigPicture } from './big-picture.js';
import { getData } from './api.js';
import './form-sending.js';
import { initFilters } from './picture-filtration.js';

getData((photos) => {
  renderGallery(photos);
  initFilters(photos);
  initBigPicture(photos);
}, createShowAlert);
