# Package for organization Journal

Use GitHub Markdown syntax.

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
```

## Hot keys

- cmd-alt-d: add current date
- cmd-alt-t: add task
- cmd-alt-c: close task
- cmd-alt-n: cancel task
- cmd-alt-f: set task on fire
- cmd-alt-u: add Url
- cmd-alt-h: hide text

## Examples

**15.11.2020**

- [ ] **me** Task
- [ ] **me** 🔥Task in fire
- [X] **me** Completed task
- **me** ~~Canceled task~~
- [ ] **user1** [Task with url](#task)


<details>
<summary>October</summary>

**15.10.2020**

- [ ] **me** Task
- [ ] **me** 🔥Task in fire
- [X] **me** Completed task
- **me** ~~Canceled task~~
- [ ] **user1** [Task with url](#task)

**14.10.2020**

- [ ] **me** Task
- [ ] **me** 🔥Task in fire
- [X] **user2** Completed task
- **me** ~~Canceled task~~
- [ ] **user1** [Task with url](#task)
</details>
