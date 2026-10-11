#!/usr/bin/perl

#########################################################
###
### Objectsoft Transaction processing
###
##########################################################
### initialize these variables to the correct values to localize to your system
###

main();

###########################################################
sub main {
	 
        #$location = "type.txt";
        #open(TYPE, ">$location");

        #foreach $key (sort(keys %ENV)) {
        # print TYPE "$key = $ENV{$key}<br>\n";
	#}

	$accept = $ENV{'HTTP_ACCEPT'}; 

	if (index($accept, "text/vnd.wap.wml") > -1) {
	 wml(); 
	 return;
        }

        $agent = $ENV{'HTTP_USER_AGENT'};

	if (index($agent, "Elaine") > -1) {
	 pqa();
	 return;
	}
	
	html();	
}
###########################################################
sub html {

$url = "../builddown.shtml";

print "Content-type: text/html", "\n\n";
print <<"EOM";
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>NotWired</title>
</head>
<script language="javascript">
  parent.location.replace('$url');
</script>
</html>

EOM

}
###########################################################
sub wml {


$MISSING = "../builddown.wml";

open MISSING;

print "Content-type: text/vnd.wap.wml", "\n\n";

print STDOUT <MISSING>;

}
###########################################################
sub pqa {

$MISSING = "../builddown.pqa";

open MISSING;

print "Content-type: text/html", "\n\n";

print STDOUT <MISSING>; 


}
