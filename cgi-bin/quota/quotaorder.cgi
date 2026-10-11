#!/usr/bin/perl

#########################################################
###
### NotWired quota order processing
###
##########################################################
### initialize these variables to the correct values to localize to your system
###
use CGI qw/:standard/; 


main();

###########################################################
sub main {
    print "Content-type: text/html", "\n\n";
    $mutt = "/usr/local/bin/mutt";
    $muttrc = "/export/home/notwired/web/Notwired/cgi-bin/quota/muttrc";
    $mailto = param('login');
    $infoto = "sales\@notwired.com";

    displayMessage();
    emailMessage();
    infoMessage();
    confirmMessage();
}

sub confirmMessage {
    

    print <<"EOM";
	
<HTML>
<HEAD>
</HEAD>
	
<BODY  bgcolor="#FFFFFF">
	
<table border="0" cellpadding="0" cellspacing="0" width="650">
  <tr>
    <td width="228" valign="top"><a href="/index.html" target="_top"><img
    src="/images/NotWired.gif" width="174" height="52" alt="NotWired" border="0"></a><br>
    <small><small><font face="Arial">&nbsp; Empowering the mobile lifestyle!&#153;</font></small></small><br>
    <img src="/images/companypeople.jpg" width="200" height="200" alt="Company"></td>
    <td width="422" valign="top">
<pre>

$message

<pre>
    </td>
  </tr>
</table>

</BODY>
</HTML>
EOM

} ###  <-- end of subroutine

###########################################################
sub displayMessage {

$message =
"Dear ".param('first_name')." ".param('last_name').",

Thank you for your order.
  
Your order has been submitted to us. We appreciate your business. 
Your credit card will not be charged until your quota has been increased.
Our sales representative will contact you when transaction is completed.
	
Please call sales at 949-371-5449 if you have any sales questions.

Additionally you may contact us via:
Email: support\@notwired.com. 

Thank You.";

}

sub infoMessage {
  my $result =  open (MUTT_MAIL,"|-");
  die "Couldn't open pipe to subprocess" unless defined($result);

  open(FH, ">muttrc");
  $mailfrom = "my_hdr From: ".param('first_name')." ".param('last_name')." <".$mailto.">\n\n";
  print FH $mailfrom;
  close FH;
 
  exec $mutt, "-n", "-s", "Quota Order Submitted!", "-F", $muttrc, $infoto or die "Couldn't exec mutt" if $result == 0;

  $previousDefaultFileHandle = select MUTT_MAIL;
  print "The following customer ordered larger quota:\n";
  print "\n";
  print "Name: ", param('first_name'), " ", param('last_name'), "\n";
  print "Login: ", param('login'), "\n";
  print "Phone Number: ", param('phone'), "\n";
  print "Credit Card: ", param('credit_card'), "\n";
  print "Expires: ", param('expy_date'), "\n"; 
  select $previousDefaultFileHandle;
  close MUTT_MAIL;
}

###########################################################
sub emailMessage {
  my $result =  open (MUTT_MAIL,"|-");
  die "Couldn't open pipe to subprocess" unless defined($result);

  open(FH, ">muttrc");
  $mailfrom = "my_hdr From: Notwired Sales <".$infoto.">\n\n";
  print FH $mailfrom;
  close FH;

  exec $mutt, "-n", "-s", "Thank you for your business!", "-F", $muttrc, $mailto or die "Couldn't exec mutt" if $result == 0;

  print MUTT_MAIL $message, "\n";
  print MUTT_MAIL "\n";

  close MUTT_MAIL;
}
