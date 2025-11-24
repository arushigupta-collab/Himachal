# Himachal Grievance Portal

A frontend prototype for the Himachal Pradesh Public Grievance Redressal Portal.

## Features

- **Public Interface**: Clean, accessible UI for citizens.
- **Grievance Filing**: Wizard-based form for submitting complaints.
- **Track Status**: Fully functional demo using LocalStorage persistence.
- **Authentication**: Mock OTP-based login flow (client-side only).
- **Dashboard**: Nodal Officer dashboard for managing grievances.

## Testing Instructions

1. **Citizen Login**:
   - Click "Login", "File a Grievance", or "Track Status".
   - Enter any 10-digit mobile number (e.g., 9876543210).
   - Click "Get OTP".
   - Use the OTP displayed in the blue box (Mock OTP) to verify.

2. **File Grievance**:
   - After login, navigate to "File Grievance".
   - Complete the 3-step form and submit.
   - You will be automatically redirected to the tracking page.
   - **Note**: Data is saved to your browser's LocalStorage linked to your mobile number.

3. **Track Grievance**:
   - Click "Track Status" in the hero section or menu.
   - You will see a list of grievances submitted by your current mobile number.
   - Click "View Details" to see the timeline, full description, and use the message box to add a reply.

4. **Officer Dashboard**:
   - Open the Login modal.
   - Click the small "(Demo Only) Login as Nodal Officer" link at the bottom.
   - Access the "Dashboard" via the header menu.

## Tech Stack

- React 18
- Tailwind CSS
- TypeScript
- LocalStorage (for data persistence)