import { createShowAlert } from './util.js';
import { renderPicture } from './picture.js';
import './big-picture.js';
import { getData } from './api.js';
import './form-sending.js';
import { showImageFilters, addFilters } from './picture-filtration.js';

let pictures = [];

getData((photos) => {
  pictures = photos.slice();
  renderPicture(pictures);
  addFilters(photos);
  showImageFilters();
}, createShowAlert);

export { pictures };
