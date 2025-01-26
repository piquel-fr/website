package types

import (
	repository "github.com/PiquelChips/piquel.fr/database/generated"
)

type PageData struct {
    User repository.User
    UserColor string
}

type UserProfile struct {
    User repository.User
    UserColor string
    UserGroup string
}
