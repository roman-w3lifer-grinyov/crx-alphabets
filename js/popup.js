window.addEventListener('DOMContentLoaded', function () {

  // Alphabets

  var alphabets = {
    belarusian: {
      lowercaseLetters: ['а','б','в','г','д','(дж)','(дз)','е','ё','ж','з','і','й','к','л','м','н','о','п','р','с','т','у','ў','ф','х','ц','ч','ш','ы','ь','э','ю','я'],
      uppercaseLetters: ['А','Б','В','Г','Д','(Дж)','(Дз)','Е','Ё','Ж','З','І','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ў','Ф','Х','Ц','Ч','Ш','Ы','Ь','Э','Ю','Я']
    },
    english: {
      lowercaseLetters: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
      uppercaseLetters: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    },
    french: {
      lowercaseLetters: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
      uppercaseLetters: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    },
    portuguese: {
      lowercaseLetters: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
      uppercaseLetters: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    },
    russian: {
      lowercaseLetters: ['а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я'],
      uppercaseLetters: ['А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я']
    },
    spanish: {
      lowercaseLetters: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'],
      uppercaseLetters: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    }
  };

  // Main elements

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
      copyTextToClipboard(letters);
    });

  document
    .getElementById('copy-uppercase-letters-button')
    .addEventListener('click', function () {
      var letterCells = alphabetTable.querySelectorAll('td:nth-child(3)');
      var letters = '';
      for (var i = 0; i < letterCells.length; i++) {
        letters += letterCells[i].textContent + '\n';
      }
      copyTextToClipboard(letters);
    });

  // Initialization

  // noinspection JSUnresolvedVariable
  chrome.storage.sync.get('selectedLanguage', function (items) {
    if (items.selectedLanguage) {
      languageSelect.value = items.selectedLanguage;
      showAlphabet();
    } else {
      showAlphabet();
    }
  });

  function showAlphabet() {

    var currentSelectedLanguage = alphabets[languageSelect.value];

    // noinspection JSUnresolvedVariable
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

  function copyTextToClipboard(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

});
