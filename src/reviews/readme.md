# Review  Module
## Schema
```
reviews (tableName)
{
    id              : string
    userId          : string
    destinationId   : string
    title           : string
    rating          : string
    content         : string
    imageUrls       : json
    status          : String
    type            : string
    date   : DateTime
}
```

## Api Interfaces
```
GET /reviews/review-stats
GET /reviews/all-reviews
POST /reviews/create-review
GET /review/get-review/:id
PUT /review/update-status/:id
Delete /review/delete/:id

```
