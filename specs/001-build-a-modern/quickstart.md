# Quickstart Guide: Modern Section-Based Form Builder

**Feature**: 001-build-a-modern  
**Date**: 2025-01-27  
**Purpose**: End-to-end user journey validation and testing scenarios

## Prerequisites

### Development Environment Setup

1. **Node.js**: Version 18+ with pnpm package manager
2. **Database**: PostgreSQL 15+ running locally or via Docker
3. **Environment Variables**: Copy `.env.example` and configure database connection
4. **Dependencies**: Run `pnpm install` in repository root

### Application Startup

```bash
# Start all services
pnpm dev

# Or start individually
pnpm dev:frontend    # Next.js app on http://localhost:3000
pnpm dev:backend     # NestJS API on http://localhost:4000
pnpm dev:database    # PostgreSQL via Docker
```

## User Journey 1: New User Registration and First Form

### Step 1: User Registration

**Scenario**: New user creates account and accesses form builder

**Actions**:

1. Navigate to `http://localhost:3000/auth/sign-up`
2. Fill registration form:
   - First Name: "John"
   - Last Name: "Doe"
   - Email: "john.doe@example.com"
   - Password: "SecurePass123!"
3. Click "Create Account"
4. Verify successful registration and automatic login

**Expected Results**:

- User redirected to dashboard (`/app`)
- Profile shows correct user information
- Authentication token stored securely
- User can access form builder features

**API Validation**:

```bash
# Verify user creation
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "SecurePass123!"
  }'
```

### Step 2: Create First Form

**Scenario**: User creates a simple contact form with multiple sections

**Actions**:

1. Click "Create New Form" on dashboard
2. Fill form metadata:
   - Title: "Contact Us Form"
   - Description: "Get in touch with our team"
3. Add first section:
   - Section Title: "Personal Information"
   - Section Description: "Tell us about yourself"
4. Add fields to Personal Information section:
   - Text field: "Full Name" (required)
   - Email field: "Email Address" (required)
   - Text field: "Phone Number" (optional)
5. Add second section:
   - Section Title: "Message Details"
   - Section Description: "What can we help you with?"
6. Add fields to Message Details section:
   - Textarea field: "Message" (required, 10-500 characters)
   - Select field: "Subject" with options: "General", "Support", "Sales", "Other"
7. Save form as draft
8. Preview form to verify layout and functionality

**Expected Results**:

- Form saved with unique ID
- Sections display in correct order
- Fields have proper validation rules
- Preview shows form as end users will see it
- Form appears in dashboard with "Draft" status

**API Validation**:

```bash
# Create form
curl -X POST http://localhost:4000/forms \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Contact Us Form",
    "description": "Get in touch with our team",
    "sections": [
      {
        "title": "Personal Information",
        "description": "Tell us about yourself",
        "fields": [
          {
            "type": "text",
            "label": "Full Name",
            "required": true,
            "attributes": {
              "placeholder": "Enter your full name"
            }
          },
          {
            "type": "email",
            "label": "Email Address",
            "required": true,
            "attributes": {
              "placeholder": "your.email@example.com"
            }
          }
        ]
      }
    ]
  }'
```

### Step 3: Publish and Test Form

**Scenario**: User publishes form and tests end-user experience

**Actions**:

1. Click "Publish Form" on form editor
2. Copy the generated public URL
3. Open public URL in incognito/private browser window
4. Fill out the form as an end user:
   - Full Name: "Jane Smith"
   - Email: "jane.smith@example.com"
   - Phone: "555-123-4567"
   - Message: "I would like to learn more about your services"
   - Subject: "General"
5. Submit the form
6. Verify success message and redirect (if configured)
7. Return to form builder and check submissions

**Expected Results**:

- Form accessible via public URL without authentication
- All validation rules work correctly
- Submission saved successfully
- Form creator can view submission data
- Success message displayed to end user

**API Validation**:

```bash
# Publish form
curl -X POST http://localhost:4000/forms/{formId}/publish \
  -H "Authorization: Bearer $ACCESS_TOKEN"

# Submit form (public endpoint)
curl -X POST http://localhost:4000/forms/{formId}/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "fullName": "Jane Smith",
      "email": "jane.smith@example.com",
      "phone": "555-123-4567",
      "message": "I would like to learn more about your services",
      "subject": "General"
    }
  }'
```

## User Journey 2: Advanced Form Building

### Step 1: Create Complex Form with Conditional Logic

**Scenario**: User creates a survey form with conditional questions

**Actions**:

1. Create new form: "Customer Satisfaction Survey"
2. Add section: "Demographics"
3. Add fields:
   - Select: "Age Group" (18-25, 26-35, 36-45, 46-55, 55+)
   - Select: "Customer Type" (New, Returning, VIP)
4. Add section: "Experience Rating"
5. Add fields:
   - Number: "Overall Rating" (1-10 scale)
   - Checkbox: "Services Used" (Multiple options)
6. Add conditional section: "Detailed Feedback"
   - Only show if "Overall Rating" is less than 7
