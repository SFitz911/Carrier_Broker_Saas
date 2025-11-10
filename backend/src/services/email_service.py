"""
Email Service
Handles email sending - OPTIONAL for development

NOTE: This service is OPTIONAL. Students can develop without email credentials.
If not configured, it logs emails to console instead of sending.
"""

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List
from src.utils.config import config


class EmailService:
    """
    Service for sending emails
    
    OPTIONAL: Works without SMTP credentials for development/testing
    If credentials not set, emails are logged to console instead
    """
    
    def __init__(self):
        # Load credentials from centralized config (OPTIONAL)
        self.smtp_host = config.get("email.smtp_host")
        self.smtp_port = config.get("email.smtp_port")
        self.smtp_user = config.get("email.smtp_user")
        self.smtp_password = config.get("email.smtp_password")
        self.from_email = config.get("email.from_email")
        
        # Check if we're in mock mode (no credentials configured)
        self.mock_mode = (
            not self.smtp_user or 
            not self.smtp_password or 
            self.smtp_user == "your-email@gmail.com"
        )
    
    def send_email(
        self,
        to_emails: List[str],
        subject: str,
        body: str,
        html: bool = False
    ) -> bool:
        """
        Send email to recipients
        
        DEVELOPMENT MODE: If no credentials, logs to console instead
        
        Args:
            to_emails: List of recipient email addresses
            subject: Email subject
            body: Email body (text or HTML)
            html: Whether body is HTML
        
        Returns:
            True if sent successfully, False otherwise
        """
        # MOCK MODE - No SMTP credentials needed for development
        if self.mock_mode:
            print("=" * 60)
            print("📧 MOCK EMAIL (No SMTP credentials configured)")
            print("=" * 60)
            print(f"To: {', '.join(to_emails)}")
            print(f"From: {self.from_email}")
            print(f"Subject: {subject}")
            print(f"Type: {'HTML' if html else 'Plain Text'}")
            print("-" * 60)
            print(body)
            print("=" * 60)
            print("✓ Email logged (not sent - no credentials required)")
            return True
        
        # REAL EMAIL MODE - Only if SMTP credentials are configured
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
            
            print(f"✓ Email sent successfully to {to_emails}")
            return True
            
        except Exception as e:
            print(f"✗ Error sending email: {e}")
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

