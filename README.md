

### Files

- `index.html` - Main application structure (now using Syncfusion UI)
- `styles.css` - Complete styling and layout with Syncfusion customizations
- `app.js` - Application logic and scheduling algorithm
- `README.md` - This documentation

### UI Framework

**Syncfusion Enterprise UI Components** - The application now uses Syncfusion's Material Design theme for a modern, professional interface:

- **Material Design Theme**: Modern, clean aesthetic with smooth animations
- **Responsive Components**: Buttons, dialogs, forms, and cards that adapt to different screen sizes
- **Consistent Styling**: Unified visual language across all UI elements
- **Built-in Accessibility**: ARIA labels and keyboard navigation support
- **Professional Look**: Enterprise-grade UI components

#### Syncfusion Components Used:
- Buttons (`.e-btn`) - Primary, outline, danger variants
- Dialogs (`.e-dialog`) - Modal windows for forms and confirmations
- Cards (`.e-card`) - Content containers with headers
- Form Fields (`.e-field`) - Styled inputs, selects, and textareas
- List View (`.e-listview`) - MAC address allow/block lists

### Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari

### Dependencies

The application uses **Syncfusion EJ2** (community/commercial license):
- **CSS**: `https://cdn.syncfusion.com/ej2/23.1.36/material.css`
- **JavaScript**: `https://cdn.syncfusion.com/ej2/23.1.36/dist/ej2.umd.js`

These are loaded from CDN for convenience and are optional (fallback to vanilla styling works without them).

## Customization

### Colors

Edit the gradient colors in `styles.css` for different project types:

```css
.gantt-bar.project {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Date Range

Modify the `generateDateRange()` function in `app.js` to change the number of weeks displayed:

```javascript
// Change this number to show more/fewer weeks
for (let i = 0; i < 8; i++) {
```

### Working Days

To modify weekend behavior or add holidays, edit the scheduling logic in `calculateOptimalStartDate()` and `calculateEndDate()`.

## Future Enhancements

Potential features to add:
- Data persistence (localStorage or database)
- Export to Excel/PDF
- Drag-and-drop rescheduling
- Resource conflict warnings
- Multi-project dependencies
- Email notifications
- Mobile responsive design improvements
- Holiday calendar integration

## License

Free to use and modify for your MSP needs.

