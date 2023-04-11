package main

import (
	"context"
	"os"
	"time"

	"backend/packages/datatypes"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
		// Use the SetServerAPIOptions() method to set the Stable API version to 1
	uri := os.Getenv("MONGODB_URI")
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI)
	// Create a new client and connect to the server
	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}

	// Close connection at the end of the main function
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	user := datatypes.User{ID: primitive.NewObjectID(), Name: "Aasim", Email:"aasimsani05"}
	role := datatypes.Role{ID: primitive.NewObjectID(), Title: "CAIO/COO", Company: "CopyCat", Start: primitive.NewDateTimeFromTime(time.Now()), End: primitive.NewDateTimeFromTime(time.Now()), FunctionalAreas: []primitive.ObjectID{}, User: user.GetID()}

	fa1 := datatypes.FunctionalArea{ID: primitive.NewObjectID(), Name: "Sales", Skills: []primitive.ObjectID{}, User: user.GetID()}
	fa2 := datatypes.FunctionalArea{ID: primitive.NewObjectID(), Name: "Marketing", Skills: []primitive.ObjectID{}, User: user.GetID()}

	sk1 := datatypes.Skill{ID: primitive.NewObjectID(), Name: "Cold Emailing", Experiences: []primitive.ObjectID{}, User: user.GetID()}
	sk2 := datatypes.Skill{ID: primitive.NewObjectID(), Name: "LinkedIn marketing", Experiences: []primitive.ObjectID{}, User: user.GetID()}
	sk3 := datatypes.Skill{ID: primitive.NewObjectID(), Name: "Triangle Selling", Experiences: []primitive.ObjectID{}, User: user.GetID()}

	ex1 := datatypes.Experience{ID: primitive.NewObjectID(), Name: "Cold Emailing", Description: "Cold Emailing for User interviews", Roles: []primitive.ObjectID{}, FunctionalAreas: []primitive.ObjectID{}, User: user.GetID()}
	ex2 := datatypes.Experience{ID: primitive.NewObjectID(), Name: "Cold Emailing", Description: "Cold Emailing for Sales leads", Roles: []primitive.ObjectID{}, FunctionalAreas: []primitive.ObjectID{}, User: user.GetID()}

	ex3 := datatypes.Experience{ID: primitive.NewObjectID(), Name: "LinkedIn marketing", Description: "LinkedIn marketing for app sales", Roles: []primitive.ObjectID{}, FunctionalAreas: []primitive.ObjectID{}, User: user.GetID()}
	ex4 := datatypes.Experience{ID: primitive.NewObjectID(), Name: "Selling CopyCat", Description: "Sold CopyCat to CTOs", Roles: []primitive.ObjectID{}, FunctionalAreas: []primitive.ObjectID{}, User: user.GetID()}
	ex5 := datatypes.Experience{ID: primitive.NewObjectID(), Name: "Selling Orai", Description: "Sold Orai to HR departments", Roles: []primitive.ObjectID{}, FunctionalAreas: []primitive.ObjectID{}, User: user.GetID()}

	role.FunctionalAreas = append(role.FunctionalAreas, fa1.GetID(), fa2.GetID())
	fa1.Roles = append(fa1.Roles, role.GetID())
	fa2.Roles = append(fa2.Roles, role.GetID())

	fa1.Skills = append(fa1.Skills, sk1.GetID())
	fa1.Skills = append(fa1.Skills, sk3.GetID())

	fa2.Skills = append(fa1.Skills, sk1.GetID())
	fa2.Skills = append(fa1.Skills, sk2.GetID())

	sk1.Experiences = append(sk1.Experiences, ex1.GetID(), ex2.GetID())
	sk2.Experiences = append(sk2.Experiences, ex3.GetID())
	sk3.Experiences = append(sk3.Experiences, ex4.GetID(), ex5.GetID())


	datatypes.Insert(role, client)
	datatypes.Insert(fa1, client)
	datatypes.Insert(fa2, client)
	datatypes.Insert(sk1, client)
	datatypes.Insert(sk2, client)
	datatypes.Insert(sk3, client)
	datatypes.Insert(ex1, client)
	datatypes.Insert(ex2, client)
	datatypes.Insert(ex3, client)
	datatypes.Insert(ex4, client)
	datatypes.Insert(ex5, client)



	




}