7. Add fields to conditional section:
   - Textarea: "What could we improve?"
   - Select: "Priority Level" (Low, Medium, High)
8. Configure form settings:
   - Allow drafts: true
   - Multi-page: true
   - Require authentication: false
9. Save and preview form

**Expected Results**:

- Conditional logic works correctly
- Form displays appropriate sections based on user input
- Multi-page navigation functions properly
- All field types render correctly with validation

### Step 2: Form Analytics and Management

**Scenario**: User manages form and views analytics

**Actions**:

1. View form dashboard showing:
   - Total submissions count
   - Completion rate percentage
   - Average completion time
   - Recent submissions list
2. Export submissions data as CSV
3. Edit form to add new field
4. View form version history
5. Duplicate form as template
6. Archive old form

**Expected Results**:

- Analytics data displays correctly
- Export functionality works
- Form editing preserves existing data
- Version history tracks changes
- Form duplication creates independent copy

## User Journey 3: Multi-User Collaboration

### Step 1: Team Form Building

**Scenario**: Multiple users collaborate on form creation

**Actions**:

1. User A creates form and shares with User B
2. User B makes edits to form sections
3. User A sees real-time updates
4. Both users add fields simultaneously
5. Conflict resolution when editing same field
6. User A publishes final form

**Expected Results**:

- Real-time collaboration works smoothly
- Changes sync between users
- Conflict resolution prevents data loss
- Final form reflects all collaborative changes

## User Journey 4: Form Submission Management

### Step 1: Review and Process Submissions

**Scenario**: Form creator reviews and manages submissions

**Actions**:

1. Access form submissions dashboard
2. Filter submissions by date range
3. Search submissions by field values
4. View individual submission details
5. Export filtered results
6. Mark submissions as processed
7. Add internal notes to submissions

**Expected Results**:

- Filtering and search work accurately
- Submission details display correctly
- Export includes all filtered data
- Status updates persist
- Notes are saved and visible

## User Journey 5: Authentication and Profile Management

### Step 1: User Profile and Preferences

**Scenario**: User manages account settings and preferences

**Actions**:

1. Access profile page from dashboard
2. Update personal information:
   - Change name
   - Update email address
   - Change password
3. Update interface preferences:
   - Switch to dark mode
   - Change language to Vietnamese
4. View account activity and login history
5. Logout and verify session termination

**Expected Results**:

- Profile updates save successfully
- Interface changes apply immediately
- Password change requires current password
- Session properly terminated on logout
- Activity history displays correctly

## Performance Validation

### Load Testing Scenarios

1. **Concurrent Form Submissions**: 100+ simultaneous form submissions
2. **Large Form Rendering**: Form with 50+ fields loads in <2 seconds
3. **Real-time Collaboration**: 10+ users editing same form simultaneously
4. **Database Performance**: 10,000+ submissions query in <200ms

### Browser Compatibility

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Responsive**: iOS Safari, Chrome Mobile, Samsung Internet
- **Accessibility**: Screen reader compatibility, keyboard navigation

## Error Handling Validation

### Network Error Scenarios

1. **Offline Form Building**: Graceful degradation when offline
2. **Submission Failures**: Retry mechanism for failed submissions
3. **Authentication Expiry**: Automatic token refresh
4. **Server Errors**: User-friendly error messages

### Data Validation Scenarios

1. **Invalid Form Data**: Proper validation error messages
2. **Malicious Input**: XSS and injection attack prevention
3. **File Upload Limits**: Proper file size and type validation
4. **Rate Limiting**: Appropriate rate limit handling

## Success Criteria

### Functional Requirements Met

- [x] User authentication and profile management
- [x] Form creation with multiple sections and field types
- [x] Real-time form preview and validation
- [x] Form publishing and public access
- [x] Form submission handling and storage
- [x] Submission management and analytics
- [x] Multi-language interface support
- [x] Responsive design for mobile and desktop

### Performance Requirements Met

- [x] Form loading time < 2 seconds
- [x] API response time < 200ms (p95)
- [x] Database query time < 50ms (p95)
- [x] Bundle size < 250KB per route
- [x] Memory usage < 512MB per instance

### Security Requirements Met

- [x] Secure authentication with JWT tokens
- [x] Input validation and sanitization
- [x] HTTPS enforcement in production
- [x] SQL injection prevention
- [x] XSS protection
- [x] CSRF protection

## Troubleshooting

### Common Issues

1. **Database Connection**: Verify PostgreSQL is running and credentials are correct
2. **Authentication Errors**: Check JWT token expiration and refresh mechanism
3. **Form Rendering Issues**: Verify field type configurations and validation rules
4. **Real-time Updates**: Check WebSocket connection and Redis configuration
5. **Performance Issues**: Monitor database queries and API response times

### Debug Tools

- **Browser DevTools**: Network tab for API calls, Console for errors
- **Database Logs**: PostgreSQL query logs for performance issues
- **Application Logs**: NestJS and Next.js application logs
- **Performance Monitoring**: Core Web Vitals and API metrics
