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
    $mutt = "/usr/local/bin/mutt";
    $muttrc = "/export/home/notwired/web/Notwired/cgi-bin/survey/muttrc";
    $mailto = param('email');
    $infoto = "survey\@notwired.com";

	feedbackMessage();
	confirmFeedback();
}

sub confirmFeedback {
	emailMessage();
	emailInfo();

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
    <small>Thank You For Entering The Mobile Office Sweepstakes!</small></strong></font>
<br><br>

$htmlMessage

    </td>
  </tr>
</table>

</BODY>
</HTML>
EOM

} ###  <-- end of subroutine

###########################################################
sub feedbackMessage {
$htmlMessage =
"Dear ".param('first_name').",
<p>
Thank you for your feedback.  The survey has been submitted.
<p>
Please call sales at 949-371-5449 if you have any sales questions.
<p>
Additionally you may contact us via:<br>
Email: support\@notwired.com. 
<p>
We will be drawing the winners' names and notifying the lucky players soon.
<p>
You can see the <a href=\"../../support/contest_rules.html\">Sweepstakes Rules</a> for details.
<p>
Empower your mobile lifestyle today at <a href=\"http://www.notwired.com\">www.notwired.com</a>.
<p>
Thank You.";

$message =
"Dear ".param('first_name').",

Thank you for completing the survey and entering the NotWired Mobile Office Sweepstakes!

The survey has been submitted.

Please call sales at 949-371-5449 if you have any sales questions.

Additionally you may contact us via:
Email: support\@notwired.com. 

We will be drawing the winners' names and notifying the lucky players soon.

Empower your mobile lifestyle today at http://www.notwired.com.

Thank You.";

}

###########################################################
sub emailInfo {

$userinfo = 
"Mobile Business Survey

* First Name:       ".param('first_name')."
* Last Name:        ".param('last_name')."
* Email:            ".param('email')."
* Telephone Number: ".param('phone')."
* Address:
".param('address')."

* Line of business:     ". join(", ", param('lineOfBusiness')) ."
* Consulting description:     ".param('lobSpecifiedConsulting')."
* Other description:     ".param('lobSpecifiedOther')."
* Number of full-time employees:     ".param('numberOfFulltimeEmployees')."
* Number of employees travel frequently or make frequent sales calls:     ".param('numberOfTravelingEmployees')."
* Do these traveling employees have mobile internet access:     ".param('haveMobileNetAccess')."
* How many employees have mobile internet access:     ".param('numEmployeesWithMobileNetAccess')."
* What features of mobile internet access are used most often by these employees:     ". join(", ", param('mobileNetAccessFeatures')) ."
* Other features:     ".param('mobileNetAccessFeaturesOther')."
* Why traveling employees do not have mobile internet access:     ". join(", ", param('whyNoMobileNetAccess')) ."
* Other reasons why not:     ".param('whyNoMobileNetAccessOther')."
* What software does your company currently use:     ". join(", ", param('softwareUsing')) ."
* Other software using:     ".param('softwareUsingOther')."
* What services do you look for in software:     ". join(", ", param('servicesLookForInSoftware')) ."
* Which of these services do you use most frequently:     ".param('mostUsedServices')."
* Which of these services do you use least often:     ".param('leastUsedServices')."
* How do you currently schedule meetings with your team and/or other particpants:     ". join(", ", param('howScheduleMeetings')) ."
* Other ways schedule meetings:     ".param('howScheduleMeetingsOther')."
* How do you currently share information on relevant websites with your team:     ". join(", ", param('howShareInfoOnWebsites')) ."
* Other ways share information on relevant websites:     ".param('howShareInfoOnWebsitesOther')."
* If you do not have scheduling software, how do you currently access information about upcoming meetings:     ". join(", ", param('howAccessInfoAboutMeetings')) ."
* How do you currently access colleagues contact information when you are on the road:     ". join(", ", param('howAccessContactInfo')) ."
* Other ways access colleagues contact information when you are on the road:     ".param('howAccessContactInfoOther')."
* Would find services useful:     ".param('wouldFindUseful')."
";

  my $result =  open (MUTT_MAIL,"|-");
  die "Couldn't open pipe to subprocess" unless defined($result);

  exec $mutt, "-n", "-s", "Survey Submitted!", "-F", $muttrc, $infoto or die "Couldn't exec mutt" if $result == 0;

  print MUTT_MAIL $userinfo, "\n";
  print MUTT_MAIL "\n";

  close MUTT_MAIL;
}

###########################################################
sub emailMessage {
  my $result =  open (MUTT_MAIL,"|-");
  die "Couldn't open pipe to subprocess" unless defined($result);

  exec $mutt, "-n", "-s", "Thank you for taking the survey!", "-F", $muttrc, $mailto or die "Couldn't exec mutt" if $result == 0;

  print MUTT_MAIL $message, "\n";
  print MUTT_MAIL "\n";

  close MUTT_MAIL;
}

