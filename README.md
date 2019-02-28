# What is this?
It is a [code assignment](./README-assignment.md) I got in order to show some coding skills.

I've decided to implement it using Javascript.

The assignment scope was limited to a given input format and structure and didn't required further generalizations, so I know that there is a huge room for improvement and extensions (like sorting algorithms, data tied to general timestamps, more alarms and so on).

PRs are welcome.

# Instructions

**Node >= 10 (LTS) is required to run this script.**

### To install: 
1. Clone the repository in a directory `[directory]`
2. `cd [directory]`
3. `npm install`
4. `npm link` (this creates a global symlink to the package)
5. `pond-scan [path to .csv file]`
6. Enjoy.

### To uninstall:
1. Go to repo directory
2. `npm unlink`

OR
1. `npm uninstall -g osmobot-assignment`

### To run tests:
The package includes a **full test coverage**.
Go inside the repo directory and run: 

`npm test`

Once executed you can find the coverage report in a neat html format:
1. `cd coverage`
2. open with a browser the file `index.html`

### Notes:
The code is fully commented.
All the functions and helpers are documented using JSHint conventions. That will trigger autocompletion and code hints in code editors like Visual Studio Code.