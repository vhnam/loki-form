import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';

import { fields, forms, sections, users } from '../database/schema';

export async function seedForms(db: ReturnType<typeof drizzle>) {
  console.log('📝 Seeding forms...');

  // Get the user ID for the regular user (user.01@yopmail.com)
  const regularUserResult = await db
    .select()
    .from(users)
    .where(eq(users.email, 'user.01@yopmail.com'))
    .limit(1);

  if (regularUserResult.length === 0) {
    throw new Error('Regular user not found. Please seed users first.');
  }

  const regularUserId = regularUserResult[0].id;

  // Insert the form
  const formId = '6ba7b810-9dad-11d1-80b4-00c04fd430c7';
  await db.insert(forms).values({
    id: formId,
    title: 'Customer Feedback Form',
    description: 'Please help us improve our service by filling out this form',
    userId: regularUserId,
    isActive: true,
    version: 1,
    multiPage: false,
    allowDrafts: true,
    requireAuth: false,
    submitMessage:
      "Thank you for your feedback! We'll review it and get back to you soon.",
    redirectUrl: 'https://example.com/thank-you',
  });

  // Insert sections
  const sectionsData = [
    {
      id: 'a1b2c3d4-e5f6-4789-a012-3456789abcdf',
      formId: formId,
      title: 'Personal Information',
      description: 'Tell us about yourself',
      order: 0,
    },
    {
      id: 'b2c3d4e5-f6a7-4890-b123-456789abcdf1',
      formId: formId,
      title: 'Feedback',
      description: 'Share your thoughts with us',
      order: 1,
    },
    {
      id: 'c3d4e5f6-a7b8-4901-c234-56789abcdf02',
      formId: formId,
      title: 'Follow-up',
      description: 'Help us stay in touch',
      order: 2,
    },
  ];

  await db.insert(sections).values(sectionsData);

  // Insert fields
  const fieldsData = [
    {
      id: 'b2c3d4e5-f6a7-4890-b123-456789abcdf0',
      sectionId: 'a1b2c3d4-e5f6-4789-a012-3456789abcdf',
      type: 'text' as const,
      label: 'Full Name',
      required: true,
      helperText: 'Enter your first and last name',
      order: 0,
      attributes: {
        placeholder: 'John Doe',
        maxLength: 100,
      },
    },
    {
      id: 'c3d4e5f6-a7b8-4901-c234-56789abcdf01',
      sectionId: 'a1b2c3d4-e5f6-4789-a012-3456789abcdf',
      type: 'email' as const,
      label: 'Email Address',
      required: true,
      helperText: "We'll use this to contact you if needed",
      order: 1,
      attributes: {
        placeholder: 'john@example.com',
      },
    },
    {
      id: 'd4e5f6a7-b8c9-4012-d345-6789abcdf012',
      sectionId: 'a1b2c3d4-e5f6-4789-a012-3456789abcdf',
      type: 'text' as const,
      label: 'Phone Number',
      required: false,
      helperText: 'Optional - for urgent matters only',
      order: 2,
      attributes: {
        placeholder: '+1 (555) 123-4567',
      },
    },
    {
      id: 'e5f6a7b8-c9d0-4123-e456-789abcdf0123',
      sectionId: 'b2c3d4e5-f6a7-4890-b123-456789abcdf1',
      type: 'select' as const,
      label: 'How would you rate our service?',
      required: true,
      helperText: 'Please select one option',
      order: 0,
      attributes: {
        options: [
          { label: 'Excellent', value: 'excellent' },
          { label: 'Good', value: 'good' },
          { label: 'Average', value: 'average' },
          { label: 'Poor', value: 'poor' },
        ],
        placeholder: 'Select a rating',
      },
    },
    {
      id: 'f6a7b8c9-d0e1-4234-f567-89abcdf01234',
      sectionId: 'b2c3d4e5-f6a7-4890-b123-456789abcdf1',
      type: 'checkbox' as const,
      label: 'What did you like most?',
      required: false,
      helperText: 'Select all that apply',
      order: 1,
      attributes: {
        options:
          'Fast service, Friendly staff, Clean environment, Good prices, Easy to use website',
      },
    },
    {
      id: 'a7b8c9d0-e1f2-4345-a678-9abcdf012345',
      sectionId: 'b2c3d4e5-f6a7-4890-b123-456789abcdf1',
      type: 'textarea' as const,
      label: 'Additional Comments',
      required: false,
      helperText: "Any other feedback you'd like to share?",
      order: 2,
      attributes: {
        placeholder: 'Tell us more about your experience...',
        rows: 4,
        maxLength: 1000,
      },
    },
    {
      id: 'b8c9d0e1-f2a3-4456-b789-abcdf0123456',
      sectionId: 'c3d4e5f6-a7b8-4901-c234-56789abcdf02',
      type: 'select' as const,
      label: 'Preferred Contact Method',
      required: false,
      helperText: 'How would you like us to follow up?',
      order: 0,
      attributes: {
        options: [
          { label: 'Email', value: 'email' },
          { label: 'Phone', value: 'phone' },
          { label: 'No follow-up needed', value: 'no-follow-up' },
        ],
        placeholder: 'Select preferred method',
      },
    },
    {
      id: 'c9d0e1f2-a3b4-4567-c890-bcdf01234567',
      sectionId: 'c3d4e5f6-a7b8-4901-c234-56789abcdf02',
      type: 'date' as const,
      label: 'Best time to contact you',
      required: false,
      helperText: 'If you selected phone or email above',
      order: 1,
      attributes: {
        mode: 'single',
        placeholder: 'Select a date',
        dateFormat: 'MM/DD/YYYY',
      },
    },
  ];

  await db.insert(fields).values(fieldsData);

  console.log('✅ Forms seeded successfully!');
  console.log('📋 Customer Feedback Form created with:');
  console.log('   📝 3 sections (Personal Information, Feedback, Follow-up)');
  console.log('   🔤 8 fields (text, email, select, checkbox, textarea, date)');
}
