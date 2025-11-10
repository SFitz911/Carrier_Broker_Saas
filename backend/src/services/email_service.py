"""
Email Service
Handles email sending using centralized credentials
"""

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List
from src.utils.config import config


class EmailService:
    """
    Service for sending emails
    All SMTP credentials are loaded from centralized config
    """
    
    def __init__(self):
        # Load credentials from centralized config
        self.smtp_host = config.get("email.smtp_host")
        self.smtp_port = config.get("email.smtp_port")
        self.smtp_user = config.get("email.smtp_user")
        self.smtp_password = config.get("email.smtp_password")
        self.from_email = config.get("email.from_email")
    
    def send_email(
        self,
        to_emails: List[str],
        subject: str,
        body: str,
        html: bool = False
    ) -> bool:
        """
        Send email to recipients
        
        Args:
            to_emails: List of recipient email addresses
            subject: Email subject
            body: Email body (text or HTML)
            html: Whether body is HTML
        
        Returns:
            True if sent successfully, False otherwise
        """
        try:
            msg = MIMEMultipart('alternative')
            msg['From'] = self.from_email
            msg['To'] = ', '.join(to_emails)
            msg['Subject'] = subject
            
            if html:
                msg.attach(MIMEText(body, 'html'))
            else:
                msg.attach(MIMEText(body, 'plain'))
            
            # Connect to SMTP server
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_user, self.smtp_password)
                server.send_message(msg)
            
            print(f"Email sent successfully to {to_emails}")
            return True
            
        except Exception as e:
            print(f"Error sending email: {e}")
            return False
    
    def send_verification_email(self, to_email: str, verification_link: str) -> bool:
        """Send email verification link"""
        subject = "Verify your Carrier Board account"
        body = f"""
        <html>
            <body>
                <h2>Welcome to Carrier Board!</h2>
                <p>Please verify your email address by clicking the link below:</p>
                <p><a href="{verification_link}">Verify Email</a></p>
                <p>If you didn't create an account, you can safely ignore this email.</p>
            </body>
        </html>
        """
        return self.send_email([to_email], subject, body, html=True)


# Global instance - credentials loaded automatically
email_service = EmailService()

