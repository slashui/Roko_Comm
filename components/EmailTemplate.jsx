/**
 * Email Template Component for Password Reset
 * 
 * This component defines the email template used for password reset functionality.
 * The template includes:
 * 1. Company logo
 * 2. Greeting message
 * 3. Password reset instructions
 * 4. OTP (One-Time Password) display
 * 5. Security notice for unintended recipients
 * 6. Company signature and closing
 * 
 * The component accepts:
 * - DataOTP: The one-time password code to be displayed in the email
 * 
 * This template maintains brand consistency while providing clear instructions
 * to users going through the password recovery process.
 */


export const EmailTemplate = ({DataOTP}) => (
    <div>
    
        <img src="https://one-day-build.vercel.app/logo.png" />
        <div>Hello!</div>
        <p>You recently requested a password reset for your account. To proceed with the reset, please use the following verification code:</p>
        <h1>{DataOTP}</h1>
        <p>If you did not initiate this request, no further action is required. Your account is secure.</p>
        Thank you for using <b>OneDay Build</b>
        <p>Best regards,</p>
        <p>Dan</p>
    </div>
);