'use babel';

const suggestions = atom.config.get("org-journal.autocomplete") || [];

class SuggestionsProvider {
  constructor() {
    // offer suggestions when editing any file type
    this.selector = '*';
  }

  getSuggestions(options) {
    const { editor, bufferPosition } = options;
    let prefix = this.getPrefix(editor, bufferPosition);
    if (prefix.startsWith('@')) {
      return this.findMatchingSuggestions(prefix);
    }
  }

  getPrefix(editor, bufferPosition) {
   // the prefix normally only includes characters back to the last word break
   // which is problematic if your suggestions include punctuation (like "@")
   // this expands the prefix back until a whitespace character is met
   // you can tweak this logic/regex to suit your needs
   let line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition]);
   let match = line.match(/\S+$/);
   return match ? match[0] : '';
  }

  findMatchingSuggestions(prefix) {
    // filter list of words to those with a matching prefix
    let matchingWords = suggestions.filter((suggestion) => {
      return suggestion.startsWith(prefix);
    });

    // convert the array of words into an array of objects with a text property
    let matchingSuggestions = matchingWords.map((word) => {
      return { text: word.replace('@', '') };
    });

    return matchingSuggestions;
  }
}
export default new SuggestionsProvider();
