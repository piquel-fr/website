package users

import (
	"net/http"

	"github.com/PiquelChips/piquel.fr/types"
)

func GetPageData(w http.ResponseWriter, r *http.Request) *types.PageData {
    return &types.PageData{User: types.User{Username: "piquel", Name: "Piquel", Image: "https://avatars.githubusercontent.com/u/63727792?v=4", Email: "ronanggx2008@gmail.com", Color: "red", GroupName: "admin"}}
}
