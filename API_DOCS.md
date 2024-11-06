# REST API Documentation

#### Preamble
 - All API routes are prefixed with "/api", i.e. the login route in its entirety is "/api/auth/login".
 - All dates must be formatted with YYYY-MM-DD format.
 - All API endpoints support `limit` query params.

## Auth
All of these routes are public and _do not_ require a JWT.

#### Login with email / password
`POST` to `/auth/login`

Authenticates the user and returns a JWT.

```JSON
{
  "email": "email@example.com",
  "password": "password"
}
```

#### Login with refresh token
`POST` to `/auth/refresh`

Authenticates the user and returns a JWT.

```JSON
{
  "refreshToken": "refreshTokenString"
}
```

#### Register
`POST` to `/auth/register`

Registers the user and creates a barber shop entity if applicable.

```JSON
{
	"email": "email@example.com",
	"password": "password"
}
```

## Exercises
All of these routes are protected and require a JWT.

#### Get Exercises
`GET` to `/exercises`

Returns a list of exercises. The following optional query params can be passed:
 - `query`: (string) A search term used to query against exercise names, i.e. `?query=press` may return "Bench Press".
 - `equipmentId`: (number) The equipment ID for the exercise.
 - `muscleGroupId`: (number) The muscle group ID for the exercise.

## Workouts
All of these routes are protected and require a JWT.

#### Get Workouts
`GET` to `/workout`

Returns a list of workouts.

#### Get Workout by ID
`GET` to `/workout/:id`

Returns a single workout

#### Create Workout
`POST` to `/workout`

Creates a workout and returns the newly-created record ID.

```JSON
{
	"name": "Upper body workout",
	"scheduledDate": "2021-03-21 14:00:00"
}
```

#### Delete Workout
`DELETE` to `/workout/:id`

Deletes a workout.

#### Get Workout Exercises
`GET` to `/workout/:id/exercise`

Returns a list of exercises for the workout.

#### Set Workout Exercises
`POST` to `/workout/:id/exercise`

Replaces the list of exercises for a workout with a new set of exercises. *The order of the items in the array should be the order on which they appear on the front-end client*.

```JSON
{
	"items": [
		{
			"name": "Lateral press",
			"weight": "15",
			"repsPerSet": 10,
			"sets": 4,
			"restTime": 60
		},
		{
			"name": "Shoulder press",
			"weight": "30",
			"repsPerSet": 10,
			"sets": 4,
			"restTime": 60
		}
	]
}
```
