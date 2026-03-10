# Accessibility & Keyboard Navigation Guide

## Overview

Drishtii is built with accessibility at its core. This guide covers keyboard shortcuts, screen reader support, and accessibility features available throughout the application.

---

## Keyboard Shortcuts

### Global Shortcuts

| Shortcut | Action | Description |
|----------|--------|-------------|
| **Ctrl + Enter** (Windows/Linux) | Submit Form | Submit the active form |
| **Cmd + Enter** (Mac) | Submit Form | Submit the active form |
| **Escape** | Close Modal | Close any open modal or dialog |
| **Tab** | Focus Next | Move focus to the next interactive element |
| **Shift + Tab** | Focus Previous | Move focus to the previous interactive element |
| **Enter** | Activate Button | Press the focused button |
| **Space** | Toggle Button | Toggle the state of a button (e.g., select/deselect) |

### Page-Specific Shortcuts

**Upload Page:**
- **Tab** through form fields for linear navigation
- **Space** to select button group options (Document Type, Writing Style, Languages)
- **Ctrl + Enter** to submit the document context form and proceed to upload

**Data Extraction Page:**
- Use search field to filter extracted documents
- **Enter** to open the detail modal for a document
- **Escape** to close the detail modal

---

## Screen Reader Support

### Form Labels & Descriptions

All form fields include:
- **Descriptive labels** that clearly indicate field purpose
- **Error messages** announced to screen readers with `aria-invalid` and `aria-describedby`
- **Hint text** explaining character limits, required fields, and formatting requirements
- **Field counters** that update live as you type (e.g., description character count: 245/500)

### Status & Live Regions

- **Form submission errors** are announced with priority "assertive" to interrupt current reading
- **Success messages** are announced with priority "polite" after successful actions
- **Toggle announcements** when opening/closing collapsible sections
- **Selection announcements** when choosing options (e.g., "Language set to English")

### Example Screen Reader Experience

When you fill out the Document Context Form:
```
1. "Document context configuration form"
2. "This form configures the document metadata before uploading. All fields marked with * are required."
3. "Document Name. Required. 2-50 characters, describe what this document is."
4. [User types] "Passport_2024"
5. [User presses Ctrl+Enter]
6. "Form validation failed with 2 errors. Please review the form."
7. [Focus moves to first error field]
8. "Document Type. Error: Document type must be selected. Required."
```

---

## Navigation & Focus Management

### Focus Indicators

- All interactive elements have clear, high-contrast focus indicators
- When navigating with Tab, you'll see a clear focus ring around the active element
- Focus automatically moves to the first error field if validation fails

### Tab Order

The tab order follows the logical reading order:
1. All buttons in the collapsible form sections (in document order)
2. Input fields with error states given priority when validation fails
3. The submit button comes last for easy escape if navigation is needed

### Collapsible Sections

- Click to expand/collapse sections
- Section headers are buttons with `aria-expanded` to indicate state
- When expanded, all section content is revealed
- Screen readers announce when a section is expanded or collapsed

---

## Color & Contrast

### Color-Coded Elements

