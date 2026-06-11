package validation

import (
	"context"
	"encoding/json"
	"io"

	"github.com/go-playground/validator/v10"
)

var validate = validator.New()

type IValidator[T any] interface {
	Validate(T) error
}

type BaseValidator[T any] struct{}

func (v *BaseValidator[T]) Validate(item T) error {
	return validate.Struct(v)
}

// JSONParseAndValidate parses JSON from the reader and validates it against the given data,
// returning an instance of T and any error that occurred during parsing or validation.
func JSONParseAndValidate[T any](r io.Reader) (T, error) {
	var parsedValue T
	if err := json.NewDecoder(r).Decode(&parsedValue); err != nil {
		return parsedValue, err
	}

	return parsedValue, validate.StructCtx(context.Background(), parsedValue)
}
