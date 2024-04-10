
import { makeObservable, observable, action } from 'mobx';

class Data {
  constructor() {
    makeObservable(this, {
      currentData: observable,
        setCategory: action,
        setEventName: action,
        setEventDescription: action,
        setEventTime: action,
        setEventLocation: action,
        setEventDate: action,
        setEventCalURL: action,
        setListServeURL: action,
    });
    this.loadFromLocalStorage();
  }

  currentData = { category: '', eventName: '', eventDescription : '', eventTime: '', eventLocation: '', eventDate: '', eventCalURL: '', listServeURL: ''};

  setCategory = (category) => {
    this.currentData.category = category;
    this.saveToLocalStorage();
  };
    
  setEventName = (event) => {
    this.currentData.eventName = event;
    this.saveToLocalStorage();
  };
  setEventDescription = (description) => {
    this.currentData.eventDescription = description;
    this.saveToLocalStorage();
  };
  setEventTime = (time) => {
    this.currentData.eventTime = time;
    this.saveToLocalStorage();
  };
  setEventLocation = (location) => {
    this.currentData.eventLocation = location;
    this.saveToLocalStorage();
  };
  setEventDate = (date) => {
    this.currentData.eventDate = date;
    this.saveToLocalStorage();
  };
  setEventCalURL = (url) => {
    this.currentData.eventCalURL = url;
    this.saveToLocalStorage();
  };
  setListServeURL = (url) => {
    this.currentData.listServeURL = url;
    this.saveToLocalStorage();
  };
    
    // Save chat data to local storage
  saveToLocalStorage = async () => {
    localStorage.setItem('appData', JSON.stringify({ currentData: this.currentData }));
  }



  // Load chat data from local storage
  loadFromLocalStorage() {
    const storedData = localStorage.getItem('appData');
    if (storedData) {
      const { currentData } = JSON.parse(storedData);
      this.currentData = currentData;
    }
  }
  
}

const data = new Data();

export default data;