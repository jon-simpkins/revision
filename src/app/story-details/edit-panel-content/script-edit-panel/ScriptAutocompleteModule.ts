
const ENTER_KEY = 13;
const TAB_KEY = 9;
const DOWN_KEY = 40;
const UP_KEY = 38;
const ESCAPE_KEY = 27;

/**
 * Quill module for autocomplete
 */
class ScriptAutocompleteModule {
  quillEditor: any;

  getMatchesCallback: any;

  tokenStartIndex = 0;
  tokenList: any;
  prefixCharacter: string;

  optionsAreShown = false;

  tokenMatches: string[] = [];

  constructor(quillEditor, options) {
    this.quillEditor = quillEditor;
    this.getMatchesCallback = options.getMatchesCallback;

    this.quillEditor.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        this.handleTextChange();
      }
    });
    this.quillEditor.on('selection-change', () => {
      this.hideTokenOptions();
    });

    this.addKeyBinding(ENTER_KEY, () => {
      if (this.optionsAreShown) {
        this.insertToken(this.prefixCharacter, this.tokenMatches[0]);
        return false; // Stop propagation
      }

      return true; // Allow propagation of enter key
    });

    this.addKeyBinding(ESCAPE_KEY, () => {
      if (this.optionsAreShown) {
        this.hideTokenOptions();
        return false; // Stop propagation
      }

      return true; // Allow propagation of escape key
    });

    this.addKeyBinding(TAB_KEY, () => {
      if (this.optionsAreShown) {
        this.insertToken(this.prefixCharacter, this.tokenMatches[0]);
        return false; // Stop propagation
      }

      return true; // Allow propagation of tab key
    });

    this.addKeyBinding(DOWN_KEY, () => {
      if (this.optionsAreShown) {
        this.tokenMatches.push(this.tokenMatches.shift()); // Move the first element to the end
        this.showTokenOptions();
        return false; // Stop propagation
      }

      return true; // Allow propagation of down key
    });
    this.addKeyBinding(UP_KEY, () => {
      if (this.optionsAreShown) {
        this.tokenMatches.unshift(this.tokenMatches.pop()); // Move the last element to the front
        this.showTokenOptions();
        return false; // Stop propagation
      }

      return true; // Allow propagation of up key
    });

    this.tokenList = document.createElement('div');
    this.tokenList.className = 'token-list';
    this.quillEditor.container.appendChild(this.tokenList);
    this.hideTokenOptions();
  }

  addKeyBinding(key: number, callback: () => boolean) {
    this.quillEditor.keyboard.addBinding({
      key
    }, callback);
    this.quillEditor.keyboard.bindings[key].unshift(
      this.quillEditor.keyboard.bindings[key].pop()
    ); // Make this the first binding to execute
  }

  handleTextChange() {
    const selection = this.quillEditor.getSelection();
    if (!selection) {
      return;
    }

    // Grab the previous up-to-20 characters
    const startIndex = Math.max(0, selection.index - 20);
    const textBeforeCursor = this.quillEditor.getText(startIndex, selection.index - startIndex);
    const match = /([@#])([^@#\n\r]*)$/.exec(textBeforeCursor);
    if (match) {
      const stringToMatch = match[2];
      this.prefixCharacter = match[1];

      this.tokenMatches = this.getMatchesCallback(stringToMatch, this.prefixCharacter);

      this.tokenStartIndex = startIndex + match.index;
      this.showTokenOptions();
    } else {
      this.hideTokenOptions();
    }
  }

  showTokenOptions() {
    const tokenStartPosition = this.quillEditor.getBounds(this.tokenStartIndex);

    const topPosition = document.getElementsByClassName('ql-container')[0].scrollTop + tokenStartPosition.bottom;

    this.tokenList.innerHTML = ''; // Clear the list
    this.tokenMatches.forEach(match => {
      const suggestion = document.createElement('div');
      suggestion.innerHTML = match;
      suggestion.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.insertToken(this.prefixCharacter, match);
      };

      this.tokenList.appendChild(suggestion);
    });

    if (this.tokenMatches.length) {
      this.optionsAreShown = true;
      this.tokenList.style.cssText = `display: block; left: ${tokenStartPosition.left}px; top: ${topPosition}px;`;
    } else {
      this.hideTokenOptions();
    }
  }

  hideTokenOptions() {
    this.optionsAreShown = false;
    this.tokenList.style.cssText = 'display: none;';
  }

  insertToken(prefixCharacter, tokenValue) {
    const valueToInsert = `{${prefixCharacter}${tokenValue}}`;

    const insertLocation = this.tokenStartIndex;
    const currentText = this.quillEditor.getText(
      Math.max(0, insertLocation - 1), // -1 to allow for preceding {
      100
    );

    let indexToDeleteFrom = this.tokenStartIndex;
    let deleteLength = 1;
    if (currentText.startsWith('{')) {
      indexToDeleteFrom -= 1;
      deleteLength += 1;
    }

    const currentCursor = this.quillEditor.getSelection();
    if (currentCursor && currentCursor.index > indexToDeleteFrom) {
      deleteLength = currentCursor.index - indexToDeleteFrom;
    }

    this.quillEditor.deleteText(indexToDeleteFrom, deleteLength);

    this.quillEditor.insertText(indexToDeleteFrom, valueToInsert);
    this.quillEditor.setSelection(indexToDeleteFrom + valueToInsert.length);

    this.quillEditor.focus();

    this.hideTokenOptions();
  }
}

export {ScriptAutocompleteModule};