- **Red (#EF4444)** - Errors, required fields, warnings
- **Green (#10B981)** - Success states, completed actions
- **Blue (#3B82F6)** - Primary actions, focus indicators
- **Gray (#6B7280)** - Disabled states, helper text, hints

### Contrast Ratios

- **Normal Text:** 7:1 contrast ratio (WCAG AAA)
- **Large Text (18pt+):** 4.5:1 contrast ratio (WCAG AA)
- **Focus Indicators:** 8:1 contrast ratio for clear visibility

---

## Text & Typography

### Font Sizing

- **Base text:** 16px (1rem) - Easy to read without zooming
- **Labels:** 14px (0.875rem) - Clearly differentiated from body text
- **Error text:** 12px (0.75rem) - Slightly smaller, distinguished by color
- **All text supports zooming up to 200%** without loss of functionality

### Line Height & Spacing

- **Line height:** 1.5-1.75 for improved readability
- **Paragraph spacing:** Adequate whitespace between sections
- **Input field padding:** Generous padding (10px) for ease of interaction

---

## Mobile & Touch Accessibility

### Touch Targets

- **Minimum touch target size:** 44x44 pixels for all buttons
- **Spacing between targets:** 8px minimum to prevent accidental activation
- **Interactive elements:** Never rely solely on hover states

### Responsive Design

- Application is fully responsive from 320px width (small phones)
- Form fields expand to full width on mobile devices
- Touch-friendly spacing and font sizes throughout

---

## API Key Management (Settings)

The API Keys section includes special accessibility features:

- **Show/Hide button** for secure password field
- **Copy to Clipboard** support with visual feedback
- **Delete confirmation** to prevent accidental removal
- **Status indicator** showing "Configured" or "Not Set"
- All actions announce to screen readers (e.g., "API key copied to clipboard")

---

## Empty & Loading States

### Empty States

- Clear messaging explaining what's missing
- Call-to-action buttons prominently displayed
- Related link to the next step (e.g., "Upload Documents" link from Data Extraction page)

### Loading States

- **Skeleton loaders** give visual indication of loading progress
- **Loading spinner** with text explanation
- **`aria-busy="true"`** announced to screen readers
- Button states change to show processing (disabled, loading text)

---

## Error Handling

### Error Messages

All error messages include:
1. **Icon indicator** (visual)
2. **Text description** (clear, concise explanation)
3. **Screen reader announcement** (automated)
4. **Suggested action** (how to fix the error)

### Example Errors

| Scenario | Message | Action |
|----------|---------|--------|
| Missing field | "Document name is required (2-50 characters)" | Focus field, type valid input |
| File too large | "File size exceeds 10MB limit" | Choose a smaller file |
| Invalid API key | "API key must be 10-500 characters" | Review requirements, update key |

---

## Testing Your Accessibility

### Screen Reader Testing

**Windows:**
- Use NVDA (free: https://www.nvaccess.org/)
- Use JAWS (paid: https://www.freedomscientific.com/)

**Mac:**
- Use VoiceOver (built-in: System Preferences > Accessibility > VoiceOver)

**Web:**
- Use NVDA or JAWS browser extensions

### Keyboard Testing

1. **Tab through the page** - Can you reach all interactive elements?
2. **Try Tab + Shift** - Can you navigate backwards?
3. **Use Ctrl+Enter** - Does form submission work?
4. **Try Escape** - Can you close modals?

### Color Contrast Testing

- Use WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Use Chrome DevTools Accessibility Inspector
- Zoom to 200% - Is everything still readable?

---

## Future Improvements

We are continuously improving accessibility. Planned enhancements include:

- [ ] High contrast mode toggle
- [ ] Font size adjustment slider
- [ ] Reduced motion mode (respects `prefers-reduced-motion`)
- [ ] Additional keyboard shortcuts for power users
- [ ] Dark mode option for reduced eye strain
- [ ] Voice command support
- [ ] Internationalization for multiple languages

---

## Accessibility Standards

This application aims to comply with:

- **WCAG 2.1 Level AA** - Web Content Accessibility Guidelines
- **ADA** - Americans with Disabilities Act (US)
- **Section 508** - Rehabilitation Act (US Federal)
- **EN 301 549** - European accessibility standard

We're working towards **WCAG 2.1 Level AAA** compliance.

---

## Report Accessibility Issues

Found an accessibility issue? Please report it:

1. **Describe the issue** - What's not working?
2. **How to reproduce** - What steps to follow?
3. **What you expected** - What should happen?
4. **Your setup** - OS, browser, assistive technology
5. **Screenshot/Recording** - Visual documentation

Submit issues to: [Project Issue Tracker]

---

## Additional Resources

- [WebAIM Accessibility Tips](https://webaim.org/articles/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Aria Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [A11ycasts by Google Chrome](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9Xc-RgEzwLvePZcYd)

---

## Questions?

For accessibility questions or assistance:
- Email: [accessibility@drishtii.com]
- Create an issue on GitHub
- Contact the development team

**We're committed to making Drishtii accessible to everyone.**
