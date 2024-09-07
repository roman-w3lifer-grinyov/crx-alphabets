
/* global app, chrome */

/**
 * @property chrome.storage
 * @property chrome.storage.sync
 */

window.addEventListener('DOMContentLoaded', _ => {

  const app = {
    alphabets: {
      belarusian: {
        lowercaseLetters: ['а','б','в','г','д','(дж)','(дз)','е','ё','ж','з','і','й','к','л','м','н','о','п','р','с','т','у','ў','ф','х','ц','ч','ш','ы','ь','э','ю','я'],
        uppercaseLetters: ['А','Б','В','Г','Д','(Дж)','(Дз)','Е','Ё','Ж','З','І','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ў','Ф','Х','Ц','Ч','Ш','Ы','Ь','Э','Ю','Я'],
      },
      english: {
        lowercaseLetters: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
        uppercaseLetters: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
      },
      french: {
        lowercaseLetters: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
        uppercaseLetters: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
      },
      german: {
        lowercaseLetters: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
        uppercaseLetters: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
      },
      greek: {
        lowercaseLetters: ['α','β','γ','δ','ε','ζ','η','θ','ι','κ','λ','μ','ν','ξ','ο','π','ρ','σ/ς','τ','υ','φ','χ','ψ','ω'],
        uppercaseLetters: ['Α','Β','Γ','Δ','Ε','Ζ','Η','Θ','Ι','Κ','Λ','Μ','Ν','Ξ','Ο','Π','Ρ','Σ','Τ','Υ','Φ','Χ','Ψ','Ω'],
      },
      italian: {
        lowercaseLetters: ['a','b','c','d','e','f','g','h','i','l','m','n','o','p','q','r','s','t','u','v','z'],
        uppercaseLetters: ['A','B','C','D','E','F','G','H','I','L','M','N','O','P','Q','R','S','T','U','V','Z'],
      },
      portuguese: {
        lowercaseLetters: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
        uppercaseLetters: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
      },
      russian: {
        lowercaseLetters: ['а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я'],
        uppercaseLetters: ['А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я'],
      },
      serbianCyrillic: {
        lowercaseLetters: ['а','б','в','г','д','ђ','е','ж','з','и','ј','к','л','љ','м','н','њ','о','п','р','с','т','ћ','у','ф','х','ц','ч','џ','ш'],
        uppercaseLetters: ['А','Б','В','Г','Д','Ђ','Е','Ж','З','И','Ј','К','Л','Љ','М','Н','Њ','О','П','Р','С','Т','Ћ','У','Ф','Х','Ц','Ч','Џ','Ш'],
      },
      spanish: {
        lowercaseLetters: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'],
        uppercaseLetters: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
      },
      turkish: {
        lowercaseLetters: ['a','b','c','ç','d','e','f','g','ğ','h','ı','i','j','k','l','m','n','o','ö','p','r','s','ş','t','u','ü','v','y','z'],
        uppercaseLetters: ['A','B','C','Ç','D','E','F','G','Ğ','H','I','İ','J','K','L','M','N','O','Ö','P','R','S','Ş','T','U','Ü','V','Y','Z'],
      },
      ukrainian: {
        lowercaseLetters: ['а','б','в','г','ґ','д','е','є','ж','з','и','і','ї','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ь','ю','я'],
        uppercaseLetters: ['А','Б','В','Г','Ґ','Д','Е','Є','Ж','З','И','І','Ї','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ь','Ю','Я'],
      },
    },
    settings: {
      hideTooltipDelay: 1000,
      toolTipText: 'Copied',
    },
    methods: {
      copyTextToClipboard: text => {
        let textarea = document.createElement('textarea')
        textarea.value = text
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      },
    },
  }

  // Elements

  const languageSelect = document.getElementById('language-select')
  const copyButtonsTable = document.getElementById('copy-buttons-table')
  const alphabetTable = document.getElementById('alphabet-table')

  // Events

  languageSelect.addEventListener('change', showAlphabet)

  const copyButtons = copyButtonsTable.querySelectorAll('.copy-button')
  for (let i = 0; i < copyButtons.length; i++) {
    copyButtons[i].addEventListener('click', copyCharacters.call(copyButtons[i], i))
  }

  alphabetTable.addEventListener('click', e => {
    if (e.target.tagName !== 'TD') {
      return false
    }
    const letter = e.target.textContent
    app.methods.copyTextToClipboard(letter)
    e.target.textContent = app.settings.toolTipText
    e.target.style.color = '#fb0000'
    setTimeout(_ => {
      e.target.textContent = letter
      e.target.style.color = 'inherit'
    }, app.settings.hideTooltipDelay)
  })

  function copyCharacters(index)
  {
    return _ => {
      const tdSelector = 'td:nth-child(' + (index + 1) +')'
      const characterCells = alphabetTable.querySelectorAll(tdSelector)
      let characters = ''
      for (let j = 0; j < characterCells.length; j++) {
        characters += characterCells[j].textContent + '\n'
      }
      app.methods.copyTextToClipboard(characters)
      const img = this.firstElementChild
      this.textContent = app.settings.toolTipText
      this.style.color = '#fb0000'
      setTimeout(_ => {
        this.replaceChildren(img)
        this.style.color = 'inherit'
      }, app.settings.hideTooltipDelay)
    }
  }

  // Initialization

  const optionElement = document.createElement('option')
  for (let alphabet in app.alphabets) {
    const option = optionElement.cloneNode()
    option.value = alphabet
    if (alphabet === 'english') {
      option.setAttribute('selected', '')
    }
    alphabet = alphabet.replace(/([A-Z])/g, ' $1')
    alphabet = alphabet.charAt(0).toUpperCase() + alphabet.slice(1)
    option.textContent = alphabet
    languageSelect.appendChild(option)
  }

  chrome.storage.sync.get('selectedLanguage', storage => {
    if (storage.selectedLanguage) {
      languageSelect.value = storage.selectedLanguage
    }
    showAlphabet()
  })

  function showAlphabet()
  {
    const currentSelectedLanguage = app.alphabets[languageSelect.value]

    chrome.storage.sync.set({'selectedLanguage': languageSelect.value})

    alphabetTable.innerHTML = ''

    for (let i = 0; i < currentSelectedLanguage.uppercaseLetters.length; i++) {
      const tr = document.createElement('tr')

      const serialCell = document.createElement('td')
      serialCell.textContent = '' + (i + 1)
      tr.appendChild(serialCell)

      const uppercaseLetterCell = document.createElement('td')
      uppercaseLetterCell.textContent = currentSelectedLanguage.uppercaseLetters[i]
      tr.appendChild(uppercaseLetterCell)

      const lowercaseLetterCell = document.createElement('td')
      lowercaseLetterCell.textContent = currentSelectedLanguage.lowercaseLetters[i]
      tr.appendChild(lowercaseLetterCell)

      alphabetTable.appendChild(tr)
    }
  }

})
