# Email Configuration Guide

## Gmail Setup for Sending Emails

The email service is not sending emails because Gmail requires specific security settings. Follow these steps:

### Option 1: Using Gmail App Password (Recommended)

1. **Enable 2-Step Verification**
   - Go to your Google Account: https://myaccount.google.com/
   - Navigate to Security → 2-Step Verification
   - Follow the prompts to enable it

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Select "Other" as the device and name it "SkillSync Server"
   - Click "Generate"
   - Copy the 16-character password (spaces will be removed automatically)

3. **Update .env file**
   ```env
   COMPANY_MAIL=your-email@gmail.com
   MAIL_PASSWORD=your-16-char-app-password
   ```

### Option 2: Allow Less Secure Apps (Not Recommended)

If you can't use app passwords:
1. Go to: https://myaccount.google.com/lesssecureapps
2. Turn ON "Allow less secure apps"
3. Use your regular Gmail password in `MAIL_PASSWORD`

### Current Configuration

The server is configured to use:
- **Email**: skillsync.job.portal@gmail.com
- **App Password**: (configured in env.config.ts)

If emails are still not working:
1. Check the server logs for detailed error messages
2. Verify the email and password are correct
3. Ensure Gmail hasn't blocked the sign-in attempt (check your email for security alerts)

### Testing Email Functionality

1. **Test Registration Email**
   ```bash
   curl -X POST http://localhost:5000/api/users/register \
     -H "Content-Type: application/json" \
     -d '{
       "fullName": "Test User",
       "email": "your-test-email@example.com",
       "password": "TestPass123!",
       "userType": "candidate"
     }'
   ```

2. **Test Forgot Password Email**
   ```bash
   curl -X POST http://localhost:5000/api/users/forgot-password \
     -H "Content-Type: application/json" \
     -d '{
       "email": "existing-user@example.com"
     }'
   ```

3. **Check Server Logs**
   - Look for messages starting with:
     - ✅ (success)
     - ❌ (error)
     - 📧 (attempting to send)
     - 📬 (message ID)

### Common Issues

1. **"Invalid login: 535-5.7.8 Username and Password not accepted"**
   - Solution: Enable 2-step verification and use app password

2. **"Connection timeout"**
   - Solution: Check firewall settings or use a different network

3. **"self signed certificate in certificate chain"**
   - Solution: Update Node.js or add `tls: { rejectUnauthorized: false }` to transporter (not recommended for production)

4. **No error but emails not received**
   - Check spam/junk folder
   - Verify the recipient email is correct
   - Check Gmail's "Sent" folder for the sender account

### Troubleshooting Checklist

- [ ] 2-Step Verification is enabled on Gmail
- [ ] App password is generated and copied correctly (no spaces)
- [ ] .env file exists in `/server` directory
- [ ] COMPANY_MAIL and MAIL_PASSWORD are set correctly
- [ ] Server is restarted after .env changes
- [ ] Check server console for "✅ Mail service verified and ready to send emails"
- [ ] No security alerts from Gmail blocking sign-in attempts
