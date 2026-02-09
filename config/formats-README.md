Format storage

PS imports a `formats.ts` for their tiers. We ignore it.

`official-formats.ts` is the location that we store Smogon/PS formats, it's effectively just the replacement for `formats.ts`. We keep the format data in there.

`petmod-formats.ts` is the bulk of our custom tiers. Because of how much work is done to various Petmods, we seperate the actual formats into their mod folders. These are stored in `data\mods`, most are under a `format.ts`, but mods with multiple formats have one file for each tier info. They are called with an ID in the beginning of `petmods-formats.ts`, then referenced to create the actual mod list.

Feb 2026 - @iforgetwhyimhere