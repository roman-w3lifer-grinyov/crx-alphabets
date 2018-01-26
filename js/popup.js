;'use strict';

/* global app, chrome */

/**
 * @property chrome.storage
 * @property chrome.storage.sync
 */

window.addEventListener('DOMContentLoaded', function () {

  // Elements

  var languageSelect = document.getElementById('language-select');
  var copyButtonsTable = document.getElementById('copy-buttons-table');
  var alphabetTable = document.getElementById('alphabet-table');

  // Events

  languageSelect.addEventListener('change', showAlphabet);

  var copyButtons = copyButtonsTable.querySelectorAll('button');
  for (var i = 0; i < copyButtons.length; i++) {
    copyButtons[i].addEventListener('click', copyCharacters(i));
  }

  function copyCharacters(index) {
    return function () {
      var tdSelector = 'td:nth-child(' + (index + 1) +')';
      console.log(index);
      var characterCells = alphabetTable.querySelectorAll(tdSelector);
      var characters = '';
      for (var j = 0; j < characterCells.length; j++) {
        characters += characterCells[j].textContent + '\n';
      }
      app.methods.copyTextToClipboard(characters);
      var tdWithNotificationText =
        copyButtonsTable.querySelector('tr:first-child ' + tdSelector);
      tdWithNotificationText.classList.remove('invisible');
      setTimeout(function () {
        tdWithNotificationText.classList.add('invisible');
      }, 1000);
    }
  }

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
      serialCell.textContent = '' + (i + 1);
      tr.appendChild(serialCell);

      var uppercaseLetterCell = document.createElement('td');
      uppercaseLetterCell.textContent =
        currentSelectedLanguage.uppercaseLetters[i];
      tr.appendChild(uppercaseLetterCell);

      var lowercaseLetterCell = document.createElement('td');
      lowercaseLetterCell.textContent =
        currentSelectedLanguage.lowercaseLetters[i];
      tr.appendChild(lowercaseLetterCell);

      alphabetTable.appendChild(tr);
    }

  }

});
