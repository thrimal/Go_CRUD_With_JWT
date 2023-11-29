package jwtToken

import (
	"github.com/gofiber/fiber/v2"
	jwtware "github.com/gofiber/jwt/v3"
	"github.com/golang-jwt/jwt/v4"
	"time"
)

var Tokens string
var key []byte

func GenerateJWT(ctx *fiber.Ctx) error {
	// Create and sign the token
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["name"] = "Thrimal 1234"
	claims["admin"] = true
	claims["exp"] = time.Now().Add(time.Minute * 1).Unix()

	t, err := token.SignedString(key)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString("Internal Server Error")
	}

	// Update Tokens variable (if needed)
	Tokens = t

	return ctx.JSON(fiber.Map{"Tokens": t})
}

func IsAuthorized() fiber.Handler {
	return jwtware.New(jwtware.Config{SigningKey: key})
}


