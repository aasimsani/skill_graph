package datatypes

import (
	"context"
	"fmt"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type DataInterface interface{
	Role | FunctionalArea | Skill | Experience | User
	GetID() primitive.ObjectID
}


func Insert[dataType DataInterface](data dataType, client *mongo.Client) {


	coll := GetCollection(data, client)

	result, err := coll.InsertOne(context.TODO(), data)
	if err != nil {
		panic(err)
	}
	fmt.Println("Inserted a single document: ", result.InsertedID)
}


func Update[dataType DataInterface](data dataType, client *mongo.Client) {
	coll := GetCollection(data, client)

	fmt.Println(data)
	filter := bson.D{primitive.E{Key:"_id", Value: data.GetID()}}
	fmt.Println(filter)
	update := bson.D{primitive.E{Key:"$set", Value: data}}

	result, err := coll.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		panic(err)
	}
	fmt.Println("Updated a single document: ", result.UpsertedID)
}

func GetCollectionValue[dataType DataInterface](data dataType) string {

	// Any exists since there's an issue in Go that doesn't allow you to 
	// use switches with generic interfaces
	switch any(data).(type) {
	case Role:
		return "roles"
	case FunctionalArea:
		return "functionalAreas"
	case Skill:
		return "skills"
	case Experience:
		return "experiences"
	case User:
		return "users"
	default:
		return "unknown"
	}
}

func GetCollection[dataType DataInterface](data dataType, client *mongo.Client) *mongo.Collection {

	coll := client.Database(os.Getenv("MONGO_DB")).Collection(GetCollectionValue(data))

	return coll
}


type Role struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Title string `bson:"title" json:"title"`
	Company string `bson:"company" json:"company"`
	Start primitive.DateTime `bson:"start" json:"start"`
	End primitive.DateTime `bson:"end" json:"end"`
	FunctionalAreas []primitive.ObjectID `bson:"functionalAreas" json:"functionalAreas"`
	User primitive.ObjectID `bson:"user" json:"user"`

}

type FunctionalArea struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name string `bson:"name" json:"name"`
	Skills []primitive.ObjectID `bson:"skills" json:"skills"`
	Roles []primitive.ObjectID `bson:"roles" json:"roles"`
	User primitive.ObjectID `bson:"user" json:"user"`
}


type Skill struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name string `bson:"name" json:"name"`
	Experiences []primitive.ObjectID `bson:"experiences" json:"experiences"`
	User primitive.ObjectID `bson:"user" json:"user"`
}

type Experience struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name string `bson:"name" json:"name"`
	Description string `bson:"description" json:"description"`
	Roles []primitive.ObjectID `bson:"roles" json:"roles"`
	FunctionalAreas []primitive.ObjectID `bson:"functionalAreas" json:"functionalAreas"`
	User primitive.ObjectID `bson:"user" json:"user"`
}

type User struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name string `bson:"name" json:"name"`
	Email string `bson:"email" json:"email"`
}

func (r Role) GetID() primitive.ObjectID {
    return r.ID
}

func (fa FunctionalArea) GetID() primitive.ObjectID {
    return fa.ID
}

func (s Skill) GetID() primitive.ObjectID {
    return s.ID
}

func (e Experience) GetID() primitive.ObjectID {
    return e.ID
}

func (u User) GetID() primitive.ObjectID {
    return u.ID
}