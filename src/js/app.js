import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import model from './model';

const Review = ({ avatar, username, rating }) => (
  <div className="review flex">
    <img className="avatar" src={ avatar } alt="" />
    <div>
      <h3>{ username }</h3>
      <h4>{`Rating: ${ rating }` }</h4>
     <div className="">
        {
          Array(rating).fill(undefined).map((v, index) => (
            <span
              key={`star_${index}`}
              className="star active"
            />
         ))
        }
      </div>
    </div>
  </div>
);

Review.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
  rating: PropTypes.number.isRequired
};

Review.defaultProps = {
  username: 'Anonymous',
  avatar: `img/${process.env.NOW}/default.jpg`
};




class Rating extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  static defaultProps = {
    value: 0
  };

  constructor() {
    super();
    this.state = {
      activeStar: 0
    };
  }

  onMouseEnter = (activeStar) => {
    this.setState({ activeStar: activeStar+1 });
  };

  onMouseLeave = () => {
    this.setState({ activeStar: 0 });
  };

  render() {
    const { value, onChange, onSubmit } = this.props;
    const { activeStar } = this.state;

    return (
      <div className="flex flex-justify-space-around m-1">
        <div className="flex">
          {
            Array(5).fill(undefined).map((v, index) => (
              <span
                key={`star_${index}`}
                className={`star ${index < Math.max(activeStar, value) ? 'active' : '' }`}
                onMouseEnter={() => this.onMouseEnter(index)}
                onMouseLeave={() => this.onMouseLeave(index)}
                onClick={() => onChange(index + 1)}
              />
            ))
          }
          <button className="btn" onClick={onSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  componentWillMount = () => this.setState({ ...model });

  onChangeRating = (rating) => {
    this.setState({
      product: {
        ...this.state.product,
        rating: rating
      }
    })
  };

  onSubmitRating = () => {
    const { reviews, product } = this.state;
    this.setState({
      reviews: [...reviews, {
        id: reviews.length,
        rating: product.rating
      }],
      product: {
        ...product,
        rating: 0
      }
    })
  };

  render() {

    const { product = {}, reviews = [] } = this.state;

    return !!this.state && (

      <div className="review-component">

        <h1> { product.name } </h1>
        <img src={product.image} />

        <Rating
          value={product.rating}
          onChange={this.onChangeRating}
          onSubmit={this.onSubmitRating}
        />

        <div className="reviews">
          <h1> Reviews </h1>
          { reviews.map(review => (
            <Review
              key={review.id}
              avatar={review.avatar}
              username={review.username}
              rating={review.rating}
            />
          ))}
        </div>

      </div>
    );
  }

}

const app = document.getElementById('app');
ReactDOM.render(<App />, app);
