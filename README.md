Pet Mods DH2
========================================================================

Our PS server is hosted at http://petmodsdh.com/

A fork of [pokemon-showdown](https://github.com/smogon/pokemon-showdown) that enables various custom mod-friendly features. It can be coupled with the [dh2-client](https://github.com/scoopapa/dh2-client) for local testing of custom attributes.

Guide for install
========================================================================

1. Fork https://github.com/scoopapa/dh2-client to your GitHub profile

2. Fork https://github.com/scoopapa/DH2 to your GitHub profile as well

3. Git Clone your `dh2-client` fork locally so you can build it and work on it

4. Edit the `build-tools/server-repo` file, you must replace the GitHub `scoopapa/DH2.git` link with your own DH2 fork

5. Edit the `config/config.js` so that the `Config.defaultserver` values look like this:
```js
    id: 'dragonheaven',
    host: 'localhost',
    port: 8000,
    httpport: 8000,
    altport: 80,
    registered: true
```
You may need to copy this file to `play.pokemonshowdown.com/config` manually if there is not already config data present there.

6. if you're using Git, go to the dh2-client directory and type these two commands, one after the other:

 ```
git update-index --skip-worktree ./config/config.js
git update-index --skip-worktree ./build-tools/server-repo
```
This is so that you don't ever accidentally commit your own DH2 client details to live.

7. at the dh2-client folder level, run `node build full` in Git BASH, Command Prompt or Terminal. Wait for it to finish completely, it may take a few minutes

8. inside the dh2-client directory, inside caches, will be a fully built DH2 folder, you can treat this in the same way as the old server code base. Go into it and run `node pokemon-showdown` to start up the server

9. To use the client locally, in your web browser you must enter the filepath to your testclient.html file, this will look different for everyone. For me on Windows, it is `D:/Sean/Documents/Projects/dh2-client/play.pokemonshowdown.com/testclient.html`

10[optional if you can't see your changes due to missing out step 5]. if your DH2 server is running, append to the filepath above with `?~~localhost:8000` to connect to it. The result of mine becomes ``D:/Sean/Documents/Projects/dh2-client/play.pokemonshowdown.com/testclient.html?~~localhost:8000`

11. Commit your changes from the DH2 directory.
