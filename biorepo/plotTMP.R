library(ggplot2)
library(dplyr)

dat = tbl_df(read.table("StarredReposStatsFINAL_bioUsergGt1_forPlot.list",header=TRUE))

datAvg = dat %>% group_by(tag) %>% summarize(avgEnrichment = mean(Fraction))



