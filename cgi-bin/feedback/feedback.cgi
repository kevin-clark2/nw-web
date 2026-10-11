#!/usr/bin/perl

#########################################################
###
### Objectsoft Feedback processing
###
##########################################################
### initialize these variables to the correct values to localize to your system
###
use CGI qw/:standard/; 


main();

###########################################################
sub main {
    print "Content-type: text/html", "\n\n";
    $mailpath = "/usr/local/bin/mutt";
    $mailto = param('email');
    $infoto = "feedback\@notwired.com";

    feedbackMessage();
    confirmFeedback();
    recordContact();
}

sub confirmFeedback {
    emailMessage();
    sendInfoEmail();

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
    <td width="422" valign="top"><font face="Arial" color="#6666cc"><strong><br>
    <small>Thank You!</small></strong></font>
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
sub feedbackMessage {

$message =
"Dear ".param('first_name')." ".param('last_name')."

Thank you for your feedback.
  
Your feedback has been submitted to us.
We appreciate your comments. We look forward 
to improving our products and services per
your suggestions.
	
Please call sales at 949-371-5449 if you have any sales questions.

Additionally you may contact us via:
Email: support\@notwired.com. 

Thank You.";

}

sub sendInfoEmail {

  open(FH, ">$mailto.muttrc");
  print FH "my_hdr From: ".$mailto . "\n\n";
  close FH;

  open (USERINFO, ">$mailto.out");
  print USERINFO "The following customer:\n";
  print USERINFO "\n";
  print USERINFO "Name: ", param('first_name'), " ", param('last_name'), "\n";
  print USERINFO "Company: ", param('company'), "\n";
  print USERINFO "Phone Number: ", param('phone'), "\n";
  print USERINFO "Fax: ", param('fax'), "\n";
  print USERINFO "E-Mail: ", param('email'), "\n";
  print USERINFO "\n";
  print USERINFO "Submitted the following feedback:\n";
  print USERINFO "\n";
  print USERINFO "Kind: ", param('kind'), "\n";
  print USERINFO "About: ", param('subject'), "\n";
  print USERINFO "Other: ", param('other'), "\n";
  print USERINFO "Comment: ", param('comment'), "\n";
  print USERINFO "Contact: ", param('contact'), "\n";
  close (USERINFO);


  $email = "-s \"Feedback Submitted!\" -F \"$mailto.muttrc\" \"$infoto\" < \"$mailto.out\"";

  open (EMAIL, "$mailpath $email |");
  close (EMAIL);

  unlink "$mailto.out";
  unlink "$mailto.muttrc";
}

###########################################################
sub emailMessage {

  open (EMAILFILE, ">$mailto.out");
  print EMAILFILE $message,"\n\n";
  close (EMAILFILE);

  $email = "-s \"Thank you for your feeback!\" -F \"feedback.muttrc\" \"$mailto\" < \"$mailto.out\"";

  open (EMAIL, "$mailpath $email |");
  close (EMAIL);

  unlink "$mailto.out";

}

#This subrotuine is added to store the data in feedback form in a file

sub recordContact {

$numofrecords = param('FIELDNUM');	

       $i=1;
#Create and clear an array to hold the mappings
#that come in from the registration form into variable ($fields)
       while ($i <$numofrecords) 
         {
         $fields{$i} = "";
         $i++;
         }
#Parse the "MAP" from registrations to name value pairs ($maps)
 	
 		@maps = split(/\|/, param('MAP'));
    		foreach $map (@maps)    {
        		($name, $value) = split(/:/, $map);
 
				if ($fields{$name})
				{
					$fields{$name} .= " ";
				}

				$fields{$name} .= param($value);
     		}
#Parses the notes field(s) this is treated slightly differently
#because the label of notes needs to be placed into the file
     	     
# 		@notes = split(/\|/, param('NOTES'));
#    		foreach $note (@notes)    {
#        		($name, $value) = split(/:/, $note);
#        		$fields{notes} .= $value - param($name);
#     		}

#open file designated in registration form
   $location = param('OUTPUT');
   open(CONTACTS, ">>$location");
   $i=1;

#print out all contacts to file designated in registration form

       while ($i <$numofrecords)
         {
			print CONTACTS '"';
			$fields{$i} =~ s/,/ /g;
			print CONTACTS $fields{$i};
			print CONTACTS '",';
			$i++;
         }
         print CONTACTS "\"$fields{notes}\",\n";                 
   close(CONTACTS);

} ###  <-- end of subroutine

