# Aurora App
The react app.
Its ejected from react.


##   Get started
Run
1. `code .` .
2. `yarn install`.
3. `yarn app`

---
### Folder structure 
* The src holds the source code.
* The dist holds generated binary files.
* The public holds the avatars and the index html file.

### Remove dist from commit
remove unecessary files huge files ie the binary generated 
~ `git gc --prune=now --aggressive`

or 

~ ```git filter-branch --prune-empty -d /home/publisher/Development/Kotlin/Aurora/client/modules/components/json-operations/dist scratch \ --index-filter "git rm --cached -f --ignore-unmatch oops.iso" \  --tag-name-filter cat -- --all```

or check `https://stackoverflow.com/questions/2100907/how-to-remove-delete-a-large-file-from-commit-history-in-git-repository`
or check :
`https://help.github.com/en/github/managing-large-files/removing-files-from-a-repositorys-history`