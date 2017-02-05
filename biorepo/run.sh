# get all bio users
cut -f2 annotatedScrapedRepos.list | cut -d "/" -f1,2,3,4 > tmp

# now, annotates these urls
awk -v g="'" '{print g"\""$1"\","g"+"}' tmp > annotateScrapedTruncatedLinks.js
rm tmp

# add more stuff to the js file
node annotateScrapedTruncatedLinks.js > t
grep -v "Scraper" t > p
mv p t
mv t annotateScrapedTruncatedLinks.list

## now get all users from orgs
awk '$1=="org"{print $2}' annotateScrapedTruncatedLinks.list | awk -v g="'" '{print g"\""$1"\","g"+"}'  > getBioUsersFromOrgs.js 
node getBioUsersFromOrgs.js > t
grep -v "people" t > bioUsersFromScrapedOrgs.list
rm t   

### Get a full list of bio users
grep "profile" annotateScrapedTruncatedLinks.list | cut -f2 > t
cat bioUsersFromScrapedOrgs.list t | sort | uniq > allBioUsers.list




