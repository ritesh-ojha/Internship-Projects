function sendReportCards() {
  var spreadsheetId = '1ZUaxwpunl52LFG7R6w3R9HvcTwbdfzn8aStLRHns7BI';
  var sheetName = 'Report';
  
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var dataRange = sheet.getRange('A2:K'); // Assuming data starts from row 2 and columns A to H
  var data = dataRange.getValues();
  
  var senderEmail = 'care@jrrobo.com';
  var senderName = 'Junior Robo';
  var emai_subject = 'Student Report Cards';
  var currentDate = new Date();
  
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1; // Note: month starts from 0
  var day = currentDate.getDate();
  
  

  var formattedDate = + day + '-' + month + '-' + year;
  

  var sentEmails = sheet.getRange('L2:L').getValues().flat(); // Assuming column I is used to track sent emails

  var template = HtmlService.createHtmlOutputFromFile('Test_Score').getContent();

  var template_2  = HtmlService.createHtmlOutputFromFile('Without_Test').getContent();
  
  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var h1 = "Junior Robo- Daily Session Report";
    var name = row[0];
    var subject = row[1];
    var topic = row[2];
    var test_conduct = row[3];
    var test_topic = row[4];
    var test_score = row[5];
    var home_work = row[6];
    var class_parti = row[7]
    var remarks = row[8];
    var teacherName = row[9];
    var recipientEmail = row[10].toString().trim();
    var emailSent = sentEmails[i];
    
    if (recipientEmail !== '' && emailSent !== 'SENT'){
      var emailTemplate;
      if (test_conduct == "Yes") {
        emailTemplate = template; // Choose template 1 for Math course
      } else {
        emailTemplate = template_2; // Choose template 2 for other courses
      }
        
        var emailBody = emailTemplate.replace('{{date}}',formattedDate)
                                .replace('{{h1}}',h1)
                                .replace('{{name}}', name)
                                .replace('{{subject}}', subject)
                                .replace('{{topic}}', topic)
                                .replace('{{test_topic}}', test_topic)
                                .replace('{{test_marks}}', test_score)
                                .replace('{{homework}}', home_work)
                                .replace('{{classpart}}', class_parti)
                                .replace('{{remarks}}', remarks)
                                .replace('{{remarks}}', remarks)
                                .replace('{{teacherName}}', teacherName);
                                
      
        // Send email
        MailApp.sendEmail({
          to: recipientEmail,
          subject: name + ', Session Report for '+ formattedDate + ' [Junior Robo]',        
          body: "Hello EveryOne",
          htmlBody: emailBody,
          name: senderName,
          replyTo: senderEmail,
          from: senderEmail
        });

      

      // Mark email as sent
      sheet.getRange('L' + (i + 2)).setValue('SENT'); // Assuming column I is used to track sent emails

    }
  }
}
