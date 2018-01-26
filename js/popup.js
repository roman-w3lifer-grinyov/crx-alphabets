;'use strict';

/* global app, chrome */

/**
 * @property chrome.storage
 * @property chrome.storage.sync
 */

window.addEventListener('DOMContentLoaded', function () {

  // Elements

  var languageSelect = document.getElementById('language-select');
  var alphabetTable = document.getElementById('alphabet-table');

  // Events

  languageSelect.addEventListener('change', showAlphabet);

  document
    .getElementById('copy-lowercase-letters-button')
    .addEventListener('click', function () {
      var letterCells = alphabetTable.querySelectorAll('td:nth-child(2)');
      var letters = '';
      for (var i = 0; i < letterCells.length; i++) {
        letters += letterCells[i].textContent + '\n';
      }
      app.methods.copyTextToClipboard(letters);
    });

  document
    .getElementById('copy-uppercase-letters-button')
    .addEventListener('click', function () {
      var letterCells = alphabetTable.querySelectorAll('td:nth-child(3)');
      var letters = '';
      for (var i = 0; i < letterCells.length; i++) {
        letters += letterCells[i].textContent + '\n';
      }
      app.methods.copyTextToClipboard(letters);
    });

  // Initialization

  chrome.storage.sync.get('selectedLanguage', function (storage) {
    if (storage.selectedLanguage) {
      languageSelect.value = storage.selectedLanguage;
      showAlphabet();
    } else {
      showAlphabet();
    }
  });

  function showAlphabet() {

    var currentSelectedLanguage = app.alphabets[languageSelect.value];

    chrome.storage.sync.set({'selectedLanguage': languageSelect.value});

    alphabetTable.innerHTML = '';

    for (var i = 0; i < currentSelectedLanguage.uppercaseLetters.length; i++) {
      var tr = document.createElement('tr');

      var serialCell = document.createElement('td');
      serialCell.textContent = i + 1;
      tr.appendChild(serialCell);

      var lowercaseLetterCell = document.createElement('td');
      lowercaseLetterCell.textContent =
        currentSelectedLanguage.lowercaseLetters[i];
      tr.appendChild(lowercaseLetterCell);

      var uppercaseLetterCell = document.createElement('td');
      uppercaseLetterCell.textContent =
        currentSelectedLanguage.uppercaseLetters[i];
      tr.appendChild(uppercaseLetterCell);

      alphabetTable.appendChild(tr);
    }

  }

});
