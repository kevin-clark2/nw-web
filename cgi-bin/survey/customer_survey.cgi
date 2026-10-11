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

* How heard about NotWired:     ". param('howHeardAbout') ."
* Other description:     ".param('howHeardAboutOther')."
* How often you and/or team use NotWired:     ".param('howOftenUse') ."
* Why have not used NotWired since initially signed up:     ".param('whyNotUsedNotwired') ."
* Number of employees:     ".param('numberOfEmployees')."
* Number of employees using NotWired:     ".param('numberOfEmployeesUsingNotWired')."
* Number of employees travel frequently or make frequent sales calls:     ".param('numberOfTravelingEmployees')."
* Number of employees use NotWired from mobile phones or PDAs:     ".param('numberOfEmployeesUseFromPhoneOrPda')."
* Do you and/or team have mobile internet access:     ".param('haveMobileNetAccess')."
* Think mobile internet access would be useful for business:     ".param('thinkMobileNetAccessUseful')."
* How often schedule group meetings with NotWired:     ".param('howOftenScheduleGroupMeetings')."
* Other description:     ".param('howOftenScheduleGroupMeetingsOther')."
* How often access team member's contact information through NotWired phonebook:     ".param('howOftenAccessContacts')."
* Other description:     ".param('howOftenAccessContactsOther')."
* Do you and/or team members enter website URLs into Bookmarks section to share information amongst group:     ".param('doEnterBookmarks')."
* How many URLs listed in this section:     ".param('howManyUrls')."
* Do you and/or team send status reports to direct report from NotWired:     ".param('doSendStatusReports')."
* Do you and/or team assign tasks to other team members with NotWired:     ".param('doAssignTasks')."
* If Yes, do you track tasks to completion:     ".param('doTrackTasksToCompletion')."
* What software does your business currently use:     ". join(", ", param('softwareUsing')) ."
* Other software using:     ".param('softwareUsingOther')."
* Aspect of NotWired find most useful to your business:     ".param('aspectMostUseful')."
* Aspect of NotWired feel needs improvement:     ".param('aspectNeedsImprovement')."
* Are other services would like to see included in NotWired:     ".param('otherServicesWouldLike')."
* Additional Comments:     ".param('additionalComments')."
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

