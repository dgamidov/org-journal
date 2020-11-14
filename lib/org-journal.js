'use babel';

import OrgJournalView from './org-journal-view';
import { CompositeDisposable } from 'atom';

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

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'org-journal:toggle': () => this.toggle()
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

  toggle() {
    console.log('OrgJournal was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
