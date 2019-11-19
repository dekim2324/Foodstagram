import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
import MyCalendar from './MyCalendar.jsx';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Buttons from './Buttons.jsx';
const uuidv1 = require('uuid/v1');
import moment from 'moment'

class App extends Component {
  constructor() {
    super();

    this.state = {
      food: '',
      image: null,
      url: [],
      showURL: [],
      submitBlue: 'default',
      date: JSON.stringify(new Date()).slice(0, 11),
      showDate: new Date()
    }

  }

  componentDidMount() {

    db.collection('foods')
    .where("date", "==", this.state.date)
    .get()
    .then((snapshot) =>
        snapshot.docs.forEach(food =>
            // console.log('got em', food.data().name)
            this.setState({showURL: [...this.state.showURL, food.data().name]})
            ))

  };

  handleDateChange(e)  {
    let value = JSON.stringify(e);
    value = value.slice(0, 11) + ""

    this.setState({
      date: value,
      showDate: e,
      url: [],
      showURL: [],
      submitBlue: 'default'
    }, () => {
      db.collection('foods')
      .where("date", "==", this.state.date)
      .get()
      .then((snapshot) =>
          snapshot.docs.forEach(food =>
              // console.log('got em', food.data().name)
              this.setState({showURL: [...this.state.showURL, food.data().name]})
              ))
    })
  };

  handleImage(e) {
    if(e.target.files[0]) {
        const image = e.target.files[0];
      this.setState(() => ({ image, submitBlue: 'primary' }));
    }
  };

  handleUpload(e) {
    this.setState({submitBlue: 'default'})
    const { image } = this.state;
    const uploadTask = storage.ref(`image/${image.name}`).put(image);

    uploadTask.on('state_changed',
    (snapshot) => {

    },
    (error) => {
      console.log(error);
    },
    () => {
      //complete function
      storage.ref('image').child(image.name).getDownloadURL()

      .then(url => {
        console.log(url);
        this.setState({ url: [url], showURL: [...this.state.showURL, url]});

        db.collection('foods').add({
          date: this.state.date,
          name: this.state.url
        })
      })
    });
};

  handleChange(e){
    this.setState({
      food: e.target.value
    })
  };

  handleSubmit(e) {
    e.preventDefault()

    console.log(this.state.food)
    db.collection('foods').add({
      name: this.state.food
    })
  };

  handleDelete(e) {
    let picLink = e.target.getAttribute('value');

    this.setState({showURL: this.state.showURL.filter(url => {
      return url[0] !== picLink
    })}, () => {
  db.collection('foods')
  .where("name", "array-contains", picLink)
  .get()
  .then((snapshot) =>
      snapshot.docs.forEach(doc =>
          doc.ref.delete()
          ))

    })
  }

  render() {


    return(

      <div>
        <Navbar />
        <MyCalendar handleDateChange={this.handleDateChange.bind(this)} showDate={this.state.showDate} />

         <Buttons handleImage={this.handleImage.bind(this)} handleUpload={this.handleUpload.bind(this)} submitBlue={this.state.submitBlue}/>
         
         
         
        <div style={pics}>
          {this.state.showURL.map(url => 
              
            <div key={uuidv1()}>
                <div style={icon}>
                  <i className="fas fa-minus-circle fa-lg" onClick={e => this.handleDelete(e)} value={url}></i>
                </div>
                <img src={url} width='200px' height='auto' style={photo}/>
            </div>

            )}
        </div>


      </div>
    )
  }
}

const pics = {
  marginTop: '35px',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center'
}

const photo = {
  borderRadius: '20px'
}

const icon = {
  marginRight: '20px'
}

export default App;