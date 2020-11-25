'use babel';

import OrgJournalView from './org-journal-view';
import { CompositeDisposable } from 'atom';
import suggestionsProvider from './suggestions-provider';
const default_assignee = atom.config.get("org-journal.default_assignee") || "me";
const assignee_prefix = atom.config.get("org-journal.assignee_prefix") || "";
const deadline_prefix = atom.config.get("org-journal.deadline_prefix") || "";

export default {

  orgJournalView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.orgJournalView = new OrgJournalView(state.orgJournalViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.orgJournalView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'org-journal:addDate': () => this.addDate()
    }));

    // Register command this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'org-journal:addTask': () => this.addTask()
    }));

    // Register command this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'org-journal:addTaskWithDeadline': () => this.addTaskWithDeadline()
    }));

    // Register command this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'org-journal:closeTask': () => this.closeTask()
    }));

    // Register command this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'org-journal:crossOutTask': () => this.crossOutTask()
    }));

    // Register command this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'org-journal:setTaskOnFire': () => this.setTaskOnFire()
    }));

    // Register command this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'org-journal:addUrl': () => this.addUrl()
    }));

    // Register command this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'org-journal:hide': () => this.hide()
    }));

    // Register command this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'org-journal:markYellow': () => this.markYellow()
    }));

    // Register command this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'org-journal:markRed': () => this.markRed()
    }));

    // Register command this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'org-journal:markGreen': () => this.markGreen()
    }));

    // Register command this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'org-journal:addNote': () => this.addNote()
    }));

    // Register command this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'org-journal:addExample': () => this.addExample()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.orgJournalView.destroy();
  },

  serialize() {
    return {
      orgJournalViewState: this.orgJournalView.serialize()
    };
  },

  addDate() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let currentDate = new Date()
      let day = currentDate.getDate()
      let month = currentDate.getMonth() + 1
      let year = currentDate.getFullYear()
      let date = `**${ day }.${ month }.${ year }**\n\n`
      editor.insertText(date)
    };
  },

  addTask() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      assignee = selection.length == 0 ? default_assignee : selection.replace('@', '')
      let task = `- [ ] **${ assignee_prefix }${ assignee }** `
      editor.insertText(task)
    };
  },

  addTaskWithDeadline() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      assignee = selection.length == 0 ? default_assignee : selection.replace('@', '')
      let task = `- [ ] **${ assignee_prefix }${ assignee }** *(${deadline_prefix})* `
      editor.insertText(task)
    };
  },

  closeTask() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let lineRange
      if (selection) {
        lineRange = editor.getSelectedBufferRange()
      } else {
        lineRange = editor.cursors[0].getCurrentLineBufferRange()
      }
      let line = editor.getTextInBufferRange(lineRange)
      let task = line.replace('[ ]', '[X]')
      editor.setTextInBufferRange(lineRange, task)
    };
  },

  crossOutTask() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let lineRange
      if (selection) {
        lineRange = editor.getSelectedBufferRange()
      } else {
        lineRange = editor.cursors[0].getCurrentLineBufferRange()
      }
      let line = editor.getTextInBufferRange(lineRange)
      let task = line.replace('- [ ]', '-').replace('** ', '** ~~')
      let text
      if (task.endsWith('\n')) {
        text = `${task}~~\n`
      } else {
        text = `${task}~~`
      }
      editor.setTextInBufferRange(lineRange, text)
    };
  },

  setTaskOnFire() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let lineRange
      if (selection) {
        lineRange = editor.getSelectedBufferRange()
      } else {
        lineRange = editor.cursors[0].getCurrentLineBufferRange()
      }
      let line = editor.getTextInBufferRange(lineRange)
      let task = line.replace('** ', '** 🔥')
      editor.setTextInBufferRange(lineRange, task)
    };
  },

  addUrl() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let url = `[${ selection }]()`
      editor.insertText(url)
      editor.cursors[0].moveLeft()
    };
  },

  hide() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let summary = selection.split('\n')[0].split('**').join('')
      let hidden = `<details>\n<summary>${ summary }</summary>\n\n${ selection }\n</details>`
      editor.insertText(hidden)
    };
  },

  markYellow() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let marked = `<span style="background-color:yellow">${ selection }</span>`
      editor.insertText(marked)
    };
  },

  markRed() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let marked = `<span style="background-color:pink">${ selection }</span>`
      editor.insertText(marked)
    };
  },

  markGreen() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let marked = `<span style="background-color:lightgreen">${ selection }</span>`
      editor.insertText(marked)
    };
  },

  addNote() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      assignee = selection.length == 0 ? default_assignee : selection.replace('@', '')
      let note = `- **${ assignee }** `
      editor.insertText(note)
    };
  },

  addExample() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let example = `
- "cmd-alt-d" - add current date
- "cmd-alt-t a" - add task
- "cmd-alt-t d" - add task with deadline
- "cmd-alt-t c" - close task
- "cmd-alt-t o" - cross out task
- "cmd-alt-t f" - set task on fire
- "cmd-alt-u" - add url
- "cmd-alt-h" - hide
- "cmd-alt-m y" - mark yellow
- "cmd-alt-m p" - mark pink
- "cmd-alt-m g" - mark green
- "cmd-alt-n a" - add note

**25.11.2020**

  - [ ] **resp. user1@** Task without deadline
  - **resp. user1@** ~~Task canceled~~
  - [X] **resp. user1@** Task without deadline completed
  - [ ] **resp. user1@** 🔥Task is on fire
  - [ ] **resp. user2@** Task without deadline
  - [ ] **resp. user2@** *(until 25.11)* Task with deadline
  - [ ] **resp. user1@** *(until )*
  - [ ] **resp. user1@** *(until )* [google.com](https://www.google.com/)


  - **user1@** note <span style="background-color:lightgreen">green</span> <span style="background-color:yellow">yellow</span> <span style="background-color:pink">red</span>


  <details>
  <summary>25.11.2020</summary>

  **24.11.2020**

  - [ ] **resp. user1@** Task without deadline
  - **resp. user1@** ~~Task canceled~~
  - [X] **resp. user1@** Task without deadline completed
  - [ ] **resp. user1@** 🔥Task is on fire
  - [ ] **resp. user2@** Task without deadline
  - [ ] **resp. user1@** *(until 25.11)* Task with deadline


  - **user1@** note <span style="background-color:lightgreen">green</span> <span style="background-color:yellow">yellow</span> <span style="background-color:pink">red</span>
  </details>
      `
      editor.insertText(example)
    };
  },

  getProvider() {
        return suggestionsProvider;
    }
};
