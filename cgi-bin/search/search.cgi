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
  	parseVariables();
	 
	$url = "http://search.atomz.com/search/?sp-q=$contents{search}&sp-a=000412b8-sp00000001";

	print "Content-type: text/html", "\n\n";
	print <<"EOM";
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>NotWired</title>
</head>
<script language="javascript">
  window.location.replace('$url');
</script>
</html>

EOM
		
}
###########################################################
sub parseVariables {
	# parse the passed variables and place in contents

	if ($ENV{'REQUEST_METHOD'} eq 'POST'){
    		# How many bytes are we supposed to receive?
    		read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'});	
    		@pairs = split(/&/, $buffer);
    		foreach $pair (@pairs)    {
        		($name, $value) = split(/=/, $pair);
        		$contents{$name} = &convert($value);
   		}
	}
}

###########################################################
# Replace hex characters and + with printables and spaces.
sub convert {
	($string) = @_;
	$string =~ s/%(..)/pack('c',hex($1))/eg;
	$string =~ s/\+/" "/eg;
	return $string;
} ###  <-- end of subroutine


