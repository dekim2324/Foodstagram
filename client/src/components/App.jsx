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
      date: JSON.stringify(new Date()).slice(0, 11),
      showDate: new Date()
    }

  }

  // componentDidMount() {
  //   db.collection('foods')
  //     .get()
  //     .then((snapshot) =>
  //         console.log(snapshot.docs.forEach(food =>
  //             console.log(food.data())
  //             )))
  // };

  handleDateChange(e)  {
    console.log(e)
    // console.log(e.slice(0, 10))
    let value = JSON.stringify(e);
    value = value.slice(0, 11) + ""
    console.log(value)


    this.setState({
      date: value,
      showDate: e,
      url: []
    }, () => {
      db.collection('foods')
      .where("date", "==", this.state.date)
      .get()
      .then((snapshot) =>
          snapshot.docs.forEach(food =>
              // console.log('got em', food.data().name)
              this.setState({url: [...this.state.url, food.data().name]})
              ))



          // console.log([snapshot.docs.data()])
    })



    // var citiesRef = db.collection('foods');
    // var query = citiesRef.where("date", "==", this.state.date);

    // query.get().then(res => console.log(res.docs))
  };

  handleImage(e) {
    if(e.target.files[0]) {
        const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload(e) {
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
        this.setState({ url: [url]});

        db.collection('foods').add({
          date: this.state.date,
          name: this.state.url
        })
      })
    });


};

  handleChange(e){
    // console.log(e.target.value)
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


  render() {


    return(

      <div>
        <Navbar />
        <MyCalendar handleDateChange={this.handleDateChange.bind(this)} showDate={this.state.showDate}/>

        {/* <form>
        <input type="text" onChange={e => this.handleChange(e)}></input>
        <input type="submit" onClick={e => this.handleSubmit(e)} value="Submit"></input>
        </form>
         */}

        {/* <input type="file" id="fileButton" onChange={e => this.handleImage(e)}></input>
        <button onClick={e => this.handleUpload(e)}>Upload</button> */}

         <Buttons handleImage={this.handleImage.bind(this)} handleUpload={this.handleUpload.bind(this)}/>

         {/* <img src={this.state.url}/> */}

        {this.state.url.map(url => 
          <img src={url} key={uuidv1()}/>
          )}

      </div>
    )
  }
}


export default App;