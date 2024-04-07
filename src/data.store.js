
import { makeObservable, observable, action } from 'mobx';

class Data {
  constructor() {
    makeObservable(this, {
      currentData: observable,
      setCategory: action,
    });
    this.loadFromLocalStorage();
  }

  currentData = { category: '', eventName: '', eventTime: '', eventLocation: '', eventDate: ''};

  setCategory = (category) => {
    this.currentData.category = category;
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