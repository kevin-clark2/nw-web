#!/usr/bin/perl

use CGI qw/:standard/; 

#########################################################
###
### Objectsoft Registration processing
###
##########################################################
### initialize these variables to the correct values to localize to your system
###

main();

###########################################################
sub main {
    print "Content-type: text/html", "\n\n";
    $agreementfile = "Mutual Nondisclosure Agreement.doc";
    $mailpath = "/usr/local/bin/mutt";
    $mainmailto = "registration\@notwired.com";

    $mailto = param('FIELD3');
    $login = param('FIELD4');

    registrationMessage();
    confirmServiceRegistration();	    
}


###########################################################
sub confirmServiceRegistration {
	emailServiceMessage();
	sendServiceEmail();
	recordContact();

	print <<"EOM";

<HTML>
<HEAD>
</HEAD>
<base target="middle">	

<body link="#6666cc" vlink="#6666cc" alink="#6666cc0">

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

</pre>
    </td>
  </tr>
</table> 
</body>
</html>
EOM

} ###  <-- end of subroutine



###########################################################
sub registrationMessage {

$message =
"Dear ".param('FIELD1')." ".param('FIELD2')."

Thank you for registering at NotWired.

Your registration has been submitted to us. We will review your
service needs and a representative will contact you soon.
We will keep you posted about the updates and new Notwired services. 
	
Please call sales at 949-371-5449 if you have any sales
questions.

Additionally you may contact us via:
Email: support\@notwired.com.
Web: http://www.notwired.com and go to the support page.";

} ### <-- end of subroutine



###########################################################
sub emailServiceMessage {
 
open(EMAILFILE, ">$mailto.out");
print EMAILFILE $message,"\n\n";
close (EMAILFILE);

$email = "-s \"Thank you for your registration!\" -F \"registration.muttrc\" \"$mailto\" < \"$mailto.out\"";
open (EMAIL, "$mailpath $email |");
close (EMAIL);

unlink "$mailto.out";

}

###########################################################
sub sendServiceEmail{
  open(FH, ">$mailto.muttrc");
  print FH "my_hdr From: ".$mailto . "\n\n";
  close FH;

  ##### Email to be sent back to us ###
  open (USERINFO, ">$mailto.out");
  print "First Name: ",param('FIELD1');
  print "\nLast Name: ", param('FIELD2');
  print "\nE-mail: ", param('FIELD3');
  print "\nCompany: ", param('FIELD4');
  print "\nPhone Number: ", param('FIELD5');
  print "\nFax Number: ", param('FIELD6');
  print "\nAddress: ";
  print "\n",param('FIELD7'),",",param('FIELD8');
  print "\n",param('FIELD9'),", ",param('FIELD10')," ",param('FIELD11');
  print "\n",param('FIELD12');
  print "\nWeb Site: ",param('FIELD13');
  print "\nI am: ",param('FIELD14');
  print "\nInterest: ",param('FIELD15');
  print "\nBudget: ",param('FIELD16');
  print "\nWorking on: ",param('NOTE1');
  print "\nHow did you hear?: ",param('FIELD17');
  close (USERINFO);


  $email = "-s \"New Service Registration!\" -F \"$mailto.muttrc\" \"$mainmailto\" < \"$mailto.out\"";

  open(MAINEMAIL, "$mailpath $email |");
  close(MAINEMAIL);

  unlink "$mailto.out";
  unlink "$mailto.muttrc";
} 
### <- end of subroutine



###########################################################
#This is the subroutine that writes the information to the file
###########################################################
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
     	     
 		@notes = split(/\|/, param('NOTES'));
    		foreach $note (@notes)    {
        		($name, $value) = split(/:/, $note);
        		$fields{notes} .= $value - param($name);
     		}

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

