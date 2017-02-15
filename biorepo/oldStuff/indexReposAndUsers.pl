use strict;

my $userStarts = $ARGV[0];

open(I1,$userStarts);

my %usersToInd;
my %reposToInd;
my %indToUser;
my %indToRepo;
my %pairs;

my $repoInd = 0;
my $userInd = 0;
while(<I1>){
	chomp $_;
	my @pieces = split("\t",$_);
	if(!exists $usersToInd{$pieces[0]}){
		$usersToInd{$pieces[0]} = $userInd;
		$indToUser{$userInd} = $pieces[0];
		$userInd++;
	}

	if(!exists $reposToInd{$pieces[1]}){
		$reposToInd{$pieces[1]} = $repoInd;
		$indToRepo{$repoInd} = $pieces[1];
		$repoInd++;
	}
	if(!exists $pairs{$pieces[0]}){
		$pairs{$pieces[0]} = [$pieces[1]];
	}else{
		push(@{$pairs{$pieces[0]}},$pieces[1]);
	}
}

close(I1);

open(U1,">userIndex.txt");
foreach my $id (keys %indToUser){
	print U1 $id,"\t",$indToUser{$id},"\n";
}

close(U1);

open(R1,">repoIndex.txt");
foreach my $id (keys %indToRepo){
	print R1 $id,"\t",$indToRepo{$id},"\n";
}
close(R1);

my @data=();
$data[scalar(keys %usersToInd)][scalar(keys %reposToInd)]= 0;

for(my $i=0; $i< scalar(keys %usersToInd); $i++){
        for(my $j=0; $j< scalar(keys %reposToInd); $j++){
                $data[$i][$j] = 0;
        }
}


foreach my $usr (keys %pairs){
	foreach my $rep (@{$pairs{$usr}}){
		$data[$usersToInd{$usr}][$reposToInd{$rep}] = 1;
	}
}

for(my $i=0; $i< scalar(keys %usersToInd); $i++){
	for(my $j=0; $j< scalar(keys %reposToInd); $j++){
		print $data[$i][$j],"\t";
	}
	print "\n";
}