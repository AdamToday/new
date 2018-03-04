export const model = {

  product: {
    name: 'The DoLeorean',
    image: `img/${process.env.NOW}/delorean.jpg`,

  },

  reviews: [
    {
      id: 0,
      username: 'Doc Brown',
      avatar: `img/${process.env.NOW}/bot.png`,
      rating: 5,
    },
    {
      id: 1,
      username: 'Marty McFly',
      avatar: `img/${process.env.NOW}/bot2.png`,
      rating: 3,
    },
    {
      id: 2,
      username: 'Biff Tannen',
      rating: 4,
    },
    {
      id: 3,
      rating: 2,
    }
  ]

}

export default model;
