package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/isaquecsilva/elastic-example/backend/internal/services/carservice"
	"github.com/isaquecsilva/elastic-example/backend/pkg/validation"
)

type CarsController struct {
	carService carservice.ICarService
}

func NewCarsController(carService carservice.ICarService) *CarsController {
	return &CarsController{
		carService: carService,
	}
}

func (cc *CarsController) CreateCarHandler(c *gin.Context) {
	defer c.Request.Body.Close()
	requestPayload, err := validation.JSONParseAndValidate[carservice.CreateCarParams](c.Request.Body)

	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	resp, err := cc.carService.CreateCar(c.Request.Context(), requestPayload)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"data": resp.Car,
	})
}

func (cc *CarsController) GetCarsHandler(c *gin.Context) {
	model, ok := c.GetQuery("model")
	if !ok {
		c.JSON(400, gin.H{"error": "model query parameter is required"})
		return
	}

	brand := c.Query("brand")
	year, _ := strconv.Atoi(c.Query("year"))
	price, _ := strconv.ParseFloat(c.Query("price"), 64)
	sortField := c.Query("sortField")
	sortOrder := c.Query("sortOrder")

	resp, err := cc.carService.GetCars(c.Request.Context(), carservice.GetCarsParams{
		Model:     model,
		Brand:     brand,
		Year:      uint(year),
		Price:     price,
		SortField: sortField,
		SortOrder: sortOrder,
	})
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":          resp.Cars,
		"results_count": len(resp.Cars),
	})
}

func (cc *CarsController) GetAllCarsHandler(c *gin.Context) {
	page, _ := strconv.Atoi(c.Query("page"))
	limit, _ := strconv.Atoi(c.Query("limit"))

	if limit > 20 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "limit must be less than or equal to 20",
		})
		return
	}

	params := carservice.GetAllCarsParams{
		Page:  uint(max(page, 1)),
		Limit: uint(max(limit, 20)),
	}

	if err := params.Validate(params); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	resp, err := cc.carService.GetAllCars(c.Request.Context(), params)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":          resp.Cars,
		"results_count": len(resp.Cars),
	})
}
