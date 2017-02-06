'''
Created on Jan 29, 2017

This piece of code looks at all biorxiv papers and extracts git repos that have been cited

@author: akshaykakuman
'''

import requests
from bs4 import BeautifulSoup as bs
import re
from locale import *

gitre = re.compile(" |\)|,")
zwsp = re.compile(u"\u200b")
setlocale(LC_NUMERIC, '')


def buildQuery(searchterm, datefrom, dateto, pagination):
    urlbase = "http://biorxiv.org/search/text_abstract_title%3A{term}%20\
text_abstract_title_flags%3Amatch-all%20limit_from%3A{fromdate}%20\
limit_to%3A{todate}%20numresults%3A100%20sort%3Arelevance-rank%20\
format_result%3Astandard?page={pageno}"
    urlinstace = urlbase.format(term=searchterm, fromdate=datefrom, todate= dateto, pageno=pagination)
    return urlinstace

def getNumHits(posturl):
    soup = getSoup(posturl)
    summaryDiv = soup.find("div", {"class":"highwire-search-summary"})
    hitre = re.compile("\s")
    return atoi(hitre.split(summaryDiv.contents[0].contents[0].strip())[0]);
    
    
def getSoup(posturl):
    resp = requests.post(posturl)
    soup = bs(resp.text,'html.parser')
    return soup
    
def printGitRepo(soup):
    alldivs = soup.findAll("div", {"class":"highwire-cite-snippet"})
    for div in alldivs:
        #print len(div.contents)
        #print div.contents[1].encode("utf-8")
        #print div.contents[2].encode("utf-8")
        if(len(div.contents)==3 and div.contents[2].encode("utf-8")!= ""):
            repo=gitre.split(div.contents[2].encode("utf-8").strip())[0]
            print zwsp.sub("",repo.decode("utf-8")).encode("utf-8")
    
def main():
    url=buildQuery("github.com","2011-01-01", "2017-01-27","0" )
    numHits = getNumHits(url) ## Get number of hits for the search query
    numrequests = numHits/100
    for i in range(0,numrequests):
        url=buildQuery("github.com","2011-01-01", "2017-01-27",str(i))
        soup = getSoup(url)
        #print soup
        printGitRepo(soup)    
        

if __name__ == "__main__":
    main()
    
    
    
    
