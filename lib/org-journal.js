'use babel';

import OrgJournalView from './org-journal-view';
import { CompositeDisposable } from 'atom';
import suggestionsProvider from './suggestions-provider';
const default_assignee = atom.config.get("org-journal.default_assignee") || "me";

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
      'org-journal:closeTask': () => this.closeTask()
    }));

    // Register command this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'org-journal:cancelTask': () => this.cancelTask()
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
      'org-journal:mark': () => this.mark()
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
      let task = `- [ ] **${ assignee }** `
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

  cancelTask() {
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

  mark() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let marked = `<span style="background-color:yellow">${ selection }</span>`
      editor.insertText(marked)
    };
  },

  getProvider() {
        return suggestionsProvider;
    }
};
