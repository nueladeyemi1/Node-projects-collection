import '@babel/polyfill';
// import { eventNames } from '../../app';
import { login, logout } from './login';
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';

const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
document.querySelector('.btn--save-password').textContent === 'updating...';

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);

  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDafault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();

    const form = new FormData();

    form.append('name', document.getElementById('name').value);

    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').file[0]);

    // updateData(name, email);
    updateSettings(
      {
        form
      },
      'data'
    );
  });

if (userPasswordForm)
  userDataForm.addEventListener('submit', async e => {
    e.preventDefault();

    const passwordCurrent = document.getElementById('password-current').value;

    const password = document.getElementById('password').value;

    const passwordConfirm = document.getElementById('password-confirm').value;

    // updateData(name, email);
    await updateSettings(
      {
        passwordCurrent,
        password,
        passwordConfirm
      },
      'password'
    );

    document.querySelector('.btn--save-password').textContent ===
      'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
