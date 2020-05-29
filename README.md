These examples use the typescript compiler, tsc, to generate the .js files.

I recommend installing it globally, via 

```
npm install tsc -g
```

You can then set up a service to watch for file changes and recompile your .ts files with

```
tsc -w
```

Finally, to run a .js file, simply use node and the filepath, for example:

```
node src/firstExample.js
```
