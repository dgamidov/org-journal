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
      let selection = editor.getSelectedText().replace('[ ]', '[X]')
      editor.insertText(selection)
    };
  },

  cancelTask() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText().replace('- [ ]', '-').replace('** ', '** ~~')
      editor.insertText(`${selection}~~`)
    };
  },

  setTaskOnFire() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText().replace('** ', '** 🔥')
      editor.insertText(selection)
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
      let hidden = `<details>\n<summary>HIDDEN</summary>\n\n${ selection }\n</details>`
      editor.insertText(hidden)
    };
  },

  getProvider() {
        return suggestionsProvider;
    }
};
