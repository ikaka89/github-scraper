## biorxiv (user_bx) --> (prepos, forked, and stars) repos_bx 
while read p; do node getUserRepos.js $p 1 >> tmp; done < allBioUsers.list
mv tmp repos_bx

	## Page 2
while read p; do node getUserRepos.js $p 2 >> tmp; done < allBioUsers.list
cat tmp repos_bx.tab > t
mv t repos_bx.tab 


