;'use strict';

/* global app, chrome */

/**
 * @property chrome.storage
 * @property chrome.storage.sync
 */

window.addEventListener('DOMContentLoaded', function () {

  // Elements

  const languageSelect = document.getElementById('language-select');
  const copyButtonsTable = document.getElementById('copy-buttons-table');
  const alphabetTable = document.getElementById('alphabet-table');

  // Events

  languageSelect.addEventListener('change', showAlphabet);

  const copyButtons = copyButtonsTable.querySelectorAll('.copy-button');
  for (let i = 0; i < copyButtons.length; i++) {
    copyButtons[i].addEventListener('click', copyCharacters(i));
  }

  alphabetTable.addEventListener('click', (e) => {
    if (e.target.tagName !== 'TD') {
      return false;
    }
    app.methods.copyTextToClipboard(e.target.textContent);
    const span = document.createElement('span');
    span.classList.add('copied');
    span.textContent = 'Copied';
    e.target.insertBefore(span, e.target.firstChild);
    setTimeout(() => e.target.removeChild(span), app.settings.hideTooltipDelay);
  });

  function copyCharacters(index) {
    return () => {
      const tdSelector = 'td:nth-child(' + (index + 1) +')';
      const characterCells = alphabetTable.querySelectorAll(tdSelector);
      let characters = '';
      for (let j = 0; j < characterCells.length; j++) {
        characters += characterCells[j].textContent + '\n';
      }
      app.methods.copyTextToClipboard(characters);
      const tdWithNotificationText = copyButtonsTable.querySelector('tr:first-child ' + tdSelector);
      tdWithNotificationText.classList.remove('invisible');
      setTimeout(() => tdWithNotificationText.classList.add('invisible'), app.settings.hideTooltipDelay);
    }
  }

  // Initialization

  const optionElement = document.createElement('option');
  for (let alphabet in app.alphabets) {
    const option = optionElement.cloneNode();
    option.value = alphabet;
    if (alphabet === 'english') {
      option.setAttribute('selected', '');
    }
    alphabet = alphabet.replace(/([A-Z])/g, ' $1');
    alphabet = alphabet.charAt(0).toUpperCase() + alphabet.slice(1);
    option.textContent = alphabet;
    languageSelect.appendChild(option);
  }

  chrome.storage.sync.get('selectedLanguage', (storage) => {
    if (storage.selectedLanguage) {
      languageSelect.value = storage.selectedLanguage;
    }
    showAlphabet();
  });

  function showAlphabet() {

    const currentSelectedLanguage = app.alphabets[languageSelect.value];

    chrome.storage.sync.set({'selectedLanguage': languageSelect.value});

    alphabetTable.innerHTML = '';

    for (let i = 0; i < currentSelectedLanguage.uppercaseLetters.length; i++) {
      const tr = document.createElement('tr');

      const serialCell = document.createElement('td');
      serialCell.textContent = '' + (i + 1);
      tr.appendChild(serialCell);

      const uppercaseLetterCell = document.createElement('td');
      uppercaseLetterCell.textContent = currentSelectedLanguage.uppercaseLetters[i];
      tr.appendChild(uppercaseLetterCell);

      const lowercaseLetterCell = document.createElement('td');
      lowercaseLetterCell.textContent = currentSelectedLanguage.lowercaseLetters[i];
      tr.appendChild(lowercaseLetterCell);

      alphabetTable.appendChild(tr);
    }

  }

});
