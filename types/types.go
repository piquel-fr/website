package types

import (
	repository "github.com/PiquelChips/piquel.fr/database/generated"
)

type PageData struct {
    User repository.User
    UserColor string
}

