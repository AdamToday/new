# Quick Start
`npm i`

`npm run local:dev`

`http://localhost:3009/`

# Explaination
- List all reviews in the data model.
- If a review does not have an avatar default to: `img/${process.env.NOW}/bot2.png`,
- If a user does not have a username use `User` + the `id` of the review.
- Display the review rating with 5 gray boxes `#ccc`. If a user leaves a review of 3 than 3/5 boxes should be colored yellow.
- Able to add a new rating by selecting 1-5 boxes and clicking `sumbit`.
