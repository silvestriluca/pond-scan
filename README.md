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
Go inside the repo directory and run: `npm test`

### Notes:
The code is fully commented.
All the functions and helpers are documented using JSHint conventions. That will trigger autocompletion and code hints in code editors like Visual Studio Code.