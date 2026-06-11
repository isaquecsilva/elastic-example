package validation

import (
	"bytes"
	"errors"
	"testing"

	"github.com/go-playground/validator/v10"
)

func TestJSONParseAndValidate(t *testing.T) {
	type testInput struct {
		Name string `json:"name" validate:"required"`
		Age  int    `json:"age" validate:"gte=0"`
	}

	t.Run("success", func(t *testing.T) {
		validJSON := `{"name":"Alice","age":30}`
		got, err := JSONParseAndValidate[testInput](bytes.NewBufferString(validJSON))
		if err != nil {
			t.Fatalf("unexpected error for valid JSON: %v", err)
		}
		if got.Name != "Alice" || got.Age != 30 {
			t.Fatalf("parsed value mismatch: got=%+v", got)
		}
	})

	t.Run("validation error", func(t *testing.T) {
		missingNameJSON := `{"age":20}`
		_, err := JSONParseAndValidate[testInput](bytes.NewBufferString(missingNameJSON))
		if err == nil {
			t.Fatalf("expected validation error but got nil")
		}
		var vErr validator.ValidationErrors
		if !errors.As(err, &vErr) {
			t.Fatalf("expected validator.ValidationErrors, got: %T -> %v", err, err)
		}
	})

	t.Run("malformed json", func(t *testing.T) {
		malformed := `{"name": "Bob", "age": }`
		_, err := JSONParseAndValidate[testInput](bytes.NewBufferString(malformed))
		if err == nil {
			t.Fatalf("expected JSON decode error but got nil")
		}
	})
}
