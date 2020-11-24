'use babel';

import OrgJournal from '../lib/org-journal';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('OrgJournal', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('org-journal');
  });

  describe('when the org-journal:addDate event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.org-journal')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'org-journal:addDate');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.org-journal')).toExist();

        let orgJournalElement = workspaceElement.querySelector('.org-journal');
        expect(orgJournalElement).toExist();

        let orgJournalPanel = atom.workspace.panelForItem(orgJournalElement);
        expect(orgJournalPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'org-journal:addDate');
        expect(orgJournalPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.org-journal')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'org-journal:addDate');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let orgJournalElement = workspaceElement.querySelector('.org-journal');
        expect(orgJournalElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'org-journal:addDate');
        expect(orgJournalElement).not.toBeVisible();
      });
    });
  });

  describe('when the org-journal:addTask event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.org-journal')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'org-journal:addTask');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.org-journal')).toExist();

        let orgJournalElement = workspaceElement.querySelector('.org-journal');
        expect(orgJournalElement).toExist();

        let orgJournalPanel = atom.workspace.panelForItem(orgJournalElement);
        expect(orgJournalPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'org-journal:addTask');
        expect(orgJournalPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.org-journal')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'org-journal:addTask');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let orgJournalElement = workspaceElement.querySelector('.org-journal');
        expect(orgJournalElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'org-journal:addTask');
        expect(orgJournalElement).not.toBeVisible();
      });
    });
  });

  describe('when the org-journal:closeTask event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.org-journal')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'org-journal:closeTask');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.org-journal')).toExist();

        let orgJournalElement = workspaceElement.querySelector('.org-journal');
        expect(orgJournalElement).toExist();

        let orgJournalPanel = atom.workspace.panelForItem(orgJournalElement);
        expect(orgJournalPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'org-journal:closeTask');
        expect(orgJournalPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.org-journal')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'org-journal:closeTask');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let orgJournalElement = workspaceElement.querySelector('.org-journal');
        expect(orgJournalElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'org-journal:closeTask');
        expect(orgJournalElement).not.toBeVisible();
      });
    });
  });

  describe('when the org-journal:cancelTask event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.org-journal')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'org-journal:cancelTask');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.org-journal')).toExist();

        let orgJournalElement = workspaceElement.querySelector('.org-journal');
        expect(orgJournalElement).toExist();

        let orgJournalPanel = atom.workspace.panelForItem(orgJournalElement);
        expect(orgJournalPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'org-journal:cancelTask');
        expect(orgJournalPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.org-journal')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'org-journal:cancelTask');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let orgJournalElement = workspaceElement.querySelector('.org-journal');
        expect(orgJournalElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'org-journal:cancelTask');
        expect(orgJournalElement).not.toBeVisible();
      });
    });
  });

  describe('when the org-journal:setTaskOnFire event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.org-journal')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'org-journal:setTaskOnFire');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.org-journal')).toExist();

        let orgJournalElement = workspaceElement.querySelector('.org-journal');
        expect(orgJournalElement).toExist();

        let orgJournalPanel = atom.workspace.panelForItem(orgJournalElement);
        expect(orgJournalPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'org-journal:setTaskOnFire');
        expect(orgJournalPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.org-journal')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'org-journal:setTaskOnFire');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let orgJournalElement = workspaceElement.querySelector('.org-journal');
        expect(orgJournalElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'org-journal:setTaskOnFire');
        expect(orgJournalElement).not.toBeVisible();
      });
    });
  });

  describe('when the org-journal:addUrl event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.org-journal')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'org-journal:addUrl');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.org-journal')).toExist();

        let orgJournalElement = workspaceElement.querySelector('.org-journal');
        expect(orgJournalElement).toExist();

        let orgJournalPanel = atom.workspace.panelForItem(orgJournalElement);
        expect(orgJournalPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'org-journal:addUrl');
        expect(orgJournalPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.org-journal')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'org-journal:addUrl');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let orgJournalElement = workspaceElement.querySelector('.org-journal');
        expect(orgJournalElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'org-journal:addUrl');
        expect(orgJournalElement).not.toBeVisible();
      });
    });
  });

  describe('when the org-journal:hide event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.org-journal')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'org-journal:hide');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.org-journal')).toExist();

        let orgJournalElement = workspaceElement.querySelector('.org-journal');
        expect(orgJournalElement).toExist();

        let orgJournalPanel = atom.workspace.panelForItem(orgJournalElement);
        expect(orgJournalPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'org-journal:hide');
        expect(orgJournalPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.org-journal')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'org-journal:hide');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let orgJournalElement = workspaceElement.querySelector('.org-journal');
        expect(orgJournalElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'org-journal:hide');
        expect(orgJournalElement).not.toBeVisible();
      });
    });
  });

  describe('when the org-journal:mark event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.org-journal')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'org-journal:mark');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.org-journal')).toExist();

        let orgJournalElement = workspaceElement.querySelector('.org-journal');
        expect(orgJournalElement).toExist();

        let orgJournalPanel = atom.workspace.panelForItem(orgJournalElement);
        expect(orgJournalPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'org-journal:mark');
        expect(orgJournalPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.org-journal')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'org-journal:mark');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let orgJournalElement = workspaceElement.querySelector('.org-journal');
        expect(orgJournalElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'org-journal:mark');
        expect(orgJournalElement).not.toBeVisible();
      });
    });
  });

});
