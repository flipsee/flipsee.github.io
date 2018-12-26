class EventModel{
    constructor(id, image, isAvailable, price, title, type, url, eventDate){
        this.id = id;
        this.image = image;
        this.isAvailable = isAvailable;
        this.price = price;
        this._title = title;
        this.type = type;
        this.url = url;
        this.eventDate = eventDate;
        this.start = null; 
        this.backgroundColor = null;
        this.borderColor = null;
        this.__init__();
    }
  
    __init__(){
      this.__setStartDate__();
      this.__setColor__();
      this.title = this._title + " (" + this.price + ")"
    }
  
    __setStartDate__() {
      if (this.start == null) {
        if (this.eventDate !== null && this.eventDate !== undefined) {
          this.eventDate = this.eventDate.replace(/,/g,"").replace(/ /g,"");
          //Sample value of this.eventDate = Tue18Dec
          let _eventDate = this.eventDate.substring(3, 5);        
          let _eventMonth = moment().month(this.eventDate.substring(5, this.eventDate.length)).format("M");
          let _eventYear = moment().year(); //default this year
          
          if (_eventMonth < moment().month()){
            _eventYear = _eventYear + 1;
          }
  
          let temp = moment().year(_eventYear).month(_eventMonth-1).date(_eventDate);
          this.start = moment(temp).format("YYYY-MM-DD");        
        } 
      }    
    } 

    __setColor__() {
        if (this.isAvailable.toLowerCase() !== "available"){      
            this.backgroundColor = '#808080';//grey
        } else if (this.type.toLowerCase() == "beginner"){      
            this.backgroundColor = '#00a65a';//green
        } else if (this.type.toLowerCase() == "intermediate"){      
            this.backgroundColor = '#f39c12';//yellow
        } else if (this.type.toLowerCase() == "professional"){      
            this.backgroundColor = '#0073b7';//blue
        }    
        this.borderColor = this.backgroundColor;
    } 
}
    
function eventModelLoader(rawListObj){
    let result = []; 
    if((rawListObj !== undefined && rawListObj !== null && rawListObj.length > 0)){
    rawListObj.forEach(function(i, index, array) {      
        result.push(new EventModel(i.id, i.image, i.isAvailable, i.price, i.title, i.type, i.url, i.Date));
    });
    }
}