# piquel.fr

The [piquel.fr](https://piquel.fr) website.

## TODO

- Convert old pages and components to new site using ``htmx``
- Setup communication with database with ``sqlc``
  - Storing and retrieving user data
  - Use email address as identifier for data from provider
  - Use username as identifier for user-side code
  - Use autoincrement id for internal identification
- Make dockerfile
  - Use alpine for runner
  - Optimize builder
- Setup proper error handling
  - Send to user
  - Panic some
