```shell
npm install --global defence-cli
```

Filter a README file, retaining fenced code blocks with JavaScript code, piping to Node.js for execution:

```shell
defence --info javascript,js README.md | node
```

Along with [assert](https://nodejs.org/api/assert.html) and [replace-require-self](https://www.npmjs.com/package/replace-require-self), this can make for very readable npm test scripts that run code examples in your README files:

```json
{
  "scripts": {
    "test": "defence README.md | replace-require-self | node"
  }
}
```

[boolean-json-cnf](https://github.com/kemitchell/boolean-json-cnf.js) is an example.

Without a file argument, read from standard input:

```shell
cat README.md | defence --info javascript,js | node
```

Retain just fenced code blocks without info strings:

```shell
cat INSTALLING.md | defence --no-info | less
```

Source lines outside of matching fenced code blocks are retained as blank lines, so line numbering doesn't change:

```shell
echo "\n\n\n\n\n~~~js\nthrow new Error()\n~~~" | defence | node
[stdin]:7
throw new Error()
      ^
Error
    at [stdin]:7:7
	[ ... ]
```
