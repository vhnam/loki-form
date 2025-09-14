# Forms Pagination API Examples

## Basic Pagination

### Get first page with default settings (10 items per page)

```
GET /forms
```

### Get specific page with custom limit

```
GET /forms?page=2&limit=5
```

### Sort by title ascending

```
GET /forms?sortBy=title&sortOrder=asc
```

### Sort by updated date descending (default)

```
GET /forms?sortBy=updatedAt&sortOrder=desc
```

## Admin Access

### Get all forms (admin only)

```
GET /forms?all=true
```

### Get all forms with pagination (admin only)

```
GET /forms?all=true&page=1&limit=20
```

## Response Format

```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Form Title",
      "description": "Form description",
      "userId": "user-uuid",
      "isActive": true,
      "version": 1,
      "multiPage": false,
      "allowDrafts": true,
      "requireAuth": false,
      "submitMessage": "Thank you!",
      "redirectUrl": "https://example.com",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Query Parameters

| Parameter   | Type   | Default     | Description                                    |
| ----------- | ------ | ----------- | ---------------------------------------------- |
| `page`      | number | 1           | Page number (minimum: 1)                       |
| `limit`     | number | 10          | Items per page (1-100)                         |
| `sortBy`    | string | 'createdAt' | Sort field ('title', 'createdAt', 'updatedAt') |
| `sortOrder` | string | 'desc'      | Sort direction ('asc' or 'desc')               |
| `all`       | string | -           | Set to 'true' for admin to see all forms       |

## Examples with curl

```bash
# Get first page
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  "http://localhost:3000/forms"

# Get second page with 5 items
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  "http://localhost:3000/forms?page=2&limit=5"

# Sort by title ascending
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  "http://localhost:3000/forms?sortBy=title&sortOrder=asc"

# Admin: Get all forms with pagination
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  "http://localhost:3000/forms?all=true&page=1&limit=20"
```
