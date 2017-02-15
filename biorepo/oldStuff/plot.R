library(ggplot2)
library(dplyr)

dat = tbl_df(read.table("StarredReposStatsFINAL_bioUsergGt1_forPlot.list",header=TRUE))


datAvg = dat %>% group_by(tag) %>% summarize(avgEnrichment = mean(Fraction))

glimpse(datAvg)


ggplot(datAvg,aes(tag,avgEnrichment))+geom_point(size=3)+ylim(0,0.2)+ylab("FractStargazers")+scale_x_discrete("Number of Bioinformatician Stargazers", labels = c("1_2-4" = "[2,4)","2_4-6" = "[4,6)","3_6-8" = "[6,8)","4_8-10" = "[8,10)","5_10-12" = "[10,12)","6_12-14" = "[12,14)", "7_14-16" = "[14,16)", "8_16-18" = "[16,18)", "9_18-20" = "[18,20)", "910_20-22" = "[20,22)", "930_24-26" = "[24,26)", "950_gt28" = "[28,31)" ))+theme(axis.text = element_text(size=20),axis.text.x = element_text(angle = 60, hjust = 1,size=20),legend.title= element_text(size=25),legend.text= element_text(size=20), title=element_text(size=20),axis.title=element_text(size=25))+ggtitle("Estimated enrichment of bioinformatician stargazers in domain specific popular GitHUB repositories ")
ggsave("F1.png",width=10,height=7)
