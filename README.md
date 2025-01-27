# piquel.fr

The [piquel.fr](https://piquel.fr) website.

## Air does no work on Windows

## TODO

- Make dockerfile
  - Use alpine for runner
  - Optimize builder
- Make CI/CD pipelines
- Setup proper error handling
  - Send to user
  - Panic some
- Setup permissions system
  - Create a global array (in config) of protected routes and their permissions
- Auth
  - Fix google not working as auth provider
  - make sure users cant access settings page and other logged in only pages
