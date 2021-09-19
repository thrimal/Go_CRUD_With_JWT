package jwtToken

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	jwtware "github.com/gofiber/jwt/v3"
	"github.com/golang-jwt/jwt/v4"
	"time"
)

var Tokens string
var key string

func GenerateJWT(ctx *fiber.Ctx) (error, error) {
	// Create token
	token := jwt.New(jwt.SigningMethodHS256)

	// Set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["name"] = "Thrimal 1234"
	claims["admin"] = true
	claims["exp"] = time.Now().Add(time.Minute * 1).Unix()

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte(key))
	if err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError), nil
	}
	Tokens = t
	return ctx.JSON(fiber.Map{"Tokens": &t}), nil
}

func IsAuthorized() fiber.Handler {
	return jwtware.New(jwtware.Config{SigningKey: []byte(key)})
}

func ExtractToken(ctx *fiber.Ctx) error {
	token :=Tokens
	fmt.Println(token)
	return ctx.JSON(token)
}
