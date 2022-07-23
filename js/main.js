import { createShowAlert } from './util.js';
import './form.js';
import './form-validate.js';
import './picture.js';
import { renderPicture } from './picture.js';
import './big-picture.js';
import './edit-new-photo.js';
import { getData } from './api.js';
import './form-sending.js';

let pictures = [];

getData((photos) => {
  renderPicture(photos);
  pictures = photos;
}, createShowAlert);

export { pictures };
