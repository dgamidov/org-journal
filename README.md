# Package for organization Journal

Behavior of some features changes when you use it with selected text.
Use syntax GitHub Markdown syntax.

## Required packages

[Toggle Markdown Task](https://atom.io/packages/toggle-markdown-task)

## Configuration

Add to your local $PWD/.atom/config.cson configuration for org-journal autocomplete:

```
"*":
  ..
  "org-journal":
    "default_assignee": "me",
    "autocomplete":
      [
        "@name1",
        "@name2"
      ]
    assignee_prefix: "resp. "
    deadline_prefix: "until "


## Hot keys

"cmd-alt-d" - add current date
"cmd-alt-t a" - add task
"cmd-alt-t d" - add task with deadline
"cmd-alt-t c" - close task
"cmd-alt-t o" - cross out task
"cmd-alt-t f" - set task on fire
"cmd-alt-u" - add url
"cmd-alt-h" - hide
"cmd-alt-m y" - mark yellow
"cmd-alt-m p" - mark pink
"cmd-alt-m g" - mark green
"cmd-alt-n a" - add note
