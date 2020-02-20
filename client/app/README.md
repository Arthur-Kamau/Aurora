# Aurora App
This App is a component of tyhe main app in the app folder.

#   Rembeber
remove unecessary files huge files ie the binary generated 
~ `git gc --prune=now --aggressive`

or 

~ ```git filter-branch --prune-empty -d /home/publisher/Development/Kotlin/Aurora/client/modules/components/json-operations/dist scratch \ --index-filter "git rm --cached -f --ignore-unmatch oops.iso" \  --tag-name-filter cat -- --all```

or check `https://stackoverflow.com/questions/2100907/how-to-remove-delete-a-large-file-from-commit-history-in-git-repository`
or check :
`https://help.github.com/en/github/managing-large-files/removing-files-from-a-repositorys-history`