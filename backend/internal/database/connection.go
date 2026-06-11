package database

import (
	"os"
	"time"

	"github.com/isaquecsilva/elastic-example/backend/internal/models"
	"github.com/olekukonko/tablewriter"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

func Connect(connStr string) (*gorm.DB, error) {
	conn, err := gorm.Open(postgres.Open(connStr), &gorm.Config{
		DefaultContextTimeout: time.Second * 15,
		NamingStrategy: schema.NamingStrategy{
			SingularTable: false,
			NoLowerCase:   false,
		},
		DisableAutomaticPing: false,
		PrepareStmt:          true,
	})

	if err != nil {
		return nil, err
	}

	db, err := conn.DB()
	if err != nil {
		return nil, err
	}
	stats := db.Stats()

	table := tablewriter.NewTable(os.Stdout)
	table.Header([]string{"OpenConns", "IdleConns", "MaxOpenConns"})
	table.Bulk([][]any{
		{stats.OpenConnections, stats.Idle, stats.MaxOpenConnections},
	})
	table.Render()

	return conn, runMigrations(conn)
}

func runMigrations(conn *gorm.DB) error {
	return conn.AutoMigrate(&models.Car{})
}
