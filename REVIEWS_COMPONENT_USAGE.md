# ReviewsList Component Usage

The `ReviewsList` component has been updated to be fully reusable with Tailwind CSS classes and includes a pixel-perfect `TimeDropdown` component. Here's how to use it:

## Basic Usage

```tsx
import ReviewsList from '@/components/creator/ReviewsList';

// Basic usage with default props
<ReviewsList />
```

## Advanced Usage with Custom Props

```tsx
import ReviewsList from '@/components/creator/ReviewsList';

const customReviews = [
  {
    id: '1',
    name: 'John Doe',
    handle: '@johndoe',
    date: '2/7/26',
    rating: 5,
    text: 'Amazing service and great support!',
    avatar: 'https://example.com/avatar1.jpg'
  },
  {
    id: '2',
    name: 'Jane Smith',
    handle: '@janesmith',
    date: '1/30/26',
    rating: 4,
    text: 'Very professional and timely delivery.',
    avatar: 'https://example.com/avatar2.jpg'
  }
];

const customRatingDistribution = [
  { stars: 5, count: '1.5k', percentage: 134.58 },
  { stars: 4, count: '800', percentage: 78.71 },
  { stars: 3, count: '200', percentage: 23.45 },
  { stars: 2, count: '50', percentage: 4.32 },
  { stars: 1, count: '10', percentage: 4.32 }
];

<ReviewsList
  title="Customer Reviews"
  totalReviews="2.36k"
  averageRating={4.5}
  ratingDistribution={customRatingDistribution}
  reviews={customReviews}
  timeOptions={['All Time', 'This Year', 'This Month', 'This Week']}
  defaultTimeOption="This Month"
  showStats={true}
  className="max-w-4xl mx-auto"
/>
```

## Standalone TimeDropdown Component

```tsx
import TimeDropdown from '@/components/ui/TimeDropdown';

<TimeDropdown 
  options={['All Time', 'This Year', 'This Month']}
  defaultOption="All Time"
  onSelect={(option) => console.log('Selected:', option)}
/>
```

## Using with Existing Data

```tsx
import ReviewsList from '@/components/creator/ReviewsList';
import { allCreators } from '@/data/dashboard';

// Get reviews from a specific creator
const creator = allCreators.find(c => c.id === 'CR001');
const creatorReviews = creator?.reviews?.map(review => ({
  id: review.id,
  name: review.author,
  handle: review.handle,
  date: review.date,
  rating: review.rating,
  text: review.content,
  avatar: review.avatar
})) || [];

<ReviewsList
  title={`Reviews for ${creator?.name}`}
  reviews={creatorReviews}
  totalReviews={creatorReviews.length.toString()}
  averageRating={4.2}
/>
```

## Props Interface

```tsx
interface ReviewsListProps {
  title?: string;                    // Default: "Reviews"
  totalReviews?: string;             // Default: "10.0k"
  averageRating?: number;            // Default: 4.0
  ratingDistribution?: RatingDistribution[];
  reviews?: Review[];
  timeOptions?: string[];            // Default: ['All Time', 'This Year', 'This Month']
  defaultTimeOption?: string;        // Default: 'All Time'
  showStats?: boolean;               // Default: true
  className?: string;                // Additional CSS classes
}

interface Review {
  id: string;
  name: string;
  handle: string;
  date: string;
  rating: number;
  text: string;
  avatar?: string;
}

interface RatingDistribution {
  stars: number;
  count: string;
  percentage: number; // Exact pixel width for progress bars
}

interface TimeDropdownProps {
  options?: string[];
  defaultOption?: string;
  onSelect?: (option: string) => void;
  className?: string;
}
```

## Features

- ✅ Fully responsive design
- ✅ Tailwind CSS classes (converted from original CSS)
- ✅ Pixel-perfect TimeDropdown component
- ✅ Exact star SVG from design
- ✅ Reusable with custom props
- ✅ Star rating system with proper fill colors
- ✅ Rating distribution with exact pixel widths
- ✅ Avatar support with fallback gradients
- ✅ Customizable time filters
- ✅ Optional stats section
- ✅ TypeScript support

## Design Specifications

### TimeDropdown
- **Dimensions**: 78px × 30px
- **Padding**: 5px 7px 5px 10px
- **Border**: 1px solid #EBEBEB
- **Shadow**: 0px 1px 4.8px rgba(0, 0, 0, 0.03)
- **Border Radius**: 8px
- **Font**: 12px Neue Montreal, #5F5971

### Stars
- **Main Stars**: 16px with exact SVG paths
- **Distribution Stars**: 12px with #DBD8E4 fill
- **Filled Color**: #FF8D28
- **Empty Color**: #F1F1F1

### Rating Distribution
- **Progress Bar Heights**: 4.23px
- **Exact Widths**: 134.58px, 78.71px, 23.45px, 4.32px, 4.32px
- **Opacity Levels**: 1, 0.7, 0.5, 0.3, 0.2

## Styling

The component uses:
- **Font**: 'Neue Montreal' (as specified in original design)
- **Colors**: Matches the original design palette exactly
- **Layout**: Flexbox with precise spacing and borders
- **Responsive**: Works on all screen sizes
- **Accessibility**: Proper semantic HTML structure

## Notes

- TimeDropdown is styled but not functionally interactive (you can add click handlers)
- All measurements match the exact Figma design specifications
- Progress bars use exact pixel widths instead of percentages for precision
- Star SVG uses the exact paths from your design
- Component is optimized for performance with proper key props