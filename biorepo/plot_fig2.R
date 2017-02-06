library(ggplot2)
library(dplyr)

dat_tbl = tbl_df(read.table("forPlot_fig2.tab",header=TRUE))

ggplot(dat_tbl,aes(Class,JaccardIndex))+geom_boxplot(outlier.size = 0)+geom_jitter(width=0.05,height=0.2)+ggtitle("Jaccard Index")+xlab("Add title")+ylab("Add title")
ggsave("Fig2.png")
