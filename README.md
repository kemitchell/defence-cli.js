```shellcommand
$ npm install --global defence-cli
```

Filter a README file, retaining fenced code blocks with JavaScript code, piping to Node.js for execution:

```shellcommand
$ defence --info javascript,js README.md | node
```

This can be used to write a very terse test suite into the README for a package. [boolean-json-cnf](https://github.com/kemitchell/boolean-json-cnf.js) is an example.

Without a file argument, read from standard input:

```shellcommand
$ cat README.md | defence --info javascript,js | node
```

Retain just fenced code blocks without info strings:

```shellcommand
$ cat INSTALLING.md | defence --no-info | less
```

Source lines outside of matching fenced code blocks are retained as blank lines, so line numbering doesn't change:

```shellcommand
$ echo "\n\n\n\n\n~~~js\nthrow new Error()\n~~~" | defence | node
[stdin]:7
throw new Error()
      ^
Error
    at [stdin]:7:7
	[ ... ]
```
