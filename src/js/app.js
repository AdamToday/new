
import React from 'react';
import ReactDOM from 'react-dom';
import model from './model';
import PropTypes from 'prop-types';

class InitialAvatar extends React.Component {

  static propTypes = {
    username: PropTypes.string,
    avatar: PropTypes.string,
    rating: PropTypes.number.isRequired
  }

  static defaultProps = {
    username: 'Anonymous',
    avatar: `img/${process.env.NOW}/default.jpg `
  }

   constructor(props){
     super(props);
   }
   render(){
     const {username, avatar, rating} = this.props;
     return(
         <div className="review flex">
           <img className="avatar" src={ avatar } alt="" />
           <div>
             <h3>{ username }</h3>
             <h4>{`Rating: ${ rating }`}</h4>
           </div>
         </div>
     )
   }
}

class Rating extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      bright: 0
    }
  }

  onMouseEnter = (bright) => {
    this.setState({
      bright: bright+1
    });
  }

  onMouseLeave = () => {
    this.setState({
      bright: 0
    });
  }

  render() {
    const {value, onClick, onSubmit} = this.props;
    const {bright} = this.state;
    return (
      <div className="flex flex-justify-space-around m-1">
        <div className="flex">
        {
          Array(5).fill(undefined).map((v,index) => (
           <span
             key = {`star_${index}`}
             className = {`star ${index < Math.max(bright, value) ? 'active':''}`}
             onMouseEnter = {() => this.onMouseEnter(index)}
             onMouseLeave = {() => this.onMouseLeave(index)}
             onClick = {() => onClick(index+1)}
           />))
        }
          <button onClick = {onSubmit}> Submit </button>
        </div>
      </div>
    );
  }
}

Rating.propTypes = {
  value: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

Rating.defaultProps = {
 value: 0
}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentWillMount = () => this.setState({ ...model });

  handleClick(value){
    this.setState({
      product: {
        ...this.state.product,
        rating: value
      }
    })
  }

  handleSubmit(){
    const {reviews, product} = this.state;
    this.setState({
      reviews: [
        ...reviews,
        {
          id: reviews.length,
          rating: product.rating
        }
      ],
      product: {
        ...product,
        rating: 0
      }
    })
  }

	render() {
    const { product = {}, reviews = [] } = this.state;
		return !!this.state && (
      <div className="review-component"
        <h1> { product.name } </h1>
        <img src={product.image} />

        <div className="flex flex-justify-space-around m-1">
          <div className="flex">
            <Rating
                value = {product.rating}
                onClick = {this.handleClick}
                onSubmit = {this.handleSubmit} >
            </Rating>
          </div>
        </div>

        <div className="reviews">
          <h1> Reviews </h1>
          {
            reviews.map(review => (
              <InitialAvatar
                key = {review.id}
                username = {review.username}
                avatar = {review.avatar}
                rating = {review.rating}>
              </InitialAvatar>
            ))
          }
        </div>

      </div>
		)
	}
};

const app = document.getElementById('app');
ReactDOM.render(<App />, app);
